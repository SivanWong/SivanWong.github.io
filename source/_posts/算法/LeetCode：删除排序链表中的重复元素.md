---
title: LeetCode：删除排序链表中的重复元素
date: 2022-08-24
tags: [算法]
categories: 算法
comments: true
---

### 删除排序链表中的重复元素
给定一个已排序的链表的头 head ， 删除所有重复的元素，使每个元素只出现一次 。返回 已排序的链表 。

### 测试用例1

![image](https://assets.leetcode.com/uploads/2021/01/04/list1.jpg)

```
输入：head = [1,1,2]
输出：[1,2]
```
### 测试用例2

![image](https://assets.leetcode.com/uploads/2021/01/04/list2.jpg)

```
输入：head = [1,1,2,3,3]
输出：[1,2,3]
```

提示
- 链表中节点数目在范围 [0, 300] 内
- -100 <= Node.val <= 100
- 题目数据保证链表已经按升序 排列

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
 * @param {ListNode} head
 * @return {ListNode}
 */
var deleteDuplicates = function(head) {
    if (head && head.next) {
        if (head.val === head.next.val) {
            head.next = head.next.next;
            deleteDuplicates(head);
        } else {
            deleteDuplicates(head.next);
        }
    }
    return head;
};
```
