/*
 * @Author: @Guojufeng 
 * @Date: 2019-04-29 16:44:09 
 * @Last Modified by: @Guojufeng
 * @Last Modified time: 2019-04-30 10:21:21
 */
// var gulp = require("gulp");
// /* 统一管理所有的路径地址 */
// var folder = {
//   src : "src/",
//   dist : "dist/"
// }

// // gulp.task('html', function() {
// //   console.log('html111')
// //   return gulp.src('../src/**/*.html')
// //   .pipe(gulp.dest('../dist/html'))
// // });
// gulp.task("html",function(){
//   console.log(2323)
//   var page =  gulp.src(folder.src + "html/index.html");
//   page.pipe(gulp.dest(folder.dist + "html/"))
// })
// gulp.task("default",["html"]);

var gulp = require('gulp');
/* 统一管理所有的路径地址 */
var folderUrl = {
  src: 'src/',
  dist: 'dist/'
}

gulp.task('html', function() {
  gulp.src(folderUrl.src+"html/index.html").pipe(gulp.dest(folderUrl.dist+'html/'))
});
gulp.task('default',['html']);
