---
title: LeetCode：有效的括号
Date: 2020-03-17
tags: [算法]
categories: 算法
comments: true
---

### 题目
给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串，判断字符串是否有效。

有效字符串需满足：

- 左括号必须用相同类型的右括号闭合。
- 左括号必须以正确的顺序闭合。
- 注意空字符串可被认为是有效字符串。

### 测试用例

```
1. "()" // true
2. "()[]{}" // true
3. "(]" // false
4. "([)]" // false
5. "{[]}" // true
```

### 解法一
#### 思路
- 使用字符串的replace方法进行匹配替换，直到全部匹配成功，字符串长度为0，返回true
- 或直到没有相匹配的项，匹配前的字符串与匹配后的字符串相等，则返回false

#### 算法

```
/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
    if(s.length === 0) {
        return true;
    }
    while(s.length !== 0) {
        var temp = s;
        s = s.replace('()','');
        s = s.replace('[]','');
        s = s.replace('{}','');
        if(s === temp) {
            return false;
        }
    }
    return true;
};
```

### 解法二
#### 思路
- 构造哈希表，遍历字符串
- 对于左括号，把相应的右括号放进栈里
- 对于右括号，若与栈顶匹配，则把栈顶去除；若是不匹配，则往栈顶添加undefined，为了防止开头就是右括号的情况

#### 算法

```
/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
    var map = {
        '(': ')',
        '[': ']',
        '{': '}'
    }
    var stack = [];
    for(let i in s) {
        if(s[i] !== stack[stack.length-1]) {
            stack.push(map[s[i]])
        } else {
            stack.pop();
        }
    }
    return stack.length === 0 ? true : false;
};
```

