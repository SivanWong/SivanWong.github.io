---
title: Git：git fetch和git pull
date: 2019-11-13
tags: [Git]
categories: Git
comments: true
---

- git fetch是将远程主机的最新内容拉到本地，用户在检查了以后决定是否合并到工作本机分支中。
- git pull 则是将远程主机的最新内容拉下来后直接合并，即：git pull = git fetch + git merge，这样可能会产生冲突，需要手动解决。