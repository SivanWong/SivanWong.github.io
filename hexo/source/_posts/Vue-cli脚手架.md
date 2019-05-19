---
title: Vue-cli脚手架
Date: 2018-05-03
tags: [vue]
categories: vue
comments: true
---

## 介绍

Vue-cli是Vue的脚手架工具  

脚手架：在工地上，是帮助工人们作业的搭建好的架子；在技术上，是编写好基础代码的工具。

## 安装环境

查看版本（具体安装方法百度很多）

```
$ node -v
$ npm -v
$ cnpm -v
```

## 全局安装


```
$ npm install -g vue-cli
$ cnpm install -g vue-cli //国内镜像安装，较快
```
若安装失败，则先[清理缓存](https://sivanwong.github.io/2018/05/03/npm%E6%B8%85%E7%90%86%E7%BC%93%E5%AD%98/)，再重新安装


查看版本

```
$ vue -V
```

## 生成项目

#### 生成项目文件夹
```
$ vue init <template-name> <project-name>
```
然后一路回车就好了

Official Templates
- webpack（常用）
- webpack-simplae
- browaerify
- browserify-simple
- simple
- 自定义

#### 运行 （在项目文件目录下运行）
```
$ cnpm install
```

```
$ npm run dev
```


## 项目文件

#### 介绍
1. build和config文件夹：webpack配置相关
2. node_modules文件夹：npm install安装的依赖代码库
3. src文件夹：存放项目源码
4. static文件夹：存放第三方静态资源
5. .babelrc文件：babel的配置（大多数浏览器不能直接支持ES6，则需通过babel编译成ES5）
6. .editorconfig文件：编译器的配置
7. .eslintignore文件：忽略语法检查的目录文件（忽略对build和config进行ES6语法检查）
8. .eslintrc.js：eslint的配置文件
9. .gitignore文件：使git仓库忽略里边的文件或者目录
10. index.html：编译过程中会自动插入到这个html中
11. package.json：项目的配置文件
12. README.md：项目的描述文件

#### 运行
- 创建组件

 创建一个.vue对象，由三部分组成：template、script、style，其中在script中使用export default导出一个对象（里面为组件的各种选项、属性）
 
- 使用组件
## 打包上线

```
$ npm run build
```

## 所遇到的坑 
1. 使用vue安装项目文件后，若提示版本过低，则需把node、npm、cnpm全部升级到最新版本
2. 命令cnpm install需要在==项目文件目录下==运行，若还运行不了，再找其他原因