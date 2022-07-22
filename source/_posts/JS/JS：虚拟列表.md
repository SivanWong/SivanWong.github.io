---
title: JS：虚拟列表
date: 2021-07-12
tags: [JS]
categories: JS
comments: true
---

### 特性
- 循环列表
- 重复利用

### 实现思路
#### item的循环利用
- 自左往右滚动时，将离开视图右方一定距离的item通过设置坐标调整到左方，更新数据成为新的item。
- 自右往左滚动时，将离开视图左方一定距离的item通过设置坐标调整到右方，更新数据成为新的item。

#### 持续滚动的循环列表
![image](https://upload-images.jianshu.io/upload_images/11999503-083a4777e89c5529.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

- 自右往左滚动时，更新item坐标的同时，并实时增加content的高度。
- 可以在初始化数据时可计算好content的高度，但实时更新也可以，同时也可以实现按需加载。

![image](https://upload-images.jianshu.io/upload_images/11999503-7fcf006dfbdba6ee.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

- 滚动时，更新item坐标的同时，更新content的位置，同时，将所有item的坐标相对于content的位置更新。
- 以上需要在一帧内完成，这样才能不影响用户体验。

### 具体实现
#### 属性配置

```
// 可循环使用的item数量
reusableCount: number;
// 上一次content的位置，用于判断左滑还是右滑
lastContentX: number;
// 第一个item的位置
startX: number;
```

#### 初始化
1. 根据view的宽度计算可用于循环使用的item数量。尽量有1-2个是在view之外的。
2. 记录当前content的位置，用于判断左滑还是右滑
3. 记录第一个item的位置，防止右滑时渲染过多的数据。

#### 滚动
1. 根据当前 content 的位置与 lastContentX 的对比，来判断方向，以决定新的item往左添加还是往右添加。
2. 左滑时，当 item 离开 view 左侧一定距离时，重新设置 item 的位置，x值增加，并且设置新的数据，content 的宽度也增加。

```
const offset = (this.itemWidth + this.gap) * this.items.length
item.setPosition(item.position.x + offset, 0);
this.scrollView.content.width += this.itemWidth + this.gap;
```
3. 右滑，只需要把离开 view 右侧一定距离的 item 重新设置位置和数据即可，不需要增加 content 的宽度。

