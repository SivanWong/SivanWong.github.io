---
title: js：事件循环机制
Date: 2019-03-27
tags: [js]
categories: js
comments: true
---

### 前言
JavaScript的事件分两种，宏任务(macro-task)和微任务(micro-task)
- 宏任务：包括整体代码script，setTimeout，setInterval
- 微任务：Promise.then(new Promise是定义后立即执行的)，process.nextTick(node中)

### 事件循环
先执行宏任务，其中同步任务立即执行，异步任务，加载到对应的的Event Queue中，所有同步宏任务执行完毕后，如果发现微任务的Event Queue中有未执行的任务，会先执行其中的任务，这样算是完成了一次事件循环。接下来查看宏任务的Event Queue中是否有未执行的任务，有的话，就开始第二轮事件循环，依此类推。