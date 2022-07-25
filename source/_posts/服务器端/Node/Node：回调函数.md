---
title: Node：回调函数
date: 2019-06-05
tags: [Node]
categories: Node
comments: true
---

### 概述
- Node.js 异步编程的直接体现就是回调
- 异步编程依托于回调来实现，但不能说使用了回调后程序就异步化了
- 回调函数在完成任务后就会被调用，Node 使用了大量的回调函数，Node 所有 API 都支持回调函数
- 回调函数一般作为函数的最后一个参数出现

### 阻塞代码实例
创建一个文件 input.txt ，内容如下：
```
hello world
```
创建 block.js 文件, 代码如下：

```
var fs = require("fs");
var data = fs.readFileSync('input.txt');
console.log(data.toString());
console.log("程序执行结束!");
```
执行js文件

```
$ node block.js
hello world
程序执行结束!
// 顺序执行
```
在文件读取完后才执行完程序

### 非阻塞代码实例
创建 unblock.js 文件, 代码如下：

```
var fs = require("fs");
var data = fs.readFile('input.txt',function(err,data){
	if(err) return console.error(err);
	console.log(data.toString());
});
console.log("程序执行结束!");
```
执行js文件

```
$ node unblock.js
程序执行结束!
hello world
```
一边读取文件，一边执行其他命令，在文件读取完成后，我们将文件内容作为回调函数的参数返回。这样在执行代码时就没有阻塞或等待文件 I/O 操作，大大提高了 Node.js 的性能，可以处理大量的并发请求。