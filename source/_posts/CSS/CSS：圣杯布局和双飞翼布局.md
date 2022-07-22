---
title: CSS：圣杯布局和双飞翼布局
date: 2020-02-27
tags: [CSS]
categories: CSS
comments: true
---

### 圣杯布局

![image](https://upload-images.jianshu.io/upload_images/3790386-5c28ce46aa0b924f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/764)

1. header和footer占屏幕全部宽度，高度固定
2. 中间的contaier部分是一个三栏布局
3. left和right宽度固定，middle自适应填满整个区域；高度为三栏中最大的高度

#### 浮动
```
<header class="header">header</header>
  <div class="container">
      <div class="middle">middle</div>
      <div class="left">left</div>
      <div class="right">right</div>
  </div>
<footer class="footer">footer</footer>
```
```
.header{
  height:50px;
  width:100%;
  border:1px solid black;
}

// 中间部分center设置100%撑满
// 这样因为浮动的关系，center会占据整个container，左右两块区域被挤下去了
.middle{
  float: left;
  width: 100%;
  height:100%;
  background-color:pink;
}

// 设置left的 margin-left: -100%;，让left回到上一行最左侧
.left {
  float: left;
  width: 100px;
  height: 100%;
  margin-left: -100%;
  background: black;
}

// left回到第一行后，right位于第二行的最左侧
// 设置margin-left把right拉回第一行的最右侧
.right{
  float: left;
  width:100px;
  height:100%;
  margin-left: -100px;
  background-color:black;
}
// left和right这会把middle给遮住了
// 所以这时给外层的container设置 padding，给left和right空出位置
.container{
  height: 300px;
  padding: 0 100px;
}
.footer{
  height:50px;
  width:100%;
  border:1px solid black;
}
```

#### flex布局
```
<header class="header">header</header>
  <div class="container">
      <div class="left">left</div>
      <div class="middle">middle</div>
      <div class="right">right</div>
  </div>
<footer class="footer">footer</footer>
```
```
//middle占据除left和right之外的剩余所有空间，并不被遮挡
.header{
  height:50px;
  width:100%;
  border:1px solid black;
}
.container{
  display: flex;
  height:300px;
}
.left{
  width:100px;
  height:100%;
  background-color:black;
}
.middle{
  flex:1;//middle占据剩余所有空间
  height:100%;
  background-color:pink;
}
.right{
  width:100px;
  height:100%;
  background-color:black;
}
.footer{
  height:50px;
  width:100%;
  border:1px solid black;
}
```
#### 绝对定位
以上两种dom结构均可
```
.header{
  height:50px;
  width:100%;
  border:1px solid black;
}
.container{
  height:300px;
  position: relative;
  padding: 0 100px;
}
.left{
  position: absolute;
  top: 0;
  left: 0;
  width:100px;
  height:100%;
  background-color:black;
}
.middle{
  height:100%;
  background-color:pink;
}
.right{
  position: absolute;
  top:0;
  right: 0;
  width:100px;
  height:100%;
  background-color:black;
}
.footer{
  height:50px;
  width:100%;
  border:1px solid black;
}
```
### 双飞翼布局
双飞翼布局和圣杯布局几乎一样，区别在于处理middle中被遮挡的部分。
- 圣杯布局是在三栏布局的父容器中设置padding。
- 双飞翼布局是在middle中再放一个div用来显示内容，为其设置margin。


```
<header>header</header>
    <div class="container">
        <div class="middle">
            <div class="main">middle</div>
        </div>
        <div class="left">left</div>
        <div class="right">right</div>
    </div>
<footer>footer</footer>
```

```
//使用圣杯布局的浮动和绝对定位时设置，同时把container中的padding去除
.main{
  margin:0 100px;
}
```

