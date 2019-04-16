/*
 * @Author: @Guojufeng 
 * @Date: 2019-04-16 21:09:31 
 * @Last Modified by: @Guojufeng
 * @Last Modified time: 2019-04-16 21:12:15
 * 模块1js
 */
define(myModules, function () {
  var name = '我的第一个AMD文件';
  var obj = {
    name
  }
  console.log(name);
  function getName() {
    name += '!';
    console.log(name);
    return name;
  }
  return {getName}
  // 因为返回的是一个对象，对象中属性名如果和属性值相同，那么可以不写属性值。
  // 相当于下边这种写法
  return {
    getName: getName
  }

});