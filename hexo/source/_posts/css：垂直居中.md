---
title: CSS：垂直居中
Date: 2019-03-26
tags: [CSS]
categories: CSS
comments: true
---

## 基于绝对定位
### 要求元素具有固定的高度和宽度
```
{
    position:absolute;
    top:50%;
    left:50%;
    margin-top:-20px;
    margin-left:-20px;
    height:40px;
    width:40px;
}
```

```
//借助calc()函数
{
    position:absolute;
    top:calc(50%-20px);
    left:calc(50%-20px);
    height:40px;
    width:40px;
}
```
### 不需要在偏移量中把元素尺寸写死

```
{
    position:absolute;
    top:50%;
    left:50%;
    transform:translate(-50%,-50%);
}
```

## 基于Flex布局

```
{
    display:flex;
    justify-content:center;//使子元素水平居中
    align-items:center;//使子元素垂直居中
    height:40px;
}
```

## 基于table布局

```
{
    display: table-cell;
    vertical-align: middle;//使子元素垂直居中
    text-align: center;//使子元素水平居中
}
```

