---
title: Node：REPL(交互式解释器)
date: 2019-06-05
tags: [Node]
categories: Node
comments: true
---

### 概述
Node.js REPL(Read Eval Print Loop:交互式解释器) 表示一个电脑的环境，类似 Window 系统的终端或 Unix/Linux shell，我们可以在终端中输入命令，并接收系统的响应。
### 作用
Node 自带了交互式解释器，可以执行以下任务：

- 读取：读取用户输入，解析输入了Javascript 数据结构并存储在内存中。
- 执行：执行输入的数据结构
- 打印：输出结果
- 循环：循环操作以上步骤直到用户两次按下 ctrl-c 按钮退出。

Node 的交互式解释器可以很好的调试 Javascript 代码。

### 实现
启动
```
$ node 
>  // 可以输入要执行的代码
```

#### 简单的表达式运算
可以执行简单的数学运算
```
$ node
> 1+1
2
> 2*3
6
> 4/2
2
> 5-1
4
>
```

#### 变量使用
- 可以将数据存储在变量中，并在需要的时候使用它
- 变量声明需要使用 var 关键字，如果没有使用 var 关键字变量会直接打印出来
- 使用 var 关键字的变量可以使用 console.log() 来输出变量
- 可以使用下划线(_)获取上一个表达式的运算结果

```
$ node
> x = 10   // 直接打印变量
10   
> var y = 10  // 存储变量
undefined  
> x + y  // 进行简单的数学运算
20
> var pre = _     // 获取上一个变量并存储
undefined 
> console.log(pre)  // 打印存储的变量
20
undefined
> console.log(y)  // 打印存储的变量
10
undefined
> console.log("ok")  // 打印字符串
ok
undefined
>
```

#### 多行表达式
Node REPL 支持输入多行表达式，这就有点类似 JavaScript。

```
$ node
> var x = 0
undefined
> do {    // 执行一个 do-while 循环
... x++;
... console.log("x = " + x)
... } while ( x < 3 );
x = 1
x = 2
x = 3
undefined
>
```

### REPL命令
- ctrl + c：退出当前终端。
- ctrl + c 按下两次：退出 Node REPL。
- ctrl + d：退出 Node REPL.
- 向上/向下键：查看输入的历史命令
- tab 键：列出当前命令
- .help：列出使用命令
- .break：退出多行表达式
- .clear：退出多行表达式
- .save filename： 保存当前的 Node REPL 会话到指定文件
- .load filename： 载入当前 Node REPL 会话的文件内容。

### 退出 REPL
按下 ctrl + d 键 或 者两次 ctrl + c 键就能退出 REPL