---
title: CSS：选择器
Date: 2020-05-14
tags: [CSS]
categories: CSS
comments: true
---

### 选择器优先级
从高到低
1. 在属性后面使用 !important 会覆盖页面内任何位置定义的元素样式。
2. 内联样式，作为style属性写在元素内的样式
3. id选择器
4. class带伪类，如 .input:first-child
5. 标签[指定属性]，如 input[type='file']
6. 类选择器
> 标签带伪类，如input:first-child，与5、6按css的顺序排优先级
7. 标签选择器
8. 通配符选择器

### 属性选择器
属性选择器支持正则匹配

选择器 | 含义
---|---
tag[attr] | 匹配具有attr属性的所有元素，不考虑它的值
tag[attr='val'] | 匹配attr属性值等于val的所有元素
tag[attr^='val'] |  匹配attr属性值以指定的值val开头的所有元素
tag[attr$='val'] |  匹配attr属性值以指定的值val结尾的所有元素
tag[attr*='val'] |  匹配attr属性值中包含指定的值val的所有元素

- tag为标签名
- attr为属性
- val为属性值

### 选择器解析
- CSS选择器时==从右往左解析==的
- 尽量少使用不必要的层级关系