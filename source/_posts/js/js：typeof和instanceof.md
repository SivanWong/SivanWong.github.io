---
title: js：typeof和instanceof
Date: 2020-05-14
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
