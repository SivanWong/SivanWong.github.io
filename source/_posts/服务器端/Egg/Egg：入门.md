---
title: Egg：入门
date: 2021-04-15
tags: [Egg]
categories: Egg
comments: true
---

## 完整目录结构

```
egg-project
├── package.json
├── app.js (可选)
├── agent.js (可选)
├── app
|   ├── router.js
│   ├── controller
│   |   └── home.js
│   ├── service (可选)
│   |   └── user.js
│   ├── middleware (可选)
│   |   └── response_time.js
│   ├── schedule (可选)
│   |   └── my_task.js
│   ├── public (可选)
│   |   └── reset.css
│   ├── view (可选)
│   |   └── home.tpl
│   └── extend (可选)
│       ├── helper.js (可选)
│       ├── request.js (可选)
│       ├── response.js (可选)
│       ├── context.js (可选)
│       ├── application.js (可选)
│       └── agent.js (可选)
├── config
|   ├── plugin.js
|   ├── config.default.js
│   ├── config.prod.js
|   ├── config.test.js (可选)
|   ├── config.local.js (可选)
|   └── config.unittest.js (可选)
└── test
    ├── middleware
    |   └── response_time.test.js
    └── controller
        └── home.test.js
```
## 初始化
可以使用脚手架快速生成项目（npm >=6.1.0）

```
$ mkdir egg-example && cd egg-example
$ npm init egg[ --type=simple]
$ npm i
```

此时目录结构为

```
egg-example
├── app
│   ├── controller
│   │   └── home.js
│   └── router.js
├── config
│   └── config.default.js
└── package.json
```
启动项目:

```
$ npm run dev
$ open http://localhost:7001
```
## 项目各模块
### Router
主要用来描述请求 URL 和具体承担执行动作的 Controller 的对应关系

```
// app/router.js
module.exports = app => {
  const { router, controller } = app;
  router.get('/user/:id', controller.user.info);
};
```

框架约定了app/router.js文件用于统一所有路由规则。

我们通过 Router 将用户的请求基于 method 和 URL 分发到了对应的 Controller 上

### Controller
负责解析用户的输入，处理后返回相应的结果

框架推荐 Controller 层主要对用户的请求参数进行处理（校验、转换），然后调用对应的service方法处理业务，得到业务结果后封装并返回：

1. 获取用户通过 HTTP 传递过来的请求参数。
2. 校验、组装参数。
3. 调用 Service 进行业务处理，必要时处理转换 Service 的返回结果，让它适应用户的需求。
4. 通过 HTTP 将结果响应给用户。

### Model
app/model/**用于放置领域模型，可选，由领域类相关插件约定，如egg-sequelize。

我们使用egg-sequelize来操作数据库，通过映射数据库条目到对象，或者对象到数据库条目，这样，我们读写的都是JavaScript对象，并且还会辅助我们将定义好的 Model 对象加载到 app 和 ctx 上，对前端更加友好。

### Sequelize
我们选择Node的ORM框架Sequelize来操作数据库。这样，我们读写的都是JavaScript对象，Sequelize帮我们把对象变成数据库中的行。

#### ORM

- 对象关系映射（Object Relational Mapping，简称ORM）模式是一种为了解决面向对象与关系数据库存在的互不匹配的现象的技术。
- 简单来说，将程序中的对象自动持久化到关系数据库中。
- ORM提供了实现持久化层的另一种模式，它采用映射元数据来描述对象关系的映射，使得ORM中间件能在任何一个应用的业务逻辑层和数据库层之间充当桥梁。
- 简单来说，ORM框架把关系数据库的表结构映射到对象上。

### 实际使用
- Model（可选）：操作数据库，可以通过一些插件简化对数据库的读写操作，如egg-sequelize。
- Service：业务逻辑层，在此对数据库进行读写操作。若在 Model 中通过框架操作数据库，则调用Model中的方法。
- Controller：接收并处理请求参数，调用 Service 进行业务处理，对返回的参数进行处理并返回给用户。
