---
title: LeetCode：二进制求和
date: 2022-08-24
tags: [算法]
categories: 算法
comments: true
---

### 二进制求和
给你两个二进制字符串，返回它们的和（用二进制表示）。

输入为 非空 字符串且只包含数字 1 和 0。

### 测试用例1

```
输入: a = "11", b = "1"
输出: "100"
```
### 测试用例2

```
输入: a = "1010", b = "1011"
输出: "10101"
```

提示
- 每个字符串仅由字符 '0' 或 '1' 组成。
- 1 <= a.length, b.length <= 10^4
- 字符串如果不是 "0" ，就都不含前导零。

### 解法
#### 思路
- 

#### 算法

```
/**
 * @param {string} a
 * @param {string} b
 * @return {string}
 */
var addBinary = function(a, b) {
    const arrA = a.split('');
    const arrB = b.split('');
    const maxLength = Math.max(arrA.length, arrB.length);
    const diff = Math.abs(arrA.length - arrB.length);
    if (arrA.length < maxLength) arrA.unshift(...new Array(diff).fill('0'));
    if (arrB.length < maxLength) arrB.unshift(...new Array(diff).fill('0'));
    const result = [];
    const last = arrA.reduceRight((carry, curr, index) => {
        const sum = parseInt(curr) + parseInt(arrB[index]) + carry;
        switch (sum) {
            case 0:
                result.unshift(0);
                return 0;
            case 1: 
                result.unshift(1);
                return 0;
            case 2:
                result.unshift(0);
                return 1;
            case 3:
                result.unshift(1);
                return 1;
        }
    }, 0);
    if (last === 1) result.unshift(last.toString());
    return result.join('');
};
```
