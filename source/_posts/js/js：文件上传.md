---
title: js：文件上传
Date: 2020-05-14
tags: [JS]
categories: JS
comments: true
---


### 获取文件内容

```
<input type="file" id="fileUpload"/>

document.getElementById('fileUpload').onchange = function (e) {
                var e = e || window.event;
                // files 为选择的所有文件
                var files = e.target.files;
            }

```
files 为FileList，每一个元素为一个对象，里面包含：
- lastModified
- lastModifiedDate
- name
- size
- type
- webkitRelativePath

![image](https://img-blog.csdn.net/20180614110140438)

### 获取文件上传进度

```
var xhrOnProgress=function(fun) {
    xhrOnProgress.onprogress = fun; //绑定监听
    //使用闭包实现监听绑
    return function() {
        //通过$.ajaxSettings.xhr();获得XMLHttpRequest对象
        var xhr = $.ajaxSettings.xhr();
        //判断监听函数是否为函数
        if (typeof xhrOnProgress.onprogress !== 'function')
          return xhr;
        //如果有监听函数并且xhr对象支持绑定时就把监听函数绑定上去
        if (xhrOnProgress.onprogress && xhr.upload) {
          xhr.upload.onprogress = xhrOnProgress.onprogress;
        }
        return xhr;
    }
}

function Submit(){
    var fileObj = document.getElementById("FileUpload").files[0]; // js 获取文件对象
    var formFile = new FormData();
    formFile.append("file", fileObj); //加入文件对象
    var data = formFile;
    $.ajax({
        url: "http://up.qiniu.com/",
        data: data,
        type: "Post",
        dataType: "json",
        cache: false,//上传文件无需缓存
        processData: false,//用于对data参数进行序列化处理 这里必须false
        contentType: false, //必须
        xhr:xhrOnProgress(function(e){
            var percent=e.loaded/e.total;
            console.log(percent);
        }),
        success: function (result) {
             console.log(result);
        },
    })
}
```
### 断点续传
指的是在上传/下载时，将任务（一个文件或压缩包）人为的划分为几个部分，每一个部分采用一个线程进行上传/下载，如果碰到网络故障，可以从已经上传/下载的部分开始继续上传/下载未完成的部分，而没有必要从头开始上传/下载。可以节省时间，提高速度。

它通过在 Header 里两个参数实现的，客户端发请求时对应的是 Range ，服务器端响应时对应的是 Content-Range

- Range
```
用于请求头中，指定第一个字节的位置和最后一个字节的位置。
```
- Content-Range
```
用于响应头中，在发出带 Range 的请求后，服务器会在 Content-Range 头部返回当前接受的范围和文件总大小。
```
在响应完成后，返回的响应头内容也不同，根据返回的状态码判断是否使用断点续传
- 200 Ok（不使用断点续传方式）
- 206 Partial Content（使用断点续传方式）
