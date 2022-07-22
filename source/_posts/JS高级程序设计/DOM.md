---
title: DOM
date: 2018-05-03
tags: [红宝书]
categories: 红宝书
comments: true
---

# 节点层次
### 小结
- DOM可以将任何HTML或XML文档描绘成一个由多层次节点构成的结构。
- 节点之间的关系构成层次，而所有页面标记则表现为一个以特定节点为根节点的树形结构
- 文档节点是每个文档的根节点，通过文档节点表示的元素称之为文档元素
-  文档元素是文档的最外层元素，文档中的其他元素都包含在文档元素中
- 每个文档只能有一个文档元素，在HTML页面中，文档元素始终都是<html>元素
- HTML元素通过元素节点表示，特性(属性）通过特性节点表示，注释通过注释节点表示......


---

>  以下类型属性和方法的详细内容可参考红宝书，也可参考第19章DOM基础的pdf，在这里就不一一列出了

### Node类型 

JavaScript中的所有节点类型都继承自Node类型
- 节点属性（所有节点都有）

属性 | 用途
---|---
nodeName | 获取元素的标签名
nodeValue | 返回节点的节点值
childNodes | 获取当前元素节点的所有子节点
firstChild | 获取当前元素节点的第一个子节点
lastChild | 获取当前元素节点的最后一个子节点
ownerDocument | 获取该文档的文档根节点
parentNode | 获取当前节点的父节点
previousSibling | 获取当前节点的前一个同级节点
nextSibling | 获取当前节点的后一个同级节点

- childNodes属性保存着一个NodeList对象，是一种类数组对象，用于保存一组有序的节点

- 操作节点（所有节点都可用）

方法 | 用途
---|---
appendChild() | 将新节点追加到子节点列表的末尾
insertBefore() | 将新节点插入到参考节点的前面
replaceChild() | 将新节点替换掉旧节点
removeChild() | 移除节点
cloneNode() |复制节点



### Document类型
JavaScript通过Document类型表示文档

- 查找元素

方法| 作用
---|---
getElementsByTagName() | 获取相同元素的节点列表
getElementByName() | 获取相同名称的节点列表
getElementById()| 获取特定id元素的节点

- 文档写入

方法 | 用途
---|---
write() | 原样写入
writeln() | 在字符串末尾添加换行符（\n）
open() | 打开网页的输出流
close() |关闭网页的输出流



### Element类型
- 在HTML中，标签名始终都以全部大写表示

```
alert(div.tagname);//DIV

```
- title特性：鼠标移动到该元素之上时显示的内容

- 操作特性

方法 | 用途
---|---
getAttribute() | 获取特定元素节点属性的值
setAttribute() | 设置特定元素节点属性的值
removeAttribute()| 移除特定元素节点属性
- attributes属性   
Element类型是使用attributes属性的唯一一个DOM节点类型。
attributes属性中包含一个NameNodeMap，是一个“动态”的集合，里面每一项为元素的特性

- 创建元素

```
document.createElement(要创建元素的标签名);

```
创建的新元素尚未被添加在文档树中，因此浏览器无法显示  
可以用appendChild()等方法把其添加到文档树中

### Text类型
文本节点由Text类型表示，包含的是可以照字面解释的纯文本内容
- 创建文本节点

```
document.createTextNode(要插入节点中的文本);

```
同样，除非把新节点添加到文档树中已经存在的节点中，否则不会在浏览器看到新节点

- 规范文本节点   
normalize()   将所有文本节点合并成一个节点
- 分割文本节点  
splitText()将一个文本节点分为两个文本节点

### Comment类型
表示注释

### CDATASection类型
表示CDATA区域，只针对基于XML的文档

### DocumentType类型
包含着与文档的doctype有关的所有信息，不常用

### DocumentFragment类型
表示文档片段

### Attr类型
表示元素的特性

# DOM操作技术

以下两种技术均建议插入外部文件

### 动态脚本
- 使用script元素包含js代码直接插入head元素中
- 插入外部文件（建议）   
可添加到head元素中，也可添加到页面中

```
<scripr type="text/javascript" src="URL"></script>
```
### 动态样式
- 使用style元素包含指定嵌入的样式插入head元素中
- 插入外部文件（建议）   
**必须将link元素添加到head元素中**

```
<link rel="stylesheet" type="text/css" href="URL"/>

```
