---
title: Vue：组件间的传值
date: 2020-02-20
tags: [Vue]
categories: Vue
comments: true
---

### 父组件向子组件传值
1. 父组件把要传递的值绑定在调用的子组件上
2. 子组件通过props[""]来接收值来使用

### 子组件向父组件传值
1. 子组件通过$emit('函数名','参数')来抛出事件传递参数
2. 父组件通过在调用的子组件上绑定函数名来使用参数（@函数名）
3. vuex

### 兄弟之间传值
1. vuex 
2. 通过路由带参数进行传值
```
this.$router.push({ path: '/conponentsB', query: { orderId: 123 } }) // 跳转到B

this.$route.query.orderId // 在B组件拿到的参数
```
3. 通过设置本地存储，如Session Storage缓存的形式进行传递
```
const orderData = { 'orderId': 123, 'price': 88 }
sessionStorage.setItem('缓存名称', JSON.stringify(orderData))
const dataB = JSON.parse(sessionStorage.getItem('缓存名称')) // 在其他组件拿到session Storage缓存的值
```