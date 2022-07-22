---
title: canvas
Date: 2020-05-14
tags: [前端]
categories: 前端
comments: true
---

Canvas是HTML5新增的组件，它就像一块幕布，可以用JavaScript在上面绘制各种图表、动画等。

## 属性
- height
- width

一个Canvas定义了一个指定尺寸的矩形框
```
<canvas id="test-canvas" width="300" height="200"></canvas>
```
## 检测浏览器支持
由于浏览器对HTML5标准支持不一致，所以，通常在canvas内部添加一些说明性HTML代码，如果浏览器支持Canvas，它将忽略canvas内部的HTML，如果浏览器不支持Canvas，它将显示canvas内部的HTML

```
<canvas id="test-stock" width="300" height="200">
    <p>Current Price: 25.51</p>
</canvas>

```
在使用Canvas前，还需要用canvas.getContext来测试浏览器是否支持Canvas

```
var canvas = document.getElementById('test-canvas');
if (canvas.getContext) {
    console.log('你的浏览器支持Canvas!');
} else {
    console.log('你的浏览器不支持Canvas!');
}
```
## 方法

canvas绘图以左上角的（0， 0）为基准原点
```
let canvas = document.querySelector('#canvas'); // 得到canvas
//得到canvas上下文环境
let ctx = canvas.getContext('2d')//绘制2d图形
let gl = canvas.getContext("webgl");//绘制3d图形
```
### 绘制矩形

#### ctx.rect(x,y,width,height);
- 创建矩形。
- 但并不会真正将矩形画出，只能调用stroke() 或 fill()后才会真正作用于画布。
- 先填充再描边。
- 可通过canvas.width或canvas.height获取画布的宽度和高度

#### ctx.fillRect(x,y,width,height)
- 执行填充操作，绘制一个已填色的、以(x,y)位置为起点、大小为width x height的矩形。
- 有填充颜色，默认为black。

####  ctx.fillStyle=""
为图形设置填充颜色

#### ctx.strokeRect(x,y,width,height);
- 绘制一个不填色、以(x,y)位置为起点、大小为width x height的矩形。
- 有边框颜色，默认为black。

#### ctx.strokeStyle=""
为图形设置边框颜色

#### ctx.clearRect(x,y,width,height);
- 将(x,y)位置大小为width x height的矩形变为透明。
- Internet Explorer 9、Firefox、Opera、Chrome 以及 Safari 支持 clearRect() 方法。
- 若canvas设置了背景颜色是不能被清除的，因为那是画布的背景颜色，clearRect清除的是绘制的图形，使绘制的图形变为透明，显现出画布背景色。

### 绘制复杂形状

#### ctx.lineWidth=x;
设置线宽为x，不需要加px

#### ctx.fill();
填充图形，可利用fillStyle设置填充颜色

#### ctx.stroke();
绘制图形，可利用strokeStyle设置边框颜色

#### ctx.beginPath();
清除原来的痕迹,绘制图形之前要先调用

#### ctx.closePath();
自动完成闭合

#### ctx.moveTo(x,y);
从(x,y)点开始绘图

#### ctx.lineTo(x,y);
绘图终点为(x,y)

#### ctx.arc(x, y, r, 起始弧度， 终点弧度，是否逆时针) 
- 圆心为(x,y),半径为r
- 弧度 = Math.PI*角度
- 设置完弧线，要用moveTo()进行绘制

### 绘制文本
#### ctx.font = "24px 宋体"
设置字体大小、型号

#### ctx.fillText("文字内容",left,top);
- 绘制实心文字。
- left为距画布最左边距离，top为距画布最上边距离。
- 可通过fillStyke设置文字填充颜色

#### ctx.strokeText("文字内容",left,top);
- 绘制空心文字。
- left与top同上。
- 可通过strokeStyle设置文字边框颜色。

#### 设置文字阴影
这些要在设置文字内容之前设置
- ctx.shadowOffsetX = x; x轴偏移量，默认位于元素正下方。
- ctx.shadowOffsetY = y; y轴偏移量，默认位于元素正下方。
- ctx.shadowBlur = num; 设置模糊系数。默认为0不模糊。
- ctx.shadowColor = ""; 设置阴影颜色，同时要设置shadowBlur，否则看不见

用canvas画出一个(0,0)坐标绿色的100x100矩形框
，再从(10,10)坐标将50x50的区域变成透明

```
<canvas id="test" width="100px" height="100px"></canvas>

<script>
var canvas = document.getElementById("test");
var ctx = canvas.getContext("2d");
ctx.fillStyle = "green";
ctx.fillRect(0,0,100,100);
ctx.clearRect(10,10,50,50);
</script>
```
