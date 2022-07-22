---
title: JS：基础类型和引用类型
date: 2022-05-08
tags: [JS]
categories: JS
comments: true
---


### 基础类型
- undefined，null，boolean，string，number，bigint，symbol
- symbol代表唯一的值，通常被用作对象的key
- 在内存中是栈存储，自动分配内存，自动释放。存储的是值
- 栈中数据的存取是先进后出的

### 引用类型
- array，object，function，date，regExp，特殊的基本包装类型(String、Number、Boolean)以及单体内置对象(Global、Math)
- 在内存中是堆存储，动态分配内存，大小不定，不会自动释放。存储的是地址
- 堆是一个优先队列，按优先级来排序