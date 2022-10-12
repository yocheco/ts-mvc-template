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
  target: 'web', // <=== can be omitted as default is 'web'
  entry: {
    'public/frontend/js/index': { import: './src/js/main.js' }
  },
  output: {
    path: buildDir,
    filename: '[name].js',
    publicPath: '/frontend/js/'
    // chunkFilename: 'public/frontend/[name]-dddddddd.js'
  },
  resolve: {
    extensions: ['.ts', '.js', '.json']
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

module.exports = [serverConfig, clientConfig]
