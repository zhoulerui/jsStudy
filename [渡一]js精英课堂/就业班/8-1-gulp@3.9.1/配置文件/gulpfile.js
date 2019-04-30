/*
 * @Author: @Guojufeng 
 * @Date: 2019-04-29 16:44:09 
 * @Last Modified by: @Guojufeng
 * @Last Modified time: 2019-04-30 09:55:54
 */
var gulp = require('gulp');
/* 统一管理所有的路径地址 */
var floderUrl = {
  src: 'src/',
  dist: 'dist/'
}

gulp.task('html', function() {
  console.log('html111')
  return gulp.src('../src/**/*.html')
  .pipe(gulp.dest('../dist/html'))
});
gulp.task('default',['html']);
