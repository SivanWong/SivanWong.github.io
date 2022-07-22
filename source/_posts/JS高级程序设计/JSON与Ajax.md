---
title: JSON与Ajax
date: 2018-05-03
tags: [红宝书]
categories: 红宝书
---

# JSON
## 语法
- #### 简单值
字符串、数值、布尔值、null，但不支持undefined
> JSON字符串必须使用**双引号**
- #### 对象

```
JavaScript:     var object={
                   name:"Greg",
                   age:27
                };


JSON:           {
                   "name":"Greg",
                   "age":27
                }
                
```
> 1、JSON对象没有声明变量（JSON没有变量）  
> 2、JSON对象没有末尾的分号 

PS：JSON对象的属性必须加**双引号**
- #### 数组

```
JavaScript：   var values=[25,"hi",true];
JSON:          [25,"hi",true]

```
> JSON数组没有变量和分号

## 解析与序列化
全局对象JSON有两个方法：  
**stringify()**  把JavaScript对象序列化成JSON字符串  
**parse()**  把JSON字符串解析为原生JavaScript值

### 序列化选项
- #### stringify()参数：   
##### 第一个是过滤器
数组过滤器：JSON.stringify()的结果中只包含数组中列出的属性    
函数过滤器：函数接收属性（键）名和属性值，返回结果为相应值
##### 第二个是一个选项
表示是否在JSON字符串中保留缩进
##### 第三个控制结果中的缩进和空白符
- #### toJSON()方法
可以给对象定义toJSON()方法，返回其自身的JSON数据格式

### 解析选项
JSON.parse()接收一个参数：还原函数  
与JSON.stringify()接收的替换（过滤）函数，两者签名相同

---

## JSON小结
- JSON是JavaScript的一个严格的子集，利用了JavaScript中的一些模式来表示结构化数据
- JSON是一个轻量级的数据格式，可以简化表示复杂数据结构的工作量
- JSON不支持变量、函数或对象实例，它就是一种表示结构化数据的格式
- JSON**字符串**和JSON**对象属性**必须加**双引号**

---

# Ajax
还没学JQ，暂用原生JS   



```
兼容
function createXHR(){
    if(typeof XMLHttpRequest !="undefined"){
        return new XMLHttpRequest();
    }else if(typeof ActiveXObject !="undefined"){
        var version=[
        "MSXML2.XMLHttp6.0",
        "MSXML2.XMLHttp3.0",
        "MSXML2.XMLHttp"
        ];
        for(var i=0;i<version.length;i++){
            try{
                return new ActiveXObject(version[i]);
            }catch(e){
                //跳过
            }
        }
    }else{
        throw new Error("您的系统浏览器不支持XHR对象!")
    }
}

```


## XMLHttpRequest


属性 | 说明
---|---
responseText | 作为响应主体被返回的文本
responseXML | ......
status | 响应HTTP状态（200为成功）
statusText | HTTP状态的说明
- HTTP状态码  
2字头：成功  
3字头：重定向  
4字头：请求错误   
5、6字头：服务器错误
- HTTP两种头部信息  
响应头部信息：服务器返回的信息，客户端可以获取但不可以设置  
请求头部信息：客户端发送的信息，客户端可以设置但不可以获取

## 同步与异步

- ### 同步

```
addEvent(document,"click",function(){
   var xhr=createXHR();
   xhr.open("get",demo.txt,false);
   xhr.send(null);
   if(xhr.status==200){
       alert(xhr.respenseText);
   }else{
       alert("获取数据错误  错误代号："+xhr.status+",错误信息："+xhr.statusText);
   }
});

```
-  ### 异步

```
addEvent(document,"click",function(){
   var xhr=createXHR();
   xhr.onreadystatechange=function(){
       if(xhr.readyState==4){
           if(xhr.status==200){
               alert(xhr.respenseText);
           }else{
               alert("获取数据错误  错误代号："+xhr.status+",错误信息："+xhr.statusText);
           }
       }
   };
   xhr.open("get",demo.txt,true);
   //xhr.abort();  取消异步请求，在接收到响应之前使用
   xhr.send(null);
});

```

## GET与POST
在Web程序上，  
GET一般是URL提交请求，如demo.php?nme=Lee&age=27
POST一般是Web表单提交
- ### GET请求

```
demo1.php

<?php
$username = $_GET['username'];
$age = $_GET['age'];

echo "你的名字：{$username}，年龄：{$age}";
?>

```


```
addEvent(document,"click",function(){
   var xhr=createXHR();
   xhr.onreadystatechange=function(){
       if(xhr.readyState==4){
           if(xhr.status==200){
               alert(xhr.respenseText);
           }else{
               alert("获取数据错误  错误代号："+xhr.status+",错误信息："+xhr.statusText);
           }
       }
   };
   xhr.open("get","demo1.php?username=Lee&age=27",true);
   xhr.send(null);
});

```
- ### POST请求

```
demo2.php

<?php
$username = $_POST['username'];
$age = $_POST['age'];

echo "你的名字：{$username}，年龄：{$age}";
?>

```


```
addEvent(document,"click",function(){
   var xhr=createXHR();
   xhr.onreadystatechange=function(){
       if(xhr.readyState==4){
           if(xhr.status==200){
               alert(xhr.respenseText);
           }else{
               alert("获取数据错误  错误代号："+xhr.status+",错误信息："+xhr.statusText);
           }
       }
   };
   //第一步：改为post
   xhr.open("post","demo2.php",true);
   //第三步：模拟表单提交，申明发送的数据类型
   xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
   //第二步：将名值对放入send()方法里
   xhr.send("username=Lee&age=27");
});

```
## Ajax步骤
1. 创建对象
2. 调用open()启动一个请求以备发送
3. 调用send()发送请求
4. 接收响应
