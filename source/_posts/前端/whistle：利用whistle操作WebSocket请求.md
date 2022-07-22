---
title: whistle：利用whistle操作WebSocket请求
date: 2022-04-26
tags: [前端]
categories: 前端
comments: true
---

# 一、安装

```
npm install -g whistle.script
# Mac、Linux用户可能需要加sudo
sudo npm install -g whistle.script
```

安装插件后要重启whistle

# 二、使用

打开script插件的界面，创建一个名字为 test 的脚本:
- 可以通过 Plugins->Home->script打开或右键并选择 在新标签页中打开
- 或者直接访问 http://local.whistlejs.com/plugin.script

# 三、操作请求
## 1、操作HTTP或HTTPs请求(操作HTTPs需要开启HTTPs拦截)

脚本中输入：

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

在whistle的Rules配置界面上输入规则（需要放在最前面）:

```
script://test games.*.shopee.**
# 如果需要通过配置给脚本传递一些额外参数，可以如下配置
script://test(a,b,c) games.*.shopee.**
```

可以在脚本中通过 process.args 获取:

```
exports.handleRequest = (ctx, next) => {
	console.log(process.args); // output: ["a", "b", "c"]
};
```

## 2、操作WebSocket请求(需要开启HTTPs拦截)

脚本中输入：

```
// Node < 7.6可以改用genrator和yield
exports.handleWebSocket = async (req, connect) => {
	// connect方法可以设置connect({ host, port });
  	const res = await connect();
  	res.on('message', (data) => {
    	// 在script的Console打印出服务端发送的数据
    	console.log('Received: ', data);
    	// 可以修改后再发送到Server
    	req.send(data);
  	});
  	req.on('message', (data) => {
    	// 在script的Console打印出客户端发送的数据
    	console.log('Sent: ', data);
    	// 可以修改后再发送到Server
    	res.send(data);
	});
};
```

whistle规则配置同上

更多关于whistle.script的使用详见官网：https://github.com/whistle-plugins/whistle.script


