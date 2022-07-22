---
title: 虚拟dom
Date: 2019-04-23
tags: [前端]
categories: 前端
comments: true
---

### 是什么
可以看作是一个使用javascript模拟了DOM结构的树形结构，这个树结构包含整个DOM结构的信息。
### 为什么
之前使用原生js或者jquery写页面的时候会发现操作DOM是一件非常麻烦的一件事情，且在浏览器里一遍又一遍的渲染DOM是非常非常消耗性能的。在js做dom对比，减少对dom的操作，而不是每一次都要渲染，这样效率会提高。
