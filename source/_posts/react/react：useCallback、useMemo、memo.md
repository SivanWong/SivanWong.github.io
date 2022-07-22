---
title: react：useCallback、useMemo、memo
Date: 2021-05-11
tags: [react]
categories: react
comments: true
---

useMome、useCallback用法都差不多，都会在第一次渲染的时候执行，之后会在其依赖的变量发生改变时再次执行，并且这两个hooks都返回缓存的值，useMemo返回缓存的变量，useCallback返回缓存的函数。

```
const value = useMemo(fnM, [a]);

const fnA = useCallback(fnB, [a]);
```
### memo
React.memo 为高阶组件。它与React.PureComponent非常相似，但它适用于函数组件，但不适用于 class 组件。

默认情况下其只会对复杂对象做浅层对比，如果你想要控制对比过程，那么请将自定义的比较函数通过第二个参数传入来实现。这与shouldComponentUpdate 方法的返回值相反。


```
function MyComponent(props) {
  /* 使用 props 渲染 */
}
function areEqual(prevProps, nextProps) {
  /*
  如果把 nextProps 传入 render 方法的返回结果与
  将 prevProps 传入 render 方法的返回结果一致则返回 true，
  否则返回 false
  */
}
export default React.memo(MyComponent, areEqual);

```

当父组件引入子组件的情况下，往往会造成组件之间的一些不必要的浪费

每次父组件更新count，子组件都会更新。使用memo，count变化子组件没有更新。
```
const Child = memo((props) => {
    console.log('子组件?')
    return(
        <div>我是一个子组件</div>
    );
})
const Page = (props) => {
    const [count, setCount] = useState(0);
    return (
        <>
            <button onClick={(e) => { setCount(count+1) }}>加1</button>
            <p>count:{count}</p>
            <Child />
        </>
    )
}

```
### useCallback
当父组件传递状态给子组件的时候，memo好像没什么效果，子组件还是执行了，这时候我们就要引入hooks的useCallback、useMemo这两个钩子了。

在上面代码基础上，父级调用子级时，在onClick参数上加上useCallback，参数为[]，则第一次初始化结束后，不再改变。

```
//子组件没有必要渲染的例子
interface ChildProps {
    name: string;
    onClick: Function;
}
const Child = memo(({ name, onClick}: ChildProps): JSX.Element => {
    console.log('子组件?')
    return(
        <>
            <div>我是一个子组件，父级传过来的数据：{name}</div>
            <button onClick={onClick.bind(null, '新的子组件name')}>改变name</button>
        </>
    );
})

const Page = (props) => {
    const [count, setCount] = useState(0);
    const [name, setName] = useState('Child组件');
    
    return (
        <>
            <button onClick={(e) => { setCount(count+1) }}>加1</button>
            <p>count:{count}</p>
            <ChildMemo name={name} onClick={ useCallback((newName: string) => setName(newName), []) }/>
            {/* useCallback((newName: string) => setName(newName),[]) */}
            {/* 这里使用了useCallback优化了传递给子组件的函数，只初始化一次这个函数，下次不产生新的函数
        </>
    )
}

```

### useCallback性能问题
一般会觉得使用useCallback的性能会比普通重新定义函数的性能好。

```
function App() {
  const [val, setVal] = useState("");

  const onChange = useCallback(evt => {
    setVal(evt.target.value);
  }, []);

  return <input val={val} onChange={onChange} />;
}
```
实际性能会更差，上面的写法几乎等同于下面：

```
const temp = evt => {
  setVal(evt.target.value);
};

const onChange = useCallback(temp, []);
```

可以看到onChange的定义是省不了的，而且额外还要加上调用useCallback产生的开销，性能怎么可能会更好？

真正有助于性能改善的，有 2 种场景：
- 函数定义时需要进行大量运算， 这种场景极少
- 需要比较引用的场景，如上文提到的useEffect，又或者是配合React.Memo使用

### useMemo
更新属性name为对象类型，这时子组件还是一样的执行了，在父组件更新其它状态的情况下，子组件的name对象属性会一直发生重新渲染改变，从而导致一直执行,这也是不必要的性能浪费。

解决这个问题，使用name参数使用useMemo，依赖于State.name数据的变化进行更新。

```
interface ChildProps {
    name: { name: string; color: string };
    onClick: Function;
}
const Child = memo(({ name, onClick}: ChildProps): JSX.Element => {
    console.log('子组件?')
    return(
        <>
            <div style={{ color: name.color }}>我是一个子组件，父级传过来的数据：{name.name}</div>
            <button onClick={onClick.bind(null, '新的子组件name')}>改变name</button>
        </>
    );
})

const Page = (props) => {
    const [count, setCount] = useState(0);
    const [name, setName] = useState('Child组件');
    
    return (
        <>
            <button onClick={(e) => { setCount(count+1) }}>加1</button>
            <p>count:{count}</p>
            <ChildMemo 
                //使用useMemo，返回一个和原本一样的对象，第二个参数是依赖性，当name发生改变的时候，才产生一个新的对象
                name={
                    useMemo(()=>({ 
                        name, 
                        color: name.indexOf('name') !== -1 ? 'red' : 'green'
                    }), [name])
                } 
                onClick={ useCallback((newName: string) => setName(newName), []) }
                {/* useCallback((newName: string) => setName(newName),[]) */}
                {/* 这里使用了useCallback优化了传递给子组件的函数，只初始化一次这个函数，下次不产生新的函数
            />
        </>
    )
}

```
### 总结
- 在子组件不需要父组件的值和函数的情况下，只需要使用memo函数包裹子组件即可。
- 在使用函数的情况，需要考虑有没有函数传递给子组件使用useCallback。
- 在值有所依赖的项，并且是对象和数组等值的时候而使用useMemo（当返回的是原始数据类型如字符串、数字、布尔值，就不要使用useMemo了）。不要盲目使用这些hooks。

### 参考
[react Hook之useMemo、useCallback及memo](https://juejin.cn/post/6844903954539626510)
[你不知道的 useCallback](https://segmentfault.com/a/1190000020108840)