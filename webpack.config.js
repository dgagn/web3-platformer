const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const mode =
  process.env.NODE_ENV === 'production' ? 'production' : 'development';

module.exports = {
  mode,
  entry: './src/index.ts',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './pages/index.html',
    }),
    new CopyWebpackPlugin({
      patterns: [{from: 'assets'}],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js|ts$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.scss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  devtool: 'source-map',

  devServer: {
    static: ['./dist', './pages'],
  },

  resolve: {
    extensions: ['.js', '.ts'],
  },
};
