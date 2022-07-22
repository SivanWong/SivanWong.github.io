---
title: Git：添加到远程github仓库的一个错误
date: 2020-03-17
tags: [Git]
categories: Git
comments: true
---

## 问题
今天使用git 添加到远程github仓库的时候    
提示错误：fatal: remote origin already exists. 

## 解决办法
1. 先删除远程 Git 仓库

```
$ git remote rm origin

```
2. 再添加远程 Git 仓库

```
$ git remote add origin 仓库地址

```



