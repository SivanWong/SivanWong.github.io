---
title: ES6：箭头函数
Date: 2019-04-23
tags: [ES6]
categories: ES6
comments: true
---

- 箭头函数体内的this对象是定义时所在的对象，而不是使用时所在的对象。
- this指向调用箭头函数外层函数的对象，没有外层函数则指向window。
- 箭头函数相当于匿名函数。
- 箭头函数不可以当作构造函数，即不可以用new命令。
- 箭头函数不可以使用arguments对象，该对象在函数体内不存在。要用，就用rest参数代替。
- 箭头函数的this指向其上下文的this，通过call、apply也无法修改其指向。