---
title: Vue-cli脚手架
date: 2019-05-21
tags: [Vue]
categories: Vue
comments: true
---

# vue-cli

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

# vue-cli 1.x或2.x

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

输入命令后，会跳出几个选项让你回答：

- Project name (baoge)：          
项目名称，直接回车，按照括号中默认名字（注意这里的名字不能有大写字母，如果有会报错Sorry, name can no longer contain capital letters），阮一峰老师博客为什么文件名要小写 ，可以参考一下。
- Project description (A Vue.js project)：  
项目描述，也可直接点击回车，使用默认名字
- Author ()： 作者，输入你的大名

接下来会让用户选择：
- Runtime + Compiler: recommended for most users                 
运行加编译，既然已经说了推荐，就选它了
- Runtime-only:  about 6KB lighter min+gzip, but templates (or any Vue-specificHTML) are ONLY allowed in .vue files - render functions are required elsewhere                 
仅运行时，已经有推荐了就选择第一个了
- Install vue-router? (Y/n)               
是否安装vue-router，这是官方的路由，大多数情况下都使用，这里就输入“y”后回车即可。
- Use ESLint to lint your code? (Y/n)       
是否使用ESLint管理代码，ESLint是个代码风格管理工具，是用来统一代码风格的，一般项目中都会使用。
- 接下来也是选择题Pick an ESLint preset (Use arrow keys) 选择一个ESLint预设，编写vue项目时的代码风格，直接y回车   
- Setup unit tests with Karma + Mocha? (Y/n)    
是否安装单元测试，我选择安装y回车
- Setup e2e tests with Nightwatch(Y/n)?   
是否安装e2e测试 ，我选择安装y回车

一般一路回车就好了

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

# vue-cli 3.0