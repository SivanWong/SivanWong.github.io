---
title: cocos：事件机制
Date: 2021-07-05
tags: [cocos]
categories: cocos
comments: true
---

### 事件监听
事件处理大多数是在节点（Node）中完成的。对于组件，可以通过访问节点 this.node 来注册和监听事件。监听事件可以通过 this.node.on() 函数来注册，方法如下：

```
// 该事件监听每次都会触发，需要手动取消注册
xxx.on(type, func, target?);

// 该事件监听在监听函数响应后就会关闭监听事件。
xxx.once(type, func, target?);
```

- type 为事件注册字符串
- func 为执行事件监听的回调
- target 为事件接收对象
- 如果 target 没有设置，则回调里的 this 指向的就是当前执行回调的对象。

值得一提的是，事件监听函数 on 第三个参数 target，主要是绑定响应函数的调用者。以下两种调用方式，效果上是相同的

```
// 使用函数绑定
this.node.on(Node.EventType.MOUSE_DOWN, function ( event ) {
  this.enabled = false;
}.bind(this));

// 使用第三个参数
this.node.on(Node.EventType.MOUSE_DOWN, (event) => {
  this.enabled = false;
}, this);
```

### 事件取消
当我们不再关心某个事件时，我们可以使用 off 方法关闭对应的监听事件。

off 方法的使用方式有两种：

```
// 取消对象身上所有注册的该类型的事件
xxx.off(type);
// 取消对象身上该类型指定回调指定目标的事件
xxx.off(type, func, target);
```
需要注意的是，off 方法的参数必须和 on 方法的参数一一对应，才能完成关闭。

我们推荐的书写方法如下：

```
import { _decorator, Component, Node } from 'cc';
const { ccclass } = _decorator;

@ccclass("Example")
export class Example extends Component {
    onEnable () {
        this.node.on('foobar', this._sayHello, this);
    }

    onDisable () {
        this.node.off('foobar', this._sayHello, this);
    }

    _sayHello () {
        console.log('Hello World');
    }
}
```

### 事件派发
触发事件有两种方式：
- emit
- dispatchEvent，可以做事件传递

#### emit

```
// 事件派发的时候可以指定派发参数，参数最多只支持 5 个事件参数
xxx.emit(type, ...args);
```

在触发事件时，我们可以在 emit 函数的第二个参数开始传递我们的事件参数。同时，在 on 注册的回调里，可以获取到对应的事件参数。


```
import { _decorator, Component, Node } from 'cc';
const { ccclass } = _decorator;

@ccclass("Example")
export class Example extends Component {
    onLoad () {
        this.node.on('foo', (arg1, arg2, arg3) => {
            console.log(arg1, arg2, arg3);  // print 1, 2, 3
        });
    }

    start () {
        let arg1 = 1, arg2 = 2, arg3 = 3;
        // At most 5 args could be emit.
        this.node.emit('foo', arg1, arg2, arg3);
  }
}
```
需要说明的是，出于底层事件派发的性能考虑，这里最多只支持传递 5 个事件参数。所以在传参时需要注意控制参数的传递个数。

#### dispatchEvent
- 通过 dispatchEvent 方法派发的事件，会进入事件派发阶段。
- 在 Cocos Creator 的事件派发系统中，我们采用冒泡派发的方式。
- 冒泡派发会将事件从事件发起节点，不断地向上传递给它的父级节点，直到到达根节点或者在某个节点的响应函数中做了中断处理 event.propagationStopped = true。


在 v3.0 中，我们移除了 Event.EventCustom 类，如果要派发自定义事件，需要先实现一个自定义的事件类，该类继承自 Event 类。

```
// Event 由 cc 模块导入
import { Event } from 'cc';

class MyEvent extends Event {
    constructor(name: string, bubbles?: boolean, detail?: any) {
        super(name, bubbles);
        this.detail = detail;
    }
    public detail: any = null;  // 自定义的属性
}
```
![image](https://docs.cocos.com/creator/3.0/manual/zh/engine/event/bubble-event.png)

以上图为例，当我们从节点 c 发送事件 “foobar”，倘若节点 a，b 均做了 “foobar” 事件的监听，则事件会经由 c 依次传递给 b，a 节点。如：

```
// 节点 c 的组件脚本中
this.node.dispatchEvent( new MyEvent('foobar', true, 'detail info') );
```

如果我们希望在 b 节点截获事件后就不再传递事件，我们可以通过调用 event.propagationStopped = true 函数来完成。具体方法如下：

```
// 节点 b 的组件脚本中
this.node.on('foobar', (event: MyEvent) => {
  event.propagationStopped = true;
});
```

> 注意：在发送用户自定义事件的时候，请不要直接创建 cc 内的 Event 对象，因为它是一个抽象类。

### 系统内置事件

```
// 使用枚举类型来注册，推荐
node.on(Node.EventType.MOUSE_DOWN, (event) => {
  console.log('Mouse down');
}, this);

// 使用事件名来注册
node.on('mouse-down', (event) => {
  console.log('Mouse down');
}, this);
```

### 触摸事件
#### 触摸事件冒泡
触摸事件支持节点树的事件冒泡，以下图为例：
![image](https://docs.cocos.com/creator/3.0/manual/zh/engine/event/propagation.png)
在图中的场景里，假设 A 节点拥有一个子节点 B，B 拥有一个子节点 C。开发者对 A、B、C 都监听了触摸事件（以下的举例都默认节点监听了触摸事件）。

- 当鼠标或手指在 C 节点区域内按下时，事件将首先在 C 节点触发，C 节点监听器接收到事件。
- 接着 C 节点会将事件向其父节点传递这个事件，B 节点的监听器将会接收到事件。
- 同理 B 节点会将事件传递给 A 父节点。这就是最基本的事件冒泡过程。
- 需要强调的是，在触摸事件冒泡的过程中不会有触摸检测，这意味着即使触点不在 A B 节点区域内，A B 节点也会通过触摸事件冒泡的机制接收到这个事件。

触摸事件的冒泡过程与普通事件的冒泡过程并没有区别。所以，调用 event.propagationStopped = true; 可以主动停止冒泡过程。

#### 同级节点间的触点归属问题
- 假设上图中 B、C 为同级节点，C 节点部分覆盖在 B 节点之上。
- 这时候如果 C 节点接收到触摸事件后，就宣布了触点归属于 C 节点，这意味着同级节点的 B 就不会再接收到触摸事件了，
- 即使触点同时也在 B 节点内。同级节点间，触点归属于处于顶层的节点。
- 此时如果 C 节点还存在父节点，则还可以通过事件冒泡的机制传递触摸事件给父节点。

#### 不同 Canvas 的触点归属问题
- 不同 Canvas 之间的触点拦截是根据优先级决定的。
- 在下图中的场景里，节点树里的 Canvas 1-5 对应图片显示的 priority 1-5。
- 可以看出，即使 Canvas 节点 3、4、5 之间是按乱序排的，但是根据 Canvas 上的优先级（priority）关系，触点的响应先后顺序仍然是 Canvas5 -> Canvas4 -> Canvas3 -> Canvas2 -> Canvas1。
- 只有在优先级相同的情况下， Canvas 之间的排序是按节点树的先后顺序进行。

![image](https://docs.cocos.com/creator/3.0/manual/zh/engine/event/multi-canvas.png)

#### 将触摸或鼠标事件注册在捕获阶段
- 有时候我们需要父节点的触摸或鼠标事件先于它的任何子节点派发，比如 ScrollView 组件就是这样设计的。
- 这时候事件冒泡已经不能满足我们的需求了，需要将父节点的事件注册在捕获阶段。
- 要实现这个需求，可以在给 node 注册触摸或鼠标事件时，传入第四个参数 true，表示 useCapture。

```
this.node.on(Node.EventType.TOUCH_START, this.onTouchStartCallback, this, true);
```

当节点触发 touch-start 事件时，会先将 touch-start 事件派发给所有注册在捕获阶段的父节点监听器，然后派发给节点自身的监听器，最后才到了事件冒泡阶段。

> 只有触摸或鼠标事件可以注册在捕获阶段，其他事件不能注册在捕获阶段。

#### 事件拦截
- 正常的事件是会按照以上说明的方式去派发。
- 但是如果节点身上带有 ==Button==,==Toggle== 或者 ==BlockInputEvents== 这几个组件的话，是会停止事件冒泡。

还是看下图。图中有两个按钮，Canvas0 下的 priority 1 和 Canvas1 下的 priority 2。
![image](https://docs.cocos.com/creator/3.0/manual/zh/engine/event/events-block.png)
- 如果点击两个按钮的交汇处，也就是图中蓝色区域，会出现按钮 priority 2 成功接收到了触点事件，而按钮 priority 1 则没有。
- 那是因为按上述的事件接收规则，按钮 priority 2 优先接收到了触点事件，并且对事件进行了拦截（event.propagationStopped = true），防止事件穿透。
- 如果是非按钮节点，也可以通过添加 BlockInputEvents 组件来对事件进行拦截，防止穿透。

#### 触摸事件举例
以下图举例，总结下触摸事件的传递机制。图中有 A、B、C、D 四个节点，其中 A、B 为同级节点。具体层级关系如下：
![image](https://docs.cocos.com/creator/3.0/manual/zh/engine/event/example.png)
1. 若触点在 A、B 的重叠区域内，此时 B 接收不到触摸事件，事件的传递顺序是 A -> C -> D
2. 若触点在 B 节点内（可见的绿色区域），则事件的传递顺序是 B -> C -> D
3. 若触点在 C 节点内，则事件的传递顺序是 C -> D
4. 若以第 2 种情况为前提，同时 C D 节点的触摸事件注册在捕获阶段，则事件的传递顺序是 D -> C -> B