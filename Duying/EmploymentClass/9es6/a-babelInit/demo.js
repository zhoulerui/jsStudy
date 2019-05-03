"use strict";

var _console;

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// es7 - 扩展运算符
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
{
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
