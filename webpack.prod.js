const { merge } = require('webpack-merge')
const CopyPlugin = require('copy-webpack-plugin')
const path = require('path')
const common = require('./webpack.common.js')
const buildDir = path.resolve(__dirname, 'dist')

const serverConfig = {
  target: 'node',
  mode: 'production',
  entry: {
    app: { import: './src/app.ts' }
  },
  output: {
    path: buildDir,
    filename: '[name].js'
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
  }
}

const clientConfig = merge(common, {
  target: 'web',
  mode: 'production',
  entry: './src/js/main.js',
  output: {
    path: path.resolve(__dirname, 'dist/public/frontend/js'),
    filename: 'index.js',
    publicPath: '/frontend/js/',
    chunkFilename: '[name]-chunk.js'
  },
  plugins: [
    // ---[Copy files]---
    new CopyPlugin({
      patterns: [
        { from: './src/public/backend', to: '../../../public/backend' },
        { from: './src/public/frontend/assets', to: '../../../public/frontend/assets' }
      ]
    }),
    // [Views]
    new CopyPlugin({
      patterns: [
        { from: './src/views', to: '../../../views' }
      ]
    })
  ],
  module: {
    rules: []
  }
})

module.exports = [serverConfig, clientConfig]
