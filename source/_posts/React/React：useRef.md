---
title: React：useRef
date: 2021-05-11
tags: [React]
categories: React
comments: true
---

## 介绍
类组件、React 元素用 React.createRef，函数组件使用 useRef

useRef 返回一个可变的 ref 对象，其 .current 属性被初始化为传入的参数（initialValue）。返回的 ref 对象在组件的整个生命周期内保持不变。
## 使用
### 绑定DOM
类组件
```
class App extends React.Component {
  refInput = React.createRef();
  componentDidMount() {
    this.refInput.current && this.refInput.current.focus();
  }
  render() {
    return <input ref={this.refInput} />;
  }
}
```
函数组件
```
function App() {
  const refInput = React.useRef(null);
  React.useEffect(() => {
    refInput.current && refInput.current.focus();
  }, []);

  return <input ref={refInput} />;
}
```
### 父组件调用子组件方法
一些应用场景,需要在父组件中调用子组件定义的方法.这就需要将组件抛出给父组件。

#### 类组件

父组件

```
class ParentComponent extends Component {
  refChild = React.createRef();
  setChildText = () => {
    if (this.refChild.current) {
      this.refChild.current.setText("text updated by parent component");
    }
  };
  render() {
    return (
      <>
        {/* 父组件引用时,直接使用 ref 即可绑定子组件实例 */}
        <ChildComponent ref={this.refChild} />
        <button onClick={this.setChildText}>set text by parent</button>
      </>
    );
  }
}
```

子组件

```
class ChildComponent extends Component {
  state = { text: "" };
  setText(text = "") {
    this.setState({ text });
  }
  render() {
    return <p>text: {this.state.text}</p>;
  }
}
```


#### 函数组件
需要配合useImperativeHandle使用

父组件
- useRef是一个方法，且useRef返回一个可变的ref对象，initialValue被赋值给其返回值的.current对象。
- useRef会在每次渲染时返回同一个ref对象，即返回的ref对象在组件的整个生命周期内保持不变。
- ref对象的值发生改变之后，不会触发组件重新渲染。有一个窍门，把它的改变动作放到useState()之前。

```
function Parent() {
  const ref = useRef(null); // { current: null }

  return (
    <>
      <ForwardChild ref={ref} />
      <button
        onClick={() => {
          ref.current &&
            ref.current.setTextByParent("text updated by parent component");
        }}
      >
        set text by parent
      </button>
    </>
  );
}
```
子组件
- useImperativeHandle(ref,createHandle,[deps])可以自定义暴露给父组件的实例值。如果不使用，父组件的ref访问不到任何值（ref.current==null）
- useImperativeHandle应该与forwradRef搭配使用
- React.forwardRef会创建一个React组件，这个组件能够将其接受的ref属性转发到其组件树下的另一个组件中。
- React.forward接受渲染函数作为参数，React将使用prop和ref作为参数来调用此函数。

```
// 函数组件需要使用 forwardRef 包裹
forwardRef(function Child(props, ref) {
  const [text, setText] = useState("");

  // 该 hook 需要定义抛出给父组件的可以使用的 api 方法
  // 相当于代理了子组件的方法
  useImperativeHandle(ref, () => ({
    setTextByParent(text = "") {
      setText(text);
    },
  }));

  return <p>text: {text}</p>;
})
```

## 参考
- [useRef使用总结](https://juejin.cn/post/6844904174417608712)
- [关于 useRef 的使用](https://segmentfault.com/a/1190000022998521)