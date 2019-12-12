let path = require('path');
let ExtractTextPlugin = require("extract-text-webpack-plugin");
let HtmlWebpackPlugin = require('html-webpack-plugin');
let CopyWebpackPlugin = require('copy-webpack-plugin');
let autoprefixer = require('autoprefixer');
const webpack = require('webpack');

let conf = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
      //publicPath: 'dist/'
  },
    devServer: {
      overlay: true
  },
  module: {
    rules:[
      {
        test: /\.js$/,
        loader: 'babel-loader',
        //exclude: '/node_modules/'
      },
      {
         test: /\.(woff(2)?|ttf|eot|otf)(\?v=\d+\.\d+\.\d+)?$/,
         use: [{
             loader: 'file-loader',
             options: {
                 name: '[name].[ext]',
                 outputPath: 'fonts/'
             }
          }]
      },
      {
        test: /\.scss/,
        use: [{
          loader: 'style-loader'
        }, {
          loader: 'css-loader'
        },
        {
            loader: 'postcss-loader',
            options: {
                plugins: [
                    autoprefixer({
                        browsers:['ie >= 8', 'last 4 version']
                    })
                ],
                sourceMap: true
            }
        },
        {
        loader: 'sass-loader'
      }]
      },
      {
        test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        use: [{
            loader: 'file-loader',
            options: {
                name: '[name].[ext]',
                outputPath: 'fonts/'
            }
        }]
      },
      {
       test: /\.(png|svg|jpg)$/,
       use: [{
         loader: 'file-loader',
         options: {
           name: '[name].[ext]',
           outputPath: 'img/'
         }
       }]
      }

    ]
  },
  plugins: [
    //new ExtractTextPlugin(main.css)
    new HtmlWebpackPlugin({
      inject: false,
      hash: true,
      template: './src/index.html',
      filename: 'index.html'
    }),
    new HtmlWebpackPlugin({
      inject: false,
      hash: true,
      template: './src/admin.html',
      filename: 'admin.html'
    }),
    new CopyWebpackPlugin([
      {
        from: './src/img',
        to: './img'
      }
    ]),
        new webpack.ProvidePlugin({
        Promise: 'es6-promise-promise', // works as expected
    })
  ]
};

module.exports = conf;
