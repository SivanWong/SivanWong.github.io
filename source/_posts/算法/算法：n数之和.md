---
title: 算法：n数之和
date: 2020-08-10
tags: [算法]
categories: 算法
comments: true
---

## 两数之和为0
### 题目
给定一个不重复的数字数组，找出该数组中两个数之和等于0的所有情况。

### 测试用例

```
1. [1,2,3,-1] // [[1,-1]]
2. [1,2,3,-3,-1] // [[1,1],[3,-3]]
```

### 解法
#### 思路
- 数组长度少于2则直接返回
- 取数组首元素，与剩余元素比较是否相加为0，若为0取该值，拼接为数组，否则undefined
- 递归剩余元素，将得到的返回值拼接，对于undefined的值不拼接

#### 算法

```
/**
 * @param {array} arr
 * @return {array}
 */
var addUpToZero = function (arr) {
    if(arr.length < 2) {
        return;
    }
    var left = arr.splice(0,1)[0];
    var right, res;
    for(let i in arr) {
    if(left + arr[i] === 0) {
        right = arr.splice(i,1)[0];
    }
    }
    if(right) {
        res = [left, right];
    }
    var next = test(arr);
    if(res && next){
        return [res].concat(next);
    } else if (res) {
        return [res];
    } else if (next) {
        return next;
    }
}
```

## 两数之和为target
### 题目
给定一个已按照升序排列的有序数组，找到两个数使得它们相加之和等于目标数。

函数应该返回这两个下标值 index1 和 index2，其中 index1必须小于index2。

- 返回的下标值（index1 和 index2）不是从零开始的。
- 你可以假设每个输入只对应唯一的答案，而且你不可以重复使用相同的元素。


### 测试用例

```
1. [2,7,11,15],9 // [1,2]
```

### 解法
#### 思路
- 双指针法，一个指向头，一个指向尾
- 判断和是否为target，是则返回
- 否则，若sum小于target，则指向头的指针往前移动；若大于，则尾部移动

#### 算法

```
/**
 * @param {number[]} numbers
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(numbers, target) {
    let i = 0, j = numbers.length -1;
    while(i < j) {
        const sum = numbers[i] + numbers[j];
        if (sum === target) {
            return [i + 1, j + 1];
        } else if (sum < target) {
            i++;
        } else {
            j--;
        }
    }
};
```

## n数之和为target
### 题目
给定一个无序数组，判断该数组中能否实现n个数之和等于target的情况。

### 测试用例

```
1. [1,2,3,4],2,7 // true
```

### 解法
#### 思路


#### 算法

```
 function getResult(arr,n,target){
    if(n==0&&target==0){
        return true;
    }
    if(n<0){
        return false;
    }
    if(n>0){
        for(var i in arr){
            var temp = arr.slice(i+1,arr.length);
            return getResult(temp,n-1,target-arr[i]) || getResult(temp,n,target);
        }
    }
}

console.log(getResult([1,2,3,4],2,7)); //true
```
