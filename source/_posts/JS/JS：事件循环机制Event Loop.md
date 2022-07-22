---
title: JS：事件循环机制Event Loop
date: 2022-04-29
tags: [JS]
categories: JS
comments: true
---

### 前言
JavaScript的事件分两种，宏任务(macro-task)和微任务(micro-task)
- 宏任务：包括整体代码script，setTimeout，setInterval
- 微任务：Promise.then(new Promise是定义后立即执行的)，process.nextTick(node中)

### 事件循环
1. 先执行同步任务，同步任务立即执行，对于异步任务则是把函数放进event table中，等到满足触发条件后加载到对应的Event Queue中。
2. 所有同步宏任务执行完毕后，如果发现微任务的Event Queue中有未执行的任务，会先执行其中的任务，这样算是完成了一次事件循环。
3. 接下来查看宏任务的Event Queue中是否有未执行的任务，有的话，就开始第二轮事件循环，依此类推。

### 注意
一次事件循环范围并不是一个函数内，而是所有被涉及到的函数都算入范围

```
function a () {
    b();
    console.log('1')
}

function b() {
    setTimeout(() => console.log('2'), this, 0)
}

a(); // 1 2
```
### 例子

```
Promise.resolve().then(() => {
  console.log('promise1');
  const timer2 = setTimeout(() => {
    console.log('timer2')
  }, 0)
});
const timer1 = setTimeout(() => {
  console.log('timer1')
  Promise.resolve().then(() => {
    console.log('promise2')
  })
}, 0)
console.log('start');
```

```
start
promise1
timer1
promise2
timer2
```
1. 首先，Promise.resolve().then是一个微任务，加入==当前轮次==的微任务队列

宏任务 | 微任务
---|---
当前同步代码⬅ | Promise.resolve().then


2. 执行timer1，它是一个宏任务，但同时也是一个异步任务，因此加入event table等待满足触发条件后加入宏任务队列。因为delay为0，所以可以立即加入==下一轮==的宏任务队列。

宏任务 | 微任务 | event table
---|---|---
当前同步代码⬅ | Promise.resolve().then | timer1

宏任务 | 微任务
---|---
当前同步代码⬅ | Promise.resolve().then
timer1| 

3. 继续执行下面的同步代码，打印出start
4. 这样第一轮宏任务就执行完了，开始执行微任务Promise.resolve().then，打印出promise1

宏任务 | 微任务
---|---
当前同步代码| Promise.resolve().then⬅ 
timer1| 

5. 遇到timer2，它是一个宏任务，但同时也是一个异步任务，因此加入event table等待满足触发条件后将其加入宏任务队列。因为delay为0，所以可以立即加入==下一轮==的宏任务队列。

宏任务 | 微任务 | event table
---|---|---
当前同步代码| Promise.resolve().then⬅ 
timer1|   | timer2

宏任务 | 微任务
---|---
当前同步代码| Promise.resolve().then⬅ 
timer1 |   
timer2 |

6. 此时宏任务队列有两个任务，分别是timer1、timer2。
7. 这样第一轮微任务就执行完了，开始执行第二轮宏任务，因为定时器timer1已满足触发条件加入宏任务，打印timer1。


8. 遇到Promise.resolve().then，它是一个微任务，加入==当前轮次==微任务队列。

宏任务 | 微任务
---|---
当前同步代码| Promise.resolve().then
timer1⬅  |  romise.resolve().then
timer2 | 

9. 开始执行微任务队列中的任务，打印promise2。

宏任务 | 微任务
---|---
当前同步代码| Promise.resolve().then
timer1 |  romise.resolve().then⬅ 
timer2 | 

10. 最后执行宏任务timer2定时器，打印出timer2。
宏任务 | 微任务
---|---
当前同步代码| Promise.resolve().then
timer1 |  romise.resolve().then
timer2⬅  | 

注意：
- 每一轮都是先宏任务再微任务，异步函数由于不能立即加入宏任务队列，所以当前轮次轮不上，只有当满足触发条件后加入进去才有机会进入时间循环。
- 宏任务与微任务是两个队列，只是每次事件循环，都取队头的