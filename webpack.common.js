module.exports = {
  target: 'web',
  optimization: {
    flagIncludedChunks: true,
    splitChunks: {
      chunks: 'all'
    }
  },
  resolve: {
    extensions: ['.ts', '.js', '.json']
  },
  plugins: [],
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
