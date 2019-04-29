/*
 * @Author: @Guojufeng 
 * @Date: 2019-04-29 16:44:09 
 * @Last Modified by: @Guojufeng
 * @Last Modified time: 2019-04-29 18:16:06
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
gulp.task('html', function() {
  gulp.src(floderUrl.src + 'html/*')
    .pipe(gulp.dest(floderUrl.dist + 'html/'));
});
/* 处理css */

/* 处理js */

/* 处理img */

/* 监听静态资源变化 */

/* 配置默认任务 */
gulp.task('default',['html'],function(){
  console.log(floderUrl.src,floderUrl.dist)
});