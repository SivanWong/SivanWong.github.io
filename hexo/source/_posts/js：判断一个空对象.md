---
title: js：判断一个空对象
Date: 2019-03-26
tags: [js]
categories: js
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

### 拓展：判断数组

```
1. Array.isArray(arr)
2. arr instanceof Array
3. object.prototype.toString.call(arr) === '[object Array]'
4. arr.constructor === Array
```
