---
title: LeetCode：验证回文串
Date: 2020-03-17
tags: [算法]
categories: 算法
comments: true
---

### 题目
给定一个字符串，验证它是否是回文串，只考虑字母和数字字符，可以忽略字母的大小写。

说明：本题中，我们将空字符串定义为有效的回文串。

### 测试用例

```
1. "A man, a plan, a canal: Panama" // true
2. "race a car" // false
```

### 解法
#### 思路
- 先判空字符串
- 对非空字符串，先用正则把除字母和数字之外的字符去除，再全部转换为小写字母
- 把字符串分割为数组，翻转，再拼接为字符串，与原字符串进行对比

#### 算法

```
/**
 * @param {string} s
 * @return {boolean}
 */
var isPalindrome = function(s) {
    if(s === '') {
        return true;
    }
    s = s.replace(/[^0-9a-zA-Z]/g, '').toLowerCase();
    if(s === s.split('').reverse().join('')){
        return true;
    }
    return false;
};
```
