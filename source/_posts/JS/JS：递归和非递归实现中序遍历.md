---
title: JS：递归和非递归实现中序遍历
date: 2019-12-02
tags: [JS]
categories: JS
comments: true
---

### 二叉树结构


```
var TreeNode = {
    val: 1,
    left: {
        val: 2,
        left: {
          val: 4,
        },
        right: {
            val: 5
        }
    },
    right: {
        val: 3,
        left: {
            val: 6,
        },
        right: {
            val: 7
        }
    }
};
// 中序遍历，左根右
// [4, 2, 5, 1, 6, 3, 7]
```
### 递归

```
function inOrderRecur (root，list=[]) {
    if(root !== undefined) {
        inOrderRecur(root.left,list);
        list.push(root.val);
        inOrderRecur(root.right,list);
    }
    return list;
}
```

### 非递归

```
function inOrderUnRecur (root){
    var stack = [];
    var list = [];
    var head = root;
    while(stack.length !== 0 || head !== undefined){
        while(head !== undefined){
            stack.push(head);
            head = head.left;
        }

        if(stack.length !== 0){
            head = stack.pop();
            list.push(head.val);
            head = head.right;
        }
    }
    return list;
};
```
