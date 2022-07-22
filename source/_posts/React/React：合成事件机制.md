---
title: React：合成事件机制
date: 2022-06-28
tags: [React]
categories: React
comments: true
---

由于fiber机制的特点，生成一个fiber节点时，它对应的dom节点有可能还未挂载，onClick这样的事件处理函数作为fiber节点的prop，也就不能直接被绑定到真实的DOM节点上。

为此，React提供了一种“顶层注册，事件收集，统一触发”的事件机制。
- 顶层注册：是在document上绑定一个统一的事件处理函数（React17的事件是注册到root上而非document），此函数并非我们写在组件中的事件处理函数。
- 事件收集：事件触发时（实际上是上述被绑定的事件处理函数被执行），构造合成事件对象，按照冒泡或捕获的路径去组件中收集真正的事件处理函数。
- 统一触发：发生在收集过程之后，对所收集的事件逐一执行，并共享同一个合成事件对象。

# 事件注册
> 与之前版本不同，React17的事件是注册到root上而非document，这主要是为了渐进升级，避免多版本的React共存的场景中事件系统发生冲突。

当我们为一个元素绑定事件时，会这样写：

```
<div onClick={() => {/*do something*/}}>React</div>
```
这个div节点最终要对应一个fiber节点，onClick则作为它的prop。当这个fiber节点进入==render阶段的complete阶段==时，名称为onClick的prop会被识别为事件进行处理。

> react有一个对象registrationNameDependencies，存储了所有React事件对应的原生DOM事件的集合，这是识别prop是否为事件的依据。如果是事件类型的prop，那么将会调用ensureListeningTo去绑定事件。

绑定过程：
1. 根据React的事件名称寻找该事件依赖。例如onMouseEnter事件依赖了mouseout和mouseover两个原生事件，onClick只依赖了click一个原生事件。
2. 依据组件中写的事件名识别其属于哪个阶段的事件（冒泡或捕获）。例如onClickCapture这样的React事件名称就代表是需要事件在捕获阶段触发，而onClick代表事件需要在冒泡阶段触发。
3. 根据React事件名，找出对应的原生事件名。例如click，并根据上一步来判断是否需要在捕获阶段触发，调用addEventListener，将事件监听绑定到document上。
4. 若事件需要更新，那么先移除事件监听，再重新绑定，绑定过程重复以上三步。

经过这一系列过程，==事件监听器listener==最终被绑定到document上。

## 事件监听器listener
上面绑定事件的过程中，会在document中绑定一个事件监听函数，一开始在说顶层注册的时候有提到，这个事件监听函数并不是我们直接在组件里写的事件处理函数。

react通过调用一个方法createEventListenerWrapperWithPriority，来生成listener，绑定在document上的就是这个listener。

## createEventListenerWrapperWithPriority
根据事件名或者传入的优先级（如果没有传入优先级，会根据传入的事件名称先去找对应的事件优先级），返回不同的事件监听函数。
```
 // 根据事件名称，创建不同优先级的事件监听器。
  let listener = createEventListenerWrapperWithPriority(
    targetContainer,
    domEventName,
    eventSystemFlags,
    listenerPriority,
  );

  // 绑定事件
  if (isCapturePhaseListener) {
    ...
    unsubscribeListener = addEventCaptureListener(
      targetContainer,
      domEventName,
      listener,
    );
  } else {
    ...
    unsubscribeListener = addEventBubbleListener(
      targetContainer,
      domEventName,
      listener,
    );
  }
```
```
export function createEventListenerWrapperWithPriority(
  targetContainer: EventTarget,
  domEventName: DOMEventName,
  eventSystemFlags: EventSystemFlags,
  priority?: EventPriority,
): Function {
  const eventPriority =
    priority === undefined
      ? getEventPriorityForPluginSystem(domEventName)
      : priority;
  let listenerWrapper;
  switch (eventPriority) {
    case DiscreteEvent:
      listenerWrapper = dispatchDiscreteEvent;
      break;
    case UserBlockingEvent:
      listenerWrapper = dispatchUserBlockingUpdate;
      break;
    case ContinuousEvent:
    default:
      listenerWrapper = dispatchEvent;
      break;
  }
  return listenerWrapper.bind(
    null,
    domEventName,
    eventSystemFlags,
    targetContainer,
  );
}
```

- 优先级：事件优先级，是根据事件的交互程度划分的。优先级和事件名的映射关系存在于一个Map结构中。
    - 离散事件（DiscreteEvent）：click、keydown、focusin等，这些事件的触发不是连续的，优先级为0。
    - 用户阻塞事件（UserBlockingEvent）：drag、scroll、mouseover等，特点是连续触发，阻塞渲染，优先级为1。
    - 连续事件（ContinuousEvent）：canplay、error、audio标签的timeupdate和canplay，优先级最高，为2。
- 事件监听包装器：真正绑定在document上的就是这个事件监听包装器。不同包装器持有各自的优先级，当对应的事件触发时，调用的其实是这个包含优先级的事件监听。
    - dispatchDiscreteEvent: 处理离散事件
    - dispatchUserBlockingUpdate：处理用户阻塞事件
    - dispatchEvent：处理连续事件
- 参数eventSystemFlags：
    - 事件系统的一个标志，记录事件的各种标记，其中一个标记就是IS_CAPTURE_PHASE，这表明了当前的事件是捕获阶段触发。当事件名含有Capture后缀时，eventSystemFlags会被赋值为IS_CAPTURE_PHASE。
    - 在以优先级创建对应的事件监听时，eventSystemFlags会作为事件监听函数执行时的入参，传递进去。因此，在事件触发的时候就可以知道组件中的事件是以冒泡或是捕获的顺序执行。

```
function dispatchDiscreteEvent(
  domEventName,
  eventSystemFlags,
  container,
  nativeEvent,
) {
  ...
  discreteUpdates(
    dispatchEvent,
    domEventName,
    eventSystemFlags, // 传入事件执行阶段的标志
    container,
    nativeEvent,
  );
}
```

## 小结
1. 事件处理函数不是绑定到组件的元素上的，而是绑定到root上，这和fiber树的结构特点有关，即事件处理函数只能作为fiber的prop。
2. 绑定到root上的事件监听不是我们在组件里写的事件处理函数，而是一个持有事件优先级，并能传递事件执行阶段标志的监听器。


# 事件触发
## 概括 —— 事件监听器listener做了什么
负责以不同的优先级权重来触发真正的事件流程，并传递事件执行阶段标志（eventSystemFlags）。

也就是说绑定到document上的事件监听listener只是相当于一个传令官，它按照事件的优先级去安排接下来的工作：
1. 事件对象的合成
2. 将事件处理函数收集到执行路径
3. 事件执行

这样在后面的调度过程中，scheduler才能获知当前任务的优先级，然后展开调度。

### 如何将优先级传递出去？
- 利用scheduler中的runWithPriority函数，通过调用它，将优先级记录到利用scheduler中，所以调度器才能在调度的时候知道当前任务的优先级。
- runWithPriority的第二个参数，会去安排上面提到的三个工作。

以用户阻塞的优先级级别为例：
```
function dispatchUserBlockingUpdate(
  domEventName,
  eventSystemFlags,
  container,
  nativeEvent,
) {
    ...
    runWithPriority(
      UserBlockingPriority,
      dispatchEvent.bind(
        null,
        domEventName,
        eventSystemFlags,
        container,
        nativeEvent,
      ),
    );
}
```
### dispatchEventsForPlugins
事件监听最终触发的是dispatchEventsForPlugins。这个函数体可看成两部分：==事件对象的合成和事件收集==、==事件执行==，涵盖了上述三个过程。

```
function dispatchEventsForPlugins(
  domEventName: DOMEventName,
  eventSystemFlags: EventSystemFlags,
  nativeEvent: AnyNativeEvent,
  targetInst: null | Fiber,
  targetContainer: EventTarget,
): void {
  const nativeEventTarget = getEventTarget(nativeEvent);
  const dispatchQueue: DispatchQueue = [];

  // 事件对象的合成，收集事件到执行路径上
  extractEvents(
    dispatchQueue,
    domEventName,
    targetInst,
    nativeEvent,
    nativeEventTarget,
    eventSystemFlags,
    targetContainer,
  );

  // 执行收集到的组件中真正的事件
  processDispatchQueue(dispatchQueue, eventSystemFlags);
}
```

dispatchEventsForPlugins函数中事件的流转有一个重要的载体：
- dispatchQueue：它承载了本次合成的事件对象和收集到事件执行路径上的事件处理函数。其元素中包含两个对象：
    - listeners是事件执行路径
    - event是合成事件对象

![image](https://segmentfault.com/img/remote/1460000039108953)

## 事件对象的合成和事件的收集
### 合成事件对象
在组件中的事件处理函数中拿到的事件对象并不是原生的事件对象，而是经过React合成的==SyntheticEvent==对象。它解决了不同浏览器之间的兼容性差异。
### 事件执行路径
当事件对象合成完毕，会将事件收集到事件执行路径上。
#### 什么是事件执行路径呢？

在浏览器的环境中，若父子元素绑定了相同类型的事件，除非手动干预，那么这些事件都会按照冒泡或者捕获的顺序触发。

在React中也是如此，从触发事件的元素开始，依据fiber树的层级结构向上查找，累加上级元素中所有相同类型的事件，最终形成一个具有所有相同类型事件的数组，这个数组就是事件执行路径。通过这个路径，React自己模拟了一套事件捕获与冒泡的机制。

![image](https://segmentfault.com/img/remote/1460000039108955)

因为不同的事件会有不同的行为和处理机制，所以合成事件对象的构造和收集事件到执行路径需要通过插件实现。一共有5种Plugin：SimpleEventPlugin，EnterLeaveEventPlugin，ChangeEventPlugin，SelectEventPlugin，BeforeInputEventPlugin。它们的使命完全一样，只是处理的事件类别不同，所以内部会有一些差异。

### 创建合成事件对象
这个统一的事件对象由SyntheticEvent函数构造而成，它自己遵循W3C的规范又实现了一遍浏览器的事件对象接口，这样可以抹平差异，而原生的事件对象只不过是它的一个属性（nativeEvent）。

```
// 构造合成事件对象
const event = new SyntheticEvent(
    reactName,
    null,
    nativeEvent,
    nativeEventTarget,
    EventInterface,
);
```
### 收集事件到执行路径
这个过程是将组件中真正的事件处理函数收集到数组中，等待下一步的批量执行。

函数内部最重要的操作无疑是收集事件到执行路径，为了实现这一操作，需要在fiber树中从触发事件的源fiber节点开始，向上一直找到root（react17后是挂载在root上），形成一条完整的冒泡或者捕获的路径。同时，沿途路过fiber节点时，根据事件名，从props中获取我们真正写在组件中的事件处理函数，push到路径中，等待下一步的批量执行。

收集的过程由accumulateSinglePhaseListeners完成。

```
accumulateSinglePhaseListeners(
  targetInst,
  dispatchQueue,
  event,
  inCapturePhase,
  accumulateTargetOnly,
);
```

> 无论事件是在冒泡阶段执行，还是捕获阶段执行，都以同样的顺序（冒泡的顺序）push到dispatchQueue的listeners中，而冒泡或者捕获事件的执行顺序不同是由于清空listeners数组的顺序不同。

注意，每次收集只会收集与事件源相同类型的事件，比如子元素绑定了onClick，父元素绑定了onClick和onClickCapture，那么点击子元素时，收集的将是onClickChild 和 onClickParent。

![image](https://segmentfault.com/img/remote/1460000039108954)

### 合成事件对象如何参与到事件执行过程
上面我们说过，dispatchQueue的结构如下面这样


```
[
  {
    event: SyntheticEvent,
    listeners: [ listener1, listener2, ... ]
  }
]
```

- event就代表着合成事件对象，可以将它认为是这些listeners共享的一个事件对象。
- listeners则是以冒泡顺序收集到的同源事件的事件处理函数，此处函数是写在组件上的函数，绑定到document上时才会创建之前提到的事件监听器。
- 当清空listeners数组执行到每一个事件监听函数时，这个事件监听可以改变event上的currentTarget，也可以调用它上面的stopPropagation方法来阻止冒泡。event作为一个共享资源被这些事件监听消费，消费的行为发生在事件执行时。

## 事件执行
进入到事件执行过程，从头到尾循环该路径，依次调用每一项中的监听函数。这个过程的重点在于事件冒泡和捕获的模拟，以及合成事件对象的应用，如下是从dispatchQueue中提取出事件对象和时间执行路径的过程。
```
export function processDispatchQueue(
  dispatchQueue: DispatchQueue,
  eventSystemFlags: EventSystemFlags,
): void {
  const inCapturePhase = (eventSystemFlags & IS_CAPTURE_PHASE) !== 0;
  for (let i = 0; i < dispatchQueue.length; i++) {

    // 从dispatchQueue中取出事件对象和事件监听数组
    const {event, listeners} = dispatchQueue[i];

    // 将事件监听交由processDispatchQueueItemsInOrder去触发，同时传入事件对象供事件监听使用
    processDispatchQueueItemsInOrder(event, listeners, inCapturePhase);
  }
  // 捕获错误
  rethrowCaughtError();
}
```
### 模拟冒泡和捕获

冒泡和捕获的执行顺序是不一样的，但是当初在收集事件的时候，无论是冒泡还是捕获，事件都是直接push到路径里的。那么执行顺序的差异是如何体现的呢？答案是循环路径的顺序不一样导致了执行顺序有所不同。

首先回顾一下dispatchQueue中的listeners中的事件处理函数排列顺序：触发事件的目标元素的事件处理函数排在第一个，上层组件的事件处理函数依次往后排。

```
<div onClick={onClickParent}>
  父元素
  <div onClick={onClickChild}>
     子元素
  </div>
</div>
listeners: [ onClickChild, onClickParent ]
```

从左往右循环的时候，目标元素的事件先触发，父元素事件依次执行，这与冒泡的顺序一样，那捕获的顺序自然是从右往左循环了。模拟冒泡和捕获执行事件的代码如下：

其中判断事件执行阶段的依据inCapturePhase，它的来源在上面的透传透传事件执行阶段标志的内容里已经提到过，是根据eventSystemFlags产生的。

```
function processDispatchQueueItemsInOrder(
  event: ReactSyntheticEvent,
  dispatchListeners: Array<DispatchListener>,
  inCapturePhase: boolean,
): void {
  let previousInstance;

  if (inCapturePhase) {
    // 事件捕获倒序循环
    for (let i = dispatchListeners.length - 1; i >= 0; i--) {
      const {instance, currentTarget, listener} = dispatchListeners[i];
      if (instance !== previousInstance && event.isPropagationStopped()) {
        return;
      }
      // 执行事件，传入event对象，和currentTarget
      executeDispatch(event, listener, currentTarget);
      previousInstance = instance;
    }
  } else {
    // 事件冒泡正序循环
    for (let i = 0; i < dispatchListeners.length; i++) {
      const {instance, currentTarget, listener} = dispatchListeners[i];
      // 如果事件对象阻止了冒泡，则return掉循环过程
      if (instance !== previousInstance && event.isPropagationStopped()) {
        return;
      }
      executeDispatch(event, listener, currentTarget);
      previousInstance = instance;
    }
  }
}
```

至此，我们写在组件中的事件处理函数就被执行掉了，合成事件对象在这个过程中充当了一个公共角色，每个事件执行时，都会检查合成事件对象，有没有调用阻止冒泡的方法，另外会将当前挂载事件监听的元素作为currentTarget挂载到事件对象上，最终传入事件处理函数，我们得以获取到这个事件对象。

# 总结
由于fiber树的特点，一个组件如果含有事件的prop，那么将会在对应fiber节点的==commit阶段==绑定一个事件监听到root上，这个事件监听是持有优先级的，这将它和优先级机制联系了起来，可以把合成事件机制当作一个协调者，负责去协调合成事件对象、收集事件、触发真正的事件处理函数这三个过程。

在React底层，主要对合成事件做了两件事：

- **事件委派**：React会把所有的事件绑定到结构的最外层，使用统一的事件监听器，这个事件监听器上维持了一个映射来保存所有组件内部事件监听和处理函数。
- **自动绑定**：React组件中，每个方法的上下文都会指向该组件的实例，即自动绑定this为当前组件。

## 过程
1. 当这个fiber节点进入render阶段的complete阶段时，名称为onClick的prop会被识别为事件进行处理（如果是事件类型则会调用方法进行事件绑定）。
2. 当fiber节点进入commit阶段时，会将对应事件监听绑定在root/document上，此时绑定的是根据优先级创建的事件监听器listener。绑定过程：
    1. 根据React的事件名称寻找该事件依赖。
    2. 依据组件中写的事件名识别其属于哪个阶段的事件（冒泡或捕获）。
    3. 根据React事件名，找出对应的原生事件名。调用addEventListener，将事件监听绑定到document上。
    4. 若事件需要更新，那么先移除事件监听，再重新绑定，绑定过程重复以上三步。
3. click元素后，绑定在document上的listener被触发，listener将根据优先级进行以下工作：
    1. 从目标元素开始，根据监听器中透传的事件（执行阶段标志eventSystemFlags也是以这种方式入参）进行事件对象的合成，
    2. 以冒泡的顺序将事件处理函数push到执行路径中
    3. 根据执行阶段标志执行事件（捕获为从右到左，冒泡为从左到右）。每个事件执行时，都会检查合成事件对象里是否有调用阻止冒泡的方法，有的话会return掉循环（两种阶段一样，可参考上述**模拟冒泡和捕获**中的代码）

## 阻止冒泡

事件执行顺序
1. document原生事件（捕获阶段）
2. react事件（捕获阶段）
2. 原生事件（捕获/冒泡）
2. react事件（冒泡阶段）
3. document原生事件（冒泡阶段）

### 在原生事件中阻止冒泡
所有下层原生事件无法执行，react事件无法执行，document原生事件无法执行

### 在react事件中阻止冒泡
所有下层react事件无法执行，document原生事件无法执行

> 无论冒泡阶段还是捕获阶段执行的react事件，下层都会被中断（即onClick和onClickCapture都一样下层会被阻断）


## react合成事件和原生事件

- | 原生事件 | react合成事件
---|---|---
事件命名方式 | 全小写(onclick) | 驼峰(onClick)
事件处理函数语法 | 字符串 | 函数
阻止默认行为方式 | 可以return false | 只能e.preventDefault()


# 参考
- [深入React合成事件机制原理](https://segmentfault.com/a/1190000039108951)