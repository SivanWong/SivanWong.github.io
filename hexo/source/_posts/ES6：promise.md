---
title: ES6：promise
Date: 2019-03-27
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
- reject 和 catch 的区别

在resolve中发生异常的话，在reject中是捕获不到这个异常的。
.then中产生的异常能在.catch中捕获

- 如果在then中抛错，而没有对错误进行处理（即catch），那么会一直保持reject状态，直到catch了错误。且catch之前的函数都不会执行。
- 每次调用then都会返回一个新创建的promise对象，而then内部只是返回的数据。
- 在异步回调中抛错，不会被catch到。
- promise状态变为resove或reject，就凝固了，不会再改变。

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
