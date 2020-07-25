const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const isProd = process.env.NODE_ENV === 'production';


module.exports = {
  // entry: {
  //   app: path.resolve(__dirname, './../src/entry-client.js')
  // },
  output: {
    path: path.resolve(__dirname, './../dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin()
  ]
};