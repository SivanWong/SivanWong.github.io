---
title: JS：__proto__和prototype
date: 2020-05-14
tags: [JS]
categories: JS
comments: true
---

![image](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/2/24/1691fc9305a0c6b0~tplv-t2oaga2asx-zoom-in-crop-mark:1304:0:0:0.awebp)

### \_\_proto\_\_
每一个对象都有的属性（在JS里，万物皆对象），指向构造该对象的构造函数的原型。

### prototype
- 每一个方法都有的属性，这个属性是一个指针，指向一个对象，这个对象的用途就是包含所有实例共享的属性和方法（我们把这个对象叫做原型对象）。
- 原型对象也有一个属性，叫做constructor，这个属性包含了一个指针，指回原构造函数。

> 方法也是对象，所以方法既有prototype属性又有__proto__属性

实例对象的__proto__和其自身构造函数的prototype都是指向构造函数的原型。

```
var A = function(){} //A是一个方法，也是一个对象
var a = new A() //a是由A创造出来的一个对象，不是方法

//对象
console.log(a.__proto__); //Object
console.log(a.prototype); //undefined,因为a不是方法，没有该属性

//方法，也是对象
console.log(A.__proto__); //function () { [native code] }
console.log(A.prototype); //Object

console.log(a.__proto__==A.prototype); //true
console.log(a.prototype==undefined); //true
console.log(A.__proto__==Function.prototype); //true
console.log(A.prototype==a.__proto__); //true
```
