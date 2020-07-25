## level1 
构建一个基本的Vue项目
```txt
.
│  .babelrc
│  .gitignore
│  package-lock.json
│  package.json
│  README.md
│  tree.txt
│  webpack.config.js
│  
├─dist
│      bundle.js
│      index.html
│      
├─public
│      index.html
│      
└─src
        App.vue
        main.js
```

基本命令:
```
npm i -D vue vue-loader
npm i -D webpack webpack-cli webpack-dev-server
npm i -D babel-loader@7 babel-core babel-preset-env
npm i -D webpack-html-plugin
```

`package.json`文件:
```json
"build": "webpack --progress --color --mode production",
"start": "webpack-dev-server --progress --color --open --mode development"
```

`webpack.config.js`基本配置:
```js
const path = require('path')
const webpack = require('webpack');
const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    app: './src/main.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: 'bundle.js',
  },
  devtool: "inline-source-map",
  devServer: {
      contentBase: path.resolve(__dirname, "dist"),
      hot: true
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
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './public/index.html'),
      filename: 'index.html',
      title: 'Webpage'
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
}
```

`.babelrc`文件:
```
{
  "presets": [
    [
      "env",
      {
        "modules": false,
        "targets": {
          "browsers": [
            "> 1%",
            "last 2 versions",
            "not ie <= 8"
          ]
        }
      }
    ]
  ]
}
```