---
title: TS：修饰符
date: 2021-03-09
tags: [TS]
categories: TS
comments: true
---

## TypeScript 修饰符

TypeScript 可以使用三种访问修饰符（Access Modifiers），分别是 public、private 和 protected。


修饰符 | 在类内可访问 |  在子类中可访问 | 可通过类实例从外部访问
---|---|---|---|
public (default) | Yes | Yes | Yes
protected | Yes | Yes | No
private | Yes | No | No

### public

- public 修饰的属性或方法是公有的。
- 所有定义成public的属性和方法都可以在任何地方进行访问。
- 默认所有的属性和方法都是 public 的。

### private
- private 修饰的属性或方法是私有的。
- 所有定义成private的属性和方法都只能在类定义内部进行访问。

### protected
- protected 修饰的属性或方法是受保护的。
- 所有定义成protected的属性和方法可以从类定义内部访问，也可以从子类中访问。