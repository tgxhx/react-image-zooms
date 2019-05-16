const path = require('path');
const url = require('url');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  devtool: 'sourcemap',
  entry: {
    app: path.resolve(__dirname, 'docs/src'),
  },
  output: {
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
  },
  module: {
    rules: [
      {
        test: /.js$/,
        loader: 'babel-loader',
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
            },
          },
          {
            loader: 'ts-loader',
          },
        ],
      },
      {
        test: /.less$/,
        use: ['style-loader', 'css-loader', 'less-loader'],
      },
    ],
  },
  devServer: {
    hot: true,
    port: 3006,
    disableHostCheck: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'docs/src/index.html',
    }),
  ],
};
