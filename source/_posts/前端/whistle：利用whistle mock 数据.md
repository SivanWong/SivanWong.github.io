---
title: whistle：利用whistle mock 数据
date: 2020-07-17
tags: [前端]
categories: 前端
comments: true
---

## vase
vase 是 whistle 提供了一个强大的 mock 数据的插件，强大之处是可以结合 js 语句 + mock 语法去生成数据。

### 安装

```
$ npm i -g whistle.vase
```

### 使用
在whistle界面的“Plugins”菜单中可以打开 vase 的界面

#### mock 语法
在vase界面新建配置 “mock_json_demo”，并选择模板为 mock，输入

```
// mock 语法
{
    "list|5": [
        {
            "name": "@string",
            "avatar": "http://lorempixel.com/100/100/",
            "id|+1": 10000
        }
    ]
}
```
然后在“Rules”中配置一条规则

```
http://mock.local/data.json vase://mock_json_demo
```
打开测试地址 http://mock.local/data.json ，即可看到模拟的数据。

#### js 语法
在vase界面新建配置 “json_engine_script”，并选择模板为 script，输入

```
// js 语法
var json = merge({
    page: req.query.pi, // 取url查询参数的分页字段，加到要返回的数据里，达到模拟分页数据的效果
    total: 60
}, render('mock_json_demo', null, 'mock')); // render 可以渲染上文提到名为“mock_json_demo”的数据模板，返回一个json
 
if (req.query.callback) { // 如果查询参数带了callback，则返回jsonp
    out(header('content-type', 'application/javascript; charset=utf8'));
    var json_text = join([req.query.callback + '(', json, ')']); // join是内置方法，可合并一组数据
    out(json_text); // 向body输出数据
} else { // 没有callback则返回json
    out(header('content-type', 'application/json; charset=utf8'));
    out(json);
}
```
然后在“Rules”中配置一条规则

```
http://mock.local/data.json vase://json_engine_script
```
打开 http://mock.local/data.json?callback=cb&pi=1 ，即可看到模拟的数据，可尝试改变、删除 callback、pi 参数，会发现返回的数据会随之改变。