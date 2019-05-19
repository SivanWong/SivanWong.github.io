---
title: CSS：清除浮动
Date: 2019-03-26
tags: [CSS]
categories: CSS
comments: true
---

浮动产生影响
1. 给父元素设置高度。
2. 给父元素设置overflow:hidden;
3. 父元素也设置浮动。
4. 在结尾处添加空div标签clear:both
5. 父元素定义伪类::after
```
::after{
		clear: both;
		content: "";
		display: block;
	}
```
6. 父元素定义display:table