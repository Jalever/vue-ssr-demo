const path = require('path');
const merge = require('webpack-merge');
const base = require("./webpack.base.conf");
const webpack = require("webpack");
const isProd = process.env.NODE_ENV === 'production';

module.exports = merge(base, {
  target: 'node',
  mode: isProd ? 'production':'development',
  entry: './src/entry-server.js',
  output: {
    filename: 'server-bundle.js',
    libraryTarget: 'commonjs2'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.VUE_ENV': '"client"'
    })
  ]
});