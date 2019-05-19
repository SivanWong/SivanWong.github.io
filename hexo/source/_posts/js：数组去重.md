---
title: js：数组去重
Date: 2019-03-27
tags: [js]
categories: js
comments: true
---

ES5

```
function unique(arr){
    var temp = [];
    for(var i = 0;i<arr.length;i++){
        if(temp.indexOf(arr[i]==-1){
            temp.push(arr[i);
        }
    }
    return temp;
}
```

ES6

```
function unique(arr){
    var temp = [...new Set(arr)];
    return temp;
}
```
