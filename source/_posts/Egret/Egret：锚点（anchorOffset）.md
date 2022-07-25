---
title: Egret：锚点（anchorOffset）
date: 2021-02-20
tags: [Egret]
categories: Egret
comments: true
---

### 锚点
egret中对锚点(anchorOffsetX,anchorOffsetY)的使用目的，基本是和CSS3属性中的transform-origin是一致的，大多是基于元素中心的旋转和放大。但使用方法上是有区别的，
- egret的默认锚点在左上角
- transform-origin默认在元素中心
- 此外，egret这类工具（还有createjs，pixi等）本身是基于canvas/webgl的画布上进行绘制

### 设置锚点

```
a.x = 100
a.y = 100
a.anchorOffsetX = 50
```
- 元素旋转、缩放都是基于锚点
- 元素默认锚点在左上角，此时左上角的坐标点为(100, 100)，锚点坐标为(0, 0)

### 锚点对元素位置的影响
设置锚点后，锚点坐标变为(50, 0)，此时，元素会左移50，左上角的坐标点即xy值会变为(50, 100)

```
a.x = a.x - a.anchorOffsetX
a.y = a.y - a.anchorOffsetY
```
### 恢复元素位置
如果希望设置锚点，但又不希望改变元素位置，可以设置锚点后，再加回来

```
a.x = 100
a.y = 100
a.anchorOffsetX = 50
a.x = a.x + a.anchorOffsetX
a.y = a.y + a.anchorOffsetY
```
### 注意

![image](https://upload-images.jianshu.io/upload_images/11999503-c0942a4fcf86a83d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

- 设置锚点后，xy值会修改，元素位置会改变，元素的xy坐标依然是元素左上角的坐标
- 缩放、旋转，xy值不会修改，元素位置会改变，因此元素的xy坐标有可能不再是原来a点的坐标，也不再是元素左上角的坐标，因此元素的xy点会根据元素位置的改变而指向不同的点，值却不会变
- 因此缩放、旋转后，想要移动元素位置，可以根据元素的xy坐标点的位置与此时元素的哪一个部分位于那个位置，来进行修改移动


### 参考链接
[白鹭引擎(egret)中锚点(anchoroffset)的位置体会](https://www.jianshu.com/p/8161f37c255a)
