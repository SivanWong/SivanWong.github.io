---
title: js：arguments转为数组
Date: 2019-04-23
tags: [js]
categories: js
comments: true
---

arguments，一个类似于数组的对象，一个参数集
```
function toArr(){
    var arr = [];
    for（var i in arguments）{
        arr.push(arguments[i]);
    }
    return arr;
}
```