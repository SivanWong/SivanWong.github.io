---
title: JS：字符串常用的方法
date: 2019-12-04
tags: [JS]
categories: JS
comments: true
---

- charAt(index) 
```
返回指定索引的字符。
```
- charCodeAt(index)
```
返回指定索引的unicode字符.
```
- indexOf(char)
```
判断一个字符第一次出现在某个字符串的索引，如果包含返回它的索引，如果不包含返回-1。对大小写敏感。
```
- lastIndexOf(char)
```
判断一个字符最后一次出现在某个字符串的索引，如果包含返回它的索引，如果不包含返回-1。
```
- concat()   (返回一个新字符串)
```
拼接2个字符串，返回一个新字符串，对原有字符串没有任何改变。
var str='qwe';
var str1='abc';
var str2=str.concat(str1);

console.log(str2);//"qweabc"
```
- substr(start,number)  (不修改原字符串)
```
从索引start开始，截取number个字符，将截取的字符返回。start可正可负。
```
- substring(start,end)  (不修改原字符串)
```
从索引start开始，截取到索引end,不包括end.将截取的字符返回。start,end正值。
```
- slice(start,end)  (不修改原字符串)
```
从索引start开始，截取到索引end,不包括end。将截取的字符返回。start,end可正可负。
```
- split("分割符"[,limit]) (返回数组，不修改原字符串)
```
用指定字符分割字符串，返回一个数组。默认每个字符都分割。
```
- replace(reg,new) (不修改原字符串)
```
替换指定字符，返回替换后新的字符串，不会对原有字符串有改变。
var str='aaaaee';
var reg=/a/g;
str.replace(reg,1);   //"1111ee"
console.log(str);     //"aaaaee"
```
- match(reg) (返回一个数组)
```
可在字符串内检索指定的值，或找到一个或多个正则表达式的匹配。把符合正则表达式的字符放在数组里，返回一个数组。
```
- search(reg) 
```
方法用于检索字符串中指定的子字符串，或检索与正则表达式相匹配的子字符串。返回第一个匹配字符串的第一个字符的位置。没有匹配的则返回-1。

```
