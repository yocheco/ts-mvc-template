const { merge } = require('webpack-merge')

const path = require('path')
const common = require('./webpack.common.js')
const buildDir = path.resolve(__dirname, 'src')

module.exports = merge(common, {
  mode: 'development',
  entry: {
    'public/frontend/js/index': { import: './src/js/main.js' }
  },
  output: {
    path: buildDir,
    filename: '[name].js'
  },
  plugins: [],
  module: {
    rules: []
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  }
})
