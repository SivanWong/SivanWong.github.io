---
title: React：自定义Hook
date: 2022-08-24
tags: [React]
categories: React
comments: true
---

### 自定义Hook
- 自定义 Hook 是一个函数，其名称以 “use” 开头，函数内部可以调用其他的 Hook。 
- Hook 是一种复用状态逻辑的方式，它不复用 state 本身，事实上 Hook 的每次调用都有一个完全独立的 state 。

### 例子
通过自定义 hook 实现 input 双向数据绑定。
#### 实现

```
function useBind(initVal){
    let [value,setValue] = useState(initVal);
    let onChange = function(event){
        setValue(event.currentTarget.value);
    }
    return {
        value,
        onChange
    }
}
```
#### 使用

```
function CustomHook (){
    const valueObj = useBind("");
    return <input {...valueObj} />
}
```

### 题外话：ahooks
阿里开源的 ahooks  。它是一个 React Hooks 库，致力提供常用且高质量的 Hooks 。
#### 安装

```
npm install ahooks --save 
```
#### 值得学习的hooks
- useUpdate：强制组件重新渲染的 Hook 。
- useUpdateEffect：一个只在依赖更新时执行的 useEffect hook 。
- usePersistFn：持久化 function 的 Hook 。
- useMount：组件挂载生命周期 Hook 。
- useUnmount：组件卸载生命周期 Hook 。
- useDebounce：用来处理防抖值的 Hook 。
- useThrottle：用来处理节流值的 Hook 。

### 参考
- [React Hook 从入门应用到编写自定义 Hook](https://juejin.cn/post/6887838157874659341)