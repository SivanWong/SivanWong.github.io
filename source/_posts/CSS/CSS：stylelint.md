---
title: CSS：stylelint
date: 2022-04-26
tags: [CSS]
categories: CSS
comments: true
---

### 安装

```
npm install -D stylelint
```

官方推荐基本配置
```
npm install -D stylelint-config-standard stylelint-config-prettier
```
共享配置扩展

```
npm install -D stylelint-config-standard-scss stylelint-config-prettier-scss
```
### 配置文件
.stylelintrc.js
```
module.exports = {
  extends: [
    "stylelint-config-standard-scss",
    "stylelint-config-prettier-scss"
  ],
  rules: {
    
  }
}
```
### vscode插件
1. 安装插件stylelint
2. 修改setting.json

```
"stylelint.enable": true,
"css.validate": false,
"less.validate": false,
"scss.validate": false,
"stylelint.validate": ["css", "scss", "less"]
```
==修改完成后需要重启编辑器==

### webpack插件
安装
```
npm i -D stylelint-webpack-plugin
```
使用

```
const StyleLintPlugin = require('stylelint-webpack-plugin');
new StyleLintPlugin({
    context: "src",
    configFile: path.resolve(__dirname, '.stylelintrc.js'), // 指定 stylelint 配置的文件 
    quiet: true
}),
```

### 问题
1. TypeError: Class extends value undefined is not a constructor or null

```
npm i -D postcss@8
```

2. 