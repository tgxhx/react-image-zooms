const path = require('path');
const url = require('url');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const dev = process.env.NODE_ENV === 'development';

module.exports = {
  mode: dev ? 'development' : 'production',
  devtool: dev ? 'sourcemap' : false,
  entry: {
    app: path.resolve(__dirname, 'docs/src'),
  },
  output: {
    filename: `[name]${dev ? '' : '.[contenthash:10]'}.js`,
    path: path.resolve(__dirname, 'docs'),
    publicPath: dev ? '/' : '/react-image-zooms',
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
  },
  optimization: {
    minimize: dev ? false : true,
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: true,
        terserOptions: { output: { comments: false } },
      }),
    ],
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
        use: [
          dev
            ? 'style-loader'
            : {
                loader: MiniCssExtractPlugin.loader,
                options: {
                  publicPath: '',
                },
              },
          'css-loader',
          'less-loader',
        ],
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
    new MiniCssExtractPlugin({
      filename: `[name]${dev ? '' : '.[contenthash:10]'}.css`,
    }),
  ],
};
