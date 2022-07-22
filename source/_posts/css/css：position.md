---
title: CSS：position
Date: 2020-05-14
tags: [CSS]
categories: CSS
comments: true
---

### position:static
没有定位，元素出现在正常的文档流中，忽略left、right、top、bottom和z-index。

### position:fixed
相对于浏览器窗口定位，即浏览器窗口滚动也不会影响元素位置，元素的位置与文档流无关，因此不占据空间，可能与其他元素发生重叠。
> 一定要设置宽度

### position:relative
1. 相对于元素自身正常位置定位，元素在正常的文档流中占位。
2. 当设置margin或padding属性时，该对象在标准文档流中的占位空间也随之改变。

### position:absolute
1. 元素绝对定位，相对于static定位以外的第一个父元素，若无符合要求的父元素则相对于body，元素脱离文档流。
2. 必须指定left、right、top、bottom中的至少一个，否则left，top值与原文档流位置一致，即跟当它static时的位置一样，margin和padding仍能影响其的位置，但脱离文档流，不占据位置，和其他元素形成折叠。
3. 如果top、bottom都未指定，则其顶端将与原文档流位置一致，即垂直保持位置不变。
4. 绝对定位对象在可视区域之外会导致滚动条出现，相对定位则不会
5. 绝对定位对象头部超过可视区域会被裁掉。

### position:inherit
规定应该从父元素继承 position 属性的值。

### z-index
1. 如果两个同级元素的此属性具有同样的值，那么将依据它们在HTML文档中流的顺序层叠，写在后面的将会覆盖前面的。
2. 需要注意的是，父子关系是无法用z-index来设定上下关系的，一定是子级在上父级在下。