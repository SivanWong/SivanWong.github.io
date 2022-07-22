---
title: Vue基础知识（一）
date: 2019-02-25
tags: [Vue]
categories: Vue
comments: true
---

# 概述
1. Vue.js 是一个构建数据驱动的 web 界面的渐进式框架，一个mvvm框架（库），和angular相似。
> 注意MVC、MVP、MVVM的区别
2. Vue.js通过尽可能简单的api实现响应的数据绑定和组合的视图组件。
3. Vue 的核心库只关注视图层，它不仅小巧、易于上手，还便于与第三方库或既有项目整合。
4. vue: 
- 简单、易学
- 指令以 v-xxx
- 一片html代码配合上json，在new出来vue实例
- 个人维护项目
- 适合: 移动端项目,小巧
- vue的发展势头很猛，github上star数量已经超越angular
5. angular: 
- 上手难
- 指令以 ng-xxx
- 所有属性和方法都挂到$scope身上angular由google维护
- 合适: pc端项目
6. vue与angular共同点: 不兼容低版本IE步

# 起步
### 第一个vue

```
<div id="box">
	{{message}}
</div>
```

```
<script type="text/javascript" src="../vue.js"></script>
<script>
	var app=new Vue({
		el: '#box',       //el的值可以为选择器class/id  可以tagName
		data: {
			message:'Hello,vue.js!'
		}
	});
</script>
```
### 常用指令
#### 属性绑定：v-bind
#### 条件渲染：v-if、v-else、v-else-if、v-show
#### 列表渲染：v-for
#### 事件处理：v-on
#### 表单输入绑定：v-model
#### 防止闪烁
1. v-cloak  防止花括号闪烁, 比较大段落  （在html标签上作为属性加入）
2. v-text="msg"
```
<span>{{msg}}</span>    ->    v-text="msg"
```
3. v-html="msg"
```
{{{msg}}}(过滤标签)     ->      v-html="msg"
```

# vue实例