---
title: Git：git stash
date: 2020-11-02
tags: [Git]
categories: Git
comments: true
---

> 参考：[git stash的详细讲解](https://www.jianshu.com/p/14afc9916dcb)

### 作用
- git stash命令用于暂时保存没有提交的工作。运行该命令后，所有没有commit的代码，都会暂时从工作区移除，回到上次commit时的状态。
- 它处于git reset --hard（完全放弃还修改了一半的代码）与git commit（提交代码）命令之间，很类似于“暂停”按钮。

```
# 暂时保存没有提交的工作，并且将当前代码切换到HEAD提交上
# 可以多次运行，以“先进后出”的stack结构存储
$ git stash // git stash save

# 展示目前存在的stash
$ git stash show -p

# 列出所有暂时保存的工作
$ git stash list
stash@{0}: WIP on workbranch: 56cd5d4 Revert "update old files"
stash@{1}: WIP on project1: 1dd87ea commit "fix typos and grammar"

# 恢复某个暂时保存的工作
$ git stash apply stash@{1}

# 恢复最近一次stash的文件
$ git stash pop

# 丢弃最近一次stash的文件
$ git stash drop

# 丢弃某一个stash的文件
$ git stash drop stash@{1}

# 删除所有的stash
$ git stash clear
```

### 实际应用
#### 开发到一半,同步远端代码
当你的开发进行到一半,但是代码还不想进行提交 ,然后需要同步去关联远端代码时.如果你本地的代码和远端代码没有冲突时,可以直接通过git pull解决.但是如果可能发生冲突怎么办.直接git pull会拒绝覆盖当前的修改.

遇到这种情况,需要先保存本地的代码,进行git pull,然后再pop出本地代码

```
git stash
git pull
git stash pop
```
#### 工作流被打断,需要先做别的需求
当开发进行到一半,老板过来跟你说"线上有个bug,你现在给我改好,不然扣你鸡腿".当然,你可以开一个新的分支,把当前代码提交过去,回头再merge,具体代码如下

繁琐的工作流示例

```
$ git checkout -b my_wip
$ git commit -a -m "WIP"
$ git checkout master
// edit emergency fix
$ git commit -a -m "Fix in a hurry"
$ git checkout my_wip
$ git reset --soft HEAD^
```

我们可以通过git stash来简化这个流程

正确姿势

```
$ git stash        // 保存开发到一半的代码
// edit emergency fix
$ git commit -a -m "Fix in a hurry"
$ git stash pop   // 将代码追加到最新的提交
```
