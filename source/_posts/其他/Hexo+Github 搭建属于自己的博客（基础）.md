---
title: Hexo+Github 搭建属于自己的博客（基础）
date: 2018-05-03
tags: [博客搭建]
categories: 博客搭建
comments: true
---

# 搭建环境准备
### Node.js 的安装和准备

```
$ node -v
$ npm -v
```
###  git的安装和准备

```
$ git --version
```

### github账户的配置

- github账户注册
- 创建新仓库

![image](http://ww4.sinaimg.cn/large/9fe4afa0gw1faljv7hoqhj20p40fz0vo.jpg)

注意：仓库名称一定为  github用户名.github.io

- 仓库设置

![image](http://ww1.sinaimg.cn/large/9fe4afa0gw1falk4end8ij20kg0cbtbl.jpg)

接下来开启github pages功能 ，点击界面右侧的 Settings，你将会打开这个库的settings页面，向下拖动，直到看见GitHub Pages

![image](http://ww3.sinaimg.cn/large/9fe4afa0gw1falk1s5xq7j20q204kq3o.jpg)



![image](http://upload-images.jianshu.io/upload_images/1244124-5e0f79282ae8140c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/500)


# 安装hexo 
在任意一个地方创建文件夹hexo，进入到该目录输入：

```
$ npm install hexo-cli -g
```
然后可能会看到一个WARN，并不会影响操作，继续输入：

```
$ npm install hexo --save
```

```
$ hexo -v
```
### hexo的相关配置

- 初始化hexo

```
$ hexo init <新文件夹> 
$ cd <新文件夹>
```

- 首次体验hexo

```
$ hexo g
$ hexo s  //若一直无法跳转，则是端口被占用
$ hexo server -p 5000 //改变端口号
```

### 配置Git个人信息
如果之前已经配置好git个人信息，请跳过这一个步骤
- 设置Git的user name和email

```
$ git config --global user.name "yourusername"
$ git config --global user.email "youremail"
```
- 生成密钥


```
$  ssh-keygen -t rsa -C "youremail"
```

### 配置Deployment

在_config.yml文件中，找到Deployment，然后按照如下修改：

```
deploy:
  type: git
  repo: https://github.com/yourname/yourname.github.io.git
  branch: master
  
```

# 写博客、发布新文章

- 新建一篇博客

```
$ hexo new post "article title"
```
用MarDown编辑器打开就可以编辑文章了

- 生成、部署

```
$ hexo g   // 生成
$ hexo s   // 本地预览
$ hexo d   // 部署
```

```
$ hexo d -g //在部署前先生成
```

- 踩坑提醒

注意需要提前安装一个扩展

```
npm install hexo-deployer-git --save
```
> 如果没有执行这行命令，将会提醒

    deloyer not found:git

