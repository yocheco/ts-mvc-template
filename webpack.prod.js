const common = require('./webpack.common.js')

const { merge } = require('webpack-merge')

module.exports = merge(common, {
  mode: 'development',
  plugins: [],
  module: {
    rules: []
  }
  // ,
  // optimization: {
  //   splitChunks: {
  //     chunks: 'all'
  //   }
  // }
})
