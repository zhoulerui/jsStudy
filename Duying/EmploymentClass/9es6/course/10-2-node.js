/*
 * @Author: @Guojufeng 
 * @Date: 2019-05-22 14:07:55 
 * @Last Modified by: @Guojufeng
 * @Last Modified time: 2019-05-22 16:02:31
 */
let fs = require('fs'); // node中读取文件的一个对象，对象上有各种读取文件的方法

/* 1 回调地狱 */
/* let fileUrl = './data/one.txt';//在这个路径下的相对路径 PS E:\gjf-github\jsStudy\Duying\EmploymentClass\9es6>
fs.readFile(fileUrl,'utf-8',(err,data)=>{
  //error-first模式，node中的回调函数基本遵循这个格式。就是回调的第一个参数是错误参数.
  console.log(1, err,data);
  fs.readFile(data,'utf-8',(err,data)=>{
    console.log(2, data);
    fs.readFile(data,'utf-8',(err,data)=>{
      console.log(3, data);
      // 。。。回调地狱
    });
  });
}); */

/* 2 监听并发 */
let fileUrl1 = './data/one.txt';
let fileUrl2 = './data/two.txt';
let fileUrl3 = './data/three.txt';
let readFileRst = {}
let order = []; //记录三个文件的完成顺序
function readFileEnd(data) {
  // 待三个readFile都执行后再触发我
  console.log('readFile都执行了 ', data, order);
}
fs.readFile(fileUrl1, 'utf-8', (err, data) => {
  if (data) readFileRst.one = data;
  order.push(1);
  // 每次读取成功都判断一下对象里是否存够三个属性了，成立则执行最终函数
  // Object.keys(readFileRst).length == 3 && readFileEnd(readFileRst);//第一次自己调用时计数
  // afterFun(readFileRst);// 第二次使用after订阅
  Store.fire(readFileRst)
});

fs.readFile(fileUrl3, 'utf-8', (err, data) => {
  if (data) readFileRst.three = data;
  order.push(3);
  // Object.keys(readFileRst).length == 3 && readFileEnd(readFileRst) ;//第一次自己调用时计数
  // afterFun(readFileRst);// 第二次使用after订阅
  Store.fire(readFileRst)
});

fs.readFile(fileUrl2, 'utf-8', (err, data) => {
  if (data) readFileRst.two = data;
  order.push(2);
  // Object.keys(readFileRst).length == 3 && readFileEnd(readFileRst);//第一次自己调用时计数
  // afterFun(readFileRst);// 第二次使用after订阅
  Store.fire(readFileRst)
});
// 优化 after计数
function after(times,cb){
  return function(){
    --times == 0 && cb.apply(null,arguments);
  }
}
let afterFun = after(3,readFileEnd);
// 这样的after只能传一个readFileEnd，且只能执行一个定好的readFileEnd。如果想新增就不行。

/* 3 引入promise原理 - 发布订阅设计模式：修改优化上边代码 */
let Store = {
  // 目的，对回调进行很好的管理 
  list : [],//存储被订阅的函数
  times: 3,//计数
  subscribe (func) {
    // 订阅一些函数
    this.list.push(func);
  },
  fire (...args){
    // 触发时，调用订阅的所有函数。
    if(--this.times === 0)
      this.list.forEach((ele)=>{
        ele.apply(null,args);//依次触发所有函数
      })
  }
}
Store.subscribe(readFileEnd);//订阅2
Store.subscribe(readFileEnd2);//订阅2
Store.subscribe(readFileEnd3);//订阅3

function readFileEnd2(a) {
  // 新增几个并发后的回调函数
  console.log('readFile2执行',a);
}
function readFileEnd3(b,c) {
  // 新增几个并发后的回调函数
  console.log('readFile3执行',b,c);
}






















