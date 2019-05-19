---
title: vue：组件间的传值
Date: 2019-03-26
tags: [vue]
categories: vue
comments: true
---

### 父组件向子组件传值
```
子组件通过 props['']来接收值。父组件把要传递的值绑定在调用的子组件上。
```
### 子组件向父组件传值
```
$emit方法传递参数。或者vuex。
```
### 兄弟之间传值
vuex