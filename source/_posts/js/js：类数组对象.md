---
title: js：类数组对象
Date: 2020-05-14
tags: [JS]
categories: JS
comments: true
---

### 类数组对象
只包含使用从零开始，且自然递增的整数做键名，并且定义了length表示元素个数的对象。

```
var arr = [1,2,3];
var obj = {0: 1, 1: 2, 2: 3, length: 3};
console.log(arr[0], obj[0])//1, 1
console.log(arr['length'], obj['length'])//3，3
```
我们可以使用对象来模拟数组，只要我们定义的对象的每个元素的键名都使用数字并且让其保持递增，且动态的定义一个length属性来表示元素个数，那么从效果上来说，基本就和数组相同了。

### arguments
arguments就是一个典型的类数组对象，为一个参数集

```
// 数组
function printArr () {
    return ['ming',18];
}
printArr()
// 打印结果
(2) ["ming", 18]
    0: "ming"
    1: 18
    length: 2
    __proto__: Array(0)
    
    
// arguments
function printArg (name,age) {
    return arguments;
}
printArg('ming',18)
// 打印结果
Arguments(2) ["ming", 18, callee: ƒ, Symbol(Symbol.iterator): ƒ]
    0: "ming"
    1: 18
    callee: ƒ fn(name,age)
    length: 2
    Symbol(Symbol.iterator): ƒ values()
    __proto__: Object


```
#### arguments转换为数组
```
function toArr(){
    var arr = [];
    for（var i in arguments）{
        arr.push(arguments[i]);
    }
    return arr;
}
```

```
function toArr(){
    var arr = [];
    arr = Array.prototype.slice.call(arguments);
    return arr;
}
```