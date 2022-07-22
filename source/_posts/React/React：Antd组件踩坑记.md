---
title: React：Antd组件踩坑记
date: 2021-01-11
tags: [React]
categories: React
comments: true
---

### Form

- 问题：表单中的Select组件设置value值无效
- 解决：Select中增加key属性，取值与value值一致


- 问题：item中无法设置value，
- 解决：通过initialValues设置

### Select
- 问题：动态设置的Select组件设置defaultValue值无效
- 解决：Select中增加key属性，取值与defaultValue值一致