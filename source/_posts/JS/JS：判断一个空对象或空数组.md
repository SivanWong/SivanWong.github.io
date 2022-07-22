---
title: JS：判断一个空对象或空数组
date: 2019-07-29
tags: [JS]
categories: JS
comments: true
---

### 判断一个空对象
```
function isEmptyObject(obj){
    if(JSON.stringify(obj) == "{}"){
        console.log("是空对象");
    }else{
        console.log("不是空对象");
    }
}
```
### 判断一个空数组

```
function isEmptyArray(arr){
    if(JSON.stringify(srr) == "[]"){
        console.log("是空数组");
    }else{
        console.log("不是空数组");
    }
}
```

```
function isEmptyArray(arr){
    if(arr == false){
        console.log("是空数组");
    }else{
        console.log("不是空数组");
    }
}
```
```
function isEmptyArray(arr){
    if(arr.length == 0){
        console.log("是空数组");
    }else{
        console.log("不是空数组");
    }
}
```
### 拓展：判断数组

```
1. Array.isArray(arr)
2. arr instanceof Array
3. object.prototype.toString.call(arr) === '[object Array]'
4. arr.constructor === Array
```
