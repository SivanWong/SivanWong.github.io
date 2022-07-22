---
title: 算法：把十六进制的ip地址转换为十进制的
Date: 2020-03-17
tags: [算法]
categories: 算法
comments: true
---

```
function change(ip){
  var temp = [];
	for(var i=0;i<ip.length;i+=2){
      temp.push(ip.substr(i,2))
    }
  return temp.map(function(value){
    return parseInt(value,16);
  }).join(".");
}
console.log(change("C0A80000")); //"192.168.0.0"
```
拓展

```
在ip地址中，8位二进制取一个.
且二进制的4位对应十六进制的1位
因此
8位二进制对应一个十进制整数
2位十六进制对应一个十进制整数
```
