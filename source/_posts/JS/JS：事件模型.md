---
title: JS：事件模型
date: 2020-09-04
tags: [JS]
categories: JS
comments: true
---

```
<button id="btn">click me</button>
```
### DOM0级事件模型
DOM0级事件模型是早期的事件模型，所有的浏览器都是支持的，而且其实现也是比较简单。没有事件流的概念。

#### 事件绑定监听函数
直接在dom对象上注册事件
```
<button onclick="console.log('DOM0')">
```
```
document.getElementById('btn').onclick = function(){
    console.log('DOM0');
}

```
#### 事件移除监听函数
解除事件是将null复制给事件函数

```
document.getElementById('btn').onclick = null;
```
一个dom对象只能注册一个同类型的函数，因为注册多个同类型的函数的话，就会发生覆盖，之前注册的函数就会无效。

### IE事件模型
事件流：
- 事件处理阶段：事件到达目标元素，触发目标元素的监听函数。
- 事件冒泡阶段：事件从目标元素冒泡到document，依次检查经过的节点是否绑定了事件监听函数，如果有则执行。

#### 事件绑定监听函数
```
// attachEvent('事件名称','事件回调');
document.getElementById('btn').attachEvent('onclick', function(){
    console.log('IE');
});
```
#### 事件移除监听函数
detachEvent('要移除的事件名称','要移除的函数');

### DOM2级事件模型
事件流阶段：
- 事件捕获阶段：事件从document一直向下传播到目标元素，依次检查经过的节点是否绑定了事件监听函数，如果有则执行。
- 处于目标阶段：事件到达目标元素，触发目标元素的监听函数。
- 事件冒泡阶段：事件从目标元素冒泡到document，依次检查经过的节点是否绑定了事件监听函数，如果有则执行。

#### 事件绑定监听函数
一个dom对象可以注册多个相同类型的事件，不会发生事件的覆盖，会依次的执行各个事件函数。

DOM2事件函数不会覆盖DOM0事件函数。

```
//addEventListener('事件名称','事件回调','捕获/冒泡')
var click = document.getElementById('btn');
click.addEventListener('click',function(){
    console.log('DOM2 捕获');
},true);
click.addEventListener('click',function(){
    console.log('DOM2 冒泡');
},false);
```
第一个参数是事件名称，与DOM0级不同的是没有”on“，另外第三个参数代表是否在捕获阶段进行处理，true代表在捕获阶段进行处理，false代表在冒泡阶段进行处理，默认为false。

#### 事件移除监听函数
removeEventListener('要移除的事件名称','要移除的函数')

### 注意
当我们移除 child 对象后，此时对于 DOM Tree 来说 child 当然是不存在的了，但是内存中依然有对于它的引用，也就是 child 本身，只不过它没有在 DOM Tree 中而已。因此，clickHandler 也同样驻留在内存中。

```
parent.removeChild(child);
this.removeEventListener();
// child = null;
```
因此在移除节点时，同时需要移除事件回调，当然了移除事件回调也不一定非要用 removeEventListener，像上例那种情况使用最简单的办法可以 child = null 即可。