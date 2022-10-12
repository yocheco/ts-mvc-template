
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HandlebarsPlugin = require('handlebars-webpack-plugin')
const sourceDir = path.join(__dirname, 'src')
const buildDir = path.resolve(__dirname, 'dist')

module.exports = {
  target: 'node',
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
      },
      // [Babel]
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  plugins: []
}
