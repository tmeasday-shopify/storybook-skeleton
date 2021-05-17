const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const project = process.env.PROJECT || 'template';

module.exports = {
  entry: `./src/${project}-entry.js`,
  plugins: [new HtmlWebpackPlugin()],
  module: {
    rules: [
      {
        test: /\.([t|j]s|svg)$/,
        loader: 'esbuild-loader',
        exclude: /node_modules/,
        options: {
          loader: 'tsx',
          target: 'es2015',
        },
      },
      ...require(`./webpack/${project}-loaders`).loaders,
    ],
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
