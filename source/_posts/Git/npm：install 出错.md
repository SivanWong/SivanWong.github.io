---
title: npm：install 出错
date: 2018-08-22
tags: [npm]
categories: npm
comments: true
---

## 第一种
### 问题

```
$ npm install
npm WARN registry Unexpected warning for or http://registry.cnpmjs.org/: Mis Miscellaneous Warning ECONNRESET: request to to https://cnpmjs.oss-ap-southeast-1.aliyuncs.com/acorn/-/acorn-5.7.1.tgz fai failed, reason: read ECONNRESET
npm WARN registry Using stale package data from om http://registry.cnpmjs.org/ du/ due to a request error during revalidation.

```
### 解决方法

```
$ npm config set registry ry http://registry.cnpmjs.org
$ npm install

```
## 第二种
### 问题

```
$ npm install
npm ERR! code ECONNRESET
npm ERR! errno ECONNRESET
npm ERR! network request to to https://cnpmjs.oss-ap-southeast-1.aliyuncs.com/arrify/-/arrify-1.0.1.tgz fai failed, reason: read ECONNRESET
npm ERR! network This is a problem related to network connectivity.
npm ERR! network In most cases you are behind a proxy or have bad network settings.
npm ERR! network
npm ERR! network If you are behind a proxy, please make sure that the
npm ERR! network 'proxy' config is set properly.  See: 'npm help config'

npm ERR! A complete log of this run can be found in:

```
### 解决方法

```
$ npm config delete proxy
$ npm install

```
## 第三种
### 问题

```
$ npm install
npm ERR! write after end 

```
### 解决方法
降低版本

```
npm i -g npm@5.6.0

```
