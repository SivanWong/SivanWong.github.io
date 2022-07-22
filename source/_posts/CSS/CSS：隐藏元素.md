---
title: CSS：隐藏元素
date: 2020-02-20
tags: [CSS]
categories: CSS
comments: true
---

1. display:none
2. visibility: hidden
3. opacity: 0

### 空间占据
- display隐藏后不占据空间，会产生回流和重绘
- 其余两个虽隐藏，但仍占据空间，只会引起重绘

### 子元素继承
- display不会被继承，父元素都不存在了，子元素自然也不会显示
- visibility会被子元素继承，可以通过设置子元素visibility为visible使其显示
- opacity也会被子元素继承，但不能通过设置子元素opacity为1使其显示

### 事件绑定
- display隐藏后已经不存在了，肯定也无法触发事件
- 其余两个虽隐藏，但仍存在，可以触发事件

### 过渡动画
transition对display和visibility无效，对opacity有效