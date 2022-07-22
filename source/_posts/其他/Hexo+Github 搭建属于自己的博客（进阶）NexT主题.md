---
title: Hexo+Github 搭建属于自己的博客（进阶）NexT主题
date: 2018-05-04
tags: [博客搭建]
categories: 博客搭建
comments: true
---

# 主题安装
### 安装NexT
在站点目录下（hexo），输入命令：

```
$ git clone https://github.com/iissnan/hexo-theme-next themes/next
```
### 启用主题
在站点目录中（blog），打开配置文件_config.yml，修改
```
theme：next
```
### 验证主题

```
$ hexo s
```
# 主题设定
以下所有设置注意格式
### NexT主题设定
可以在next主题目录下的_config.yml文件中修改

```
# Schemes
scheme: Muse
#scheme: Mist
#scheme: Pisces
#scheme: Gemini
```
### 基础设置
在站点目录下的配置文件_cofig.yml中修改

```
# Site
title: your blog title
subtitle:
description: describe yourself
keywords:
author: yourname
language: zh-Hans //简体中文
timezone:
```
### 修改菜单项
在主题目录下修改配置文件_cofig.yml中的menu

```
menu:
  home: / || home
  about: /about/ || user
  tags: /tags/ || tags
  categories: /categories/ || th
  archives: /archives/ || archive
  #schedule: /schedule/ || calendar
  #sitemap: /sitemap.xml || sitemap
  #commonweal: /404/ || heartbeat
```
这些配置都要与你主题目录下的languages文件中对应的yml文档里配置相关联

```
menu:
  home: 首页
  archives: 归档
  categories: 分类
  tags: 标签
  about: 关于
  search: 搜索
  schedule: 日程表
  sitemap: 站点地图
  commonweal: 公益404
```
### 限定主页文章高度
修改主题目录下的值

```
auto_excerpt:
  enable: true
  length: 150
```
### 设置头像

修改主题目录下Sidebar Avatar的avatar值
```
# Sidebar Avatar
# in theme directory(source/images): /images/avatar.gif
# in site  directory(source/uploads): /uploads/avatar.gif
avatar: /images/avatar.jpg
```


地址可以是网络地址，也可以是本地地址（放置在source/images/ 目录下）

### 添加标签页面
点击标签，跳转的页面会显示page not found

此时需要在站点目录的source文件夹里新建tags文件夹，并新建index.md，添加：

```
---
title: tags
date: 
type: "tags"
---
```
当要为某一篇文章添加标签，只需在blog/source/_post目录下的具体文章的tags中添加标签即可

### 实现点击出现桃心效果
将代码copy到/themes/next/source/js/src里面新建的love.js中

```
! function(e, t, a) {
    function n() {
        c(".heart{width: 10px;height: 10px;position: fixed;background: #f00;transform: rotate(45deg);-webkit-transform: rotate(45deg);-moz-transform: rotate(45deg);}.heart:after,.heart:before{content: '';width: inherit;height: inherit;background: inherit;border-radius: 50%;-webkit-border-radius: 50%;-moz-border-radius: 50%;position: fixed;}.heart:after{top: -5px;}.heart:before{left: -5px;}"), o(), r()
    }

    function r() {
        for (var e = 0; e < d.length; e++) d[e].alpha <= 0 ? (t.body.removeChild(d[e].el), d.splice(e, 1)) : (d[e].y--, d[e].scale += .004, d[e].alpha -= .013, d[e].el.style.cssText = "left:" + d[e].x + "px;top:" + d[e].y + "px;opacity:" + d[e].alpha + ";transform:scale(" + d[e].scale + "," + d[e].scale + ") rotate(45deg);background:" + d[e].color + ";z-index:99999");
        requestAnimationFrame(r)
    }

    function o() {
        var t = "function" == typeof e.onclick && e.onclick;
        e.onclick = function(e) {
            t && t(), i(e)
        }
    }

    function i(e) {
        var a = t.createElement("div");
        a.className = "heart", d.push({
            el: a,
            x: e.clientX - 5,
            y: e.clientY - 5,
            scale: 1,
            alpha: 1,
            color: s()
        }), t.body.appendChild(a)
    }

    function c(e) {
        var a = t.createElement("style");
        a.type = "text/css";
        try {
            a.appendChild(t.createTextNode(e))
        } catch (t) {
            a.styleSheet.cssText = e
        }
        t.getElementsByTagName("head")[0].appendChild(a)
    }

    function s() {
        return "rgb(" + ~~(255 * Math.random()) + "," + ~~(255 * Math.random()) + "," + ~~(255 * Math.random()) + ")"
    }
    var d = [];
    e.requestAnimationFrame = function() {
        return e.requestAnimationFrame || e.webkitRequestAnimationFrame || e.mozRequestAnimationFrame || e.oRequestAnimationFrame || e.msRequestAnimationFrame || function(e) {
            setTimeout(e, 1e3 / 60)
        }
    }(), n()
}(window, document);
```
打开\themes\next\layout\_layout.swig文件,在末尾（在前面引用会出现找不到的bug） ，引用love.js

```
<script src="/js/src/love.js" type="text/javascript"></script>
```

### 添加动态背景
打开\themes\next\layout\_layout.swig文件，
在 </body>之前添加代码(注意不要放在< /head>的后面)

```
{% if theme.canvas_nest %}
<script type="text/javascript" src="//cdn.bootcss.com/canvas-nest.js/1.0.0/canvas-nest.min.js"></script>
{% endif %}
```
打开开\themes\next\_config.yml,在里面修改为如下代码

```
canvas_nest: true
```


### 在网站底部加上访问量
打开\themes\next\layout\_partials\footer.swig文件,在类copyright前加上这段代码：

```
<script async src="https://dn-lbstatics.qbox.me/busuanzi/2.3/busuanzi.pure.mini.js"></script>
```
然后在合适的位置添加显示统计的代码：

```
<div class="powered-by">
<i class="fa fa-user-md"></i><span id="busuanzi_container_site_uv">
  本站访客数:<span id="busuanzi_value_site_uv"></span>
</span>
</div>
```

### 在每篇文章末尾添加“本文结束”标记
在路径 \themes\next\layout\_macro 中新建 passage-end-tag.swig 文件,并添加以下内容

```
<div>
    {% if not is_index %}
        <div style="text-align:center;color: #ccc;font-size:14px;">-------------本文结束<i class="fa fa-paw"></i>感谢您的阅读-------------</div>
    {% endif %}
</div>
```
接着打开\themes\next\layout\_macro\post.swig文件，在post-body 之后， post-footer 之前添加如下代码

```
<div>
  {% if not is_index %}
    {% include 'passage-end-tag.swig' %}
  {% endif %}
</div>
```
打开主题配置文件,在末尾添加

```
# 文章末尾添加“本文结束”标记
passage_end_tag:
  enabled: true
```

### 侧边栏社交链接
在主题配置文件中修改：

```
# Social links
social:
  GitHub: https://github.com/your-user-name
  Twitter: https://twitter.com/your-user-name
  微博: http://weibo.com/your-user-name

# Social Icons
social_icons:
  enable: true
  # Icon Mappings
  GitHub: github
  Twitter: twitter
  微博: weibo
```
###  添加小图标
在主题配置文件中修改：

```
favicon:
  #small: /images/favicon.ico
  medium: /images/favicon.ico
```


> [NexT主题美化](http://theme-next.iissnan.com/getting-started.html#avatar-setting)

除了NexT还有很多其他好看的主题，百度会有很多方法的