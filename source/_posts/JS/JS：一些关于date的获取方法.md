---
title: JS：一些关于date的获取方法
date: 2019-10-11
tags: [JS]
categories: JS
comments: true
---

### 获知一个月的第一天是星期几

```
// 当月
// 先获取第一天的时间戳
var first = new Date().setDate(1); 
// 再通过getDay()获取
var week = new Date(first).getDay();

// 下个月
// 先获取年份
var year = new Date().getFullYear();
// 获取下个月的月份
var month = new Date().getMonth() + 2;
var week = new Date(year, month-1, 1).getDay();
```

### 获知一个月有多少天

```
// 当月,下个月同理
// 先获取年份
var year = new Date().getFullYear();
// 获取月份
var month = new Date().getMonth() + 1;
var total = new Date(year, month, 0).getDate();
```
