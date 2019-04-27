/*
 * @Author: @Guojufeng 
 * @Date: 2019-04-25 19:58:12 
 * @Last Modified by: @Guojufeng
 * @Last Modified time: 2019-04-28 00:57:35
 */
var path = require('path'); //引入node接口 - 路径
// var glob = require('glob');//glob变量
var glob = require('glob-all'); //glob变量
var HtmlWebpackPlugin = require('html-webpack-plugin'); //引入插件
var MiniCssExtractPlugin = require('mini-css-extract-plugin'); //引入插件,用法见github,用于单独抽离css文件
var PurifyCSSPlugin = require('purifycss-webpack');
var WebpackDeepScopeAnalysisPlugin = require('webpack-deep-scope-plugin').default; //引入插件,用法见github
var config = {
  mode: 'development', //开发环境，不压缩出口文件
  entry: {
    index: './src/js/index.js' //入口文件路径
  },
  output: {
    path: path.resolve(__dirname, 'dist'), //另一种写法__dirname + '/dist/,输出文件的地址，当前配置文件目录下的dist文件夹下
    filename: '[name][hash:5].min.js' //输出的文件名以入口文件名为主，并且加上.min、hash值
  },
  module: {
    rules: [{
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'] //单独抽离css文件和解析的行间样式style-loader是不能在一起的。所以改成这样
        // use: ['style-loader','css-loader']//加载处理css的loader，因为除了js文件以外，webpack都要依赖loader才能处理文件
      },
      {
        test: /\.scss$/,
        use: [ //use的第二种写法,一般用于loader有单独的配置项的时候。
          {
            loader: 'css-loader'
          },
          {
            loader: 'postcss-loader',
            options: {//添加postcss插件的配置，
              ident: 'postcss', //插件的使用是针对postcss的
              plugins: [ //规定接下来使用的插件
                require('postcss-cssnext')(), //解析cssNext的语法，
                // * postcss-cssnext里边包含了autoprefixer的功能，同时存在时，只需要cssnext这个插件就行了，autoprefixer可以注释掉，要不有的时候脚手架可能会报错。
                require('autoprefixer')(), //引入一个插件-作用是自动添加前缀
                require('cssnano')(), //引入一个插件-作用是压缩css文件
              ]
            }
          },
          {
            loader: 'sass-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].min.css'
    }),
    /* new PurifyCSSPlugin({
      // Give paths to parse for rules. These should be absolute!
      paths: glob.sync([
        path.join(__dirname, './*.html'),
        path.join(__dirname, './src/js/*.js')//检测js中动态加的html结构和css样式，不过滤他们的代码
      ])//匹配路径，所有根目录下src文件夹中以html结尾的。
    }),/ /css tree shaking要放在js tree shaking的上边*/
    new HtmlWebpackPlugin({
      filename: 'index.html', //配置生成的html文件名字及目录，dist为根目录
      template: './index.html', //配置生成的html以哪个html文件为模板，设置了以这个为模板后，title就不起作用了
      title: 'html-webpack-plugin生成title', //配置生成html的title
      minify: {//压缩、整理文件
        removeComments: true, //清理注释
        collapseWhitespace: true, // 清理空格、压缩
        // 更多配置见官方文档
      }
    }),
    new WebpackDeepScopeAnalysisPlugin(), // js-tree-shaking插件
  ]
};
module.exports = config;