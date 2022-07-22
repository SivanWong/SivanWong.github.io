---
title: JS：图片预加载和懒加载
date: 2019-04-15
tags: [JS]
categories: JS
comments: true
---

### 页面加载过程
如果页面不是第一次访问，那么可能会出现浏览器缓存现象，在本地调试代码的时候也会遇到这种问题，所以在实在想不通页面为什么没有变化的时候，可以清除一下浏览器的缓存。

如果页面是第一次访问，浏览器向服务器http请求后，服务器返回html文件，在整个页面加载过程中，总的来说是按顺序从上到下执行，这是基于js的单线程机制（浏览器为多进程），但是html和css是并行加载的。
1. 根据 HTML 结构生成 DOM Tree
2. 根据 CSS 生成 CSSOM
3. 将 DOM 和 CSSOM 整合形成 RenderTree
4. 根据 RenderTree 开始渲染和展示
5. 遇到script标签时，会执行并阻塞渲染，因为 Javascript 代码有权利改变DOM树
6. 在浏览器解析页面内容的时候，若页面引用了未加载的图片，就会发送请求获取资源。此时图片还没下载完全，在页面上并不会留下图片的位置，而html不会堵塞，将会继续执行下去。等到有图片请求下载完成，html又会重新渲染页面，将图片显示出来。

为了更好的用户体验，渲染引擎将会尽可能早的将内容呈现到屏幕上，并不会等到所有的html都解析完成之后再去构建和布局render树。它是解析完一部分内容就显示一部分内容，同时，可能还在通过网络下载其余内容。

### 预加载

- 图片等静态资源在使用前提前请求。
- 资源后续使用可以直接从缓存中加载，提升用户体验。
- 预加载不是为了减少页面加载时间。
- 预加载只是提前加载除首轮加载的图片之外以后要用到的图片，比如通过点击等事件才会用到的图片。

css

```
#preload-01 { background: url(img1.png); }
#preload-02 { background: url(img2.png); }
#preload-03 { background: url(img3.png); }
```

像上面那样写，预加载和页面上其他内容一起加载，还会加长页面的加载时间，用户在点进页面时，等待时间加长，并没有达到我们提高用户体验的目的，我们可以封装一个函数，推迟预加载时间，等页面加载完成后再预加载。
```
function preload(){ 
    if(document.getElementById){ 
        document.getElementById("preload-01").style.background = "url(img1.png)"; 
        document.getElementById("preload-02").style.background = "url(img2.png)"; 
        document.getElementById("preload-03").style.background = "url(img3.png)";
    } 
} 
function addLoadEvent(func){ 
    var oldonload = window.onload; 
    if(type window.onload != "function"){ 
        window.onload = func; 
    }else{ 
        window.onload = function(){ 
            if(oldonload){ 
                oldonload(); 
            } 
            func(); 
        } 
    } 
} 
addLoadEvent(preload);

```


### 懒加载

- 仅显示可视区的图片资源，不可见区域的资源暂不请求。
- 使用懒加载可以减少页面的加载时间。
- 使用于需要大量图片的页面。

实现要点:将图片的src设为空，或者也可以将所有图片的src设一个底图，当图片还没加载完时，用这张底图来占图片的位置，防止页面结构混乱。再给一个自定义的data-url属性，用来存放图片的真实路径。lazyload属性用来标明哪些图片是需要懒加载。监听滚动事件，只在图片出现在可视区时，才动态地将图片的真实地址赋予图片的src属性。

```
<img src="" lazyload="true" data-url="1.jpg"/>

var viewHeight = document.documentElement.clientHeight;//可视区域的高度
function lazyload(){
    var eles = document.querySelectorAll('img[data-url][lazyload]');
    Array.prototype.forEach.call(eles,function(item,index){
        var rect;
        if(item.dataset.url === ''){//html5 data 钩子的写法
            return;
        }
        rect = item.getBoundingClientRect();//getBoundingClientRect()返回一个矩形对象.
        if(rect.bottom >= 0 && rect.top < viewHeight){
            !function(){//感叹号表明这是一个函数表达式
                var img = new Image();
                img.src = item.dataset.url;
                img.onload = function(){
                    item.src = img.src;
                }
                item.removeAttribute('data-url');
                item.removeAttribute('lazyload');
            }()
        }
    })
}
lazyload();//首屏调用
document.addEventListener('scroll',lazyload);

```
