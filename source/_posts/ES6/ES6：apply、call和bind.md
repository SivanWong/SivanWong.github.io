---
title: ES6：apply、call和bind
Date: 2020-03-17
tags: [ES6]
categories: ES6
comments: true
---

- 都是为了改变某个函数运行时的上下文，即改变函数里的this的指向。将一个函数应用在其他对象上。
- 第一个参数要绑定给this的值，为nul或undefined时指向window。
- apply、call绑定后会立即调用，bind绑定后不会立即调用。
- apply第二个参数为数组，call后面为参数列表。