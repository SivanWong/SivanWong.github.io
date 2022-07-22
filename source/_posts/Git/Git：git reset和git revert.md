---
title: Git：git reset和git revert
date: 2020-10-23
tags: [Git]
categories: Git
comments: true
---

> 参考：[Git撤销&回滚操作(git reset 和 get revert)](https://blog.csdn.net/asoar/article/details/84111841)

## git reset
- git reset ：回滚到某次提交。
- git reset --soft：此次提交之后的修改会被退回到暂存区
- git reset --hard：此次提交之后的修改不做任何保留，git status 查看工作区是没有记录的。
- git reset的作用是修改HEAD的位置
- 即将HEAD指向的位置改变为之前存在的某个版本，且那个版本之后提交的版本都会不见

1. 查看版本号
```
$ git log
```
2. 回退，版本号填写前六位即可
```
$ git reset --hard <目标版本号>
$ git reset --hard HEAD     //当前版本
$ git reset --hard HEAD^    //回退到上一个版本
$ git reset --hard HEAD^^   //回退到上上一个版本
```
3. 提交

```
// 直接push会报错，需要强制push
$ git push origin <分支名> --force
```


## git revert
- git revert用于“反做”某一个版本，以达到撤销该版本的修改的目的
- 即新增一个版本，该版本与想要回退的版本一致

1. 查看版本号
```
$ git log
```
2. 回退，版本号填写前六位即可
```
// -n是--no-commit如果不带这个参数会自动提交一条commit
$ git revert -n <目标版本号>
```
3. 提交

```
$ git add .
$ git commit -m "revert"
$ git push origin <分支名>
```

## 实际应用场景
### 场景一
> 糟了，我刚把不想要的代码，commit到本地仓库中了，但是还没有做push操作！

在未进行git push前的所有操作，都是在“本地仓库”中执行的。我们暂且将“本地仓库”的代码还原操作叫做“撤销”
#### 情况一
文件被修改了，但未执行git add操作(working tree内撤销)

```
$ git checkout fileName
$ git checkout .
```

#### 情况二
同时对多个文件执行了git add操作，但本次只想提交其中一部分文件

```
$ git add *
$ git status
// 取消暂存
$ git reset HEAD <filename>
```

#### 情况三
文件执行了git add操作，但想撤销对其的修改（index内回滚）


```
// 取消暂存
$ git reset HEAD fileName
// 撤销修改
$ git checkout fileName
```

#### 情况四
修改的文件已被git commit，但想再次修改不再产生新的Commit

```
// 修改最后一次提交 
$ git add sample.txt
$ git commit --amend -m"说明"
```

#### 情况五
已在本地进行了多次git commit操作，现在想撤销到其中某次Commit

```
$ git reset [--hard|soft|mixed|merge|keep] [commit|HEAD]
```

### 场景二
> 彻底完了，刚线上更新的代码出现问题了，需要还原这次提交的代码！

已进行git push，即已推送到“远程仓库”中。我们将已被提交到“远程仓库”的代码还原操作叫做“回滚”！注意：对远程仓库做回滚操作是有风险的，需提前做好备份和通知其他团队成员！

如果你每次更新线上，都会打tag，那恭喜你，你可以很快的处理上述场景二的情况

```
$ git checkout <tag>
```

如果你回到当前HEAD指向

```
$ git checkout <branch_name>
```

#### 情况一
撤销指定文件到指定版本

```
// 查看指定文件的历史版本
$ git log <filename>
// 回滚到指定commitID
$ git checkout <commitID> <filename>
```

#### 情况二
删除最后一次远程提交

方式一：使用revert
```
$ git revert HEAD
$ git push origin master
```

方式二：使用reset

```
$ git reset --hard HEAD^
$ git push origin master -f
```

二者区别：

- revert是放弃指定提交的修改，但是会生成一次新的提交，需要填写提交注释，以前的历史记录都在；
- reset是指将HEAD指针指到指定提交，历史记录中不会出现放弃的提交记录。

#### 情况三
回滚某次提交

```
// 找到要回滚的commitID
$ git log
$ git revert commitID
```


### 场景三
刚才我发现之前的某次提交太愚蠢了，现在想要干掉它！

```
$ git log
// ^号代表目标版本号的前一次提交
$ git rebase -i <目标版本号>^
```
进入编辑器

![image](https://img-blog.csdn.net/20170502192954565?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvbGlnYW5nMjU4NTExNg==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

将对应版本号前的 pick 改为 d ，即drop = remove commit，然后保存退出

```
$ git push origin <分支名> -f
```
- 通过上述操作，如果你想对历史多个commit进行处理或者，可以选择git rebase -i，只需删除对应的记录就好
- rebase还可对 commit 消息进行编辑，以及合并多个commit