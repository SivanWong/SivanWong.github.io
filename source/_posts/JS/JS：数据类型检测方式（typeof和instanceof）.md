---
title: JS：数据类型检测方式（typeof和instanceof）
date: 2022-05-08
tags: [JS]
categories: JS
comments: true
---

### typeof
是一个一元运算，放在一个运算数之前，运算数可以是任意类型。    
返回一个用来表示表达式的数据类型的字符串。 
一般返回如下结果：
- number（NaN）
- string
- boolean
- object（对象、数组、null）
- undefined
- function

### instanceof
语法：object instanceof constructor    
用来检测 constructor.prototype 是否存在于参数 object 的原型链上。    
用于判断一个变量是否某个对象的实例。
> 可以用来判断一个对象是否为数组

String和Date对象同时也属于Object类型


```
内部实现方法
while(object.__proto__!==null) {
　　if(object.__proto__===constructor.prototype) {
　　　　return true;
　　　　break;
　　}
　　object.__proto__ = object.__proto__.proto__;
}
if(object.__proto__==null) {return false;}
```
instanceof只能正确判断引用数据类型，而不能判断基本数据类型。

### constructor
语法：object.constructor

- 判断数据的类型
- 对象实例通过 constructor 对象访问它的构造函数。

如果创建一个对象来改变它的原型，constructor就不能用来判断数据类型了：
```
function Fn(){};
 
Fn.prototype = new Array();
 
var f = new Fn();
 
console.log(f.constructor===Fn);    // false
console.log(f.constructor===Array); // true
```


### Object.prototype.toString.call()

语法：Object.prototype.toString.call() 

使用 Object 对象的原型方法 toString 来判断数据类型。

同样是检测对象obj调用toString方法，obj.toString()的结果和Object.prototype.toString.call(obj)的结果不一样，这是为什么？

- 这是因为toString是Object的原型方法，而Array、function等类型作为Object的实例，都重写了toString方法。
- 不同的对象类型调用toString方法时，根据原型链的知识，调用的是对应的重写之后的toString方法（function类型返回内容为函数体的字符串，Array类型返回元素组成的字符串…），而不会去调用Object上原型toString方法（返回对象的具体类型）
- 所以采用obj.toString()不能得到其对象类型，只能将obj转换为字符串类型；因此，在想要得到对象的具体类型时，应该调用Object原型上的toString方法。