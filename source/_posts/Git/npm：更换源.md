---
title: npm：更换源
date: 2021-07-19
tags: [npm]
categories: npm
comments: true
---

### 原始源
安装完node之后，默认的原始源是：

```
https://registry.npmjs.org/
```

### 使用淘宝镜像
#### 临时使用

```
npm --registry https://registry.npm.taobao.org install express
```

#### 持久使用

```
npm config set registry https://registry.npm.taobao.org
```

#### 通过cnpm

```
npm install -g cnpm --registry=https://registry.npm.taobao.org
```

### 使用官方镜像

```
npm config set registry https://registry.npmjs.org/
```

## 查看npm源地址

```
npm config get registry
```
