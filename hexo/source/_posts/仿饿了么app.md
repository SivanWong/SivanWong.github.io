---
title: 仿饿了么app
Date: 2019-02-26
tags: [仿写]
categories: 其他
comments: true
---

# 一、前言
### 1、前提
- html
- css
- js
- ES6
- vue.js

### 2、学习目标
1. 掌握Vue.js在实战中的运用
2. 学会使用Vue.js完整地开发移动端App
3. 学会组件化、模块化的开发方式

### 3、学习内容
1. Vue.js框架介绍
2. Vue-cli 脚手架 搭建基本代码框架
3. vue-router  官方插件管理路由
4. vue-resource  Ajax通信
5. Webpack  构建工具
6. ES6+eslint  eslint：ES6代码风格检查工具
7. 工程化 组件化  模块化
8. 移动端常用开发技巧：flex弹性布局   css
9. stickyfooter   酷炫的交互设计


# 二、Vue.js
### 1、MVVM框架
![image](https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1522150067326&di=e69ffe50827ae7d61b3acce0ba87e4f0&imgtype=0&src=http%3A%2F%2Fwww.th7.cn%2Fd%2Ffile%2Fp%2F2017%2F02%2F14%2Fa32a489b21b4903155c389f2395d12fb.jpg)
1. 针对具有复杂交互逻辑的前端应用
2. 提供基础的架构抽象
3. 通过Ajax数据持久化，保证前端用户体验
4. 对一些数据进行操作时不需要刷新整个页面，只需要改动DOM里需要改动的那部分数据

### 2、什么是Vue.js
1. 一个轻量级MVVM框架
2. 数据驱动+组件化的前端开发
3. Github超过25k+的star数，社区完善

### 3、对比Angular React
1. Vue.js更轻量，gzip后大小只有20k+
2. Vue.js更易上手，学习曲线平稳
3. 吸取两家之长，借鉴了angular的指令和react的组件化

### 4、Vue.js核心思想

#### 数据驱动
![image](https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1522152024066&di=9909ede39433f2b48afee020a049a1f9&imgtype=0&src=http%3A%2F%2Fimages2015.cnblogs.com%2Fblog%2F939429%2F201701%2F939429-20170109204007713-27250766.png)

 
> 若无vue，则需要手动触发DOM改变，既繁琐又容易出错

![image](https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1522152381684&di=8d83e62c9fb1d78950db5d9f66cff5b1&imgtype=0&src=http%3A%2F%2Fimages2015.cnblogs.com%2Fblog%2F1089823%2F201702%2F1089823-20170214093219925-1118217448.png)

#### 组件化
![image](https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1522152510830&di=acba6c6e6e22e639f6e29e8cf51b5fe5&imgtype=0&src=http%3A%2F%2Fimages2015.cnblogs.com%2Fblog%2F939429%2F201701%2F939429-20170109204226447-1065803867.png)
组件设计原则
1. 页面每个独立的可视/可交互区域视为一个组件
2. 每个组件对应一个工程目录，组件所需要的各种资源在这个目录下就近维护
3. 页面不过是组件的容器，组件可以嵌套自由组合形成完整的页面
 
# 三、开启Vue.js项目

### 1、[Vue-cli](https://note.youdao.com/)

### 2、[webpack打包](https://note.youdao.com/)


# 四、项目实战