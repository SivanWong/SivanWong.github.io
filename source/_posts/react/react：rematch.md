---
title: react：rematch
Date: 2021-04-19
tags: [react]
categories: react
comments: true
---

rematch是对redux的二次封装，简化了redux是使用，极大的提高了开发体验。rematch仅仅是对redux的封装，没有依赖redux-saga，也没有关联react，因此其可以用在其他的视图库中，如vue等。
## Redux vs Rematch

item | Redux | Rematch
---|---|---
simple setup |  |  ✅
less boilerplate |   |  ✅
readability	|  |  ✅
configurable | ✅ |  ✅
redux devtools | ✅ |  ✅
generated action creators |  |  ✅
async | thunks | async/await

## 使用
### 项目结构

```
├── index.html
├── index.js   　　　　　　 # 项目的入口
├── ....
└── store
    ├── index.js           # 引入modules的各个模块，初始化store的地方
    └── modules
        ├── count.js       # count模块
        └── info.js   　　 # info模块
```
### 初始化
rematch提供 init（）方法，返回一个store的实例。初始化store的时候rematch支持传入多个模块，在中、大型项目中可以根据业务的需要，拆分成多个模块，这样项目的结果就会变得清晰明了。
```
import { init } from '@rematch/core';
import count from './modules/count';
import info from './modules/info';

const store = init({
    models: {
        count,
        info,
    }
})

export default store;
```

### 业务代码

```
// count.js
export const count = {
  state: {
      num: 0
  },
  reducers: {
    // 从第二个变量开始为调用 add 时传递进来的参数，后面依次类推，例如：dispatch.count.add(10, 20)时， num1 = 10 , num2 = 20.
    add(state, num1, num2) {
        //...
        return {
            ...state,
            num: num1 + num2
        }
    },
    remove() {
        //...
        return {
            ...state,
            num: 0
        }
    }
  },
  effects: {
    // 第二个变量为当前model的state的值，num1为调用 addAsync 时传递进来的第一个参数，num2为调用时传递的第二个参数，后面依次类推。例如：dispatch.count.ddAsync(10, 20)时，num1 = 10, num2 = 20
    async addAsync (num1, rootState, num2) {
        //...
        this.add(num1, num2);
    }
  }
}

```
事实上每一个模块就是一个对象，该对象包含三个属性：state、reducers、effects。
- state：存放模块状态的地方。
- educers：改变store状态的地方。
    - 每个reducers函数都会返回一个对象作为模块最新的state。
    - reducers中的函数必须为同步函数，如果要异步处理数据需要在effects中处理。
    - 注意：只能通过在reducers的函数中通过返回一个新的对象来改变模块中state的值，直接通过修改state的方式是是不能改变模块的state的值。
- effects：处理异步数据的地方。比如：异步从服务端获取数据。
    - 注意：在effects中是不能修改模块的state，需要在异步处理完数据后调用reducers中的函数修改模块的state。

### 获取和修改state
有2种方法可以获取state和修改state：
- 使用redux的高阶组件connect将state、reducers、effects绑定到组件的props上。
- 使用rematch提供的dispatch和getState。

#### 使用redux的高阶组件connect

```
const mapStateToProps = (state) => ({
    num: state.count.num
})

const mapDispatchToProps = (dispatch) => ({
    add: (num1, num2) => { dispatch.count.add(num1, num2); },
    remove: dispatch.count.remove
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
```
#### dispatch 和 getState
- getState：rematch提供的getState方法返回整个store的state对象
    - 如果要单独访问count模块的state，只需要 getState( ).count即可。
- dispatch：rematch提供的dispatch可以直接调用整个store中定义的reducers和effects。
    - 例：dispatch.count.add(10, 20) ，其中count为store中的一个model， add 方法为count模块中提供的一个reducers。
    - 调用effects的方法和调用reducers的方法一样。

```
import React, {Component} from 'react';
import { dispatch, getState } from '@rematch/core';

class App extends Component {
    handleClick = () => {
　　　　 console.log(getState().count);           //  {num: 0}
        dispatch.count.add(10, 20)
    };
}
```
## 参考
- [Rematchjs](https://github.com/rematch/rematch)
- [rematch：当你受不了redux繁琐写法的时候，是时候了解一波rematch了](https://www.cnblogs.com/heavenYJJ/p/9363259.html)
- [Rematch 一个更好用的 Redux](https://juejin.cn/post/6844903576909643789)