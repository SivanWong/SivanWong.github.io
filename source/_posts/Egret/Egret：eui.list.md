---
title: Egret：eui.list
date: 2021-02-20
tags: [Egret]
categories: Egret
comments: true
---

## 起因
简易版的引导轮播图

优化前
- 不利于添加新的引导
- 中途退出需要从头开始

优化后
- 添加新引导，修改guide数组即可
- 中途退出从下一张开始展示
- 若没有浏览到最后一张，且更换设备，需要从头开始

## 列表渲染
### vue
v-for，数据绑定

### egret
#### eui.List
- dataProvider：列表数据源
- allowMultipleSelection：是否允许多选
- selectedIndex：选中项目的基于 0 的索引
- selectedIndices：当前选中的一个或多个项目的索引列表
- selectedItems：表示当前选定数据项的列表

#### eui.ItemRenderer
属性
- data：要呈示或编辑的数据
- itemIndex：项呈示器的数据提供程序中的项目索引
- selected：如果项呈示器可以将其自身显示为已选中，则为 true

方法
- dataChanged()
- touchCaptured()
- onTouchCancle()
- onTouchBegin()
- onStageTouchEnd()
- getCurrentState()

#### eui.ArrayCollection
- addItem()：向列表末尾添加指定项目。
- addItemAt()：在指定的索引处添加项目。
- getItemAt()：获取指定索引处的项目。
- getItemIndex()：如果项目位于列表中，返回该项目的索引。
- itemUpdated()：通知视图，某个项目的属性已更新。
- refresh()：在对数据源进行排序或过滤操作后可以手动调用此方法刷新所有数据，以更新视图。
- removeAll()：删除列表中的所有项目。
- removeItemAt()：删除指定索引处的项目并返回该项目。
- replaceAll()：用新数据源替换原始数据源，此方法与直接设置source不同，它不会导致目标视图重置滚动位置。
- replaceItemAt()：替换在指定索引处的项目，并返回该项目。

#### eui.CheckBox
- selected：按钮处于按下状态时为 true，而按钮处于弹起状态时为 false

#### eui.skin
- states：为此组件定义的视图状态。
```
// 使用：属性.状态
 <e:Skin states="up,down">
     <e:Image source.up="guide_json.image_turning1"  source.down="guide_json.image_turning2"/>
</e:Skin>
```

## 参考链接
[Egret List + ItemRenderer使用](https://564239493.github.io/2018/05/20/Egret%20List+ItemRenderer%E4%BD%BF%E7%94%A8/)