---
title: js：数组的常用方法
Date: 2019-03-27
tags: [js]
categories: js
comments: true
---

- join("分隔符")
```
将数组的元素放入一个字符串，默认用逗号为分隔符。
```
- push()
```
把参数逐个添加到数组末尾，返回修改后数组长度。
```
- pop()
```
从数组末尾移除最后一项，返回移除的项。
```
- shift()
```
移除数组中的第一个项并返回该项。
```
- unshift()
```
在数组前面添加任意个项，返回数组长度。
```
- reserve()  （会修改原数组）
```
反转数组的顺序，返回经过排序后的数组，会修改原数组。
```
- sort([function])  （会修改原数组）
```
参数必须是函数，若无参数则默认按照字母编码（字符编码）的顺序进行排序。会修改原数组。
//数字从小到大排序
arr.sort(function(a,b){
    return a-b;
});
//数字从大到小排序
arr.sort(function(a,b){
    return b-a;
});
```
- concat()  (不修改原数组)
```
连接两个或多个数组。
参数可以为具体的值，也可以为数组对象，可以有任意多个。
返回当前数组的一个浅拷贝。
```
- slice(start,end)  (不修改原数组)
```
基于当前数组的一个或多个项创建一个新数组。
左闭右开，返回新数组，不影响原数组。
没有参数则原数组的浅拷贝。
```
- splice(start,number,new) (会修改原数组)
```
删除原数组的一部份成员，并可以在被删除的位置添加入新的数组成员，会修改原数组。返回一个数组，里面包含被删除的项目。
```
- indexOf(search,start)
```
返回search首次出现的位置，没有则返回-1。默认从第0位开始。
```
- lastIndexOf(search,start)
```
从右往左找，返回search首次出现的位置，没有则返回-1。
```
- includes(value)
```
判断一个数组是否包含一个指定的值。
```
- forEach(callback(value,index,array){}[,this]) (不修改原数组)
```
对数组进行遍历循环，对数组中的每一项运行给定函数。
这个方法没有返回值。
参数都是function类型，默认有传参，参数分别为：遍历的数组内容，对应的数组索引，数组本身。
```
- map(callback(value,index,array){}[,this]) (不修改原数组)
```
对数组中的每一项运行给定函数，返回每次函数调用的结果组成的数组。
```
- filter(callback(value,index,array){}[,this]) (不修改原数组)
```
“过滤”功能，数组中的每一项运行给定函数，返回满足过滤条件组成的数组。
```
- some(callback(value,index,array){}[,this]) (不修改原数组)
```
判断数组中是否存在满足条件的项，只要有一项满足条件，就会返回true。
```
- every(callback(value,index,array){}[,this]) (不修改原数组)
```
判断数组中每一项都是否满足条件，只有所有项都满足条件，才会返回true。
```
- find(callback(value,index,array){}[,this]) (不修改原数组)
```
返回数组中满足提供的测试函数的第一个元素的值。
```
- findIndex(callback(value,index,array){}[,this]) (不修改原数组)
```
返回数组中满足提供的测试函数的第一个元素的索引。
```
- reduce(function(prev, cur, index, array){}[,初始值])和reduceRight(function(prev, cur, index, array){}[,初始值]) (不修改原数组)
```
实现迭代数组的所有项，然后构建一个最终返回的值。
前者从第一项开始，后者从最后一项开始。
这个函数返回的任何值都会作为第一个参数自动传给下一项。
```
