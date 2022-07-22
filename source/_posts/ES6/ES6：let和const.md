---
title: ES6：let和const
date: 2019-04-02
tags: [ES6]
categories: ES6
comments: true
---

1. let是定义变量
2. const是定义常量。若定义基本数据类型，则不能再次改变；若定义复杂数据类型，如对象，则可以修改或者添加属性，但指针是不会变的。
3. let和const都不会变量提升，在声明之前使用会形成死区。

> 使用babel工具将es6转换为es5