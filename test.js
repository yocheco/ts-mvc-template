const CopyPlugin = require('copy-webpack-plugin')
// const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const fs = require('fs')
const url = require('url')
const express = require('express')
const exphbs = require('express-handlebars')

const app = express()

// Handlebars Setup

/**
 * Instantiate a Handlebars instance with our config (default layout, helpers, etc.)
 */
const handlebasInstance = exphbs.create({
  defaultLayout: 'mainLayout',
  // Specify helpers which are only registered on this instance.
  helpers
})

app.engine('handlebars', handlebasInstance.engine)
app.set('view engine', 'handlebars')
app.use('/assets', express.static('assets'))

const basePath = path.resolve(__dirname, './views')

function generateHtmlPlugins (templateDir) {
  const itemList = fs.readdirSync(templateDir)
  return itemList.flatMap(item => {
    const [name, extension] = item.split('.')
    if (extension == 'handlebars') {
      const templatePath = path.resolve(templateDir, item)
      const outputPath = path.resolve(templateDir, name + '.html')
      const outputName = path.relative(basePath, outputPath)
      return new HtmlWebpackPlugin({
        filename: outputName,
        inject: false,
        template: templatePath
      })
    } else {
      return []
    }
  })
}

const siteHtmlPlugins = generateHtmlPlugins(basePath)

function contextCallback (resourcePath, view) {
  const context = {}
  if (view.includes('documentation/')) {
    context.layout = 'documentationLayout'
  }
  return context
}

module.exports = {
  mode: 'development',
  resolveLoader: {
    modules: ['node_modules', path.resolve(__dirname, 'loaders')]
  },
  entry: './src/entry-workaround.js',
  output: {
    filename: 'entry-workaround.js',
    path: path.resolve(__dirname, 'public')
  },
  module: {
    rules: [{
      test: /\.handlebars$/,
      loader: 'express-handlebars-loader',
      options: {
        app: app,
        basePath: basePath,
        contextCallback: contextCallback
      }
    }]
  },
  plugins: []
}
// [Templates]
// new HandlebarsPlugin({
//   entry: path.join(process.cwd(), 'src', 'views', '**', '*.hbs'),
//   output: path.join(buildDir, 'views', '[path]', '[name].hbs'),
//   partials: [
//     path.join(process.cwd(), 'src', 'views', 'partials', '*', '*.hbs')
//   ],
//   helpers: {
//     nameOfHbsHelper: Function.prototype,
//     projectHelpers: path.join(process.cwd(), 'app', 'helpers', '*.helper.js')
//   },
//   getTargetFilepath: function getTargetFilepath (filepath, outputTemplate, rootFolder) {
//     const sanitizePath = require('handlebars-webpack-plugin/utils/sanitizePath')
//     const filePath = sanitizePath(filepath)
//     const rootPath = rootFolder ? sanitizePath(rootFolder) : path.dirname(filePath)

//     if (outputTemplate == null) { return filePath.replace(path.extname(filePath), '') }

//     const folderPath = path
//       .dirname(filePath)
//       .split(rootPath)[1]

//     const fileName = path
//       .basename(filePath)
//       .replace(path.extname(filePath), '')

//     return outputTemplate
//       .replace('[path]', folderPath)
//       .replace('[name]', fileName)
//   }
// }),
