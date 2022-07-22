---
title: js：数组去重
Date: 2020-05-14
tags: [JS]
categories: JS
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
双层循环，外循环表示从0到arr.length，内循环表示从i+1到arr.length

将重复值中右侧的值去除，并将指针重新指向该位置

```
function unique(arr){
  for(var i=0;i<arr.length-1;i++){
    for(var j=i+1;j<arr.length;j++){
      if(arr[i]==arr[j]){
        arr.splice(j,1);
        j--;
      }
    }
  }
  return arr;
}
```


ES6

```
function unique(arr){
    var temp = [...new Set(arr)];
    return temp;
}
```
