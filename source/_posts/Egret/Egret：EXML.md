---
title: Egret：EXML
date: 2021-02-20
tags: [Egret]
categories: Egret
comments: true
---

在EUI中，EXML是可以运行时加载解析的。可以把它当做标准的文本文件加载后解析，或者直接将exml文本内容嵌入代码中解析。

## 使用EXML

下面的示例描述一个按钮的皮肤
```
<?xml version="1.0" encoding="utf-8" ?> 
<e:Skin class="skins.ButtonSkin" states="up,down,disabled" minHeight="50" minWidth="100" xmlns:e="http://ns.egret.com/eui"> 
    <e:Image width="100%" height="100%" scale9Grid="1,3,8,8" alpha.disabled="0.5"
             source="button_up_png"
             source.down="button_down_png"/> 
    <e:Label id="labelDisplay" top="8" bottom="8" left="8" right="8"
             size="20" fontFamily="Tahoma 'Microsoft Yahei'"
             verticalAlign="middle" textAlign="center" text="按钮" andtextColor="0x000000"/> 
    <e:Image id="iconDisplay" horizontalCenter="0" verticalCenter="0"/> 
</e:Skin>
```
> 皮肤文件推荐放在resource目录下

### 直接引用EXML文件

```
var button = new eui.Button();
button.skinName = "resource/skins/ButtonSkin.exml";
this.addChild(button);
```

### 动态加载EXML文件
若描述的对象不是皮肤，那么我们就得采用更加通用的一种加载解析方式。可以直接使用EXML.load()方法来加载并解析外部的EXML文件，加载完成后，回调函数的参数会传入解析后的类定义，可以把类定义new出来实例化它，或直接赋值给组件的skinName属性（如果EXML根节点是Skin）。

```
private init():void{
    EXML.load("skins/ButtonSkin.exml",this.onLoaded,this);
}
private onLoaded(clazz:any,url:string):void{
    var button = new eui.Button();
    button.skinName = clazz;
    this.addChild(button);
}
```

### 嵌入EXML到代码
EXML同样也提供了文本的解析方式，这个过程可以直接类比对JSON文件的处理，因为几乎是一样的。可以使用HttpRequest去加载EXML文件的文本内容，然后运行时调用EXML.parse(exmlText)方法去解析即可，会立即返回解析后的类定义。当然，也可以跳过异步加载，直接在代码中嵌入EXML文本内容：

```
var exmlText = `<?xml version="1.0" encoding="utf-8" ?> 
<e:Skin class="skins.ButtonSkin" states="up,down,disabled" minHeight="50" minWidth="100" xmlns:e="http://ns.egret.com/eui"> 
    <e:Image width="100%" height="100%" scale9Grid="1,3,8,8" alpha.disabled="0.5"
             source="button_up_png"
             source.down="button_down_png"/> 
    <e:Label id="labelDisplay" top="8" bottom="8" left="8" right="8"
             size="20" fontFamily="Tahoma 'Microsoft Yahei'"
             verticalAlign="middle" textAlign="center" text="按钮" textColor="0x000000"/> 
    <e:Image id="iconDisplay" horizontalCenter="0" verticalCenter="0"/> 
</e:Skin>`;
var button = new eui.Button();
button.skinName = exmlText;
this.addChild(button);
```
- 可以使用模板字面量（template literals）进行多行字符串的嵌入，从而避免了用 "n"+ 符号来进行字符串连接。即直接使用头尾一对 `  符号（波浪线那个按键）来包裹多行文本
- 包含在模板字面量中的文本内容，还可以使用 ${key} 等嵌入的表达式来引用代码中的变量，进行简洁的字符串拼接

```
var className = "skins.ButtonSkin";
var exmlText = `<e:Skin class="${className}" states="up,over,down,disabled" xmlns:s="http://ns.egret.com/eui">                ...
                </e:Skin>`;
```

## EXML基本语法
### 根节点

```
<e:Group class="app.MyGroup" xmlns:e="http://ns.egret.com/eui"> 
</e:Group>
```

- EXML跟XML一样，是由标签组成的。
- 每个标签都有个命名空间前缀，例如<e:Group>中的e,它的对应命名空间声明也在根节点上：xmlns:e="http://ns.egret.com/eui"。
- 以e这个命名空间开头的节点，表示在EUI这个UI库中的组件。而<e:Group>中的Group就是对应代码中eui.Group这个类。

这个例子中只有一个根节点，根节点上的class属性表示它在运行时解析后要注册为的全局类名。以上的EXML文件，在运行时解析后完全等价于如下代码：

```
module app {    
    export class MyGroup extends eui.Group {        
        public constructor(){
            super();
        }
    }
}
```

从这个例子可以看出EXML文件与代码的对应关系。EXML解析后会变成一个自定义类，继承的父类就是EXML的根节点，模块名和类名定义在跟节点上的class属性内。

> 注意:一定要加class这个属性，否则编译会报错

### 添加子项
上面的例子只有一个根节点，将它扩展，添加一个Image子项：

```
<e:Group class="app.MyGroup" xmlns:e="http://ns.egret.com/eui">     <e:Image /> 
</e:Group>
```

以上内容等价于如下代码：

```
module app {    
    export class MyGroup extends eui.Group {        
        public constructor(){
            super();
            var image = new eui.Image();
            this.addChild(image);
        }
    }
}
```

### 设置属性
刚刚的例子只添加了一个空图片，什么都显示不出来，接下来给它设置一些属性：

```
<e:Group class="app.MyGroup" xmlns:e="http://ns.egret.com/eui"> 
    <e:Image source="image/button_up.png" x="10"/> 
</e:Group>
```

### ID属性
我们可以在节点上声明一个id属性，注意这个id属性与HTML中的id并不是一回事，它的结果相当于给解析后的类声明了一个公开变量。例如：

```
<e:Group class="app.MyGroup" xmlns:e="http://ns.egret.com/eui"> 
    <e:Image id="iconDisplay" /> 
</e:Group>
```

### 数据绑定
EXMl支持数据绑定功能，数据绑定相当于是给静态的EXML文件添加动态脚本的功能，能够极大简化视图刷新的代码量。得益于JavaScript的动态语言特性，所有的Object对象都可以实现动态数据绑定，并不限定于Egret框架内的对象。在EXML中实现数据绑定只需要一对{}括号：

```
<e:ItemRenderer class="skins.ItemRendererSkin" xmlns:e="http://ns.egret.com/eui"> 
    <e:Label id="labelDisplay" text="{data.label}"/> 
</e:ItemRenderer>
```

例如上面的例子，在Label节点的text属性上声明了一个数据绑定：{data.label}，它表示text属性的值始终与根节点ItemRender的data属性上的label值相同。当ItemRender的data属性发生改变，或data上的label属性发生改变时，数据绑定都会自动通知Label重新对text属性赋值，从而刷新视图。

注意目前数据绑定只支持属性链访问，即a.b.c.d.x这种形式,还不支持直接声明复杂表达式的绑定。若遇到复杂表达式的情况，需要自行在外部完成转换，将最终计算结果赋值到数据对象上。

### 内部类
在很多情况下，都需要引用一些只使用一次的EXML文件，对于这种情况，现在更好的做法是直接内嵌它，而不再需要额外创建一个文件再引用它。例如一个Button，需要引用一个皮肤，通常的做法是分成两个文件，创建一个ButtonSkin.exml文件用于描述按钮皮肤，在另一个EXML文件中使用skinName属性引用它的类名：

ButtonSkin.exml

```
<e:Skin class="skins.ButtonSkin" states="up,over,down,disabled" xmlns:e="http://ns.egret.com/eui"> 
    <e:Label id="labelDisplay" left="20" right="20" top="10" bottom="10"/> 
</e:Skin>
```

MyGroup.exml

```
<e:Group class="skins.MyGroup" xmlns:e="http://ns.egret.com/eui"> 
    <e:Button label="按钮" skinName="skins.ButtonSkin">
    </e:Button>
</e:Group>
```

上面的例子，可以直接写在同一个文件内,等价于以下内容：

MyGroup.exml

```
<e:Group class="skins.MyGroup"  xmlns:e="http://ns.egret.com/eui"> 
    <e:Button label="按钮"> 
        <e:Skin states="up,over,down,disabled"> 
            <e:Label id="labelDisplay" left="20" right="20" top="10" bottom="10"/> 
        </e:Skin> 
    </e:Button> 
</e:Group>
```

这种写法能够有效减少EXML的文件数量，仅当皮肤需要复用时，再创建独立的EXML文件。

## 参考链接
[EXML](http://developer.egret.com/cn/github/egret-docs/extension/EUI/EXML/useEXML/index.html)