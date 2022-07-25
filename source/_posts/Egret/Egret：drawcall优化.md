---
title: Egret：drawcall优化
date: 2020-11-19
tags: [Egret]
categories: Egret
comments: true
---

### 原理
绘制成图集，需要时直接获取添加

1. 将每一个纸屑生成动态纹理，再全部添加到一个容器中，一起生成一个图集
2. 图集保留在单例中，不需要反复生成

### 注意
- 图集中的每一片纸屑不能重合
- 容器中的x、y要对应图集中的位置
- 图集中y轴的基准与容器中的是相反的
    - 容器中y的0点在最上方，越往下越大
    - 图集中y的0点在最下方，越往上越大
    - 因此在图集中生成texture对象时，容器中的y1 = 20，对应图集中的y2 = 屏幕高度 - y1 - 纸屑高度

![image](https://upload-images.jianshu.io/upload_images/11999503-7b28e36f73f69cd2.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)