---
title: h5和css3的新特性
Date: 2019-03-26
tags: [前端]
categories: 前端
comments: true
---

## HTML5
### 绘画标签canvas
### 用于媒介回放的video、audio
### 本地离线存储localStorage
长期存储数据，浏览器关闭后数据不丢失 
### sessionStorage
数据在浏览器关闭后自动删除； 
### 语义化更好的内容元素
比如article、footer、header、nav、section； 
### 表单控件
calendar、data、time、email、url、search； 
### webworker、websocket、Geolocation； 移除的元素： 
- 纯表现的元素：basefont、big、center、font、s、strike、tt
- 对可用性产生负面影响的元素：frame、frameset、noframes

## CSS3
### RGBA和透明度
### word-wrap（对长的不可分割单词换行）
```
word-wrap: normal|break-word;
```
### 文字阴影
```
text-shadow：5px 5px 5px #FF0000;
//水平阴影，垂直阴影，模糊距离，阴影颜色
```
### @font-face规则
定义自己的字体
### 圆角（边框半径）
border-radius 属性用于创建圆角
### 边框图片
border-image
### box-sizing
### 盒阴影
```
box-shadow:10px 10px 5px #88888
```
### 媒体查询
定义两套css，当浏览器的尺寸变化时会采用不同的属性