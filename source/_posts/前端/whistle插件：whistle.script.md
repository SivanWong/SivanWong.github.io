---
title: whistle插件：whistle.script
date: 2021-02-20
tags: [前端]
categories: 前端
comments: true
---

### whistle.script
whistle.script为whistle的一个扩展脚本插件，可以直接在界面上引用全局安装的Node模块及Node的内容模块编写脚本操作请求及其响应，所有正常Node程序可以实现的功能，都可以通过该插件实现，包括：

1. HTTP[s]:
    - 动态设置whistle规则
    - 拦截请求响应
    - 控制请求响应速度
    - 修改请求url、请求方法、请求头、请求内容
    - 修改响应状态码、响应头、响应内容
    - 在插件界面的Console上显示脚本程序 console.xxx 的内容，如果可以打印响应的内容或调试信息等
2. WebSocket:
    - 动态设置whistle规则
    - 拦截请求响应
    - 修改发送或收到的数据
    - 直接向WebSocket客户端或服务端发送数据
    - 在插件界面的Console上显示脚本程序 console.xxx 的内容，如果可以打印发送和接收到的数据或调试信息等，从而通过该插件可以直接查看WebSocket的数据
3. Tunnel: 基本功能同WebSocket，可以用来直接操作Socket请求，如Protobuf协议的请求等

### 安装

```
npm install -g whistle.script
# Mac、Linux用户可能需要加sudo
sudo npm install -g whistle.script
```
安装插件后要重启whistle才可以打开插件，否则unknown

### 使用
打开script插件的界面，创建一个名字为 test 的脚本:
- 可以通过 Plugins->Home->script打开或右键并选择 在新标签页中打开
- 或者直接访问 http://local.whistlejs.com/plugin.script

#### 设置规则
1. 设置HTTP或HTTPs请求的whistle规则(操作HTTPs需要开启HTTPs拦截)

在界面中的test 脚本输入

```
 exports.handleRequestRules = (ctx) => {
 	// ctx.fullUrl 可以获取请求url
 	// ctx.headers 可以获取请求头
 	// ctx.options 里面包含一些特殊的请求头字段，分别可以获取一些额外信息，如请求方法、设置的规则等
 	ctx.rules = ['www.qq.com file://{test.html}'];
  	ctx.values = { 'test.html': 'Hello world.' };
 };
```
如果里面包含一些异步方法可以采用generator函数或async函数，即：exports.handleRequestRules = function* (ctx) {} 或 exports.handleRequestRules = async () => {}

在whistle的Rules配置界面上输入规则:

```
whistle.script://test www.ifeng.com www.qq.com www.baidu.com echo.websocket.org
```

如果需要通过配置给脚本传递一些额外参数，可以如下配置(注意中间不能有空格):

```
whistle.script://test(a,b,c) www.ifeng.com www.qq.com www.baidu.com echo.websocket.org
```

可以在脚本中通过 process.args 获取:

```
exports.handleRequestRules = (ctx) => {
   console.log(process.args); // output: ["a", "b", "c"]
   ctx.rules = ['www.qq.com file://{test.html}'];
   ctx.values = { 'test.html': 'Hello world.' };
 };
```

2. 设置WebSocket请求的规则(需要开启HTTPs拦截):

```
exports.handleWebSocketRules = (ctx) => {
   // ctx.fullUrl 可以获取请求url
   // ctx.headers 可以获取请求头
   // ctx.options 里面包含一些特殊的请求头字段，分别可以获取一些额外信息，如请求方法、设置的规则等
   this.rules = '127.0.0.1 echo.websocket.org';
 };
```

接下来的操作同上。

3. 设置Tunnel请求的规则(要测试可以暂时关闭HTTPs拦截):

```
exports.handleTunnel = (ctx) => {
   // ctx.fullUrl 可以获取请求url
   // ctx.headers 可以获取请求头
   // ctx.options 里面包含一些特殊的请求头字段，分别可以获取一些额外信息，如请求方法、设置的规则等
   this.rules = '127.0.0.1 www.baidu.com';
 };
```

接下来的操作同上。

#### 操作请求
1. 操作HTTP或HTTPs请求(操作HTTPs需要开启HTTPs拦截)

```
exports.handleRequest = function* (ctx, next) {
   // ctx.fullUrl 可以获取请求url
   // ctx.headers 可以获取请求头
   // ctx.options 里面包含一些特殊的请求头字段，分别可以获取一些额外信息，如请设置的规则等
   // ctx.method 获取和设置请求方法
   // const reqBody = yield ctx.getReqBody(); 获取请求body的Buffer数据，如果没有数据返回null
   // const reqText = yield ctx.getReqText();  获取请求body的文本，如果没有返回''
   // const formData = yield ctx.getReqForm(); 获取表单对象，如果不是表单，返回空对象{}
   // console.log(ctx.method, ctx.headers, reqBody);
   // ctx.req.body = String| Buffer | Stream | null，修改请求的内容
   // 只有执行next方法后才可以把正常的请求发送出去
   // 如果需要自定义请求，可以通过全局的request方法操作
   // console.log(request);
   // next方法可以设置next({ host, port });
   const { statusCode, headers } = yield next(); 
   console.log(ctx.fullUrl, statusCode, headers);
   // const resBody = yield ctx.getResBody();
   // const resText = yield ctx.getResText();
   // ctx.status = 404; 修改响应状态码
   // ctx.set(headers); 批量修改响应头
   // ctx.set('x-test', 'abc'); 修改响应头
   // ctx.body = String| Buffer | Stream | null; 修改响应内容
 };
 
 // 如果Node >= 7.6，可以采用async await的方式
 exports.handleRequest = async (ctx, next) => {
   // do sth
   // next方法可以设置next({ host, port });
   const { statusCode, headers } = await next(); 
   // do sth
 };
```

在whistle的Rules配置界面上输入规则:

```
# 这里不能用whistle.script，否则请求不会转发到handleRequest
# whistle.script只会执行handleXxxRules
# 你也可以通过在handleXxxRules里面设置 script://test(a,b,c)，实现转发

script://test www.ifeng.com www.qq.com www.baidu.com echo.websocket.org
```

需要在配置中带上参数，可以参考上面的规则设置

2. 操作WebSocket请求(需要开启HTTPs拦截)

```
// Node < 7.6可以改用genrator和yield
 exports.handleWebSocket = async (req, connect) => {
  // connect方法可以设置connect({ host, port });
  const res = await connect();
  res.on('message', (data) => {
    console.log('Received: ', data);
    req.send(data);
  });
  req.on('message', (data) => {
    console.log('Sent: ', data);
    res.send(data);
  });
 };
```

whistle规则配置同上

3. 操作Tunnel请求

```
// Node >= 7.6可以改用async和await
 exports.handleTunnel = function* (req, connect) {
  // connect方法可以设置connect({ host, port });
  const res = yield connect();
  req.pipe(res).pipe(req);
  // 也可以参考上面操作WebSocket，自己监听data和write方法处理，这样就可以直接修改和打印内容
 };
```

whistle规则配置同上

### 参考链接
[whistle.script](https://github.com/whistle-plugins/whistle.script)