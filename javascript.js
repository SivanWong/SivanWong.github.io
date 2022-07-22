const fs = require('fs');
const path = require('path');

function isNew(filePath) {
  const stats = fs.statSync(filePath)
  const { atime } = stats;
  const now = new Date();
  const atimeStr = `${atime.getFullYear()}-${atime.getMonth() + 1}-${atime.getDate()}`;
  const nowStr = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
  return atimeStr === nowStr;
}

function unshiftString(filePath) {
  const pathArr = filePath.split('/');
  const tag = pathArr[pathArr.length - 2];
  const content = fs.readFileSync(filePath, 'utf-8');
  const header = `---
title: ${path.basename(filePath, '.md')}
date: 2021-07-07
tags: [${tag}]
categories: ${tag}
comments: true
---

`;
  fs.writeFile(filePath, header + content, err => {
    if (err) {
      console.error(err)
      return
    }
  })
}

function readFolder(folderPath) {
  fs.readdir(folderPath, (err, files) => {
    files.forEach((file) => {
      const filePath = `${folderPath}/${file}`;
      if (fs.statSync(filePath).isDirectory()) {
        readFolder(filePath);
      } else {
        if (isNew(filePath) && path.extname(filePath) === '.md') unshiftString(filePath);
      }
    })
  })
}

// unshiftString('./cocos/cocos creator踩坑记.md');
readFolder('./source/_posts');