---
title: JS：纯函数
date: 2020-08-04
tags: [JS]
categories: JS
comments: true
---

## 纯函数
- 应始终返回相同的值。
- 函数的返回结果只依赖于它的参数。
- 函数执行过程里面没有副作用。

以下例子符合纯函数，不依赖于任何外部输入，不改变任何外部数据、没有副作用。
```
function getSum (a, b) {
    return a + b
}
```
### 应始终返回相同的值
不管调用该函数多少次，无论今天、明天还是将来某个时候调用它。

以下是一个随时间或每次调用而变化的函数，为非纯函数
```
Math.random() // 返回一个随机数
```

### 返回结果只依赖其参数
纯函数不依赖于程序执行期间函数外部任何状态或数据的变化，必须只依赖于其输入参数。

以下例子为非纯函数，返回值与a相关，无法预料
```
var a = 1;
function getSum (b) {
    return a + b
}
```

### 函数执行过程中没有副作用
- 函数执行的过程中对外部产生了可观察的变化，我们就说函数产生了副作用。
- 例如修改外部的变量、调用DOM API修改页面，发送Ajax请求、调用window.reload刷新浏览器甚至是console.log打印数据，都是副作用。

以下例子为非纯函数，修改了外部变量a
```
var a = 1;
function getSum (b) {
    a = 2
    return a + b
}
console.log(a) // 1
getSum(2)
console.log(a) // 2
```