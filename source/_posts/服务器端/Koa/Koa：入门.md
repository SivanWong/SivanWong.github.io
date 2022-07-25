---
title: Koa：入门
date: 2020-07-24
tags: [Koa]
categories: Koa
comments: true
---

### 创建koa工程
首先，我们创建一个目录hello-koa并作为工程目录。然后，在工程目录下创建app.js并输入以下代码

```
// 导入koa，和koa 1.x不同，在koa2中，我们导入的是一个class，因此用大写的Koa表示:
const Koa = require('koa');

// 创建一个Koa对象表示web app本身:
const app = new Koa();

// 对于任何请求，app将调用该异步函数处理请求
app.use(async (ctx, next) => {
    await next();
    ctx.response.type = 'text/html';
    ctx.response.body = '<h1>Hello, koa2!</h1>';
});

// 在端口3000监听:
app.listen(3000);
console.log('app started at port 3000...');
```
- 对于每一个http请求，koa将调用我们传入的异步函数来处理
- 其中，参数ctx是由koa传入的封装了request和response的变量，我们可以通过它访问request和response
- next是koa传入的将要处理的下一个异步函数。

上面的异步函数中，我们首先用await next();处理下一个异步函数，然后，设置response的Content-Type和内容。

由async标记的函数称为异步函数，在异步函数中，可以用await调用另一个异步函数，这两个关键字将在ES7中引入。

### 安装koa
在工程目录下创建一个package.json，这个文件描述了我们的hello-koa工程会用到哪些包。

```
// 命令
"scripts": {
    "start": "node app.js"
},
// 工程依赖的包以及版本号
"dependencies": {
    "koa": "2.0.0"
}
```
然后执行命令即可将依赖包安装

```
$ npm install
```

### 运行
执行app.js文件

```
// 直接使用node运行文件
$ node app.js
// 或者运行命令
$ npm start
```
打开浏览器，输入http://localhost:3000，即可看到效果