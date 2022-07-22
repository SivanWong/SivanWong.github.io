---
title: js：防抖和节流
Date: 2020-05-14
tags: [JS]
categories: JS
comments: true
---

优化高频率执行js代码
### 防抖
在事件被触发后的某个时间限制内，事件处理函数只执行一次。

在事件被触发n秒后再执行回调，如果在这n秒内又被触发，则重新计时。

应用场景：搜索框搜索输入，最后一次输入完再发送请求；手机号、邮箱验证输入检测。

```
function debounce(fn,delay){
    var timer;
    return function(){
        var _this = this; //取debounce执行作用域的this
        var args = arguments;//获取传入闭包函数中的参数
        //以上两句为了debounce函数最终返回的函数this指向不变（否则指向全局）和依然可以获取参数。
        //因为fn有可能需要传参
        if(timer){ 
        //当前正在一个计时过程中，又触发相同事件，所以取消计时，重新计时
            clearTimeout(timer);
        }
        timer = setTimeout(function(){
            fn.apply(_this,args); //把回调函数应用在这些对象上
        },delay);
    };
}
```
> 缺点：若不断触发同一事件会导致回调函数无法执行


### 节流
每隔一段时间，只执行一次函数

如果短时间内大量触发同一事件，那么函数在执行一次后，该函数在指定的时间期限内不再工作，直至过了这段时间才重新生效。

与防抖相比，多了防止不断触发同一事件而导致不执行回调函数的情况。

应用场景：滚动加载，加载更多或滚到底部监听

```
//第一种：定时器
function throttle(fn,delay){
    var timer;
    return function(){
        var _this = this;
        var args = arguments;
        if(timer){
           return;
        }
        timer = setTimeout(function(){
            fn.apply(_this,args);
            timer = null;  //在delay后执行完fn后把timer清空
        },delay);
    };
}

//第二种：时间戳
function throttle(fn,delay){
    var previous = 0;
    return function(){
        var _this = this;
        var args = arguments;
        var now = new Date();
        //若时间差大于间隔时间，就执行回调函数，并更新上一次执行时间
        if(now - previous > delay){
            fn.apply(_this,args);
            previous = now;
        }
    }
}
```

### 相同点
- 都可以使用setTimeout实现
- 目的都是降低回调执行频率，节省计算资源

### 不同点
- 防抖，在一段连续操作结束后，处理回调函数。
- 节流，在一段连续操作中，每隔一段时间只执行一次回调函数。
