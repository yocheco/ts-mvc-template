const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HandlebarsPlugin = require('handlebars-webpack-plugin')
const sourceDir = path.join(__dirname, 'src')
const buildDir = path.resolve(__dirname, 'dist')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
  target: 'node',
  entry: './src/app.ts',
  output: {
    path: buildDir,
    filename: 'app.js'
  },
  resolve: {
    extensions: ['.ts', '.js', '.json']
  },
  module: {
    rules: [
      // [@ts]
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader'
        }
      }

    ]
  },
  plugins: [
    // [Templates]
    new HandlebarsPlugin({
      entry: path.join(process.cwd(), 'src', 'views', '**', '*.hbs'),
      output: path.join(buildDir, 'views', '[path]', '[name].hbs'),
      partials: [
        path.join(process.cwd(), 'src', 'views', 'partials', '*', '*.hbs')
      ],
      helpers: {
        nameOfHbsHelper: Function.prototype,
        projectHelpers: path.join(process.cwd(), 'app', 'helpers', '*.helper.js')
      },
      getTargetFilepath: function getTargetFilepath (filepath, outputTemplate, rootFolder) {
        const sanitizePath = require('handlebars-webpack-plugin/utils/sanitizePath')
        const filePath = sanitizePath(filepath)
        const rootPath = rootFolder ? sanitizePath(rootFolder) : path.dirname(filePath)

        if (outputTemplate == null) { return filePath.replace(path.extname(filePath), '') }

        const folderPath = path
          .dirname(filePath)
          .split(rootPath)[1]

        const fileName = path
          .basename(filePath)
          .replace(path.extname(filePath), '')

        return outputTemplate
          .replace('[path]', folderPath)
          .replace('[name]', fileName)
      }
    }),
    // [files template backend]
    new CopyPlugin({
      patterns: [
        { from: './src/public/backend', to: './public/backend' }
      ]
    })
  ]
}
