---
title: vue：生命周期
Date: 2020-03-17
tags: [vue]
categories: vue
comments: true
---

![image](https://user-gold-cdn.xitu.io/2018/4/14/162c087d49e9be5d?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

## 8个阶段

### 创建前(beforeCreate)
在数据观测和初始化事件还未开始时。
### 创建后(created)
完成数据观测，属性和方法的运算，初始化事件，el属性还没有显示出来。
### 载入前(beforeMount)
在挂载开始之前被调用，相关的render函数首次被调用。vue实例的el和data都初始化了，生成了html，但还没有挂载html到页面上。
### 载入后(mounted)
vue实例挂载完成，html页面成功渲染。
### 更新前(beforeUpdate)
在数据更新之前调用。
### 更新后(updated)
调用时，组件DOM已经更新，可以执行依赖于DOM的操作。
### 销毁前(beforeDestroy)
在实例销毁之前调用。实例仍然完全可用。
### 销毁后(destroy)
在实例销毁之后调用。调用后，所有的事件监听器会被移除，所有的子实例也会被销毁。


## 相关问题

### 什么是vue生命周期？
答： Vue 实例从创建到销毁的过程，就是生命周期。也就是从开始创建、初始化数据、编译模板、挂载Dom→渲染、更新→渲染、卸载等一系列过程，我们称这是 Vue 的生命周期。

### vue生命周期的作用是什么？
答：它的生命周期中有多个事件钩子，让我们在控制整个Vue实例的过程时更容易形成好的逻辑。

### vue生命周期总共有几个阶段？
答：它可以总共分为8个阶段：创建前/后, 载入前/后,更新前/后,销毁前/销毁后

### 第一次页面加载会触发哪几个钩子？
答：第一次页面加载时会触发 beforeCreate, created, beforeMount, mounted 这几个钩子

### DOM 渲染、挂载在哪个周期中就已经完成？
答：DOM 渲染、挂载在 mounted 中就已经完成了。

### vue能不能挂载到body或html标签上？
提供的元素只能作为挂载点。不同于 Vue 1.x，所有的挂载元素会被 Vue 生成的 DOM 替换。因此不推荐挂载vue实例到html或者body标签上。

### 简单描述每个周期具体适合哪些场景？
答：生命周期钩子的一些使用方法： beforecreate : 可以在这加个loading事件，在加载实例时触发 created : 初始化完成时的事件写在这里，如在这结束loading事件，异步请求也适宜在这里调用 mounted : 挂载元素，获取到DOM节点 updated : 如果对数据统一处理，在这里写上相应函数 beforeDestroy : 可以做一个确认停止事件的确认框 nextTick : 更新数据后立即操作dom
