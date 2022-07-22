---
title: react：踩坑记
Date: 2021-05-08
tags: [react]
categories: react
comments: true
---

- 使用useState时没有触发渲染，可能是因为将已有的对象传递过去，它认为没有改变，可以这样处理

```
setNumbers([..old]);
```
- 多个表单不要放同一页面，拆分成多个组件
- Redirect一般都放Switch里面，必须放在Switch最后一行（含义：如果上面的路由都匹配不到时，跳转到redirect配置的页面）
- <Switch>里不能使用div，否则会报错

![image](https://user-images.githubusercontent.com/22449281/44148180-c3a6a46a-a0c9-11e8-8184-608194dde57f.png)