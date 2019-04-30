/*
 * @Author: @Guojufeng 
 * @Date: 2019-04-29 16:44:09 
 * @Last Modified by: @Guojufeng
 * @Last Modified time: 2019-04-30 10:21:25
 */
var gulp = require('gulp');
/* 统一管理所有的路径地址 */
var floderUrl = {
  src: 'src/',
  dist: 'dist/'
}
/* 安装插件 */

// 处理html的

/* 处理html */
/* gulp.task('html', async()=> {
  await gulp.src('./src/html/index.html',{base: './src'})
    .pipe(gulp.dest('dist'));
}); */

gulp.task('html', function() {
  console.log('html111')
  return gulp.src('../src/**/*.html')
  .pipe(gulp.dest('../dist/html'))
});
// /* 处理css */
// gulp.task('css', function() {
//   return gulp.src(floderUrl.src + 'css/*')
//     .pipe(gulp.dest(floderUrl.dist + 'css/'));
// });
// /* 处理js */
// gulp.task('js', function() {
//   gulp.src(floderUrl.src + 'js/*')
//     .pipe(gulp.dest(floderUrl.dist + 'js/'));
// });
// /* 处理img */
// gulp.task('img', function() {
//   gulp.src(floderUrl.src + 'img/*')
//     .pipe(gulp.dest(floderUrl.dist + 'img/'));
// });
/* 监听静态资源变化 */

/* 配置默认任务 */
// gulp.task('default',['html','css','js','img'],function(){
//   console.log(floderUrl.src,floderUrl.dist)
// });
//gulp.series|4.0 依赖
//gulp.parallel|4.0 多个依赖嵌套
gulp.task('default',gulp.series(gulp.parallel('html')));
