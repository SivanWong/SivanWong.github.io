---
title: 浏览器内核、渲染引擎、JS引擎
date: 2022-04-26
tags: [前端]
categories: 前端
comments: true
---

# 一、下载安装
1. App Store可以进行下载
2. 安装

```
$ xcode-select --install
$ xcode-select -p
// 显示以下信息即是成功安装 
/Applications/Xcode.app/Contents/Developer
```

## 注意

安装时出现错误

```
xcode-select -pxcode-select: error: command line tools are already installed, use "Software Update" to install updates
// 解决
$ rm -rf /Library/Developer/CommandLineTools
$ xcode-select --install
// 如果还是报错，加上sudo
```

# 二、ios模拟器

1. 列出可用的 iOS 模拟器

```
$ xcrun instruments -s
```

2. 安装更多版本模拟器

Simulator 默认只有最新的 iOS 版本的模拟器，如果你需要在老版本的 iOS 上调试，可以这样安装更多版本。

- 运行Xcode
- Window -> Devices and Simulator -> Simulator
- 点击左下角的 + 可以添加其它型号的机器
- OS version -> Download more simulator runtime 可以下载其他版本的iOS系统

3. 启动模拟器

```
$ xcrun instruments -w XXX
// 如 xcrun instruments -w "iPhone 11 (13.6)"
```

# 三、安装shopee app
1. 下载需要安装的app压缩包
2. 解压后直接拖入模拟器即可安装
3. 登录时不要打开proxifier，不然会一直pending

# 四、安装proxifier，配置代理
1. 下载proxifier
2. 安装whistle，运行w2 start启动
3. 运行proxifier，配置
4. 点击Proxies，添加一条 Action 规则代理到本地8899端口
5. 然后点击Rules，新建一个规则，把以下内容添加到 Applications

```
Simulator; "Xcode Server Builder”; "MobileSafari”; “com.apple.WebKit.Networking”;k12;vpn;ShopeeSG;
```

# 五、安装并信任证书

我们开发的都是https页面，需要在配置好代理后，下载安装证书

1. iphone模拟器里用safari访问127.0.0.1:8899，然后在https那里下载安装证书
2. 模拟器Settings -> General -> Profile, 点击证书进入下载
3. 模拟器Settings -> General -> About -> Certificate Trust Settings, 打开whistle证书信任按钮进行信任

相应安装包和代理配置可参考：whistle代理xcode iphone模拟器调试