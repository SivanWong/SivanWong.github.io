---
title: CSS：margin塌陷
Date: 2019-03-26
tags: [CSS]
categories: CSS
comments: true
---

标准文档流中，垂直方向的margin不叠加，以较大的为准。
原理是他们处于同一个BFC中。
1. 给父盒子添加border。
2. 给父盒子添加padding。
3. 给父盒子添加overflow:hidden。
4. 给父盒子添加position:fixed。
5. 给父盒子添加display:table。
6. 给子元素的前面加一个兄弟元素
```
content:"";
overflow:hidden;
```
