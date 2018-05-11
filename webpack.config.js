const webpack = require('webpack');
const path = require('path');

const common = {
  context: path.join(__dirname, '/client'),
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
};

const client = {
  entry: './client.js',
  output: {
    path: path.join(__dirname, '/public'),
    filename: 'app.js',
  }
}

const server = {
  entry: './server.js',
  output: {
    path: path.join(__dirname, '/public'),
    filename: 'app-server.js',
  }
}

module.exports = [
  Object.assign({}, common, client),
  Object.assign({}, common, server),
]