---
title: npm：清理缓存
date: 2018-03-28
tags: [npm]
categories: npm
comments: true
---

## 旧版本（4及以下）

```
$ npm cache clean 
```

## 新版本（5）

先尝试
```
$ npm cache clean --force 
```
若不行则使用下面的命令

```
$ npm cache clear --force && npm install --no-shrinkwrap --update-binary
```
