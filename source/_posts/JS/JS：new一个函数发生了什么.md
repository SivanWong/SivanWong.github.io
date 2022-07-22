---
title: JS：new一个函数发生了什么
date: 2019-04-25
tags: [JS]
categories: JS
comments: true
---

1. 创建一个新对象；
2. 将构造函数的作用域赋给新对象（因此this就指向了这个新对象）。
3. 执行构造函数中的代码（为这个新对象添加属性）；
4. 返回新对象。


```
var obj = new O();
var obj = (function(){
    var obj = {};
    //使新对象的__proto__属性指向构造函数的prototype
    obj.__proto__= O.prototype;
    //其他赋值语句
    return obj;
})();
```
