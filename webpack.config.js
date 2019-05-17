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
    filename: `[name]${dev ? '' : '.[hash:10]'}.js`,
    path: path.resolve(__dirname, 'docs'),
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
            options: {
              configFile: 'webpack.tsconfig.json',
            },
          },
        ],
      },
      {
        test: /.(le|c)ss$/,
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
      favicon: path.resolve(__dirname, 'docs/src/favicon.ico'),
    }),
    new MiniCssExtractPlugin({
      filename: `[name]${dev ? '' : '.[hash:10]'}.css`,
    }),
  ],
};
