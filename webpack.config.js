var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: './src/scripts/main.js',
  devtool: "source-map",
  output: {
    path: './public',
    filename: 'assets/bundle-min.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query:
        {
          presets:['es2015', 'react']
        }
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        loaders: ["style", "css?sourceMap", "sass?sourceMap"]
      }
      // {
      //   test: /\.scss$/,
      //   loader: ExtractTextPlugin.extract(
      //       //'style', // The backup style loader
      //       'css?sourceMap!sass?sourceMap'
      //   )
      // }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      include: /\.min\.js$/,
      compress: {
        warnings: false
      },
      minimize: true,
      comments: false
    }),
    new ExtractTextPlugin('assets/styles.css')
  ],
  resolve: {
    extensions: ['', '.js', '.scss', '.json']
  },
};
