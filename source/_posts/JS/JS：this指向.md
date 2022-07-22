---
title: JS：this指向
date: 2020-01-15
tags: [JS]
categories: JS
comments: true
---


## 普通函数
- 普通函数被调用时，即运行时，才会确定该函数内this的指向。
- this指向调用该函数的对象。

### fn()
- 不带任何引用形式调用函数，this指向全局对象。
- 严格模式下this为undefined。
```
var a = 1;
function fn () {
    console.log(this.a);
}
fn(); // 1
```
### obj.fn()
this指向调用该函数的对象
```
var a = 1;
var obj = {
    a: 2,
    fn: function () {
        console.log(this.a);
    }
}
obj.fn(); // 2
```
### obj1.obj.fn()
这种形式的调用结果一样，函数内的this只指向直接调用该函数的对象（obj）
```
var a = 1;
var obj = {
    a: 2,
    fn: function () {
        console.log(this.a);
    }
}
var obj1 = {
    a: 3,
    obj
}
obj1.obj.fn(); // 2
```
### 另一种形式的fn()
普通函数的this指向只在调用时确定，在调用前无论经过什么操作都不会改变this的指向。
```
var a = 1;
var obj = {
    a: 2,
    fn: function () {
        console.log(this.a);
    }
}
var test = obj.fn
test(); // 1
```
### 拓展的fn()
- 当setTimeout中的回调函数为普通函数时，回调函数中的this依然是指向全局对象。
- 当setTimeout中的回调函数为箭头函数时，this指向定义时函数所在作用域的父级作用域的this。（父级为普通函数this指向调用父级的对象，若父级仍为箭头函数，则需要继续往上找）

```
var a = 1;
var obj = {
    a: 2,
    fn: function () {
        console.log(this.a);
    }
}
setTimeout(obj.fn); // 1
```
setTimeout内部

```
function setTimeout (fn,time) {
    // code...
    fn(); //没有指明调用的对象，指向全局
}
```
### fn.call()、fn.apply()、fn.bind()
可以改变this的指向

### new fn()
- new这个操作符其实是new一个新对象出来，而fn被称为构造函数，可以在这个构造函数中定义一些将要到来的新对象的一些属性。
- 在构造函数中就是用this来描述这个即将到来的新对象，所以构造函数中的this就是指向被new出来的新对象。
```
var a = 1;
function fn (a) {
    this.a = a;
}
var b = new fn(2);
console.log(b.a); // 2
```


## 箭头函数
this在定义时就已经确定，指向定义时箭头函数所在的作用域（而不是箭头函数的作用域）的父级作用域的this。
- 若父级作用域为普通函数，则this指向调用父级函数的对象。
- 若父级作用域为箭头函数，则this指向父级作用域的父级作用域。
- 如此往上找，直到全局

首先从它的父级作用域中找，如果父级作用域还是箭头函数，再往上找，如此直至找到this的指向，最后是到window。