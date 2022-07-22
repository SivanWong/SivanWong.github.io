---
title: React：一些知识点
date: 2022-05-20
tags: [React]
categories: React
comments: true
---

setState是同步还是异步？
- 是指调用 setState 之后 this.state 能否立即更新。
- setState的表现形式是异步的，是在合成事件和钩子函数调用之后才触发更新的，导致在合成事件和钩子函数中没法立马拿到更新后的值。
- 每次调用setState都会触发更新，异步操作是为了提高性能，将多个状态合并一起更新，减少re-render调用。
- 18之前promise、setTimeout以及原生事件中的setState不会进行批处理；18之后所有更新都自动批处理