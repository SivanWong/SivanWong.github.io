---
title: CSS：模块化
date: 2019-05-30
tags: [CSS]
categories: CSS
comments: true
---

## 文件结构
### 常见文件结构
一个项目的CSS最基本结构通常是下面这样的：

- base.css
- common.css
- pages.css

复杂一点的项目可能是这样分：

- base.css
- header.css
- footer.css
- sidebar.css
- forms.css
- icons.css
- buttons.css
- dropdown.css
- modals.css
- layout.css
- index.css
- user.css
- admin.css
- pages.css

如果后期不打算合并CSS的，建议尽可能减少 CSS 文件的数量。

### SMACSS
SMACSS 的全称叫 Scalable and Modular Architecture for CSS。即可扩展和模块化的CSS架构。

SMACSS将样式分成5种类型：Base，Layout，Module，State，Theme
- Base: 基础样式表，定义了基本的样式，我们平时写CSS比如reset.css就是属于基础样式表，另外我认为清除浮动，一些动画也可以归类为基础样式。
- Layout: 布局样式，用于实现网页的基本布局，搭起整个网页的基本骨架。
- Module: 网页中不同的区域有这个不同的功能，这些功能是相对独立的，我们可以称其为模块。模块是独立的，可重用的组件，它们不依赖于布局组件，可以安全的删除修改而不影响其他模块。
- State: 状态样式，通常和js一起配合使用，表示某个组件或功能不同的状态，比如菜单选中状态，按钮不可用状态等。
- Theme: 主题皮肤，对于可更换皮肤的站点来说，这个是很有必要的，分离了结构和皮肤，根据不同的皮肤应用不同的样式文件。

## css选择器命名规则
它的每一条规则都是全局的，在 CSS 预处理出现之前，这很容易造成命名上的冲突。    当涉及到多人维护同一段 CSS 代码时，命名的意义表达，也会影响到维护效率。
- 使用独一无二的规则。命名唯一。
- 使用简短的命名。
- 嵌套层级不宜过深，建议控制在3层以内。

### BEM
BEM是Block，Element，Modifier的缩写。是比较流行的一种 CSS 命名方式。
- Block：在BEM的理论中，一个网页是由block组成的，比如头部是个block，内容是block，logo也是block，一个block可能由几个子block组成。
- Element：element是block的一部分，具有某种功能，element依赖于block，比如在logo中，img是logo的一个element，在菜单中，菜单项是菜单的一个element
- Modifier：modifier是用来修饰block或者element的，它表示block或者element在外观或行为上的改变

```
命名规则如下：
.block {}
.block__element {}
.block--modifier {}
例如：
.login {}
.login__btn {}
.login__btn--reset {}
.login__btn--confirm {}
```
下划线（__）被用来区分元素，而用连字符(--)是用来修饰元素的。

### SUIT
Suit起源于BEM，但是它对组件名使用驼峰式和连字号把组件从他们的修饰和子孙后代中区分出来.