---
title: js：简化运算
Date: 2020-05-14
tags: [JS]
categories: JS
comments: true
---


### 三元运算

```
let type;
if(type === 'a') {
    type = 'typeA';
} else if (type === 'b') {
    type = 'typeB'
}
// 简化
let type = type === 'a' ? 'typeA' : 'typeB'
```
### 四元运算

```
let type;
if(type === 'a') {
    type = 'typeA';
} else if (type === 'b') {
    type = 'typeB'
} else if (type === 'c') {
    type = 'typeC'
}
// 简化
let type = type === 'a' ? 'typeA' : (type === 'b' ? 'typeB' : 'typeC')
```
