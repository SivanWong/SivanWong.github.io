---
title: vue：其他
Date: 2019-03-26
tags: [vue]
categories: vue
comments: true
---

### 如何理解vue
vue是一套用于构建用户界面的渐进式框架，采用MVVM架构。其核心库只关注视图层，采用自底向上增量开发的设计。vue的目标是通过尽可能简单的API实现响应的数据绑定和组合的视图组件。

优势：
- 低耦合。视图可以独立于Model变化和修改，一个ViewModel可以绑定到不同的"View"上，当View变化的时候Model可以不变，当Model变化的时候View也可以不变。
- 简单的语法及项目创建，提供vue-cli脚手架，能非常容易地构建项目。
- 更快的渲染速度和更小的体积。

缺点：不支持IE8。

### vuex(可以在vue1.0使用)
vue框架中状态管理。在main.js引入store，注入。新建一个目录store，….. export 。

场景有：单页应用中，组件之间的状态。音乐播放、登录状态、加入购物车


### vue1.0和vue2.0的区别
#### 生命周期不一样
vue1.0：init、created、beforeCompile、compiled、ready、beforeDestroy、destroyed

vue2.0：beforeCreate、created、beforeMount、mounted、beforeUpload、uploaded、beforeDestroy、destroyed

#### 绑定一次
```
vue1.0：{{*msg}}
vue2.0：v-once，上述已废除
```
#### 绑定html代码
```
vue1.0：{{{msg}}}
vue2.0：v-html，上述已废除
```
