---
title: Node：EventEmitter类（事件监听）
date: 2020-07-24
tags: [Node]
categories: Node
comments: true
---

### 引入
Node.js 有多个内置的事件，我们可以通过引入 events 模块，并通过实例化 EventEmitter 类来绑定和监听事件

```
// 引入 events 模块
var events = require('events');
// 创建 eventEmitter 对象
var eventEmitter = new events.EventEmitter();
```
### .on

```
// 绑定事件及事件的处理程序
eventEmitter.on('eventName', eventHandler);
```

### .emit

```
// 触发事件
eventEmitter.emit('eventName');
```

### .once
为指定事件注册一个单次监听器，即 监听器最多只会触发一次，触发后立刻解除该监听器，也就是说不管某个事件在将来被触发多少次，都只调用一次回调函数。

```
eventEmitter.once('eventName', eventHandler);
//尽管事件会触发多次，但事件处理函数只会执行一次
```
