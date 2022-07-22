---
title: Cocos：计时器
date: 2021-07-05
tags: [Cocos]
categories: Cocos
comments: true
---

下面是 Component 中所有关于计时器的函数：

- schedule：开始一个计时器
- scheduleOnce：开始一个只执行一次的计时器
- unschedule：取消一个计时器
- unscheduleAllCallbacks：取消这个组件的所有计时器

### schedule
开始一个计时器

```
this.schedule(function() {
     // 这里的 this 指向 component
     this.doSomething();
 }, 5);
```

上面这个计时器将每隔 5s 执行一次。

更灵活的计时器

```
// 以秒为单位的时间间隔
 let interval = 5;
 // 重复次数
 let repeat = 3;
 // 开始延时
 let delay = 10;
 this.schedule(function() {
     // 这里的 this 指向 component
     this.doSomething();
 }, interval, repeat, delay);
```

上面的计时器将在 10 秒后开始计时，每 5 秒执行一次回调，重复 3 次。

### scheduleOnce
只执行一次的计时器（快捷方式）

```
this.scheduleOnce(function() {
     // 这里的 this 指向 component
     this.doSomething();
 }, 2);
```

上面的计时器将在两秒后执行一次回调函数，之后就停止计时。

### unschedule
取消计时器

开发者可以使用回调函数本身来取消计时器：

```
this.count = 0;
 this.callback = function () {
     if (this.count == 5) {
         // 在第六次执行回调时取消这个计时器
         this.unschedule(this.callback);
     }
     this.doSomething();
     this.count++;
 }
 this.schedule(this.callback, 1);
```

注意：组件的计时器调用回调时，会将回调的 this 指定为组件本身，因此回调中可以直接使用 this。