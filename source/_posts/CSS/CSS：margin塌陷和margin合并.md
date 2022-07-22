---
title: CSS：margin塌陷和margin合并
date: 2020-02-17
tags: [CSS]
categories: CSS
comments: true
---

### margin塌陷
- 标准文档流中，垂直方向的margin不叠加，以较大的为准。即父子嵌套元素在垂直方向的margin,父子元素是结合在一起的,他们两个的margin会取其中最大的值。
- 正常情况下,父级元素应该相对浏览器进行定位,子级相对父级定位。
- 但由于margin的塌陷,父级相对浏览器定位.而子级没有相对父级定位,子级相对父级,就像坍塌了一样。
- 原理是他们处于同一个BFC中。

#### 体现
![image](https://images2018.cnblogs.com/blog/1413878/201807/1413878-20180727113555586-1719243599.png)
1. 红色方块margin-top为100px
2. 现在给里面的小方块设置margin-top:100px，发现两个方块位置没动
3. 而当给里面的小方块设置margin-top:150px，小方块带着大方块往下移动了50px（100和150取了150，里面的小方块依然紧贴大方块最上面）

#### 解决
1. 给父元素设置边框或内边距(不建议使用)
2. 给父元素添加某些条件触发bfc(块级格式上下文),改变父级的渲染规则
    1. position:absolute/fixed
    2. display:inline-block/table
    3. float:left/right
    4. overflow:hidden
3. 给子元素的前面加一个兄弟元素。

### margin合并
- 标准文档流中，两个兄弟结构的元素在垂直方向上的margin不叠加，是合并的，以较大的为准。
- 原因是他们处于同一个BFC中。
- 解决margin塌陷的原理是使两个元素处于不同的bfc中，不同的bfc是不会发生margin塌陷的

### 解决
1. 给其中一个元素添加盒子div并触发bfc
2. 给两个元素都添加盒子div并触发bfc
    1. position:absolute/fixed
    2. display:inline-block;
    3. float:left/right
    4. overflow:hidden

