---
title: js：类数组
Date: 2019-03-27
tags: [js]
categories: js
comments: true
---

类数组对象：只包含使用从零开始，且自然递增的整数做键名，并且定义了length表示元素个数的对象。

```
var arr = [1,2,3];
var obj = {0: 1, 1: 2, 2: 3, length: 3};
console.log(arr[0], obj[0])//1, 1
console.log(arr['length'], obj['length'])//3，3
```
我们可以使用对象来模拟数组，只要我们定义的对象的每个元素的键名都使用数字并且让其保持递增，且动态的定义一个length属性来表示元素个数，那么从效果上来说，基本就和数组相同了。