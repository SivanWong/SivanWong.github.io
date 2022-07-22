---
title: react：路由跳转
Date: 2021-01-12
tags: [react]
categories: react
comments: true
---

## 路由跳转
### 引入依赖

```
import { withRouter, RouteComponentProps } from 'react-router-dom';
```

### 组件继承上面依赖中的路由组件接口

```
class testPage extends React.Component<RouteComponentProps, {}> {
	// ...
}
```

如果props有其他参数

```
type Props = RouteComponentProps & {
    // ...
}
class testPage extends React.Component<Props, {}> {
	// ...
}
```


### 导出
使用 withRouter 包装

```
export default withRouter(testPage);
```

如果有引入redux

```
export default connect(stateToProps, dispatchToProps)(withRouter(testPage));
```
#### 使用

```
public clickSearch = (value: string) => {
  this.props.history.push( '/test/testpage' );
}
```

## 路由传参
### 路由表配置
参数地址栏显示，刷新页面，参数不丢失
```
<Route path="/test/testpage/:id" component={ OtherDetail } />
```
需要获取参数的页面的类型声明

```
// RouteComponentProps里的参数必须为string
type Props = RouteComponentProps<{ id: string }> & {
    // ...
}
```
跳转
```
this.props.history.push( '/test/testpage/2' );
```
获取
```
this.props.match.params.id
```
### query方法(新版本已废弃)
路由不需要额外配置，参数地址栏不显示，刷新地址栏，参数丢失

跳转
```
this.props.history.push({
    pathname: '/test/testpage',
    query: {
        id: '0'
    }
})
```
获取
```
this.props.location.query.id
```

### search方法（新版本）
路由不需要额外配置，参数地址栏显示，刷新地址栏，参数不丢失

跳转
```
this.props.history.push({
    pathname: '/test/testpage',
    search: '?id=1'
    
})
```
获取
```
this.props.location.search
```


### state方法
路由不需要额外配置，参数地址栏不显示，刷新地址栏，参数不丢失

跳转
```
this.props.history.push({
    pathname: '/test/testpage',
    state: {
        id: '0'
    }
})
```
获取
```
this.props.location.state.id
```
