---
title: Koa：连接数据库
date: 2020-07-24
tags: [Koa]
categories: Koa
comments: true
---

### 本地环境
- mysql

```
// 开启
$ mysql -u root -p
// 退出
$ exit
```

- navicat

### 连接
在package.json中添加依赖项然后安装

```
"mysql": "^2.18.1"
```

#### 封装mysqlDB

```
const mysql = require('mysql');
 
//建立连接的方法
function __connection(){
 
    var connection = mysql.createConnection({
        host     : 'localhost', //host
        user     : 'root', //数据库用户名
        password : '', //密码
        database : 'candy-crush' //数据库名
    });
    connection.connect();
    return connection;
}
 
exports.query=function(sql,parmas=null){
    //1.获取数据库连接对象
    var connection=__connection();
    return new Promise(function(reject,resolve){
    
    //2执行sql语句
    connection.query(sql, parmas, function (error, results, fields) {
        if (error) throw error;
        reject(results);
    
    });
    //3关闭连接
    connection.end();
    })
}

```
#### 使用

```
const mysql = require('mysql');
const DB = require('./mysqlDB'); 

// log request URL:
app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    await next();
});

// add url-route:
router.get('/api/user_guide', async (ctx, next) => {
    var name = ctx.params.name;
    const result = await DB.query('select name, stamp, guided from guide where userID = 99'); //查询数据库
    console.log(result);
    ctx.response.body = {
        code: 0,
        msg: 'success',
        data: {
            userID: '99',
            items: result
        }
    }
});

router.post('/api/user_guide', async (ctx, next) => {
    var guideNames = ctx.request.body.guideNames.split(',') || [];
    for (let i in guideNames) {
        await DB.query(`update guide set guided = true where userID = 99 and name = '${guideNames[i]}'`)  
    }
    ctx.response.body = {
        code: 0,
        msg: "success",
        data: null
     };
});
```
