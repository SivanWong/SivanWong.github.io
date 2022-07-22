---
title: E2E测试
date: 2022-02-15
tags: [前端]
categories: 前端
comments: true
---

## E2E (end-to-end)
- E2E测试就是end to end testing，即端到端测试。
- 它模仿用户，从某个入口开始，逐步执行操作，直到完成某项工作。
- E2E 测试并没有那么强调要覆盖全部使用场景，它关注的是一个完整的操作链是否能够完成。对于 Web 前端来说，还关注 界面布局、内容信息是否符合预期。
- 不管逻辑使用什么框架什么逻辑写的，只想知道浏览器上我要的交互效果，ui展示效果是不是正确的，功能使用上是不是正确的，那么这就叫E2E测试。

## cypress
cypress是一款开箱即用,可以跑在Chrome浏览器上的测试工具。可以利用Cypress来模拟用户操作了，一方面可以测试代码是否正确，并且还能看到ui相应变化是否符合预期。

### 安装

```
$ npm install cypress --save-dev --registry=https://registry.npm.taobao.org
```
### 使用
可以只写cypress需要访问的服务地址。
```
// cypress.json

{
  "baseUrl": "http://localhost:8000", #测试访问的路由地址
  "reporter": "junit", #报告类型
  "reporterOptions": {
    "mochaFile": "results/test-[hash].xml", #输出的文件
    "toConsole": true #是否输出的命令行
  },
  "viewportHeight": 800, # viewPort也就是预览窗的高度
  "viewportWidth": 1600 # viewPort也就是预览窗的宽度
}
```
通过cypress open本地打开测试窗口

```
$ cypress open
```
![image](https://segmentfault.com/img/bVcPqQS)

点击右上角的运行所有集成化测试，或是点击单个测试用例单独测试

### 目录结构

```
├── fixtures # mock数据的存储目录，这里存放了所有mock的json文件
│   ├── orders.json
│   ├── panicBuyings.json
│   └── routers.json
├── integration # 测试用例代码目录
│   ├── orderManagement.spec.js
│   └── panicBuyingManagement.spec.js
├── plugins # 插件目录
│   └── index.js
└── support
    ├── commands.js
    └── index.js
```
### 代码编写
模拟用户操作
```
describe('测试抢购订单管理', () => {
  beforeEach(() => { #每个测试用例调用之前的操作
    const mock = Cypress.env('MOCK') || 'false'; # 自定义环境变量，运行时传递的话需要指定CYPRESS_前缀，这里使用是CYPRESS_MOCK=true cypress open
    cy.server(); # 如果需要mock接口的话，必须要运行server
    if (mock === true) {
      cy.intercept('GET', '/panic-buying/manager/orders*', { fixture: 'orders.json' }).as(
        'getOrders',
      ); # 拦截/panic-buying/manager/order*路由，并指定返回数据使用orders.json，定义这个接口是getOrders函数，用于后面测试使用。
    } else {
      cy.intercept('GET', '/panic-buying/manager/orders*').as('getOrders');
    }
  });
  it('测试订单列表搜索', () => {
    cy.visit('/#/rush-order/list'); #访问页面路径
    cy.wait('@getOrders').its('response.statusCode').should('be.oneOf', [200, 304]); # 等待getOrders函数，也就是接口返回并判断返回状态是200或是304中的一个。
    cy.wait(1000); # 显示的等待1秒
  });
});
```

### API
更多api操作参考：[Commands](https://docs.cypress.io/api/commands/and)

#### 测试套件和用例
- describe(): 代表测试套件，里面可以设定，一个测试套件可以不包括任何钩子函数（Hook），但必须包含至少一条测试用例 it() ，能嵌套子测试套件。
- context(): 是 describe() 的别名，其行为方式是一致的，可以直接用 context() 代替 describe()。
- it(): 代表一条测试用例。
- ......

#### 钩子函数
- before(): 运行 cypress via cypress open 时，打开项目时将触发该事件。每次 cypress run 执行时都会触发该事件，会在第一个用例之前运行。
- after()：会在跑完所有的用例之后运行。
- beforeEach()：会在每一个用例前运行。
- afterEach()：会在每一个用例结束后运行。
- ......

#### dom节点
- get(): 用来在 DOM 树中查找 DOM 元素，get方法可以像jquery一样通过selector查找到对应的dom。
- children()：获取一组 DOM 元素中每个 DOM 元素的子元素。
- parent()：获取一组 DOM 元素的父 DOM 元素。
- siblings()：获取兄弟 DOM 元素等。
- trigger(): 在 DOM 元素上触发事件。
- ......

```
// 触发dom的mouseover事件
dom.trigger('mouseover')

// 语法使用示例
// eventName（string）event 在DOM元素上要触发的的名称。
.trigger(eventName)

// position（string）
// 应该触发事件的位置。该center位置是默认位置。
// 有效的位置topLeft，top，topRight，left，center，right，bottomLeft，bottom，和bottomRight。
.trigger(eventName, position)

// options: 传递选项对象以更改的默认行为
.trigger(eventName, options)

// x（number）: 从元素左侧到触发事件的距离（单位px）。
// y（number）: 从元素顶部到触发事件的距离（单位px）。
.trigger(eventName, x, y)

.trigger(eventName, position, options)
.trigger(eventName, x, y, options)
```

#### 网络接口
- intercept: 在网络层管理 HTTP 请求的行为

```
cy.intercept(url, staticResponse)
cy.intercept(method, url, staticResponse)
cy.intercept(routeMatcher, staticResponse)
cy.intercept(url, routeMatcher, staticResponse)
```

#### Actions行为事件
ui自动化操作页面上的元素，常用的方法输入如文本，点击元素，清空文本，点击按钮。还有一些特殊的checkbox,radio,滚动条等。cypress都可以api操作：
- type(): 往输入框输入文本元素。
- focus(): 聚焦DOM元素。
- clear(): 清空DOM元素。
- rightclick(): 右击 DOM 元素
- click()：点击 DOM 元素
- select(): select 选项框

## 进阶
有时候一个项目往往十分庞大，并不是所有组件都需要进行E2E测试，因此可以把需要进行测试的组件单独拿出来，本地部署一下，进行测试。

```
├── cypress # cypress目录
│   ├── fixtures
│   ├── integration
│   ├── ...
│   └── plugins
├── e2e # 需要进行测试的组件代码
```

单独设置一个小项目，把需要进行测试的组件引进来，组成一个页面，对此页面进行测试。因此在开始测试前，需要先把这个页面跑起来，再开始测试。


## 参考
- [前端E2E测试框架 cypress了解一下](https://segmentfault.com/a/1190000014665493)
- [UI自动化测试框架Cypress介绍和使用](https://segmentfault.com/a/1190000039388377)
- [Cypress自动化测试入门使用](https://juejin.cn/post/6995520480711016479)