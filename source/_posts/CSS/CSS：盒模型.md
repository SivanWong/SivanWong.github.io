---
title: CSS：盒模型
date: 2019-04-22
tags: [CSS]
categories: CSS
comments: true
---

### 标准模型

```
盒模型宽高 = margin + border + padding + content
元素宽高（元素占据的位置） = content
```
![image](https://img-blog.csdn.net/20180324150509906?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3p3a2trazE=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

### IE盒模型

```
盒模型宽高 = margin + 元素宽高
元素宽高（元素占据的位置） = border + padding + content
```

![image](https://img-blog.csdn.net/20180324150533356?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3p3a2trazE=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

### 修改盒模型（box-sizing）

box-sizing
- content-box：默认属性，标准盒模型
- border-box：使元素宽高包括padding和border，内容区的实际宽度会是元素宽高减去border + padding的计算值。（即IE盒模型）
