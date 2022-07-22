---
title: ES6：promise
Date: 2020-03-17
tags: [ES6]
categories: ES6
comments: true
---

### 一句话概述什么是promise
Promise对象用于异步操作，它表示一个尚未完成且预计在未来完成的异步操作。
### 为什么用promise
用于异步操作，除了promise还可以用异步回调解决异步操作。

那为什么有异步回调还要promise，promise可以多重链式调用，可以避免层层嵌套回调。可以利用then进行「链式回调」，将异步操作以同步操作的流程表示出来。
### 注意
- Promise在生命周期内有三种状态，分别是pending、fulfilled 和 rejected。
- 状态改变只能是pending->fulfilled(成功)，或者pending->rejected(失败)。而且状态一旦改变，就不能再次改变。
- Promise中调用resolve或reject并不会终结 Promise 的参数函数的执行。
- Promise的构造函数中代码是同步执行的，但是then方法是异步执行的，then方法需要等到resolve函数执行时才得到执行。
- reject 和 catch 的区别

在resolve中发生异常的话，在reject中是捕获不到这个异常的。
.then中产生的异常能在.catch中捕获

- 如果在then中抛错，而没有对错误进行处理（即catch），那么会一直保持reject状态，直到catch了错误。且catch之前的函数都不会执行。
- 每次调用then都会返回一个新创建的promise对象，而then内部只是返回的数据。
- 在异步回调中抛错，不会被catch到。
- promise状态变为resolve或reject，就凝固了，不会再改变。
- Promise一旦执行了resolve函数后，就不会再执行reject和其他的resolve函数了。一旦Promise执行了reject函数，将会被catch函数捕获，执行catch中的代码。

### 如何处理异步
1. promise
2. 回调函数
```
function f1(callback){
　　setTimeout(function () {
　　　　// f1的任务代码
　　　　callback();
　　}, 1000);
}
// 执行
f1(f2)
```
3. 发布订阅
4. 事件监听
5. async/await

一个简单的promise对象
```
new Promise(test).then(function (result) {
    console.log('成功：' + result);
}).catch(function (reason) {
    console.log('失败：' + reason);
});
```
