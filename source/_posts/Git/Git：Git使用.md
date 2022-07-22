---
title: Git：Git使用
date: 2020-03-17
tags: [Git]
categories: Git
comments: true
---

git的简介、安装就不罗嗦了，详细的教程可参考   
[廖雪峰的git教程](https://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000)


# 创建版本库（初始化一个git仓库）
### 第一步
选择一个合适的地方，创建一个空目录learngit

```
$ mkdir learngit
$ cd learngit
$ pwd

```
pwd命令用于显示当前目录

### 第二步
通过git init命令把这个目录变成Git可以管理的仓库

```
$ git init

```
1、此时可以发现当前目录下多了一个.git的目录，这个目录是Git来跟踪管理版本库的，没事千万不要手动修改这个目录里面的文件，不然改乱了，就把Git仓库给破坏了。

2、如果没有看到.git目录，那是因为这个目录默认是隐藏的，用ls -ah命令就可以看见。


# 添加文件到Git仓库

编写一个readme.txt文件
内容为：

```
Git is a version control system.
Git is free software.

```
### 第一步
用命令git add告诉Git，把文件添加到仓库

```
$ git add readme.txt

```
1、执行上面的命令，没有任何显示，这就对了，Unix的哲学是“没有消息就是好消息”，说明添加成功 

2、add可反复多次使用，添加多个文件
### 第二步
用命令git commit告诉Git，把文件提交到仓库

```
$ git commit -m "wrote a readme file"

```
1、-m后面输入的是本次提交的说明，可以输入任意内容，当然最好是有意义的  

2、commit可以一次提交很多文件，所以你可以多次add不同的文件

# 修改文件并提交

修改readme.txt文件，改成如下内容

```
Git is a distributed version control system.
Git is free software.

```
## git status
运行git status命令看看结果

```
$ git status

```
git status命令可以让我们时刻掌握仓库当前的状态

## git diff
比如有一个项目，隔了好几天没碰过了，想要继续写的时候，又忘了上次是怎么修改的，那么   
运行git diff命令看看具体修改了什么内容

```
$ git diff readme.txt

```
git diff顾名思义就是查看difference

## 提交修改（与提交新文件一样）

### 第一步
git add

```
$ git add readme.txt

```

### 第二步
git commit

```
$ git commit -m "add distributed"

```

# 版本回退

现在，我们回顾一下readme.txt文件一共有几个版本被提交到Git仓库里了

版本一：wrote a readme file

```
Git is a version control system.
Git is free software.

```
版本二：add distributed

```
Git is a distributed version control system.
Git is free software.

```

## git log
运行git log命令可以查看每次修改的历史记录

```
$ git log

```

该命令显示从最近到最远的提交日志

## 回退
   
###  git reset  
运行git reset命令把版本二回退到版本一

```
$ git reset --hard HEAD     //当前版本
$ git reset --hard HEAD^    //回退到上一个版本
$ git reset --hard HEAD^^   //回退到上上一个版本

```
若有多个版本，可继续使用git reset命令回退

### cat <file>
看看readme.txt的内容是不是版本一

```
$ cat readme.txt

```

## 后悔回退，恢复版本

此时，使用git log看一下版本库里的版本，哎呀，版本二不见了  
那如果此时我又后悔了，我想要回退之前的版本了

```
$ git reset --hard 所需版本的commit id

```
commit id不知道怎么办？？？  
1、不怕，只要上面的命令行窗口还没有被关掉，你就可以顺着往上找啊找啊，找到回退前执行git log后的版本库，每一个版本的commit后那一长串乱码一样的东西就是该版本的commit id了  
当然，commit id很长，没必要写全，写前几位就好了（一般七位吧）

恢复版本二

```
$ git reset --hard f3ab58

```

2、可是，当你关掉了命令行窗口后才后悔怎么办？？？  
不怕，在Git中，总是有后悔药可以吃的 

Git提供了一个命令git reflog用来记录你的每一次命令

```
$ git reflog

```
又可以找回所需版本的commit id了


# 工作区与暂存区

## 工作区
就是你在电脑里能看到的目录，比如我的learngit文件夹就是一个工作区

## 版本库
工作区有一个隐藏目录.git，这个不算工作区，而是Git的版本库

Git的版本库里存了很多东西  
1、最重要的就是称为stage（或者叫index）的暂存区  
2、还有Git为我们自动创建的第一个分支master  
3、以及指向master的一个指针叫HEAD

![image](https://www.liaoxuefeng.com/files/attachments/001384907702917346729e9afbf4127b6dfbae9207af016000/0)


前面讲了提交新文件到Git版本库：

第一步是用git add把文件添加进去，实际上就是把文件修改添加到暂存区；

第二步是用git commit提交更改，实际上就是把暂存区的所有内容提交到当前分支

# 撤销修改

## git checkout -- file

场景一（仅修改了文件） 

有一次头脑混乱，在readme.txt中加了一行乱码，死定了，要赶紧手动删掉，以为这样就没事了吗？不，事儿可大了，运行git status查看

```
$ git status

```
会显示改动了readme.txt

这时候，运行**git checkout -- file**丢弃工作区的修改即可

```
$ git checkout -- readme.txt

```
有两种情况（都是修改了工作区的文件导致工作区与版本库不一致）：

一种是readme.txt自修改后还没有被放到暂存区，现在，撤销修改就回到和版本库一模一样的状态

一种是readme.txt已经添加到暂存区后，又作了修改，现在，撤销修改就回到添加到暂存区后的状态

## git reset HEAD file

场景二（修改文件后，git add到暂存区了）

有一次头脑更混乱，不仅在readme.txt中加了一行乱码，还git add到暂存区了 

幸好，用git status查看

```
$ git status

```
显示还没有提交

这时候运行命令**git reset HEAD file**可以把暂存区的修改撤销掉（unstage），重新放回工作区即可

```
$ git reset HEAD readme.txt

```

再用git status查看

```
$ git status

```
现在暂存区是干净的，工作区有修改，回到场景一即可

```
$ git checkout -- readme.txt

```


## 版本回退

场景三（改了文件，不仅添加了，还提交了）

回到上上一个内容**版本回退**了


# 删除文件

一般情况下，你通常直接在文件管理器中把没用的文件删了，或者用rm命令删了

```
$ rm test.txt

```
Git知道你删除了文件，因此，工作区和版本库就不一致了，git status命令会立刻告诉你哪些文件被删除了

```
$ git status

```
此时有两种情况

## 第一种情况

确实要从版本库中删除该文件

运行命令git rm删掉

```
$ git rm test.txt

```

并且git commit

```
$ git commit -m "remove test.txt"

```

## 第二种情况
删错了

因为版本库里还有呢，所以可以很轻松地把误删的文件恢复到最新版本

```
$ git checkout -- test.txt

```
git checkout -- file 其实是用版本库里的版本替换工作区的版本，无论工作区是修改还是删除，都可以“一键还原”


# 远程仓库

git的杀手级功能---远程仓库    
这个世界上有个叫GitHub的神奇的网站，这个网站是提供Git仓库托管服务的，只要注册一个GitHub账号，就可以免费获得Git远程仓库

## 设置SSH Key
由于本地Git仓库和GitHub仓库之间的传输是通过SSH加密的
### 第一步
创建SSH Key

在用户主目录下，看看有没有.ssh目录；如果有，再看看这个目录下有没有id_rsa和id_rsa.pub这两个文件；如果已经有了，可直接跳到下一步

如果没有，打开Shell（Windows下打开Git Bash），创建SSH Key

```
$ ssh-keygen -t rsa -C "youremail@example.com"

```
一路回车，使用默认值即可，由于这个Key也不是用于军事目的，所以也无需设置密码

### 第二步
登陆GitHub，打开“Account settings”，“SSH Keys”页面，

然后，点“Add SSH Key”，填上任意Title，在Key文本框里粘贴id_rsa.pub文件的内容

## 把本地项目添加到远程库

### 第一步
通过命令git init把项目文件夹变成Git可管理的仓库

```
$ git init
```

### 第二步
把项目粘贴到这个本地Git仓库里面

```
$ git add .
```

### 第三步

把项目提交到仓库

```
$ git commit -m "注释"
```

### 第四步
登陆GitHub，然后，在右上角找到“Create a new repo”按钮，创建一个新的仓库，在Repository name填入learngit，其他保持默认设置，点击“Create repository”按钮，就成功地创建了一个新的Git仓库

目前，在GitHub上的这个learngit仓库还是空的

### 第五步


在本地的learngit仓库下运行命令

```
$ git remote add origin git@github.com:michaelliao/learngit.git

```
michaelliao替换成自己的GitHub账户名   
使本地仓库关联远程库  
添加后，远程库的名字就是origin，这是Git默认的叫法

### 第六步
把本地库的所有内容推送到远程库上

```
$ git push -u origin master

```
### 最后的最后
从现在起，只要本地作了提交，就可以运行命令把本地master分支的最新修改推送至GitHub

```
$ git push origin master

```

## 从远程库克隆到本地库

### 第一步
登陆GitHub，创建一个新的仓库，名字叫gitskills    
勾选Initialize this repository with a README，这样GitHub会自动为我们创建一个README.md文件。创建完毕后，可以看到README.md文件

### 第二步
用命令git clone克隆一个本地库

```
$ git clone git@github.com:michaelliao/gitskills.git

```
michaelliao替换成自己的GitHub账户名

# 分支管理

## 创建与合并分支
一开始的时候，master分支是一条线，Git用master指向最新的提交，再用HEAD指向master，就能确定当前分支，以及当前分支的提交点

![image](https://www.liaoxuefeng.com/files/attachments/0013849087937492135fbf4bbd24dfcbc18349a8a59d36d000/0)

每次提交，master分支都会向前移动一步，这样，随着你不断提交，master分支的线也越来越长

### 第一步
创建dev分支

```
$ git branch dev

```
切换到dev分支

```
$ git checkout dev

```
可合并为创建并切换到dev分支

```
$ git checkout -b dev

```

### 第二步
用git branch命令查看当前分支

```
$ git branch
* dev
  master

```
git branch命令会列出所有分支，当前分支前面会标一个*号

### 第三步

在dev分支上正常提交    
比如对readme.txt做个修改，加上一行

```
Creating a new branch is quick.

```
然后提交

```
$ git add readme.txt 
$ git commit -m "branch test"

```

### 第四步
现在，dev分支的工作完成，我们就可以切换回master分支

```
$ git checkout master

```
切换回master分支后，再查看一个readme.txt文件，刚才添加的内容不见了！因为那个提交是在dev分支上，而master分支此刻的提交点并没有变
![image](https://www.liaoxuefeng.com/files/attachments/001384908892295909f96758654469cad60dc50edfa9abd000/0)

### 第五步
把dev分支的工作成果合并到master分支上

```
$ git merge dev

```
git merge命令用于合并指定分支到当前分支    
注意到上面的Fast-forward信息，Git告诉我们，这次合并是“快进模式

### 第六步
合并完成后，就可以放心地删除dev分支了

```
$ git branch -d dev

```
删除后，查看branch，就只剩下master分支了

```
$ git branch
* master

```

## 解决冲突
### 第一步
此时，创建了一个新的分支feature1

```
$ git checkout -b feature1

```
在readme.txt最后添加一行并提交

```
Creating a new branch is quick AND simple.

```

### 第二步
切换到master分支

```
$ git checkout master

```
在master分支上readme.txt最后添加一行并提交

```
Creating a new branch is quick & simple.

```


此时，master分支和feature1分支各自都分别有新的提交
![image](https://www.liaoxuefeng.com/files/attachments/001384909115478645b93e2b5ae4dc78da049a0d1704a41000/0)

### 第三步
由于两个分支各自有修改，两者合并起来可能会有冲突

```
$ git merge feature1

```
git status会告诉我们冲突的文件

```
$ git status

```
也可以查看readme.txt的内容

```
Git is a distributed version control system.
Git is free software distributed under the GPL.
<<<<<<< HEAD
Creating a new branch is quick & simple.
=======
Creating a new branch is quick AND simple.
>>>>>>> feature1

```

### 第四步
此时，需要手动修改冲突内容

```
Git is a distributed version control system.
Git is free software distributed under the GPL.
Creating a new branch is quick and simple.

```
再提交

```
$ git add readme.txt 
$ git commit -m "conflict fixed"

```
现在，master分支和feature1分支变成这样
![image](https://www.liaoxuefeng.com/files/attachments/00138490913052149c4b2cd9702422aa387ac024943921b000/0)
用带参数的git log也可以看到分支的合并情况

```
$ git log --graph --pretty=oneline --abbrev-commit

```

### 第五步
最后，删除feature1分支

```
$ git branch -d feature1

```

## 分支管理策略
通常，合并分支时，如果可能，Git会用Fast forward模式，但这种模式下，删除分支后，会丢掉分支信息。

如果要强制禁用Fast forward模式，Git就会在merge时生成一个新的commit，这样，从分支历史上就可以看出分支信息
### 第一步
创建并切换dev分支

```
$ git checkout -b dev

```
### 第二步
修改readme.txt文件，并提交一个新的commit

```
$ git add readme.txt 
$ git commit -m "add merge"

```
### 第三步
切换回master

```
$ git checkout master

```
### 第四步
准备合并dev分支，请注意--no-ff参数，表示禁用Fast forward

```
$ git merge --no-ff -m "merge with no-ff" dev

```
加上-m参数，把commit描述写进去

合并后，我们用git log看看分支历史

```
$ git log --graph --pretty=oneline --abbrev-commit

```
![image](https://cdn.webxueyuan.com/cdn/files/attachments/001384909222841acf964ec9e6a4629a35a7a30588281bb000/0)

## Bug分支

某天突然接到一个修复一个代号101的bug的任务时，很自然地，你想创建一个分支issue-101来修复它，但当前正在dev上进行的工作还没有提交，并不是你不想提交，而是工作只进行到一半，还没法提交，预计完成还需1天时间。但是，必须在两个小时内修复该bug

### 第一步

把当前工作现场“储藏”起来，等以后恢复现场后继续工作

```
$ git stash

```
现在，用git status查看工作区，就是干净的

### 第二步

首先确定要在哪个分支上修复bug，假定需要在master分支上修复，就从master创建临时分支

```
$ git checkout master

```

```
$ git checkout -b issue-101

```

### 第三步

修复bug，然后提交

```
$ git add readme.txt 
$ git commit -m "fix bug 101"

```

### 第四步

修复完成后，切换到master分支，并完成合并，最后删除issue-101分支

```
$ git checkout master

```

```
$ git merge --no-ff -m "merged bug fix 101" issue-101

```

```
$ git branch -d issue-101

```

### 第五步

接着回到dev分支干活了

```
$ git checkout dev

```

```
$ git status

```
工作区是干净的，用git stash list命令看看刚才的工作现场存到哪去了？

```
$ git stash list

```
### 第六步

恢复stash内容

一种是用git stash apply恢复，然后用git stash drop删除stash内容

另一种方式是用git stash pop，恢复的同时把stash内容也删了

```
$ git stash pop

```
可以多次stash，恢复的时候，先用git stash list查看，然后恢复指定的stash

```
$ git stash apply stash@{0}

```
### 疑问

#### 第一个问题
在dev中工作，在master中创建分支修改bug，好像互不相干呀，为什么要stash呢？

暂存区是公用的，如果不通过stash命令隐藏，会带到其它分支（issue-101）去

#### 第二个问题
为什么要创建分支修改bug呢，直接在master中改不就好了吗？  

实际项目中，这个bug可能很麻烦，你需要修复一天的时间才能搞定，如果你不创建101分支，那么这时候你们组内其他小伙伴也要紧急修复线上一个bug，但是他的bug可能就1分钟。他修复好了却不能上线，因为你没有创建分支，要等你一天，才能把你处理好的正确代码一起上线。   
可能也会觉得创建分支不够效率，但是工作中稳健很重要

## Feature分支
每添加一个新功能，最好新建一个feature分支，在上面开发，完成后，合并，最后，删除该feature分支

### 第一步
开发并提交

```
$ git checkout -b feature-vulcan

```

```
$ git add vulcan.py
$ git commit -m "add feature vulcan"

```
### 第二步
切回dev，准备合并

```
$ git checkout dev

```
### 第三步
一切顺利的话，feature分支和bug分支是类似的，合并，然后删除
但是，由于种种原因，新功能取消，这个分支必须就地销毁

```
$ git branch -d feature-vulcan

```
销毁失败

Git友情提醒，feature-vulcan分支还没有被合并，如果删除，将丢失掉修改       
如果要强行删除，需要使用命令git branch -D feature-vulcan

```
$ git branch -D feature-vulcan

```

## 多人协作
查看远程库的信息

```
$ git remote

```
显示更详细的信息

```
$ git remote -v

```
### 推送分支
推送分支，就是把该分支上的所有本地提交推送到远程库

推送时，要指定本地分支，这样，Git就会把该分支推送到远程库对应的远程分支上

```
$ git push origin master

```
或推送其他分支

```
$ git push origin dev

```
注意：

1、master分支是主分支，因此要时刻与远程同步；

2、dev分支是开发分支，团队所有成员都需要在上面工作，所以也需要与远程同步；

3、bug分支只用于在本地修复bug，就没必要推到远程了，除非老板要看看你每周到底修复了几个bug；

4、feature分支是否推到远程，取决于你是否和你的小伙伴合作在上面开发。

### 抓取分支
当push失败时，则因为远程分支比你的本地更新

先用git pull把最新的提交从origin/dev抓下来，然后，在本地合并，解决冲突，再推送

```
$ git pull

```
git pull也失败了，原因是没有指定本地dev分支与远程origin/dev分支的链接

设置dev和origin/dev的链接

```
$ git branch --set-upstream dev origin/dev

```
再pull

```
$ git pull

```
git pull成功，但是合并有冲突，需要手动解决，解决的方法和分支管理中的解决冲突完全一样

解决后，提交，再push

# 标签管理
### 创建标签
首先，切换到需要打标签的分支上

```
$ git branch
* dev
  master
$ git checkout master
Switched to branch 'master'

```
创建一个新标签

```
$ git tag <name>
```
还可以创建带有说明的标签，用-a指定标签名，-m指定说明文字

```
$ git tag -a <tagname> -m "blablabla..."
```

查看所有标签

```
$ git tag  //按字母排序
$ git show <tagname>
```
默认标签是打在最新提交的commit上的

有时候，如果忘了打标签

方法是找到历史提交的commit id

```
$ git log --pretty=oneline --abbrev-commit
```
然后打上标签就可以了
```
$ git tag <name> <commit id>
```

### 未完待续