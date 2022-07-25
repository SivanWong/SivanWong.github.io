---
title: Egret：矢量绘图
date: 2021-02-20
tags: [Egret]
categories: Egret
comments: true
---

### 公共方法
#### beginFill(color, alpha) 
设置矩形的填充颜色。
- color：填充矩形的颜色值
- alpha：1表示完全不透明，0表示透明

#### lineStyle(lineWidth, color)
添加描边，设置线条的样式
- lineWidth：线条宽度
- color：线条颜色值

#### endFill()
结束当前绘制操作。

#### clear()
清空绘图

### 绘制矩形
#### drawRect(x, y, width, height)
- x、y：矩形左上角的X、Y轴坐标
- width、height：矩形的宽和高

```
var shp:egret.Shape = new egret.Shape();
shp.x = 20;
shp.y = 20;
shp.graphics.lineStyle(10, 0x00ff00);
shp.graphics.beginFill(0xff0000, 1);
shp.graphics.drawRect(0, 0, 100, 200);
shp.graphics.endFill();
```

#### 注意
若设置了新建的shape的x、y值，则矩形的x、y坐标是以shape为基准，否则以容器为基准

### 绘制圆角矩形
#### drawRoundRect(x, y ,width ,height ,ellipseWidth ,ellipseHeight)
- x、y：圆角矩形左上角的X、Y轴坐标
- width、height：圆角矩形的宽和高
- ellipseWidth：用于绘制圆角的椭圆的宽度
- ellipseHeight：用于绘制圆角的椭圆的高度

```
var shp:egret.Shape = new egret.Shape();
shp.x = 20;
shp.y = 20;
shp.graphics.beginFill(0xff0000, 1);
shp.graphics.drawRoundRect(0, 0, 100, 200, 24, 24);
shp.graphics.endFill();
```

### 绘制圆形
#### drawCircle(x, y, radius)
- x、y：圆心的X、Y轴坐标
- radius：半径

```
var shp:egret.Shape = new egret.Shape();
shp.x = 100;
shp.y = 100;
shp.graphics.lineStyle(10, 0x00ff00);
shp.graphics.beginFill(0xff0000, 1);
shp.graphics.drawCircle(0, 0, 50);
shp.graphics.endFill();
```

### 绘制直线
#### moveTo(x, y)
绘制直线的起始点
#### lineTo(x, y)
绘制直线的终点
#### 注意
- 绘制折线时，无需多次使用 moveTo() 方法，连续使用 lineTo() 方法即可
- 若使用beginFill()，可以为绘制的闭合图像填充颜色。若终点没有回到起点进行闭合，会连接两个点进行闭合

```
var shp:egret.Shape = new egret.Shape();
shp.graphics.lineStyle( 2, 0x00ff00 );
shp.graphics.moveTo( 68, 84 );
shp.graphics.lineTo( 167, 76 );
shp.graphics.lineTo( 221, 118 );
shp.graphics.endFill();
```

### 绘制曲线
#### curveTo(x1, y1, x2, y2)
绘制是“二次贝塞尔曲线”

![image](http://cdn.dev.egret.com/egret-docs/Engine2D/vectorDrawing/vectorDrawing/566153b5385e7.png)

> P0是起始点，P1是控制点，P2是终点

- x1、y1：控制点(P1)的X、Y轴坐标
- x2、y2：终点(P2)的X、Y轴坐标

```
var shp:egret.Shape = new egret.Shape();
shp.graphics.lineStyle(2, 0x00ff00 );
shp.graphics.moveTo(50, 50);
shp.graphics.curveTo(100,100, 200,50);
shp.graphics.endFill();
```

#### 注意
执行绘图时，先使用 moveTo() 方法指定曲线的起始点，然后使用 curveTo() 指定曲线的控制点和终点。

### 绘制圆弧
#### drawArc(x, y, radius, startAngle, endAngle, anticlockwise)
- x、y：圆弧路径的圆心的X、Y轴坐标
- radius：圆弧半径
- startAngle、endAngle：圆弧起点终点的角度，从x轴正方向开始计算，以弧度为单位
- anticlockwise：绘制方向，true为逆时针绘制圆弧，反之顺时针，默认为false

```
var shp:egret.Shape = new egret.Shape();
shp.graphics.beginFill( 0x1122cc );
// Math.PI 表示弧度 π
shp.graphics.drawArc(200,200,100,0,Math.PI,true);
shp.graphics.endFill();
```

### 参考链接
[使用矢量绘图](http://developer.egret.com/cn/github/egret-docs/Engine2D/vectorDrawing/vectorDrawing/index.html)
