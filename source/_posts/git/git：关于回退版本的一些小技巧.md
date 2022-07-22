---
title: git：关于回退版本的一些小技巧
Date: 2020-03-17
tags: [git]
categories: git
comments: true
---

1. 先通过 git log 查看某次提交的id
2. 使用git reset --hard [id] 回退到某一次提交

若不想保留原来的提交记录，可把原来的分支删除

```
git push origin --delete [branchName]
```
3. 再把本地的修改提交到新的分支

> 版本回退仅仅是本地版本回退
