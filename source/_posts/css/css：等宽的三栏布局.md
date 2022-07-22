---
title: CSS：等宽的三栏布局
Date: 2020-05-14
tags: [CSS]
categories: CSS
comments: true
---

```
<div class="box">
    <div class="left"></div>    
    <div class="center"></div>
    <div class="right"></div>
</div>
```

### float

```
.box {
  width: 100%;
  height: 200px;
  background: black;
}
.left, .center, .right {
  width: 33.33%;
  height: 100%;
  float: left;
  background: #FFA54F;
}
.center {
  background: #FFA500;
}
.right{
  background: #FFA07A;
}
```

### flex

```
.box {
  width: 100%;
  height: 200px;
  background: black;
  display: flex;
}
.left, .center, .right {
  width: 33.33%;
  height: 100%;
  background: #FFA54F;
}
.center {
  background: #FFA500;
}
.right{
  background: #FFA07A;
}
```

### table

```
.box {
  width: 100%;
  height: 200px;
  background: black;
  display: table;
}
.left, .center, .right {
  display: table-cell;
  width: 33.33%;
  height: 100%;
  background: #FFA54F;
}
.center {
  background: #FFA500;
}
.right{
  background: #FFA07A;
}
```
