const webpack = require('webpack');
const path = require('path');

module.exports = {
  context: path.join(__dirname, '/client'),
  entry: './index.jsx',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'env'],
        },
      },
    ],
  },
  devtool: 'source-map',
  output: {
    path: path.join(__dirname, '/public'),
    filename: 'app.js',
  },
};
