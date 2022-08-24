---
title: LeetCode：两数相加
date: 2022-08-24
tags: [算法]
categories: 算法
comments: true
---

### 两数相加
给你两个 非空 的链表，表示两个非负的整数。它们每位数字都是按照 逆序 的方式存储的，并且每个节点只能存储 一位 数字。

请你将两个数相加，并以相同形式返回一个表示和的链表。

你可以假设除了数字 0 之外，这两个数都不会以 0 开头。


### 测试用例1

![image](https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2021/01/02/addtwonumber1.jpg)

```
输入：l1 = [2,4,3], l2 = [5,6,4]
输出：[7,0,8]
解释：342 + 465 = 807.
```
### 测试用例2

```
输入：l1 = [0], l2 = [0]
输出：[0]
```
### 测试用例2

```
输入：l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]
输出：[8,9,9,9,0,0,0,1]
```

提示
- 每个链表中的节点数在范围 [1, 100] 内
- 0 <= Node.val <= 9
- 题目数据保证列表表示的数字不含前导零

### 解法
#### 思路
- 

#### 算法

```
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function(l1, l2) {
    const l = new ListNode()
    let current = l;
    let carry = 0;
    while (l1 || l2) {
        const x = l1?.val ?? 0;
        const y = l2?.val ?? 0;
        const sum = x + y + carry;
        carry = sum >= 10 ? 1 : 0;
        current.next = new ListNode(carry === 0 ? sum : sum - 10);
        current = current.next;
        l1 = l1?.next;
        l2 = l2?.next;
    }
    if (carry === 1) {
        current.next = new ListNode(carry);
    }
    return l.next;
};
```
