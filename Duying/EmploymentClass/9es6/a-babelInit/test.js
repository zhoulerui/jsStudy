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
}
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
console.log(assign1, assign2, newObj);

// es7 - 扩展运算符
var obj = {
  name: 'xing.org1',
  age: 18,
  IDCard: {
    num: 123123812412,
    address: 'BeiJing CHINA'
  }
}
var obj2 = {
  ...obj,
  sex: 'female'
}
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

var arrB = [...arrA]; //相当于[].concat(arrA);

console.log(arrB)

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
for (let i = 0; i < oLi.length; i++) {
  oLi[i].onclick = function (e) {
    console.log(i, e);
  };
}

let arr = [];

for (let i = 0; i < oLi.length; i++) {
  arr[i] = function () {
    console.log(i);
  };
}
let aaa = [];
for (let i = 0; i < 10; i++) {
  aaa[i] = function () {
    console.log(i);
  };
}
aaa[6](); // 6


let a = 21;
console.log(a);
a = 2;
const b = 13;
// b = 3;
console.log(b);

console.log(tisheng);
let tisheng = 'let和const没有变量声明提升';


let zanshi = 'Temporal Dead Zone';

if (true) {
  let zanshi = 'Temporal Dead Zone';
  console.log(zanshi);
}

console.log(zanshi);
console.log(window.zanshi);
if (true) {
  let test = 1;
  console.log(test); {
    console.log(test);
    let test = 2; {
      let test = 3;
    }
  }
}
// 扩展运算符
var arg2 = [1, 2, 3, 4, 5];

console.log(...arg2); // 读，展开数组成散列的项

function test(a, b, ...args) {
  console.log(a, b, args); //写，把散列的项写入到一个数组中
}
test(1, 2, 3, 4, 5);

function getSum(...arr) {
  // let arr = Array.prototype.slice.call(arguments);
  return arr.reduce((pre, cur) => {
    return pre += cur;
  }, 0);
}
console.log(getSum(1, 2, 3, 4, 6));

// 数组合并

// 读操作 - 数组合并

let arr1 = [1, 2, 3, 4],
  arr2 = [6, 7, 8, 9],
  newArr = [...arr1, ...arr2];
console.log(newArr);
// 相当于下边的写法：
let concatArr = [].concat(arr1, arr2);
console.log(concatArr);