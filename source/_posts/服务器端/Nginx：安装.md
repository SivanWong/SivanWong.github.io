---
title: Nginx：安装
date: 2020-07-24
tags: [Nginx]
categories: Nginx
comments: true
---

### 安装工具
[homebrew](https://brew.sh/index_zh-cn.html)

### 安装nginx
1. 先查找nginx是否已存在

```
$ brew search nginx // 查询nginx是否已存在
$ brew info nginx // 查看更详细的信息
```
2. 安装

```
$ brew install nginx
```
3. 查看nginx安装目录

```
$ open /usr/local/etc/nginx/
```

![image](https://note.youdao.com/favicon.icohttps://images2017.cnblogs.com/blog/965467/201801/965467-20180124151353990-366531789.png)


```
// 这才是nginx被安装到的目录
$ open /usr/local/Cellar/nginx
```
![image](https://images2017.cnblogs.com/blog/965467/201801/965467-20180124161335662-1869488896.png)

打开会看到一个以当前安装的nginx的版本号为名称的文件夹，这个就是我们安装的nginx根目录啦。进入1.12.2_1/bin 目录，会看到nginx的可执行启动文件。

同样的，我们在1.12.2_1/目录下还可以看到一个名字为html的快捷方式文件夹（暂且就这么叫吧），进入该目录我们会发现其实它指向的就是/usr/local/var/www目录，这个在上面我们查看的info信息中有提到（Dcroot）

4. 启动

```
$ nginx
```
5. 访问

打开浏览器访问localhost:8080，即可看到nginx的欢迎界面

6. 关闭和重启

```
// 关闭1: 快速停止
$ nginx -s stop
 

// 关闭2: 完整有序停止
$ nginx -s quit
 

// 重启
$ nginx -s reload
```
