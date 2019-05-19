---
title: Electron：从零到完成一个桌面应用
Date: 2019-02-26
tags: [Electron]
categories: Electron
comments: true
---

Electron
## 开发环境
- 安装node
- 安装cnpm（或者npm）
- 安装electron
- 安装打包工具

```
npm install -g electron-packager
```

## 经典例子
### electron-quick-start
一个简约的记事本
```
//克隆这仓库
 git clone https://github.com/electron/electron-quick-start
//进入仓库
 cd electron-quick-start
//安装依赖库
 cnpm install
//运行应用，也可以用： cnpm run start
 cnpm start 
```
### electron-api-demos
介绍了主要的一些功能及实现代码

```
 git clone https://github.com/electron/electron-api-demos
 cd electron-api-demos
 cnpm install
 cnpm start
```
## 开始开发
### 安装electron
推荐的安装方法是把electron作为您 app 中的开发依赖项，使您可以在不同的 app 中使用不同的 Electron 版本   

在根目录下运行

```
npm install --save-dev electron
```
当然，也可以在 $PATH 中全局安装
```
npm install electron -g
```

### 创建Electron简单文件结构  
在根目录下创建package.json文件，内容如下

```
{
	"name": "test",
	"version": "0.1.0",
	"main": "main.js",
	"scripts": {
		"start": "electron ."
	},
	"devDependencies": {
		"electron": "^3.0.4"
	}
}
```
在根目录下创建main.js，内容如下

```
const { app, BrowserWindow } = require('electron')
  
  // Keep a global reference of the window object, if you don't, the window will
  // be closed automatically when the JavaScript object is garbage collected.
  let win
  
  function createWindow () {
    // 创建浏览器窗口。
    win = new BrowserWindow({ width: 800, height: 600 })
  
    // 然后加载应用的 index.html。
    win.loadFile('index.html')
  
    // 打开开发者工具
    win.webContents.openDevTools()
  
    // 当 window 被关闭，这个事件会被触发。
    win.on('closed', () => {
      // 取消引用 window 对象，如果你的应用支持多窗口的话，
      // 通常会把多个 window 对象存放在一个数组里面，
      // 与此同时，你应该删除相应的元素。
      win = null
    })
  }
  
  // Electron 会在初始化后并准备
  // 创建浏览器窗口时，调用这个函数。
  // 部分 API 在 ready 事件触发后才能使用。
  app.on('ready', createWindow)
  
  // 当全部窗口关闭时退出。
  app.on('window-all-closed', () => {
    // 在 macOS 上，除非用户用 Cmd + Q 确定地退出，
    // 否则绝大部分应用及其菜单栏会保持激活。
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })
  
  app.on('activate', () => {
    // 在macOS上，当单击dock图标并且没有其他窗口打开时，
    // 通常在应用程序中重新创建一个窗口。
    if (win === null) {
      createWindow()
    }
  })
  
  // 在这个文件中，你可以续写应用剩下主进程代码。
  // 也可以拆分成几个文件，然后用 require 导入。
```
然后创建index.html文件，内容如下

```
<!doctype html>
<html>
<head>
    <meta charset="utf-8" /> 
    <title>TEST</title>
</head>
<body>
    <span style="color:#fff;">Hello World</span>
</body>
</html>
```

### 启动app

```
npm start
```
或者在package.json中配置
```
"scripts": {"start": "electron ."}
```
则可以输入一下命令启动
```
electron .
```
## 打包
全局安装electron-packager


