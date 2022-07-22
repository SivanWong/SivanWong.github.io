---
title: Vue：MVVM、MVC、MVP
date: 2019-11-08
tags: [Vue]
categories: Vue
comments: true
---

### MVC

M代表Model，代表数据模型。

V代表View，代表视图。

C代表Controller，代表控制器，用来处理数据。

#### 工作模式
用户操作视图View，当数据改变时，传到Controller进行数据的处理，继而更新到Model，Model的更新会通过观察者模式通知View，View通过观察者模式收到Model变更的消息后，向Model请求最新的数据，自己同步更新视图。
#### 优点
观察者模式可以做到多视图同时更新。
#### 缺点
- controller测试困难。
- view无法组件化，它强依赖特定的Model，不同程序的Model不一样。


### MVP

M代表Model，代表数据模型。

V代表View，代表视图。

P代表Presenter，代表呈现。

#### 工作模式
用户操作视图View，当数据改变时，传到Presenter进行数据的处理，继而更新到Model，Model的更新会通过观察者模式通知Presenter，Presenter获取到Model变更的消息后，通过View提供的接口更新界面。

#### 和MVC的不同
M和V是隔离的。
#### 优点
- 便于测试。
- 可以组件化
#### 缺点
由于需要大量的手动同步View和Model，导致维护起来很困难。

### MVVM

vue和angular都为mvvm框架

M代表Model，代表数据模型，可以在Model中定义数据修改和操作的业务逻辑。

V代表View，代表视图，它负责将数据模型转化成UI展现出来。

VM代表ViewModel，负责监听模型数据的改变和控制视图行为、处理用户交互。简单理解就是一个同步View和Model的对象，连接View和Model。

MVVM是以双向数据传输为思想的。ViewModel通过双向数据绑定把View和Model连接起来，View数据的变化会同步到Model中，而Model数据的变化也会立即反映到View上。
#### 优点
解决MVP大量的手动同步View和Model的问题，提供双向绑定机制。
#### 缺点
- 过于简单的图形界面不适用。
- 没法断点debug，数据绑定的声明是指令式地写在View的模板当中的。

