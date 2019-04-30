/*
 * @Author: @Guojufeng 
 * @Date: 2019-04-29 17:48:03 
 * @Last Modified by: @Guojufeng
 * @Last Modified time: 2019-04-30 15:48:16
 */
/* 块级注释 */
 console.log('成功了！！!');

 // 行级注释
var h5 = false;
var rst = h5 / 0; //false => 0, 0 / 0 = NaN
if(rst){ // Boolean(NaN) = false
  console.log('if NaN');
  console.log(rst * 2 + '2' + 4);
}else{
  console.log('NaN = false，!NaN = true = 1');
  console.log(!rst * 2 + '2' + 4); // Number(!NaN) = 1
}

if(h5){
  var a = 1;
  var b = 2;
  console.log(a+b)
}