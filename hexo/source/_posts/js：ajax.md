---
title: js：ajax
Date: 2019-04-23
tags: [js]
categories: js
comments: true
---

### 核心
XMLHttpRequest，一个js对象，一个构造函数。
#### 方法
- open()：准备启动一个AJAX请求；
- setRequestHeader()：设置请求头部信息；
- send()：发送AJAX请求；
- getResponseHeader(): 获得响应头部信息；
- getAllResponseHeader()：获得一个包含所有头部信息的长字符串；
- abort()：取消异步请求；
- 另外，浏览器还为该对象提供了一个onreadystatechange监听事件，大明湖readyState属性改变时，就会触发该事件发送。
> 为了确保浏览器的兼容性，最好在调用open方法之前指定事件处理程序。
#### 属性
- responseText：包含响应主体返回文本；
- responseXML：如果响应的内容类型时 text/xml或 application/xml，该属性将保存包含着相应数据的XML DOM文档；
- status：响应的HTTP状态；
- statusText：HTTP状态的说明；
- readyState：表示“请求”/“响应”过程的当前活动阶段

### 拓展
1. 什么是ajax？ajax作用是什么？ 
```
ajax是用来与后台交互的一种技术。用来实现客户端服务器的异步通信效果，实现页面的局部刷新。
```
2. 原生js ajax发送http请求需要几个步骤？分别是什么？
```
//1：创建XMLHttpRequest对象
var xhr = new XMLHttpRequest();
//2：设置请求参数（请求方式，url，是否异步请求）
xhr.open("GET",url,false);
//3：设置请求头部(也可以不设置)
xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
//支持跨域发送cookie
xhr.withCredentials = true;
//4：发送请求
xhr.send(null);
//5：设置事件处理程序
xhr.onreadystatechange = function(){
    if(xhr.readystate == 4){
        if(xhr.status == 200){
            console.log(xhr.responseText);
        }else{
            console.log("出错了");
        }
    }
}
```
3. readyState的取值？

```
0：(未初始化)还没有调用open()方法。
1：(正在载入)已调用open()方法，但send()方法还没调用。
2：(载入完成)send()方法已经调用，请求已发送。
3：(交互)服务器端发送响应，客户端正在解析响应内容。
4：(完成)响应内容解析完成，可以在客户端调用了。
```
4. http的请求方法

```
get：获取服务器中的资源。
post：传输实体文本
put：传输文件。要指出资源在服务器中的位置。
head：获取页面的首部。
delete：删除服务器中的某个资源。
options：获取当前url所支持的方法。
trace：追踪路径。
connect：要求用隧道协议连接代理。
```
5. get和post的区别

```
1. 发送方式：get请求数据放在url上，即http的协议头；post把数据放在http的包体中。
2. 大小限制：get传的参数有长度限制；post理论上没有限制。
3. 安全性：get请求可被缓存，请求保存在浏览器的历史记录中；post不能被缓存。且get传送的数据是url的一部分。
```

6. 什么情况造成跨域？如何解决？
```
受同源策略限制。协议、子域名、主域名、端口号、ip地址、网址，任一不同都为不同源。
1. jsonp 只能解决get跨域
2. CORS：跨域资源共享，通过设置Access-Control-Allow-Origin来允许跨域（主要后台配置）
3. 设置document.domain
4. 代理请求解决接口跨域。
jsonp通过script标签进行跨域请求
①前端设置好回调函数，将回调函数名作为url携带的参数。
②后端接到请求后，生成一个函数，函数名为前端传来的回调函数名，数据作为参数传入函数，返回js文档。
③客户端解析并执行返回的js文档，将返回的数据传入回调函数执行。
```
7. http状态码（status）

状态码 | 含义
---|---
1xx | 请求正在被处理
2xx | 请求成功被处理
3xx | 请求需求附加操作，如重定向
4xx | 客户端出错导致请求无法被处理
5xx | 服务端处理出错

常用状态码
- 200  请求成功处理，一切正常
- 301  永久重定向（新网址替换旧网址，旧网址清零）
- 302  临时重定向（也是替换，但是旧网址还能参与排名）
- 304  资源未修改
- 403  禁止访问
- 404  页面未找到
- 405  不允许此请求方法
- 500  服务器出错

8. 回调函数  
```
1.一个函数作为参数传递给另一个函数，在功能下载完成后执行，作为参数的函数即为回调函数。
2.可用于解决异步。
3.典型例子即为ajax请求。
```

9. 回调地狱
```
当许多功能需要连续调用,环环相扣依赖时。就会产生函数作为参数层层嵌套的一个效果，这就形成回调地狱。使得代码变得难以理解与维护。
解决：
1.保持代码简短，避免使用匿名函数。
2.模块化。将不同功能的代码封装成不同的模块。
3.处理每一个错误。为了让代码稳定，永远无法知道这些错误何时发生，所以必须对它们进行计划。
```
