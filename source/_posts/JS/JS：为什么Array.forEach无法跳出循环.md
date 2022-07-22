---
title: JS：为什么Array.forEach无法跳出循环
date: 2020-11-20
tags: [JS]
categories: JS
comments: true
---

> 参考：[JS-为什么forEach无法跳出循环](https://www.jianshu.com/p/bdf77ee23089)

### 前情提要
之前发现使用forEach循环数组时是无法跳出循环的，break和return都不生效。使用break会报错而使用return，数组中的所有元素依然会被遍历。

![image](https://upload-images.jianshu.io/upload_images/11999503-01e057a2c12094dc.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### foreach的使用

```
arr.forEach(callback(currentValue[, index[, array]]) {
  // execute something
}[, thisArg]);
```
- callback： 在每个元素上执行的功能。它接受一到三个参数：
    - currentValue：数组中正在处理的当前元素。
    - index（可选的）：currentValue数组中的索引。
    - array（可选的）：该数组forEach()被调用。
- thisArg（可选的）：this执行时用作的值callback。

有一段关于跳出循环的提示

![image](https://upload-images.jianshu.io/upload_images/11999503-071bdc16e3838c6c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### 为什么
foreach的源码有点长，可以简单易懂地总结为如下

```
Array.prototype.myEach = function(callback) {
    for (var i = 0; i < this.length; i++)
        callback(this[i], i, this);
};
```
我们传入的function是这里的回调函数。在回调函数里面使用break肯定是非法的，因为break只能用于跳出循环，而我们的回调函数不是循环体。

在forEach中使用return，就只是在回调函数中使用return，将结果返回到上级函数，也就是这个for循环中，并不能影响到上级函数中的for循环，并没有结束for循环，所以return也是无效的。

