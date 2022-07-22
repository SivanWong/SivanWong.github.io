---
title: 调试神器whistle的安装使用
date: 2021-02-20
tags: [前端]
categories: 前端
comments: true
---

## 搭建环境准备
### 安装node
whistle支持v0.10.0以上版本的Node，为获取更好的性能，推荐安装最新版本的Node。

```
// 未安装的去官网进行安装
// 安装后通过命令行可查看版本
$ node -v
```
### 安装whistle
对于全局安装，Mac或Linux的非root用户需要在命令行前面加sudo。
```
$ npm install -g whistle
```
whistle安装完成后，执行命令 whistle help 或 w2 help，查看whistle的帮助信息。

```
// 如果能正常输出whistle的帮助信息，表示whistle已安装成功
$ w2 help
```
## 使用whistle

```
// 启动whistle
// 不设置端口，默认8899
$ w2 start -p 8899

```
Note: 如果要防止其他人访问配置页面，可以在启动时加上登录用户名和密码 -n yourusername -w yourpassword。

```
// 重启whsitle
$ w2 restart
```
```
// 停止whistle
$ w2 stop
```
```
// 调试模式启动whistle
// 主要用于查看whistle的异常及插件开发
$ w2 run
```
## 配置代理
### 配置信息
- 代理服务器：127.0.0.1
- 默认端口：8899，若被占用，可启动时设置端口

### 配置方式一：pc端
官网推荐配置浏览器代理，推荐安装浏览器代理插件SwitchyOmega，就按官网的来吧，其他配置方式可参考官网

由于常用chrome，以chrome为例

#### 安装根证书
> 参考网站：[安装根证书](http://wproxy.org/whistle/webui/https.html)

安装证书后就可以抓取https的包了

#### SwitchyOmega配置
进入[SwitchyOmega](https://chrome.google.com/webstore/detail/proxy-switchyomega/padekgcemlokbadohgkifijomclgjgif)，点击安装扩展后，页面会自动跳转到 SwitchyOmega 的配置页，随后便有新手教程
1. 点击左侧“新建情景模式…”，弹框提示“情景模式名称”，你可以输入“whistle”
2. 类型为代理服务器，点击创建
3. 修改代理服务器参数，代理协议为HTTP，代理服务器为127.0.0.1，代理端口为8899
4. “不代理的地址列表” 的输入框里的所有文本都删掉，因为里面的 host 在本地开发很大概率会用到
5. 点击左侧“应用选项”
6. 点击chrmoe右上角的圆圈，切换为whistle（一定是切换后才可以抓包）
7. 浏览器进入[local.whistlejs.com](local.whistlejs.com)，可以打开界面，证明配置成功，可以开始抓包了

### 配置方式二：移动端
移动端需要在设置中配置当前Wi-Fi的代理，以 iOS 为例：
![image](http://wproxy.org/whistle/img/iOS-proxy-all.jpg)

## 注意
- 安装插件后要重启whistle才可以打开插件，否则unknown

## 参考链接
[whistle](http://wproxy.org/whistle/install.html)
