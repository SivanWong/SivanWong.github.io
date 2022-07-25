---
title: Koa：接收请求
date: 2020-07-21
tags: [Koa]
categories: Koa
comments: true
---

### 路由
为了处理URL，我们需要引入koa-router这个middleware，让它负责处理URL映射

先在package.json中添加依赖项然后安装

```
"koa-router": "7.0.0"
```
修改app.js的代码

```
const Koa = require('koa');

// 注意require('koa-router')返回的是函数
// 最后的()是函数调用
const router = require('koa-router')();

const app = new Koa();

// log request URL:
app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    await next();
});

// add url-route:
router.get('/hello/:name', async (ctx, next) => {
    var name = ctx.params.name;
    ctx.response.body = `<h1>Hello, ${name}!</h1>`;
});

router.get('/', async (ctx, next) => {
    ctx.response.body = '<h1>Index</h1>';
});

// add router middleware:
app.use(router.routes());

app.listen(3000);
console.log('app started at port 3000...');
```
### 处理get请求
使用router.get('/path', async fn)来注册一个GET请求。

可以在请求路径中使用带变量的/hello/:name，变量可以通过ctx.params.name访问

![image](https://www.liaoxuefeng.com/files/attachments/1099853782317472/l)

![image](https://www.liaoxuefeng.com/files/attachments/1099853801191008/l)

### 处理post请求
处理post请求，可以用router.post('/path', async fn)

#### koa-bodyparser
post请求通常会发送一个表单，或者JSON，它作为request的body发送，但无论是Node.js提供的原始request对象，还是koa提供的request对象，都不提供解析request的body的功能！

所以，我们又需要引入另一个middleware，koa-bodyparser来解析原始request请求，然后，把解析后的参数，绑定到ctx.request.body中。

在package.json中添加依赖项然后安装

```
"koa-bodyparser": "3.2.0"
```

修改app.js，引入koa-bodyparser：

```
const bodyParser = require('koa-bodyparser');
```

在合适的位置加上（必须在router之前）

```
app.use(bodyParser());
```

#### 使用

```
router.post('/signin', async (ctx, next) => {
    var name = ctx.request.body.name || '',
        password = ctx.request.body.password || '';
    console.log(`signin with name: ${name}, password: ${password}`);
    if (name === 'koa' && password === '12345') {
        ctx.response.body = `<h1>Welcome, ${name}!</h1>`;
    } else {
        ctx.response.body = `<h1>Login failed!</h1>
        <p><a href="/">Try again</a></p>`;
    }
});
```
注意，用var name = ctx.request.body.name || ''拿到表单的name字段，如果该字段不存在，默认值设置为''

### 跨域
当发送请求时，会出现一个跨域问题，这时候就需要koa2-cors来处理

在package.json中添加依赖项然后安装

```
"koa2-cors": "^2.0.6"
```

修改app.js

```
var cors = require('koa-cors');

// 必须放到router前面
app.use(cors()); 
```

### 重构

```
url2-koa/
|
+- .vscode/
|  |
|  +- launch.json <-- VSCode 配置文件
|
+- controllers/
|  |
|  +- login.js <-- 处理login相关URL
|  |
|  +- users.js <-- 处理用户管理相关URL
|
+- app.js <-- 使用koa的js
|
+- package.json <-- 项目描述文件
|
+- node_modules/ <-- npm安装的所有依赖包
```

### 前端使用

- 按照惯用的发送请求的方法
- url为http://127.0.0.1:3000[请求路径]


