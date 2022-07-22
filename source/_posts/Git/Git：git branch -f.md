---
title: Git：git branch -f
date: 2020-08-07
tags: [Git]
categories: Git
comments: true
---

使用相对引用最多的就是移动分支，可以直接使用 -f 选项让分支指向另一个提交

```
git branch -f <分支名> <目的位置>
```

将mater分支指向HEAD的父级提交，即HEAD后退1步后的那次提交
```
// 需要注意HEAD指向哪里
git branch -f master HEAD^
```
将mater分支指向HEAD的第3级父提交，即HEAD后退3步后的那次提交
```
git branch -f master HEAD~3
```
将mater分支指向代号为c1那次提交，可通过git log查找其哈希值来替换c1
```
git branch -f master c1
```