---
title: Electron：结合vue创建桌面应用
date: 2018-11-14
tags: [Electron]
categories: Electron
comments: true
---

## 首先
创建项目并安装好依赖
```
vue init webpack test-electron
cd test-electron
npm install
npm install electron --save-dev
npm install electron-packager --save-dev
```
## 其次
将零基础中的main.js拷贝到新建项目的build目录下，并更名为electron.js

按照实际项目路径更改electron.js中的路径

```
 mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, '../dist/index.html'),
    protocol: 'file:',
    slashes: true
  }))
```
## 最后
在新建项目package.json文件中增加一条指令

```
 "scripts": 
 { ... 
 "lint": "eslint --ext .js,.vue src test/unit/specs test/e2e/specs", 
 "build": "node build/build.js", 
  //增加这条,JSON文件不支持注释，引用时请清除 
 "electron_dev": "npm run build && electron build/electron.js" 
 },
```
## 启动

```
npm run build //生成dist目录
npm run electron_dev //启动electron
```

> PS 打包前：更改config/index.js中生产模式下（build）的assetsPublicPth, 原本为 /, 改为 ./ 。