---
title: LeetCode算法题（一）
date: 2019-04-21
tags: [算法]
categories: 算法
comments: true
---

1. 给出一个 32 位的有符号整数，你需要将这个整数中每位上的数字进行反转。    
假设我们的环境只能存储得下 32 位的有符号整数，则其数值范围为 [−231,  231 − 1]。请根据这个假设，如果反转后整数溢出那么就返回 0。

```
var reverse = function(x) {
    var arr = x.toString().split('');
    if(arr[0]=='-'){
        var temp = arr.slice(1,arr.length);
        temp.reverse().unshift("-");
        x = parseInt(temp.join(''));
    }else{
        x = parseInt(arr.reverse().join(''));
    }
    if(x>=-Math.pow(2,31)&&x<=Math.pow(2,31)){
        return x; 
    }else{
        return 0;
    }
};
```
2. 编写一个函数来查找字符串数组中的最长公共前缀。如果不存在公共前缀，返回空字符串 ""。

```
var longestCommonPrefix = function(strs) {
    var str="";
    if(strs.length == 1){
        str = strs[0];
    }else if(strs.length >= 2){
        for(var i=1;i<=Math.min(strs[0].length,strs[1].length);i++){
            if(strs[0].slice(0,i)==strs[1].slice(0,i)){
                str = strs[0].slice(0,i);
                continue;
            }else{
                break;
            }
        }
        for(var j=2;j<strs.length;j++){
            while(str!=""&&strs[j].substr(0,str.length)!=str){
              str = str.slice(0,str.length-1);
            }
        } 
    }
    return str;
};
```
3. 给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串，判断字符串是否有效。

有效字符串需满足：
- 左括号必须用相同类型的右括号闭合。
- 左括号必须以正确的顺序闭合。即先开的后闭合。 

```
 "([)]" //false
 "{[]}" //true
 "" //true
```
注意空字符串可被认为是有效字符串。

```
var isValid = function(s) {
    var temp = [];
    for(var i in s){
        if(s[i]=="("){
            temp.push(")");
        }else if(s[i]=="["){
            temp.push("]");
        }else if(s[i]=="{"){
            temp.push("}");
        }else if(s[i]!=temp.pop()){
            return false;
        }
    }
    return !temp.length;
    //只开不闭temp.length为true
    //空字符串temp.length为false
    //其余有效字符串temp会被移除空
};
```
4. 给定一个排序数组和一个目标值，在数组中找到目标值，并返回其索引。如果目标值不存在于数组中，返回它将会被按顺序插入的位置。

你可以假设数组中无重复元素。

```
var searchInsert = function(nums, target) {
    for(var i=0;i<nums.length;i++){
        if(nums[i]>=target){
            return i
        }
    }
    return nums.length;
};
```
5. 给定一个仅包含大小写字母和空格 ' ' 的字符串，返回其最后一个单词的长度。

如果不存在最后一个单词，请返回 0 。

说明：一个单词是指由字母组成，但不包含任何空格的字符串。

```
var lengthOfLastWord = function(s) {
     var len = s.length;
      var count = 0;
      while(len!=0&&s[len-1]==" "){
        len--;
      }
      while(s[len-1]!=" "&&len>0){
        count++;
        len--;
      }
      return count;
};
```
