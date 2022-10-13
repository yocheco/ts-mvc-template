const { merge } = require('webpack-merge')
const CopyPlugin = require('copy-webpack-plugin')
const path = require('path')
const common = require('./webpack.common.js')
const buildDir = path.resolve(__dirname, 'dist')

const serverConfig = {
  target: 'node',
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

const clientConfig = {
  target: 'web',
  entry: './src/js/main.js',
  output: {
    path: path.resolve(__dirname, 'dist/public/frontend/js'),
    filename: 'index.js',
    publicPath: '/frontend/js/',
    chunkFilename: '[name]-chunk.js'
  },
  optimization: {
    flagIncludedChunks: true
  },
  resolve: {
    extensions: ['.ts', '.js', '.json']
  },
  plugins: [
    // ---[Copy files]---
    // [Template backend]
    new CopyPlugin({
      patterns: [
        { from: './src/public/backend', to: '../../../public/backend' }
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
    rules: [
      // [Babel]
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-transform-runtime']
          }
        }
      }
    ]
  }
}

module.exports = [serverConfig, clientConfig]
