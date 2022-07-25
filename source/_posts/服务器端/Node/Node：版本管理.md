---
title: Node：版本管理
date: 2021-11-05
tags: [Node]
categories: Node
comments: true
---

### 使用homebrew进行管理
#### 查看当前版本

```
$ node -v
```

#### 查看当前有哪些可以安装的版本

```
$ brew search node
```
#### 安装node 10

```
$ brew install node@10
```
#### 解除高版本的关联关系

```
$ brew unlink node@12
```
#### 关联node10版本

```
$ echo 'export PATH="/usr/local/opt/node@10/bin:$PATH"' >> ~/.zshrc
$ brew link node@10
```
#### 执行强制关联低版本命令

```
$ brew link --force --overwrite node@10
```

### 经典案例1
#### 背景
使用n模块升级node版本后降级失败

#### 解决方法

```
$ sudo chown -R 'XinweiWang':admin /usr/local/include/node
$ sudo chown -R 'XinweiWang':admin /usr/local/bin
$ sudo chown -R 'XinweiWang':admin /usr/local/share
$ sudo chown -R 'XinweiWang':admin /usr/local/lib/dtrace
$ brew link --overwrite node@10
// 或者
$ brew link --overwrite node
```

### 经典案例2
在unlink node@10且link node@12后，不停提醒


```
Warning: Already linked: /usr/local/Cellar/node@12/12.22.3
To relink, run:
  brew unlink node@12 && brew link --force node@12
```
但node版本依然是10

解决：打开/usr/local/Cellar，把node@10删掉即可

### 参考链接
[mac 系统node.js降级及修改node.js版本失败解决办法](https://blog.csdn.net/Kelin_rb/article/details/107799201)
