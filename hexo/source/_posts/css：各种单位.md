---
title: CSS：各种单位
Date: 2019-03-26
tags: [CSS]
categories: CSS
comments: true
---

### px（pixel，像素）
是一个虚拟长度单位，是计算机系统的数字化图像长度单位。
#### 物理像素（px）
设备能控制显示的最小单位
#### 逻辑像素（px）
又称css像素，浏览器使用的抽象单位，而不是实际存在的
#### 设备独立像素（dip或dp）
独立于设备的用于逻辑上衡量像素的单位，包括了CSS像素
#### 设备像素缩放比（dpr）
```
1. dpr=物理像素/逻辑像素
2. 1px = (dpr)^2 * dp
3. dpr=ppi/160
```
#### 屏幕像素密度（PPI）
- 每英寸内有多少个设备像素点（物理像素） 
- PPI越高，像素数越高，图像越清晰

![image](https://upload-images.jianshu.io/upload_images/11999503-9eb3c16bf53e5fde.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

#### 屏幕分辨率（XxY）
指屏幕上垂直有x个物理像素，水平有y个物理像素。
#### 屏幕尺寸（x in）
指屏幕对角线的长度有x英寸

### em（相对长度单位）
- 相对于元素其父元素的字体大小，如果自身定义了font-size按自身来计算。
- 1em等于元素其父元素字体设置的大小。
- 最多取到小数点后三位。

### rem（根em）
- 相对于html元素上字体的大小。
- 1rem等于html元素上字体设置的大小。

### vw、vh
- 1vw等于视窗宽度的1%。
- 1vh等于视窗高度的1%。

单位 | 含义
---|---
vw | 相对于视图窗口的宽度，视窗宽度为100vw
vh | 相对于视图窗口的高度，视窗高度为100vh
vmin | vw和vh中的较小值
vmax | vw和vh中的较大值
