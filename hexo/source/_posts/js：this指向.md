---
title: js：this指向
Date: 2019-04-23
tags: [js]
categories: js
comments: true
---

### 普通函数
this指向调用该函数的对象。

### 箭头函数
this对象是定义时所在的对象。

指向调用箭头函数外层function的对象。如果箭头函数没有外层函数，则指向window。