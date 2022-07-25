---
title: Node：首次接触
date: 2019-06-05
tags: [Node]
categories: Node
comments: true
---

### 下载
先下载node，查看node的版本

```
node -v
```

### 初体验
hello.js
```
console.log("hello world!");
```
使用node在根目录下运行
```
$ node hello.js
hello world!
```
交互模式（详情见REPL）   
可以输入一条代码语句后立即执行并显示结果
```
$ node
> console.log("ok");
ok
```

### 创建应用
1. 引入 required 模块：我们可以使用 require 指令来载入 Node.js 模块。
2. 创建服务器：服务器可以监听客户端的请求，类似于 Apache 、Nginx 等 HTTP 服务器。
3. 接收请求与响应请求：服务器很容易创建，客户端可以使用浏览器或终端发送 HTTP 请求，服务器接收请求后返回响应数据。

#### 引入 required 模块

```
var http = require("http");
```

#### 创建服务器
使用 http.createServer() 方法创建服务器，并使用 listen 方法绑定 8888 端口。 函数通过 request, response 参数来接收和响应数据

```
var http = require("http");

http.createServer(function(request,response){
	// 发送HTTP头部
	// HTTP状态值：200：OK
	// 内容类型：text/plain
	response.wirteHead(200,{'Content-Type': 'text/plain'});

	//发送响应数据 “hello world”
	response.end('hello world\n');

}).listen(8888);

//终端打印以下信息
console.log('Server running at http://127.0.0.1:8888/');
```
#### 执行

```
$ node server.js
Server running at http://127.0.0.1:8888/
```
接下来，打开浏览器访问 http://127.0.0.1:8888/即可

#### 分析
- 第一行请求（require）Node.js 自带的 http 模块，并且把它赋值给 http 变量。
- 接下来我们调用 http 模块提供的函数： createServer 。这个函数会返回 一个对象，这个对象有一个叫做 listen 的方法，这个方法有一个数值参数， 指定这个 HTTP 服务器监听的端口号。
