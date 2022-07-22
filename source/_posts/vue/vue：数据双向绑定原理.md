---
title: vue：数据双向绑定原理
Date: 2020-03-17
tags: [vue]
categories: vue
comments: true
---

 vue.js 是采用数据劫持结合发布者-订阅者模式的方式，通过Object.defineProperty()（相当于observer）来劫持各个属性的setter，getter，在数据变动时发布消息给订阅者，触发相应的监听回调。
 
-  observer：遍历data中的属性，使用Object.defineProperty()的get/set方法对其进行数据劫持。
-  dep：每个属性拥有自己的消息订阅器dep，用于存放所有订阅了该属性的观察者对象。
-  watcher：观察者（对象），通过dep实现对响应属性的监听，监听到结果后，主动触发自己的回调进行响应。
 
 要对数据进行劫持监听，我们需要设置数据监听器Observer，能够对数据对象的所有属性进行监听，如有变动可拿到最新值并发布通知（给dep）。
 
 因为订阅者是有很多个，所以我们需要有一个消息订阅器Dep来专门收集这些订阅者，然后在监听器Observer和订阅者Watcher之间进行统一管理的。
 
 接着，我们还需要有一个指令解析器Compile，对每个节点元素进行扫描和解析，将相关指令对应初始化成一个订阅者Watcher，并替换模板数据或者绑定相应的函数。
 
 当订阅者Watcher接收到相应属性的变化，就会执行对应的更新函数，从而更新视图。
 

 
###  拓展
####  Object.defineProperty
```
//在一个对象上定义一个新属性，或者修改一个对象的现有属性， 并返回这个对象。
Object.defineProperty(obj, prop, descriptor)
//obj 要在其上定义属性的对象。
//prop 要定义或修改的属性的名称。
//descriptor  将被定义或修改的属性描述符。 
```
object.defineproperty()缺点
- 无法监听数组的变化（把对象属性换成数组就无法监听）
- 只能劫持对象的属性，不能劫持完整的对象（若对象属性为一个对象，则无法深度遍历劫持）

#### 计算属性
计算属性computed：一个属性通过其他属性计算而来

#### 侦听器
就是检测某一属性是否发生变化，一旦发生变化，我们就可以在侦听器里面写一下业务逻辑