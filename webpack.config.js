const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

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
