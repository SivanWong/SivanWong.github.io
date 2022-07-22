---
title: react：生命周期
Date: 2021-02-20
tags: [react]
categories: react
comments: true
---

React的生命周期从广义上分为三个阶段：挂载、渲染、卸载

因此可以把React的生命周期分为两类：挂载卸载过程和更新过程。

![image](https://upload-images.jianshu.io/upload_images/16775500-8d325f8093591c76.jpg?imageMogr2/auto-orient/strip|imageView2/2/w/740/format/webp)

## 之前的生命周期

### 挂载卸载过程
- constructor
- componentWillMount
- render
- componentDidMount

#### constructor()
constructor()中完成了React数据的初始化，它接受两个参数：props和context，当想在函数内部使用这两个参数时，需使用super()传入这两个参数。
注意：只要使用了constructor()就必须写super(),否则会导致this指向错误。

#### componentWillMount()
componentWillMount()一般用的比较少，它更多的是在服务端渲染时使用。它代表的过程是组件已经经历了constructor()初始化数据后，但是还未渲染DOM时。

#### componentDidMount()
组件第一次渲染完成，此时dom节点已经生成，可以在这里调用ajax请求，返回数据setState后组件会重新渲染

#### componentWillUnmount ()
在此处完成组件的卸载和数据的销毁。

- clear你在组建中所有的setTimeout,setInterval
- 移除所有组建中的监听 removeEventListener
- 有时候我们会碰到一个warning。

```
原因：因为你在组件中的ajax请求返回setState,而你组件销毁的时候，请求还未完成，因此会报warning

解决方法：
componentDidMount() {
    this.isMount === true
    axios.post().then((res) => {
    this.isMount && this.setState({   // 增加条件ismount为true时
      aaa:res
    })
})
}
componentWillUnmount() {
    this.isMount === false
}
```

### 更新过程
- componentWillReceiveProps
- shouldComponentUpdate
- componentWillUpdate
- render
- componentDidUpdate

#### componentWillReceiveProps (nextProps)
- 在接受父组件改变后的props需要重新渲染组件时用到的比较多
- 接受一个参数nextProps
- 通过对比nextProps和this.props，将nextProps的state为当前组件的state，从而重新渲染组件


```
componentWillReceiveProps (nextProps) {
    nextProps.openNotice !== this.props.openNotice&&this.setState({
        openNotice:nextProps.openNotice
    }，() => {
      console.log(this.state.openNotice:nextProps)
      //将state更新为nextProps,在setState的第二个参数（回调）可以打         印出新的state
  })
}
```

#### shouldComponentUpdate(nextProps,nextState)
- 主要用于性能优化(部分更新)
- 唯一用于控制组件重新渲染的生命周期，由于在react中，setState以后，state发生变化，组件会进入重新渲染的流程，在这里return false可以阻止组件的更新
- 因为react父组件的重新渲染会导致其所有子组件的重新渲染，这个时候其实我们是不需要所有子组件都跟着重新渲染的，因此需要在子组件的该生命周期中做判断

#### componentWillUpdate (nextProps,nextState)
shouldComponentUpdate返回true以后，组件进入重新渲染的流程，进入componentWillUpdate,这里同样可以拿到nextProps和nextState。

#### componentDidUpdate(prevProps,prevState)
组件更新完毕后，react只会在第一次初始化成功会进入componentDidmount,之后每次重新渲染后都会进入这个生命周期，这里可以拿到prevProps和prevState，即更新前的props和state。

#### render()
render函数会插入jsx生成的dom结构，react会生成一份虚拟dom树，在每一次组件更新时，在此react会通过其diff算法比较更新前后的新旧DOM树，比较以后，找到最小的有差异的DOM节点，并重新渲染。

## React v16.4+ 的生命周期变更

![image](https://upload-images.jianshu.io/upload_images/5287253-19b835e6e7802233.png?imageMogr2/auto-orient/strip|imageView2/2/format/webp)

React16废弃的三个生命周期函数

- componentWillMount
- componentWillReceiveProps
- componentWillUpdate

> 目前在16版本中componentWillMount，componentWillReceiveProps，componentWillUpdate并未完全删除这三个生命周期函数，而且新增了UNSAFE_componentWillMount，UNSAFE_componentWillReceiveProps，UNSAFE_componentWillUpdate三个函数，官方计划在17版本完全删除这三个函数，只保留UNSAVE_前缀的三个函数，目的是为了向下兼容，但是对于开发者而言应该尽量避免使用他们，而是使用新增的生命周期函数替代它们

取而代之的是两个新的生命周期函数

- static getDerivedStateFromProps
- getSnapshotBeforeUpdate

### 挂载卸载过程
- constructor
- getDerivedStateFromProps
- ~~componentWillMount~~/UNSAVE_componentWillMount
- render
- componentDidMount

#### getDerivedStateFromProps

```
static getDerivedStateFromProps(nextProps, prevState)
```

- 一个静态方法，所以不能在这个函数里面使用this，这个函数有两个参数props和state，分别指接收到的新参数和当前的state对象
- 这个函数会返回一个对象用来更新当前的state对象，如果不需要更新可以返回null
- 该函数会在挂载时，接收到新的props，调用了setState和forceUpdate时被调用
- 这个方法就是为了取代之前的componentWillMount、componentWillReceiveProps和componentWillUpdate
- 当我们接收到新的属性想去修改我们state，可以使用getDerivedStateFromProps

### 更新过程
- ~~componentWillReceiveProps~~/UNSAFE_componentWillReceiveProps
- getDerivedStateFromProps
- shouldComponentUpdate
- ~~componentWillUpdate~~/UNSAFE_componentWillUpdate
- render
- getSnapshotBeforeUpdate
- componentDidUpdate

#### getSnapshotBeforeUpdate

```
getSnapshotBeforeUpdate(prevProps, prevState)
```

- 这个方法在render之后，componentDidUpdate之前调用，有两个参数prevProps和prevState，表示之前的属性和之前的state
- 这个函数有一个返回值，会作为第三个参数传给componentDidUpdate，如果你不想要返回值，请返回null，不写的话控制台会有警告
- 这个方法一定要和componentDidUpdate一起使用，否则控制台也会有警告
- 这个方法时用来代替componentWillUpdate

## 参考链接
- [React的生命周期](https://www.jianshu.com/p/b331d0e4b398)
- [我对 React v16.4 生命周期的理解](https://juejin.cn/post/6844903655372488712)