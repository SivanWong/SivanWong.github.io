---
title: CSS：BFC
Date: 2020-05-14
tags: [CSS]
categories: CSS
comments: true
---

### BFC定义
块级格式化上下文，是指一个独立的块级渲染区域。该区域拥有一套渲染规则来约束块级盒子的布局，且与区域外部无关。

### BFC生成
满足下列css声明之一的元素便会生成BFC
- 根元素或其它包含它的元素
- float的值不为none；
- overflow的值不为visible；
- position的值不为static；
- display的值为inline-block、table-cell、table-caption；
- flex boxes (元素的display: flex或inline-flex)；

### BFC布局规则
- 内部的元素会在垂直方向一个接一个地排列，可以理解为是BFC中的一个常规流
- 元素垂直方向的距离由margin决定，即属于同一个BFC的两个相邻盒子的margin可能会发生重叠
- 每个元素的左外边距与包含块的左边界相接触(从左往右，否则相反)，即使存在浮动也是如此，这说明BFC中的子元素不会超出它的包含块
- BFC的区域不会与float元素区域重叠
- 计算BFC的高度时，浮动子元素也参与计算
- BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素，反之亦然
- 位于不同BFC下的相邻元素之间不会发生margin重叠

### BFC的应用
#### 解决margin塌陷和margin合并问题
- margin塌陷为父子元素都设置margin，只取最大的一个。解决方法为父元素触发bfc，使其遵循bgc渲染规则。
- margin合并的原理为它们处于同一个BFC中，符合“属于同一个BFC的两个相邻元素的margin会发生重叠”的规则。解决方法为在其中一个元素外面包裹一层容器，并触发容器生成一个BFC（overflow：hidden），使两个元素处于不同的BFC。

#### 解决高度塌陷问题
当我们不给父节点设置高度，子节点设置浮动的时候，会发生高度塌陷，这个时候我们就要清除浮动。

给父元素设置overflow：hidden可以清除子元素的浮动是应用了BFC的原理：给父元素设置overflow：hidden触发了BFC，形成一个独立的渲染区域，所以内部的元素就不会影响外面的布局，BFC把浮动的子元素的高度当作自己的高度去处理溢出，从外面看起来就是清除了浮动

#### 解决侵占浮动元素的问题
当一个元素浮动，另一个元素不浮动时，浮动元素因为脱离文档流，就会盖在不浮动的元素上。

解决方法：不浮动的元素也设为浮动，或者添加overflow：hidden

原理：为不浮动的元素建立BFC环境，BFC不与float box重叠。