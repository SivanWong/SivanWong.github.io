---
title: vue：路由原理
Date: 2020-03-17
tags: [vue]
categories: vue
comments: true
---

## 单页面应用
随着前端应用的业务功能越来越复杂、用户对于使用体验的要求越来越高，单页应用（SPA）成为前端应用的主流形式。大型单页应用最显著特点之一就是采用前端路由系统，通过改变URL，在不重新请求页面的情况下，更新页面视图。

## vue-router

### 实现方式
“更新视图但不重新请求页面”是前端路由原理的核心之一，目前在浏览器环境中这一功能的实现主要有两种方式：

1. hash模式，url带#号，但是访问网页不会404。
2. history模式。url不带#号。前端的 URL 必须和实际向后端发起请求的 URL 一致，如果后端没有规定好路由，直接复制url会404。

```
// hash
http://localhost:8080/#/test
// history
http://localhost:8080/test
```

### mode
在vue-router中是通过mode这一参数控制路由的实现模式的，创建VueRouter的实例对象时，mode以构造函数参数的形式传入。

```
const router = new VueRouter({
  mode: 'history',
  routes: [...]
})

// mode 参数：
- 默认hash
- history 注：如果浏览器不支持history新特性,则采用hash方式
- 如果不在浏览器环境则使用abstract（node环境下）
```

![image](https://upload-images.jianshu.io/upload_images/4099767-4e2101346868ac4e.png?imageMogr2/auto-orient/strip|imageView2/2/w/442/format/webp)

### history对象
当选择mode类型之后，程序会根据你选择的mode 类型创建不同的history对象
- HashHistory
- HTML5History
- AbstractHistory

```
// 源码
// 根据mode确定history实际的类并实例化
switch (mode) {
  case 'history':
    this.history = new HTML5History(this, options.base)
    break
  case 'hash':
    this.history = new HashHistory(this, options.base, this.fallback)
    break
  case 'abstract':
    this.history = new AbstractHistory(this, options.base)
    break
  default:
    if (process.env.NODE_ENV !== 'production') {
      assert(false, `invalid mode: ${mode}`)
    }
}
```
#### HashHistory
替换路由的两个方法
- HashHistory.push()
- HashHistory.replace()

##### HashHistory.push()
将新路由添加到浏览器访问历史的栈顶

![image](https://upload-images.jianshu.io/upload_images/4099767-1398ade7d9db935e.png?imageMogr2/auto-orient/strip|imageView2/2/w/599/format/webp)

```
1 $router.push() //调用方法
2 HashHistory.push() //根据hash模式调用,设置hash并添加到浏览器历史记录（添加到栈顶）（window.location.hash= XXX）
3 History.transitionTo() //监测更新，更新则调用History.updateRoute()
4 History.updateRoute() //更新路由
5 {app._route= route} //替换当前app路由
6 vm.render() //更新视图
```

##### HashHistory.replace()
replace()方法与push()方法不同之处在于，它并不是将新路由添加到浏览器访问历史的栈顶，而是替换掉当前的路由

![image](https://upload-images.jianshu.io/upload_images/4099767-13ffd0864295ca69.png?imageMogr2/auto-orient/strip|imageView2/2/w/629/format/webp)


```
replace (location: RawLocation, onComplete?: Function, onAbort?: Function) {
  this.transitionTo(location, route => {
    replaceHash(route.fullPath)
    onComplete && onComplete(route)
  }, onAbort)
}
  
function replaceHash (path) {
  const i = window.location.href.indexOf('#')
  window.location.replace(
    window.location.href.slice(0, i >= 0 ? i : 0) + '#' + path
  )
}
```

##### 监听地址栏
在浏览器中，用户还可以直接在浏览器地址栏中输入改变路由，因此VueRouter还需要能监听浏览器地址栏中路由的变化，并具有与通过代码调用相同的响应行为。在HashHistory中这一功能通过setupListeners实现

```
setupListeners () {
  window.addEventListener('hashchange', () => {
    if (!ensureSlash()) {
      return
    }
    this.transitionTo(getHash(), route => {
      replaceHash(route.fullPath)
    })
  })
}
```
该方法设置监听了浏览器事件hashchange，调用的函数为replaceHash，即在浏览器地址栏中直接输入路由相当于代码调用了replace()方法

#### HTML5History
- History interface是浏览器历史记录栈提供的接口，通过back(), forward(), go()等方法，我们可以读取浏览器历史记录栈的信息，进行各种跳转操作。
- 从HTML5开始，History interface有进一步修炼：pushState(), replaceState() 这下不仅是读取了，还可以对浏览器历史记录栈进行修改
- 当然了，HTML5History用到了HTML5的新特特性，是需要特定浏览器版本的支持的

##### window.history.pushState()和window.history.replaceState()
- window.history.pushState(stateObject, title, URL)
- window.history.replaceState(stateObject, title, URL)
- stateObject: 当浏览器跳转到新的状态时，将触发popState事件，该事件将携带这个stateObject参数的副本
- title: 所添加记录的标题
- URL: 所添加记录的URL

##### 监听地址变化
在HTML5History的构造函数中监听popState（window.onpopstate）

在HTML5History中添加对修改浏览器地址栏URL的监听是直接在构造函数中执行的

```
constructor (router: Router, base: ?string) {
  
  window.addEventListener('popstate', e => {
    const current = this.current
    this.transitionTo(getLocation(this.base), route => {
      if (expectScroll) {
        handleScroll(router, route, current, true)
      }
    })
  })
}
```


#### 两者区别
- pushState设置的新URL可以是与当前URL同源的任意URL；而hash只可修改#后面的部分，故只可设置与当前同文档的URL
- pushState设置的新URL可以与当前URL一模一样，这样也会把记录添加到栈中；而hash设置的新值必须与原来不一样才会触发记录添加到栈中
- pushState通过stateObject可以添加任意类型的数据到记录中；而hash只可添加短字符串
- pushState可额外设置title属性供后续使用

##### 一个问题
用户直接在地址栏中输入并回车，浏览器重启重新加载应用时

hash模式仅改变hash部分的内容，而hash部分是不会包含在HTTP请求中的，故在hash模式下遇到根据URL请求页面的情况不会有问题。

```
http://oursite.com/#/user/id   
// 如重新请求只会发送http://oursite.com/
```

而history模式则会将URL修改得就和正常请求后端的URL一样。
```
http://oursite.com/user/id
```
如后端没有配置对应/user/id的路由处理，则会返回404错误。

官方推荐的解决办法是在服务端增加一个覆盖所有情况的候选资源：如果 URL 匹配不到任何静态资源，则应该返回同一个 index.html 页面，这个页面就是你 app 依赖的页面。






