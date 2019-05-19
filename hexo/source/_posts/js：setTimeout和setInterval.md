---
title: js：setTimeout和setInterval
Date: 2019-04-23
tags: [js]
categories: js
comments: true
---

都是延迟一段时间调用回调函数。
### setTimeout
- setTimeout只调用一次。
- setTimeout最短间隔时间为4毫秒。
### setInterval
- setInterval会一直循环调用函数，不会自己停止。要用clearInterval(计数器编号)来停止。
- setInterval最短间隔时间为10毫秒，小于会被调整为10ms。

拓展

使用setInterval有可能定时器代码可能在代码再次被添加到队列之前还没有完成执行，这样有可能导致代码连续运行。   
js引擎解决：队列无定时器代码才添加。这样有可能导致某些间隔被跳过。