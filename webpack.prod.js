const { merge } = require('webpack-merge')
const CopyPlugin = require('copy-webpack-plugin')
const path = require('path')
const common = require('./webpack.common.js')
const buildDir = path.resolve(__dirname, 'dist')

module.exports = merge(common, {
  mode: 'production',
  entry: {
    app: { import: './src/app.ts' },
    'public/frontend/js/index': { import: './src/public/frontend/js/main.js' }
  },
  output: {
    path: buildDir,
    filename: '[name].js'
  },
  plugins: [
    // [Copy files]
    // [template backend]
    new CopyPlugin({
      patterns: [
        { from: './src/public/backend', to: './public/backend' }
      ]
    }),
    // [Views]
    new CopyPlugin({
      patterns: [
        { from: './src/views', to: './views' }
      ]
    })
  ],
  module: {
    rules: []
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  }
})
