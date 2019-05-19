---
title: 关于git：分支管理之合并
Date: 2019-02-26
tags: [git]
categories: git
comments: true
---

假设已存在分支dev，且修改部分代码
1. 先把已修改的推上分支dev
2. 把切换回主分支，下拉
3. 运行合并指令

```
git merge dev
```
4. 合并后在本地修改冲突
5. 再次commit并提交到主分支
