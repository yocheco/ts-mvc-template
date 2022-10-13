const { merge } = require('webpack-merge')
const CopyPlugin = require('copy-webpack-plugin')
const path = require('path')
const common = require('./webpack.common.js')
const buildDir = path.resolve(__dirname, 'dist')

const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin')

const serverConfig = {
  target: 'node',
  mode: 'production',
  entry: {
    server: { import: './src/server.ts' }
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
  optimization: {
    minimizer: [
      new ImageMinimizerPlugin({
        deleteOriginalAssets: false,
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminMinify,
          options: {
            plugins: [
              ['gifsicle', { interlaced: true }],
              ['jpegtran', { progressive: true }],
              ['optipng', { optimizationLevel: 7 }],
              [
                'svgo',
                {
                  plugins: [
                    {
                      name: 'preset-default',
                      params: {
                        overrides: {
                          removeViewBox: false,
                          addAttributesToSVGElement: {
                            params: {
                              attributes: [
                                { xmlns: 'http://www.w3.org/2000/svg' }
                              ]
                            }
                          }
                        }
                      }
                    }
                  ]
                }
              ]
            ]
          }
        },
        generator: [
          {
            type: 'asset',
            implementation: ImageMinimizerPlugin.imageminGenerate,
            options: {
              plugins: ['imagemin-webp']
            }
          }
        ]
      })
    ]
  },
  plugins: [
    // new ImageMinimizerPlugin({
    //   minimizer: {
    //     implementation: ImageMinimizerPlugin.imageminMinify,
    //     options: {
    //       // Lossless optimization with custom option
    //       // Feel free to experiment with options for better result for you
    //       plugins: [
    //         ['gifsicle', { interlaced: true }],
    //         ['jpegtran', { progressive: true }],
    //         ['optipng', { optimizationLevel: 5 }],
    //         // Svgo configuration here https://github.com/svg/svgo#configuration
    //         [
    //           'svgo',
    //           {
    //             plugins: [
    //               {
    //                 name: 'preset-default',
    //                 params: {
    //                   overrides: {
    //                     removeViewBox: false,
    //                     addAttributesToSVGElement: {
    //                       params: {
    //                         attributes: [
    //                           { xmlns: 'http://www.w3.org/2000/svg' }
    //                         ]
    //                       }
    //                     }
    //                   }
    //                 }
    //               }
    //             ]
    //           }
    //         ]
    //       ]
    //     }
    //   }
    // }),
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
    rules: [
      // {
      //   test: /\.(jpe?g|png|gif|svg)$/i,
      //   type: 'asset'
      // }
    ]
  }
})

module.exports = [serverConfig, clientConfig]
