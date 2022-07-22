---
title: LeetCode：阶乘后的零
date: 2020-10-16
tags: [算法]
categories: 算法
comments: true
---

### 阶乘后的零
给定一个整数 n，返回 n! 结果尾数中零的数量。

### 测试用例

```
1. 3 // 0
2. 6 // 1
```

### 解法一
#### 思路
- 3! = 3 * 2 * 1
- 6! = 6 * 5 * 4 * 3 * 2 * 1
- 10! = （5 * 2）* 8 * 7 * 6 * 5 * 4 * 3 * 2 * 1
- 每一个5都可以找到偶数配对，就相当于一个5可以产生一个0。
- 找出阶乘中含有多少个因子5就可以了

#### 算法

```
/**
 * @param {number} n
 * @return {number}
 */
var trailingZeroes = function(n) {
    let count = 0;
    for(let i = 5; i <= n; i++){
        let temp = i;
        while(temp % 5 === 0) {
            count ++;
            temp /=  5
        }
    }
    return count;
};
```

### 解法二
#### 思路
- 5 的因子一定是每隔 5 个数出现一次
- 25 = 5 * 5, 125 = 5 * 5 * 5
- 每隔 5 个数，出现一个 5，每隔 25 个数，出现 2 个 5，每隔 125 个数，出现 3 个 5...
- 因此找出现了多少次五个数，当这个次数大于5时，证明n大于25，有多一个5，以此类推，125同理。
- count = n / 5 + n / 25 + n / 125 ...

#### 算法

```
/**
 * @param {number} n
 * @return {number}
 */
var trailingZeroes = function(n) {
    let count = 0;
    while (n > 0) {
        n = Math.floor(n / 5);
        count += n;
    }
    return count;
};
```