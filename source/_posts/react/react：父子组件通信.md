---
title: react：父子组件通信
Date: 2020-12-25
tags: [react]
categories: react
comments: true
---

![image](https://segmentfault.com/img/remote/1460000012361466?w=1240&h=667)

### 父组件向子组件通信
由于react是单向数据流向的，父组件一般通过props向子组件传递相关的一些信息


```
// 父组件
<Test visible={visible} />

// 子组件
this.props.visible
```

### 子组件向父组件通信
父组件向子组件传递方法，子组件可以通过调用方法向父组件传递子组件的参数，或者操作父组件的数据。

```
// 父组件
<Test visible={visible} onCancel={(visible)=> this.setState({ visible })/>

// 子组件
this.props.onCancel(this.state.visible);
```

### 跨级组件通信
通过context进行通信。

我们可以把组件之间的关系想象成一个组件树，原始的方法就是通过props一级一级的把状态往下传，在通过调用方法一级一级传回去。

另一种方法就是在他们之间设置一个区域，每个组件都可以访问到，相当于父组件下的一个全局变量。


```
// 最顶部的父组件

import PropTypes from 'prop-types';

class Index extends Component {
  static childContextTypes = {
    themeColor: PropTypes.string
  }

  constructor () {
    super()
    this.state = { themeColor: 'red' }
  }

  getChildContext () {
    return { themeColor: this.state.themeColor }
  }

  render () {
    return (
      <div>
        <Header />
        <Main />
      </div>
    )
  }
}
```
要在父组件设置这个context区域，在childContextTypes中设置允许子组件们访问的变量的名称，getChildContext（）会设置这个区域，这样所有的子组件都可以访问到themeColor这个参数了

```
// 子组件
// 通过在this.context就可以访问

import PropTypes from 'prop-types';

class Title extends Component {
  static contextTypes = {
    themeColor: PropTypes.string
  }

  render () {
    return (
      <h1 style={{ color: this.context.themeColor }}>React.js 小书标题</h1>
    )
  }
}
```
