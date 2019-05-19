---
title: 关于git：将在master分支上做的修改提交到分支
Date: 2019-02-26
tags: [git]
categories: git
comments: true
---

## 前提
我在master上修复了某个bug，但是master被锁定了，我想提交到dev分支，那么使用 cherry-pick可以满足我们的要求

```
//先从主分支记下id
$ git log
//切换到dev分支上
$ git cherry-pick <id>
```
