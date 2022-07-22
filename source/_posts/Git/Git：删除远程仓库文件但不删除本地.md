---
title: Git：删除远程仓库文件但不删除本地
date: 2020-07-24
tags: [Git]
categories: Git
comments: true
---

1. 更新

```
$ git pull origin master
```
2. 删除

```
$ git rm -r --cached <文件相对路径>
```
3. 备注

```
$ git commit -m "delete"
```
4. 上传

```
$ git push -u origin master
```

