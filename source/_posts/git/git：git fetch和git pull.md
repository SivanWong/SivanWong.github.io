---
title: git：git fetch和git pull
Date: 2020-03-17
tags: [git]
categories: git
comments: true
---

- git fetch是将远程主机的最新内容拉到本地，用户在检查了以后决定是否合并到工作本机分支中。
- git pull 则是将远程主机的最新内容拉下来后直接合并，即：git pull = git fetch + git merge，这样可能会产生冲突，需要手动解决。