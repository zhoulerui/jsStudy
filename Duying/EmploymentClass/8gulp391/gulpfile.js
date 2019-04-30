/*
 * @Author: @Guojufeng 
 * @Date: 2019-04-29 16:44:09 
 * @Last Modified by: @Guojufeng
 * @Last Modified time: 2019-04-30 11:19:42
 */
var gulp = require("gulp");
/* 统一管理所有的路径地址 */
var folderUrl = {
  src : "src/",
  dist : "dist/"
}
/* 安装插件 */

/* 处理html */
gulp.task("html",function(){
  gulp.src(folderUrl.src + "html/*.html")
    .pipe(gulp.dest(folderUrl.dist + "html/"));
})
/* 处理css */
gulp.task("css", function() {
  gulp.src(folderUrl.src + "css/*.css")
    .pipe(gulp.dest(folderUrl.dist + "css/"));
});
/* 处理js */
gulp.task("js", function() {
  gulp.src(folderUrl.src + "js/*")
    .pipe(gulp.dest(folderUrl.dist + "js/"));
});
/* 处理img */
gulp.task("img", function() {
  gulp.src(folderUrl.src + "img/*")
    .pipe(gulp.dest(folderUrl.dist + "img/"));
});
/* 监听静态资源变化 */

/* 配置默认任务 */
gulp.task("default",["html","css","js","img"],function(){
  console.log(folderUrl.src,folderUrl.dist)
});