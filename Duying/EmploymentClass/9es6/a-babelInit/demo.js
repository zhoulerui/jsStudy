"use strict";

var _console;

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*
 * @Author: @Guojufeng 
 * @Date: 2019-05-04 16:37:16 
 * @Last Modified by: @Guojufeng
 * @Last Modified time: 2019-05-04 18:54:08
 */
// 解构赋值
// babel默认不转换API
// 比如Object.assign、promise这些
// Object.assign(目标对象,克隆对象1，克隆对象2);
// 会以浅克隆的方式，将后边对象的值复制到目标对象里边去。
// import '@babel/polyfill';
var assign1 = {
  a: 1,
  b: {
    c: 2
  }
};
var assign2 = {
  aa: 1,
  bb: {
    cc: 2
  }
};
var newObj = Object.assign({}, assign1, assign2);
console.log(newObj);
newObj.aa = 3;
newObj.b.c = '浅拷贝';
console.log(assign1, assign2, newObj); // es7 - 扩展运算符

var obj = {
  name: 'xing.org1',
  age: 18,
  IDCard: {
    num: 123123812412,
    address: 'BeiJing CHINA'
  }
};

var obj2 = _objectSpread({}, obj, {
  sex: 'female'
});

console.log(obj2);
obj2.IDCard.address = 'HangZhou CHINA';
console.log(obj.IDCard.address, obj2); // 浅拷贝
// es6扩展运算符浅克隆

var arrA = [{
  a: 1,
  b: 1
}, 'b', {
  a: 2,
  b: 2
}];
var arrB = [].concat(arrA); //相当于[].concat(arrA);

console.log(arrB);
arrB[0].a = '浅克隆？';
arrB[1] = '浅克隆！';
console.log('arrA：', arrA, 'arrB', arrB);
var oUl = document.getElementsByTagName('ul')[0],
    oLi = oUl.getElementsByTagName('li');
/* for (var i = 0; i < oLi.length; i++) {
  oLi[i].onclick = (function(j){
    return function(e){
      console.log(j,e);
    };
  })(i)
} */

var _loop = function _loop(i) {
  oLi[i].onclick = function (e) {
    console.log(i, e);
  };
};

for (var i = 0; i < oLi.length; i++) {
  _loop(i);
}

var arr = [];

var _loop2 = function _loop2(i) {
  arr[i] = function () {
    console.log(i);
  };
};

for (var i = 0; i < oLi.length; i++) {
  _loop2(i);
}

var aaa = [];

var _loop3 = function _loop3(i) {
  aaa[i] = function () {
    console.log(i);
  };
};

for (var i = 0; i < 10; i++) {
  _loop3(i);
}

aaa[6](); // 6

var a = 21;
console.log(a);
a = 2;
var b = 13; // b = 3;

console.log(b);
console.log(tisheng);
var tisheng = 'let和const没有变量声明提升';
var zanshi = 'Temporal Dead Zone';

if (true) {
  var _zanshi = 'Temporal Dead Zone';
  console.log(_zanshi);
}

console.log(zanshi);
console.log(window.zanshi);

if (true) {
  var _test = 1;
  console.log(_test);
  {
    console.log(_test2);
    var _test2 = 2;
    {
      var _test3 = 3;
    }
  }
} // 扩展运算符


var arg2 = [1, 2, 3, 4, 5];

(_console = console).log.apply(_console, arg2); // 读，展开数组成散列的项


function test(a, b) {
  for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }

  console.log(a, b, args); //写，把散列的项写入到一个数组中
}

test(1, 2, 3, 4, 5);

function getSum() {
  for (var _len2 = arguments.length, arr = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    arr[_key2] = arguments[_key2];
  }

  // let arr = Array.prototype.slice.call(arguments);
  return arr.reduce(function (pre, cur) {
    return pre += cur;
  }, 0);
}

console.log(getSum(1, 2, 3, 4, 6)); // 数组合并
// 读操作 - 数组合并

var arr1 = [1, 2, 3, 4],
    arr2 = [6, 7, 8, 9],
    newArr = [].concat(arr1, arr2);
console.log(newArr); // 相当于下边的写法：

var concatArr = [].concat(arr1, arr2);
console.log(concatArr);
