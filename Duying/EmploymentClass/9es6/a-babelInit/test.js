// es7 - 扩展运算符
var obj = {
  name: 'xing.org1',
  age: 18,
  IDCard:{
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
console.log(obj.IDCard.address,obj2);// 浅拷贝


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
  oLi[i].onclick = function(e){
      console.log(i,e);
    };
}

let arr = [];

for (let i = 0; i < oLi.length; i++) {
  arr[i] = function(){
      console.log(i);
    };
}


let a = 21;
console.log(a);
a =  2;
const b = 13;
// b = 3;
console.log(b);

console.log(tisheng);
let tisheng = 'let和const没有变量声明提升';


let zanshi = 'Temporal Dead Zone';

if(true){
  let zanshi = 'Temporal Dead Zone';
  console.log(zanshi);
}

console.log(zanshi);
console.log(window.zanshi)
{
	let test = 1;
	console.log(test);
	{
		console.log(test);
		let test = 2;
		{
			let test = 3;
		}
	}
}
// 扩展运算符
var arg2 = [1,2,3,4,5];

console.log(...arg2);// 读，展开数组成散列的项

function test(a,b,...args){
  console.log(a,b,args);//写，把散列的项写入到一个数组中
}
test(1,2,3,4,5);

function getSum(...arr){
  // let arr = Array.prototype.slice.call(arguments);
  return arr.reduce((pre,cur) => {
    return pre += cur;
  },0);
}
console.log(getSum(1,2,3,4,6));

// 数组合并

// 读操作 - 数组合并

let arr1 = [1,2,3,4],
    arr2 = [6,7,8,9],
    newArr = [...arr1,...arr2];
console.log(newArr);
// 相当于下边的写法：
let concatArr = [].concat(arr1,arr2);
console.log(concatArr);
