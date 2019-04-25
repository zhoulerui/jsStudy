/*
 * @Author: @Guojufeng 
 * @Date: 2019-04-25 19:58:12 
 * @Last Modified by: @Guojufeng
 * @Last Modified time: 2019-04-25 20:22:43
 */
var path = require('path');//引入node接口
var HtmlWebpackPlugin = require('html-webpack-plugin');//引入插件
var config = {
  mode: 'development',//开发环境，不压缩出口文件
  entry: {
    index: './src/js/index.js'//入口文件路径
  },
  output: {
    path: path.resolve(__dirname, 'dist'),//另一种写法__dirname + '/dist/,输出文件的地址，当前配置文件目录下的dist文件夹下
    filename: '[name].min.js'//输出的文件名以入口文件名为主，并且加上.min
  },
  module: {
    rules: [{
      test: /\.css$/,
      use: ['style-loader','css-loader']//加载处理css的loader，因为除了js文件以外，webpack都要依赖loader才能处理文件
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'html-webpack-plugin生成title',//配置生成html的title
      filename: 'app.html',//配置生成的html文件名字及目录，dist为根目录
      template: './src/index.html'//配置生成的html以哪个html文件为模板，设置了以这个为模板后，title就不起作用了
    })
  ]
};
module.exports = config;