---
title: Electron进阶：打开新窗口
date: 2018-11-14
tags: [Electron]
categories: Electron
comments: true
---

## 标签实现新窗口打开
- 增加 target="_blank"属性
- router-link标签只有tag=”a”模式下 target=”_blank” 属性才会生效（vue2）

## 编程式导航

```
let routeData = this.$router.resolve({ 
name: "searchGoods", 
query: params, 
params:{catId:params.catId} 
}); 
window.open(routeData.href, '_blank');
```

