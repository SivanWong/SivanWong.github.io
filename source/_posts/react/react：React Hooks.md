---
title: react：React Hooks
Date: 2021-02-20
tags: [react]
categories: react
comments: true
---

## 组件类的缺点
React 的核心是组件。v16.8 版本之前，组件的标准写法是类（class）


```
import React, { Component } from "react";

export default class Button extends Component {
  constructor() {
    super();
    this.state = { 
        buttonText: "Click me, please"
    };
  }
  handleClick = () => {
    this.setState({ 
        buttonText: "Thanks, been clicked!" ;
    });
  }
  render() {
    const { buttonText } = this.state;
    return <button onClick={this.handleClick}>{buttonText}</button>;
  }
}
```
这个组件类仅仅是一个按钮，但可以看到，它的代码已经很"重"了。真实的 React App 由多个类按照层级，一层层构成，复杂度成倍增长。再加入 Redux，就变得更复杂。

Redux 的作者 Dan Abramov 总结了组件类的几个缺点:
- 大型组件很难拆分和重构，也很难测试。
- 业务逻辑分散在组件的各个方法之中，导致重复逻辑或关联逻辑。
- 组件类引入了复杂的编程模式，比如 render props 和高阶组件。

## 函数组件
React 团队希望，组件不要变成复杂的容器，最好只是数据流的管道。开发者根据需要，组合管道即可。 组件的最佳写法应该是函数，而不是类。

React 早就支持函数组件，下面就是一个例子。

```
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```

但是，这种写法有重大限制，必须是纯函数，不能包含状态，也不支持生命周期方法，因此无法取代类。

React Hooks 的设计目的，就是加强版函数组件，完全不使用"类"，就能写出一个全功能的组件

## React Hooks
Hook 这个单词的意思是"钩子"。

React Hooks 的意思是，组件尽量写成纯函数，如果需要外部功能和副作用，就用钩子把外部代码"钩"进来。 React Hooks 就是那些钩子。

你需要什么功能，就使用什么钩子。React 默认提供了一些常用钩子，你也可以封装自己的钩子。

所有的钩子都是为函数引入外部功能，所以 React 约定，钩子一律使用use前缀命名，便于识别。你要使用 xxx 功能，钩子就命名为 usexxx。

下面介绍 React 默认提供的四个最常用的钩子。
- useState()
- useContext()
- useReducer()
- useEffect()

### useState()：状态钩子
useState()用于为函数组件引入状态（state）。纯函数不能有状态，所以把状态放在钩子里面。

本文前面那个组件类，用户点击按钮，会导致按钮的文字改变，文字取决于用户是否点击，这就是状态。使用useState()重写如下。

```
import React, { useState } from "react";

export default function Button()  {
  const  [buttonText, setButtonText] =  useState("Click me,   please");

  function handleClick()  {
    return setButtonText("Thanks, been clicked!");
  }

  return  <button  onClick={handleClick}>{buttonText}</button>;
}
```
Button 组件是一个函数，内部使用useState()钩子引入状态。

- useState()这个函数接受状态的初始值，作为参数，上例的初始值为按钮的文字。
- 该函数返回一个数组，数组的第一个成员是一个变量（上例是buttonText），指向状态的当前值。第二个成员是一个函数，用来更新状态，约定是set前缀加上状态的变量名（上例是setButtonText）。

### useContext()：共享状态钩子

如果需要在组件之间共享状态，可以使用useContext()。


```
import React, { useState, useContext } from "react";

const AppContext = React.createContext({ title: '' });

export default function Button () {

  const First = () => {
    const { title } = useContext(AppContext);
  
    return <button>{ title + 1 }</button>;
  }

  const Second = () => {
    const { title } = useContext(AppContext);

    return <button>{ title + 2 } </button>
  }

  return (
    <AppContext.Provider value={{
      title: 'test'
    }}>
      <First></First>
      <Second></Second>
    </AppContext.Provider>
  )
}
```
- 第一步就是使用 React Context API，在组件外部建立一个 Context。需要保证父子组件使用的都是同一个AppContext。
- AppContext.Provider提供了一个 Context 对象，这个对象可以被子组件共享。
- useContext()钩子函数用来引入 Context 对象，从中获取title属性。

### useReducer()：action 钩子

React 本身不提供状态管理功能，通常需要使用外部库。这方面最常用的库是 Redux。

Redux 的核心概念是，组件发出 action 与状态管理器通信。状态管理器收到 action 以后，使用 Reducer 函数算出新的状态，Reducer 函数的形式是(state, action) => newState。

useReducers()钩子用来引入 Reducer 功能。

```
const [state, dispatch] = useReducer(reducer, initialState);
```
上面是useReducer()的基本用法，它接受 Reducer 函数和状态的初始值作为参数，返回一个数组。数组的第一个成员是状态的当前值，第二个成员是发送 action 的dispatch函数。


```
export const testReducer = (state, action) => {
  switch(action.type)  {
    case('change'):
      return  {
        ...state,
        title: 'test dispatch'
      }
    default:
      return  state;
  }
}
```

```
import React, { useState, useContext, useReducer } from "react";
import { testReducer } from '../store/reducer';

const AppContext = React.createContext({ title: '' });

export default function Button () {

  const [buttonText, setButtonText] = useState('test');

  const [state, dispatch] = useReducer(testReducer, { title: 'test reducer' });

  const First = () => {
  
    return <button onClick={ handleClickFirst }>{ buttonText }</button>;
  }

  const Second = () => {

    return <button onClick={ () => dispatch({ type: 'change' }) }>change</button>
  }

  function handleClickFirst () {
    return setButtonText(state.title);
  }

  return (
    <AppContext.Provider value={{
      title: 'test'
    }}>
      <First></First>
      <Second></Second>
    </AppContext.Provider>
  )
}
```

由于 Hooks 可以提供共享状态和 Reducer 函数，所以它在这些方面可以取代 Redux。但是，它没法提供中间件（middleware）和时间旅行（time travel），如果你需要这两个功能，还是要用 Redux。


### useEffect()：副作用钩子

useEffect()用来引入具有副作用的操作，最常见的就是向服务器请求数据。以前，放在componentDidMount里面的代码，现在可以放在useEffect()。


```
useEffect(() => {
    // do some side effects
    return () => {
        // optional, clean up
    }
}/* , [dependencies] */)
```
- 上面用法中，useEffect()接受两个参数。
- 第一个参数是一个函数，异步操作的代码放在里面。
- 第二个参数是一个数组，用于给出 Effect 的依赖项，只要这个数组发生变化，useEffect()就会执行。
- 第二个参数可以省略，这时每次组件渲染时，就会执行useEffect()。


```
const Person = ({ personId }) => {
  const [loading, setLoading] = useState(true);
  const [person, setPerson] = useState({});

  useEffect(() => {
    setLoading(true); 
    fetch(`https://swapi.co/api/people/${personId}/`)
      .then(response => response.json())
      .then(data => {
        setPerson(data);
        setLoading(false);
      });
  }, [personId])

  if (loading === true) {
    return <p>Loading ...</p>
  }

  return <div>
    <p>You're viewing: {person.name}</p>
    <p>Height: {person.height}</p>
    <p>Mass: {person.mass}</p>
  </div>
}
```
上面代码中，每当组件参数personId发生变化，useEffect()就会执行。组件第一次渲染时，useEffect()也会执行。

### 自定义 Hooks
上例的 Hooks 代码还可以封装起来，变成一个自定义的 Hook，便于共享。

```
export default const usePerson = (personId) => {
  const [loading, setLoading] = useState(true);
  const [person, setPerson] = useState({});
  useEffect(() => {
    setLoading(true);
    fetch(`https://swapi.co/api/people/${personId}/`)
      .then(response => response.json())
      .then(data => {
        setPerson(data);
        setLoading(false);
      });
  }, [personId]);  
  return [loading, person];
};
```

usePerson()就是一个自定义的 Hook。

Person 组件就改用这个新的钩子，引入封装的逻辑。


```
import { usePerson } from "./usePerson.ts";

const Person = ({ personId }) => {
  const [loading, person] = usePerson(personId);

  if (loading === true) {
    return <p>Loading ...</p>;
  }

  return (
    <div>
      <p>You're viewing: {person.name}</p>
      <p>Height: {person.height}</p>
      <p>Mass: {person.mass}</p>
    </div>
  );
};
```

## 参考链接
[React Hooks 入门教程](https://www.ruanyifeng.com/blog/2019/09/react-hooks.html)