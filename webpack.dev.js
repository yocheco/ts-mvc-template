const path = require('path')
const { merge } = require('webpack-merge')

const common = require('./webpack.common.js')

const clientConfig = merge(common, {
  mode: 'development',
  entry: './src/js/main.js',
  output: {
    path: path.resolve(__dirname, 'src/public/frontend/js'),
    filename: 'index.js',
    // publicPath: '/frontend/js/',
    chunkFilename: '[name]-chunk.js'
  },
  plugins: [],
  module: {
    rules: []
  }
})

module.exports = [clientConfig]
