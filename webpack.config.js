const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const AssetsPlugin = require('assets-webpack-plugin');
const Visualizer = require('webpack-visualizer-plugin');

const GLOBALS = {
  APP_VERSION: JSON.stringify(require("./package.json").version)
};

module.exports = {
  devtool: 'source-map',
  entry: {
    main: './src/index'
  },
  target: 'web',
  output: {
    path: __dirname + '/build', // Note: Physical files are only output by the production build task `npm run build`.
    publicPath: './',
    filename: '[name].js'
  },
  stats: "minimal",
  devServer: {
    contentBase: './'
  },
  plugins: [
    new AssetsPlugin({
      filename: 'webpack.assets.json',
      path: './build',
      prettyPrint: true
    }),
    new webpack.LoaderOptionsPlugin({
      debug: true
    }),
    new webpack.DefinePlugin(GLOBALS),
    new webpack.NoEmitOnErrorsPlugin(),
    new ExtractTextPlugin({
      filename: '[name].css',
      disable: false,
      allChunks: true
    }),
    // allows for global variables
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: "commons",
      filename: "[name].js"
    }),
    new Visualizer()
  ],
  module: {
    rules: [
      {test: /\.js$/, include: path.join(__dirname, 'Scripts/app'), enforce: "pre", use: 'eslint-loader'},
      {test: /\.js$/, include: path.join(__dirname, 'Scripts/app'), use: ['babel-loader']}
    ]
  }
};
