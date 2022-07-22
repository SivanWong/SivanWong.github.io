---
title: JS：发布-订阅和观察者
date: 2019-03-15
tags: [JS]
categories: JS
comments: true
---

![image](https://upload-images.jianshu.io/upload_images/5262488-291da39f66dbc28a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1000)

## 观察者模式（自定义事件）
目标和观察者是基类，目标提供维护观察者的一系列方法，观察者提供更新接口。具体观察者和具体目标继承各自的基类，然后具体观察者把自己注册到具体目标里，在具体目标发生变化时候，调度观察者的更新方法。

```
// 观察者(订阅者)
function Observer(name) {
	this.name = name;
}
Observer.prototype = {
	update: function(context) {
		console.log(this.name + "：" + context);
	}
}

// 观察者(订阅者)列表
function ObserverList() {
	this.observerList = [];
}

ObserverList.prototype = {
	add: function(obj) {
		return this.observerList.push(obj);
	},
	count: function() {
		return this.observerList.length;
	},
	get: function(index) {
		if (index > -1 && index < this.observerList.length) {
			return this.observerList[index];
		}
	},
	removeAt: function(index) {
		this.observerList.splice(index, 1);
	}
}


// 目标(发布者)
function Subject() {
	this.observers = new ObserverList();
}

Subject.prototype = {
	addObsever: function(observer) {
		this.observers.add(observer);
	},

	removeObsever: function(observer) {
		this.observers.removeAt(this.observers.indexOf(observer, 0));
	},

	notify: function(context) {
		var observerCount = this.observers.count();
		for (var i = 0; i < observerCount; i++) {
			this.observers.get(i).update(context);
		}
	}
}


var mySubject = new Subject();
mySubject.addObsever(new Observer("小明"));
mySubject.addObsever(new Observer("小红"));
mySubject.notify("hello world");
	
```


## 发布-订阅
### 理解
发布-订阅模式，用个对象作为调度中心，绑定事件名为属性。订阅者把自己想订阅的事件注册到调度中心，发布者发布事件到调度中心时，即触发这个事件，由调度中心统一调度订阅者注册到调度中心的处理代码。

### 优点
- 支持简单的广播通信，当对象状态发生改变时，会自动通知已经订阅过的对象。
- 发布者与订阅者耦合性降低，发布者只管发布一条消息出去，它不关心这条消息如何被订阅者使用，同时，订阅者只监听发布者的事件名，只要发布者的事件名不变，它不管发布者如何改变。

### 缺点
- 创建订阅者需要消耗一定的时间和内存。
- 虽然可以弱化对象之间的联系，如果过度使用的话，反而使代码不好理解及代码不好维护等等。


### 一个简单的发布订阅

```
var event = {
  clientList: {},
  listen: function( key, fn ){             //添加订阅对象
      if( !this.clientList[ key ] ){
         this.clientList[ key ] = [];
      }
      this.clientList[ key ].push( fn );
  }, 
  trigger: function(){                     //绑定发布事件
     var key = Array.prototype.shift.apply( arguments ),
         fns = this.clientList[ key ];
     for( var i = 0, fn; fn = fns[ i++]; ){
        fn.apply( this, arguments );
     }
  },
  remove: function( key, fn ){            //取消订阅的事件
     var fns = this.clientList[ key ];
     
     if( !fns ){                          //如果key对应的消息没有被人订阅，则直接返回  
        return false;
     };
     if( !fn ){                           //如果没有传入具体的回调函数，标示取消key对应消息的所有订阅 
        fns = [];
     }else{
        for( var i = fns.length - 1; i >= 0 ; i-- ){  //取消key对应的订阅消息
            if( fn === fns[ i ] ){
               fns.splice( i, 1 );
            }
        }
     }
     
  }
};

var saleOffices = {};
//给对象绑定一个调度中心
var installEvent = function( obj ){
  for( i in event ){
    obj[ i ] = event[ i ];
  }
};

installEvent( saleOffices );
saleOffices.listen( "squareMeter88", fn1 = function( price ){
   console.log( "价格" + price );
} );
saleOffices.listen( "squareMeter88", function( price ){
   console.log( "价格" + price );
} );
saleOffices.remove( "squareMeter88", fn1 );
saleOffices.trigger( "squareMeter88", 200000 );

```


## 不同
观察者模式的订阅者和发布者之间是存在依赖的，发布订阅模式的不会。
