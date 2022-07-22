---
title: BOM和DOM
date: 2019-03-28
tags: [前端]
categories: 前端
comments: true
---

### BOM和DOM
- DOM（文档对象模型）是 HTML 和 XML 的应用程序接口。
- DOM可以将任何HTML或XML文档描绘成一个由多层次节点构成的结构。
- BOM （浏览器对象模型）主要处理浏览器窗口和框架。
- javacsript是通过访问BOM对象来访问、控制、修改客户端浏览器。
- 由于BOM的window包含了document，document对象又是DOM的根节点。可以说，BOM包含了DOM。
- 浏览器提供出来给予访问的是BOM对象，从BOM对象再访问到DOM对象，从而js可以操作浏览器以及浏览器读取到的文档。

### 拓展：遍历dom树
