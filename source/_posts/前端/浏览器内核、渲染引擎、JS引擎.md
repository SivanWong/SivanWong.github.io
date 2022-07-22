---
title: 浏览器内核、渲染引擎、JS引擎
date: 2021-02-20
tags: [前端]
categories: 前端
comments: true
---

### 定义
- 浏览器内核分成两部分：渲染引擎和JS引擎。

![image](https://images2018.cnblogs.com/blog/30292/201803/30292-20180307181201743-373920720.png)

- 由于JS引擎越来越独立，浏览器内核 就倾向于 单指 渲染引擎。

![image](https://img2018.cnblogs.com/blog/955092/201910/955092-20191022134020182-2106106379.png)

- 渲染引擎是一种对HTML文档进行解析并将其显示在页面上的工具。（说白了，就是按照HTML代码在界面上绘制各种控件图形）

### 常见引擎
#### 渲染引擎
- firefox使用gecko引擎
- IE使用Trident引擎
- 2015年微软推出自己新的浏览器，原名叫斯巴达，后改名edge,使用edge引擎
- opera最早使用Presto引擎，后来弃用
- chrome\safari\opera使用webkit引擎
- 13年chrome和opera开始使用Blink引擎

#### JS 引擎
- 老版本IE使用Jscript引擎
- IE9之后使用Chakra引擎
- edge浏览器仍然使用Chakra引擎
- firefox使用monkey系列引擎
- safari使用的SquirrelFish系列引擎
- Opera使用Carakan引擎
- chrome使用V8引擎。nodeJs其实就是封装了V8引擎

### 参考链接
[浏览器内核、渲染引擎、JS引擎简介](https://www.cnblogs.com/jameszou/p/8524501.html)