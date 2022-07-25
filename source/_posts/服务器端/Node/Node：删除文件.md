---
title: Node：删除文件
date: 2021-11-22
tags: [Node]
categories: Node
comments: true
---

步骤
1. 先删文件，清空文件夹
2. 删除空文件夹

相关命令
- fs.stat && fs.statSync 提供了访问文件的属性信息
- fs.readdir && fs.readdirSync 提供读取文件目录信息
- fs.unlink && unlinkSync 进行删除文件操作，不可以删除文件夹
- fs.rmdir && fs.rmdirSync 进行删除文件夹操作，但文件夹必须为空文件夹



```
// dirPath为需要删除的文件夹路径
function removeDir(dirPath) {
    return new Promise(async (resolve, reject) => {
        const files = fs.readdirSync(dirPath);
        for (let i = 0; i < files.length; i++) {
            const filePath = path.join(dirPath, files[i]);
            if (fs.statSync(filePath).isDirectory()) {
                removeDebug(filePath);
                continue;
            } else {
                fs.unlinkSync(filePath);
            } 
        }
        try {
            fs.rmdirSync(dirPath);
        } catch(e) {
            console.error(e);
            return reject(e);
        }
        return resolve();
    })
}
```

