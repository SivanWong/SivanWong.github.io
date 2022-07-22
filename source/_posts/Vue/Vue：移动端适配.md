---
title: Vue：移动端适配
date: 2019-07-29
tags: [Vue]
categories: Vue
comments: true
---

### lib-flexible
#### 原理
- 在页面中引入flexible.js后，flexible会在html标签上增加一个data-dpr属性和font-size样式。
- js首先会获取设备型号和对应的dpr，然后根据不同设备添加不同的data-dpr值，比如说1、2或者3，从源码中我们可以看到。

#### vue中适配
通过npm下载
```
npm i lib-flexible --save
```
在main.js中引入

```
import 'lib-flexible/flexible'
```
#### 把视觉稿中的px转换成rem
Flexible会将视觉稿分成100份（主要为了以后能更好的兼容vh和vw），而每一份被称为一个单位a。同时1rem单位被认定为10a。

### px2rem-loader
在build文件中找到util.js，将px2rem-loader添加到cssLoaders中，将下面代码加进cssLoaders方法中

```
const px2remLoader = {
    loader: 'px2rem-loader',
    options: {
      remUint: 75
    }
}
```
同时，对generateLoaders方法进行修改

```
const loaders = options.usePostCSS ? [cssLoader, postcssLoader,px2remLoader] : [cssLoader,px2remLoader]
```

### fastclick
为了检测是否为双击，从点击屏幕上的元素到触发元素的 click 事件，移动浏览器会有大约 300 毫秒的等待时间。
#### 解决
引入fastclick第三方库，其实现原理是在检测到touchend事件的时候，会通过DOM自定义事件立即出发模拟一个click事件，并把浏览器在300ms之后真正的click事件阻止掉。