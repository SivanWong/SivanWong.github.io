---
title: JS：浅拷贝与深拷贝
date: 2020-05-14
tags: [JS]
categories: JS
comments: true
---


### 浅拷贝
拷贝对象的内存地址，新旧对象共享同一块内存，修改新对象会导致旧对象也改变。

```
var obj = { a: {a:"kobe",b:39} };
var arr = ["a","b",{name:"kobe"}];
//第一种
var obj1 = obj;
//第二种
var obj2 = Object.assign({},obj);//当object只有一层时为深拷贝
//第三种
var arr1 = arr.concat();
//第四种
var arr2 = arr.slice();
```



### 深拷贝
创造一个一模一样的对象，，新旧对象不共享同一块内存，修改新对象不会导致旧对象改变。
#### 递归实现深拷贝

```
function clone(target) {
	var temp;
	if (target instanceof Array) {
		temp = [];
	} else if (target instanceof Object) {
		temp = {};
	} else {
		return target;
	}

	for (var i in target) {
		temp[i] = clone(target[i]);
	}
	return temp;
}

console.log(clone(["111", "222", {
		a: "1"
	},
	[1, 1]
]));
console.log(clone({
	a: [1, 1],
	b: {
		a: "1",
		b: "11"
	},
	c: "11"
}));
console.log(clone("111"));
```

#### JSON.parse(JSON.stringify())

```
function clone(target){
    return JSON.parse(JSON.stringify(target));
}
```
原理： 用JSON.stringify将对象转成JSON字符串，再用JSON.parse()把字符串解析成对象，一去一来，新的对象产生了，而且对象会开辟新的栈，实现深拷贝。

> 这种方法虽然可以实现数组或对象深拷贝，但不能处理函数。