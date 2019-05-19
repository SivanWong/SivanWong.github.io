---
title: vue+axios解决文件上传问题
Date: 2019-02-26
tags: [vue]
categories: vue
comments: true
---

# 前因
关于文件上传，可以使用element-ui中的组件，也可以直接使用input，最近做的一个项目中有用到，查了挺多资料研究了一下，最终就实用性来说还是后者bug少。  

现在就这两个介绍一下，如果有错误请提出纠正，或者有更好的可以来分享一下。
# Element-UI
## 直接action
这个方法很简单，文档中有一一详细列出，重点是下一个
> 可参考[官方文档](http://element-cn.eleme.io/#/zh-CN/component/upload)

## 利用before-upload属性

直接action很方便简单，但是总会有各种难以解决的错误出现  
如：后台要求请求方式为multipart/form-data时，不能使用data传参数，这时候就要使用formdata对象了。

### 使用
new一个formdata对象，然后对这个对象追加key和value

```
//网上给出的例子
beforeUpload (file,id) {
    let fd = new FormData()
    fd.append('file', file)
    fd.append('id',id)
    axios.post(url, fd, {
         
     })
    return false // false就是不自动上传
},
```
改进后我的例子

```
<el-dialog
    title="导入报表"
    :visible.sync="dialogVisible"
    width="30%"
    :before-close="handleClose"
    :append-to-body='true'>
    <el-upload
      class="upload-demo"
      ref="upload"
      action="/super_admin/factory/device/import"
      :limit="1"
      :on-exceed="handleExceed"
      :file-list="fileList"
      :auto-upload="false"
      :before-upload="beforeAvatarUpload"
      :on-error="error"
      :before-remove="beforeRemove">
      <el-button size="small" type="primary">点击上传</el-button>
    </el-upload>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click.native="importTable()">确 定</el-button>
    </span>
  </el-dialog>
  
``` 
 
```
data() {
      return {
          dialogVisible: false,
         // 所上传的文件
          fileList: []
      }
  },
  
```

  
```
methods: {
      // 限制上传文件为一个
    handleExceed() {
      this.$message.warning('当前限制上传 1 个文件');
    },
    // 对文件类型进行判断并上传（重点！）
    beforeAvatarUpload(file) {
      const isXLSX = file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
      if (!isXLSX) {
        this.$message.error("上传的文件只能是 xlsx 格式!");
        this.fileList = [];
      }else {
        let factoryId = this.factoryId;
        let fd = new FormData();
        fd.append('file', file);
        fd.append('factoryId', factoryId);
        api.importTable((err, res) => {
          if (err || res.status !== 200) {
            this.$message.error("出错了，刷新一下吧");
            return;
          }
          if (res.data.code == 403) {
            this.$message.error("该账号没有此操作权限");
          } else if (res.data.code == 200) {
            this.$message({
              message: '文件上传成功！',
              type: 'success'
            });
          } else {
            this.$message.error("出错了，刷新一下吧");
          }
        },fd);
        return true
      }
    },
   // 文件上传失败
    error(err) {
        this.$message({
          message: '文件上传失败！',
          type: 'warning'
        });
    },
    // 移除已上传的文件
    beforeRemove(file) {
      return this.$confirm('确定移除 '+file.name+' ？');
    },
    // 导入报表至后台
    importTable() {
      this.$refs.upload.submit();
      this.dialogVisible = false;
    },
  }
```




```
// 引用instance
import instance from './instance.js'

function importTable(fn,data) {
	return instance({
    method: "post",
    url: '/super_admin/factory/device/import',
    data: data,
    headers: {
      "Content-Type": "multipart/form-data"
    }
  })
}

export{
    importTable
}

```
### 注意
1. 这种方法也有弊端，action作为必填参数，无论是填任意数或者填写重复地址，控制台总会报404。
2. FormData对象是不可以通过console.log在控制台直接打印出来的，但可以通过FormData.get()获取值。


## input上传

这个是重点，就实用来说，掌握一种方法就可以了，这个是目前最成功的（结合后台）。

### 使用

```
<el-button
 	size="mini" 
 	type="primary"
 	icon="el-icon-upload2"
 	title="导入数据"
 	@click.native="handleUpload(scope.$index, scope.row)"
 	slot="reference"
 	circle></el-button>
<!-- 导入文件表单 -->
<form id="uploadform" style="display:none;">
    <input name="importFile" type="file" accept=".xlsx" ref="importFile" v-on:change="confirmUpload()"></input>
    <input name="factoryId" :value='this.upload.CurrentfactoryId'></input>
</form>


```


```
data() {
    return {
        // 上传文件所需的参数
       upload: {
      	 CurrentfactoryId: ""
       },
    }
}

```


```
methods: {
    // 打开上传文件的弹出框
    handleUpload(index, row) {
      this.upload.CurrentfactoryId = row.factoryId;
      this.$refs.importFile.click();
    },
    // 确认导入列表
    confirmUpload() {
    	this.$confirm('此操作将上传 '+this.$refs.importFile.files[0].name+' , 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message.info('该过程耗时较长，请耐心等待');
          this.importTable();
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消上传'
          });  
          this.$refs.importFile.value = null;        
        });
    },
    // 导入报表至后台
    importTable() {
      let fd = new FormData(document.getElementById("uploadform"));
      // fd.append("file", this.upload.importFile);
      // fd.append("factoryId", this.upload.CurrentfactoryId);
      // console.log(fd.get('importFile'));
      api.importTable((err, res) => {
          if (err) {
            if (err.response.status === 403 && err.response.data.code==-2) {
              this.$message.error("请登录");
              session.clear();
              this.$router.push({ path: "/login" });
            } else if ( err.response.status === 500) {
              this.$message.error("系统出错，请稍后再试");
            } else if (err.response.status == 403) {
              this.$message.error("该账号没有此操作权限");
            }
            return;
          }
          if (res.data.code == 200) {
            this.$message({
              message: "文件上传成功！",
              type: "success"
            });
            this.visible = false;
          } else {
            this.$message.error("出错了，刷新一下吧");
          }
        },fd);
    },
}

```


```
// 引用instance
import instance from './instance.js'

function importTable(fn,data) {
	instance.post('/super_admin/factory/device/import', data)
    .then(function (res) {
      fn(false, res);
    }).catch(function (err) {
      fn(err);
    });
}

export{
    importTable
}

```

### 注意
1. 如果对于input的样式不满意，可以使用opacity把原来的input透明化来进行美化。
2. 依然是使用formdata对象，虽然使用vue，但不知道为什么用append无法把文件传到后台，因此通过操作节点来新建，如果有人知道可以分享一下。
3. headers可以不手动添加，浏览器会判定界限，也可以加上。