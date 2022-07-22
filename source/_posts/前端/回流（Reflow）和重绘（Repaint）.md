---
title: 回流（Reflow）和重绘（Repaint）
Date: 2020-05-14
tags: [前端]
categories: 前端
comments: true
---

### 浏览器渲染
解析HTML，生成DOM树，解析CSS，生成CSSOM树。将DOM树和CSSOM树结合，生成渲染树（Render Tree）。

### 回流
当render tree中的一部分(或全部)因为元素的规模尺寸，布局，隐藏等改变而需要重新构建。这就称为回流。

每个页面至少需要一次回流，就是在页面第一次加载的时候，这时候是一定会发生回流的，因为要构建render tree。

### 重绘
当render tree中的一些元素需要更新属性，而这些属性只是影响元素的外观，风格，而不会影响布局的，比如background-color。则就叫称为重绘。



> 回流必定触发重绘，而重绘不一定触发回流。