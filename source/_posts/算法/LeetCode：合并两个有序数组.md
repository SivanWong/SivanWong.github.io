---
title: LeetCode：合并两个有序数组
date: 2022-08-24
tags: [算法]
categories: 算法
comments: true
---

### 合并两个有序数组
给你两个按 非递减顺序 排列的整数数组 nums1 和 nums2，另有两个整数 m 和 n ，分别表示 nums1 和 nums2 中的元素数目。

请你 合并 nums2 到 nums1 中，使合并后的数组同样按 非递减顺序 排列。

注意：最终，合并后数组不应由函数返回，而是存储在数组 nums1 中。为了应对这种情况，nums1 的初始长度为 m + n，其中前 m 个元素表示应合并的元素，后 n 个元素为 0 ，应忽略。nums2 的长度为 n 。


### 测试用例1

```
输入：nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3
输出：[1,2,2,3,5,6]
解释：需要合并 [1,2,3] 和 [2,5,6] 。
合并结果是 [1,2,2,3,5,6] ，其中斜体加粗标注的为 nums1 中的元素。
```
### 测试用例2

```
输入：nums1 = [1], m = 1, nums2 = [], n = 0
输出：[1]
解释：需要合并 [1] 和 [] 。
合并结果是 [1] 。
```

### 测试用例3

```
输入：nums1 = [0], m = 0, nums2 = [1], n = 1
输出：[1]
解释：需要合并的数组是 [] 和 [1] 。
合并结果是 [1] 。
注意，因为 m = 0 ，所以 nums1 中没有元素。nums1 中仅存的 0 仅仅是为了确保合并结果可以顺利存放到 nums1 中。
```
提示
- nums1.length == m + n
- nums2.length == n
- 0 <= m, n <= 200
- 1 <= m + n <= 200
- -10^9 <= nums1[i], nums2[j] <= 10^9


### 解法
#### 思路
- 从右边开始合并，设置三个指针
    - 指针a指向nums1数组的最后一位。
    - 指针1指向原始nums1数组的最后一位（非0）。
    - 指针2指向nums2数组的最后一位。
- 当nums2数组未合并完成（指针2>=0）前循环
    - 将指针1和指针2指向的值进行对比。
    - 当指针2指向的值更大时，将其移至nums1最后一位，指针2向前移动。
    - 否则，将指针1指向的值移至nums1最后一位，指针1向前移动。
    - 一轮循环结束，指针a向前移动。

#### 算法

```
/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
var merge = function(nums1, m, nums2, n) {
    let current = m + n - 1
    let current1 = m - 1;
    let current2 = n - 1
    while (current2 >= 0) {
        if (current1 < 0 || nums2[current2] >= nums1[current1]) {
            nums1[current] = nums2[current2];
            current2--;
        } else {
            nums1[current] = nums1[current1];
            nums1[current1] = 0;
            current1--;
        }
        current--;
    }
};
```
