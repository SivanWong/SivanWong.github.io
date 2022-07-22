---
title: vite
date: 2022-04-26
tags: [前端]
categories: 前端
comments: true
---

# 1.概述
- 项目基本是基于webpack进行打包的，随着模块的增多及需求的迭代，启动、发布等都会越来越慢，为了对此进行优化，开展对vite的调研。
- 调研 Vite 打包工具 与AN业务的适用性，与 Webpack 相比的差异。

# 2.调研方法
1. 使用webiste进行调研。
2. 修改配置及处理启动时的报错。
3. 使用vite进行打包，修改打包时的报错。
4. 打包后执行命令进行预览，修改预览时的报错。
# 3.调研过程

以下是webpack迁移vite会遇到的一些问题

```
"scripts": {
    "dev": "vite",
    "build": "vite build --debug",
    "serve": "vite preview",
}
```

## 3.1 启动
### 3.1.1 环境变量引入
1. 新建本地文件 .env.local ，该文件需添加进 .gitignore 中。
2. 变量名需要以 VITE_xxx 的方式命名。
3. 在配置文件中使用：

```
//.env.local
VITE_COUNTRY = vn
VITE_ENVIRONMENT = test

// vite.config.js
import { defineConfig, loadEnv } from 'vite';
export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  const environment = env.VITE_ENV || env.VITE_ENVIRONMENT || 'test'
  const country = env.VITE_CID || env.VITE_COUNTRY || 'my'

  return defineConfig({
	//...
  })
}
```

### 3.1.2 别名

```
// vite.config.js
export default ({ mode }) => {
  // ...

  return defineConfig({
    resolve: {
      alias: [{ find: '@/', replacement: '/src/' }],
    }
  })
}
```

### 3.1.3 样式

问题1: [vite] Internal server error: Preprocessor dependency "sass" not found. Did you install it?

安装sass

问题2: [vite] Internal server error: Inline JavaScript is not enabled. Is it set in your options?

```
return defineConfig({
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
          modifyVars: theme
        }
      }
    }
})
```

问题3: [vite] Internal server error: '~antd/dist/antd.less' wasn't found. Tried - /Users/xinweiwang/Desktop/affiliate/web-affiliate/src/~antd/dist/antd.less,node_modules/~antd/dist/antd.less,npm://~antd/dist/antd.less,~antd/dist/antd.less

1. 把theme.js中的 @import "~antd/dist/antd.less"; 注释。
2. 添加插件vite-plugin-imp按需加载antd

```
return defineConfig({
    plugins: [
      vitePluginImp({
        libList: [
          {
            libName: "antd",
            style: (name) => `antd/es/${name}/style/`,
          },
        ],
      })
    ],
})
```

问题4：不支持 ':export'


问题5：Unknown theme type: undefined, name: undefined

https://github.com/ant-design/ant-design/issues/19002

```
return defineConfig({
  resolve: {
      alias: {
        '@ant-design/icons/lib/dist': '@ant-design/icons/lib/index.es.js'
      },
  }, 
})
```

### 3.1.4 配置代理

```
return defineConfig({
	server: {
      port: 8888,
      host: '0.0.0.0',
      proxy: {
        '/api': {
          target: `https://affiliate.${environment}.${BASE_DOMAIN_ALL[country]}/`,
          changeOrigin: true
        }
      }
    }
})
```

### 3.1.5 引入入口文件

```
// index.html 
<script type="module" src="/src/index.tsx"></script>
```

### 3.1.6 启动时

各种408，请求超时 ，可以删除node_modules，重新install

### 3.1.7 Uncaught SyntaxError: The requested module '/global.config.js?t=1647918620356' does not provide an export named 'default'

vite不支持cjs，https://github.com/vitejs/vite/issues/3024

1. 方案一：可以通过预捆绑的方式处理，但那代表着需要捆绑很多个文件
2. 方案二：把global.config.js中的module.exports改为export default，所有文件的module.exports及require都需要更改

### 3.1.8 Uncaught ReferenceError: global is not defined

方案一

```
// index.html
<script>
	global = globalThis;
</script>
```

方案二：缺点是打包时会把同名文件的文件名修改掉

```
// vite.config.js 
return defineConfig({
	define: {
      global: JSON.stringify({})
    }
})
```

### 3.1.9 babel

使用插件@vitejs/plugin-react

```
// vite.config.js
return defineConfig({
  plugins: [ 
    react({
      babel: {
        plugins: [],
      },
    }), 
  ]
})
```

### 3.1.10 未解之谜（后来没有再出现了）

https://github.com/vitejs/vite/issues/6241

vite@2.5.10没有出现此问题，但评论说还有，所以也暂时不算是解决了。

### 3.1.11 全局变量

define中对应的值是一个常量，需要使用JSON.stringify()来表示是一个常量。

```
// vite.config.js 
const country = env.VITE_COUNTRY;
return defineConfig({
	define: {
      COUNTRY: JSON.stringify(country)
     }
})
```

### 3.1.12 Uncaught Error: Dynamic require of "/Users/xinweiwang/Desktop/affiliate/web-affiliate/node_modules/@mkt/common-component/dist/LazyImage/default-image.svg" is not supported

方案一：

类似问题及解决方案：https://github.com/vitejs/vite/issues/5308

使用插件@originjs/vite-plugin-commonjs处理了：

```
// vite.config.js 
const country = env.VITE_COUNTRY;
return defineConfig({ 
  plugins: [
      viteCommonjs()
  ]
})
```

### 3.1.13 [vite] Internal server error: Failed to resolve import "' + name + '" from "node_modules/.vite/react-app-polyfill_stable.js?v=f714c2ed". Does the file exist?

找到一个[类似问题](https://stackoverflow.com/questions/71572418/how-can-i-migrate-from-create-react-app-to-vite-in-a-scattered-complex-project)

方案：使用@vitejs/plugin-legacy取代react-app-polyfill，具体配置根据实际情况而定。

```
// vite.config.js 
import legacy from '@vitejs/plugin-legacy';

return defineConfig({ 
  plugins: [ 
	legacy({
        targets: ['ie >= 11'],
        additionalLegacyPolyfills: ['regenerator-runtime/runtime']
      }), 
  ]
})
```

### 3.1.14 regeneratorRuntime is not defined

import "regenerator-runtime"

### 3.1.15 Uncaught TypeError: Unknown theme type: undefined, name: undefined

解决方案：https://github.com/ant-design/ant-design/issues/19002#issuecomment-965958565

## 3.2 打包
### 3.2.1 重名问题

打包时不允许有重名现象，即使一个是类型名，一个是变量名，会报 Identifier 'xxx' has already been declared.

有两处地方存在此问题：

1. /src/components/Payment/BillingDetail/PaymentDetail/index.tsx：PaymentConfirmation
2. /src/components/Payment/Setting/ZipCodeAddress/index.tsx：ZipCodeAddress

### 3.2.2 压缩后大于500k的文件

与业务相关，需要优化具体模块

## 3.3 打包后预览
### 3.3.1 Uncaught TypeError: Failed to resolve module specifier "indexof". Relative references must start with either "/", "./", or "../".

解决方案：https://github.com/vitejs/vite/issues/2670#issuecomment-905495115

### 3.3.2 Uncaught ReferenceError: require is not defined
// vite.config.js 

```
return defineConfig({ 
  build: {
    commonjsOptions: {
      transformMixedEsModules: true
    }
  }, 
})
```


### 3.3.3 Uncaught ReferenceError: exports is not defined

未解决：https://github.com/rollup/plugins/issues/1014

临时解决方案：https://github.com/rollup/plugins/issues/1014#issuecomment-1049512712

## 3.4 Jenkins部署


## 3.5 业务相关

以下是业务相关的补充，由于不影响编译打包等，所以并不保证是包含全部的。

### 3.5.1 svg

使用插件[vite-plugin-svg-icons](https://github.com/vbenjs/vite-plugin-svg-icons)生成svg sprite map

```
// vite.config.js 
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';

return defineConfig({ 
  plugins: [  
    createSvgIconsPlugin({
      iconDirs: [
		path.resolve(process.cwd(), 'src/assets/icons'),
		path.resolve(process.cwd(), 'src/assets/svg')
	  ],
	  symbolId: '[name]'
    }) 
  ]
})

// src/index.tsx
import 'virtual:svg-icons-register';
```

### 3.5.2 其余基于webpack的插件

[vite插件合集](https://github.com/vitejs/awesome-vite#plugins)

webpack插件 | 类似的vite插
---|---
svg-sprite-loader | vite-plugin-svg-icons
workbox-webpack-plugin | vite-plugin-pwa
realtime-translation-webpack-plugin | 
babel-plugin-istanbul-shopee | 

### 3.5.3 业务相关报错
Uncaught (in promise) ReferenceError: require is not defined：类似的require都需要修改

如 src/components/common/Empty

```
// 原来的写法
<img src={require('@/assets/images/empty.png')}/>

// 改为
<img src={new URL('../../../assets/images/empty.png', import.meta.url).href}/>
```

如 src/translate/index.ts

```
// 原来的写法
const message = require('./messages/' + language + '.json');
result[language] = regExpEditLanguage(message);

// 改为
const messages = import.meta.globEager('./messages/*.json');
const path = `./messages/${language}.json`;
result[language] = regExpEditLanguage(messages[path]);
```

# 4.调研结果
## 4.1 原理

官网有给出与传统打包工具的对比

## 4.2 Webpack vs Vite

action | webpack | vite
---|---|---
首次启动 | 90s~120s | 0.4s ~ 1s
首次首屏 | 很快 | 约40s
第二次启动首屏 | 很快 | 约9s
HMR | 8s～10s | 0.05s ～ 0.2s
打包构建 | 2min~3min | 2min ~ 3min

- vite的启动比webpack快很多，但首次启动的首屏展示并不快，该加载的包还是要等加载完才展示。
- 第二次启动时，vite由于缓存，首屏展示速度变快。
- 官方表示，Vite HMR 更新反映到浏览器的时间小于 50ms。
- 两者打包速度差不多。

# 5.结论
- 在开发上，特别是启动项目时，速度是有一定提升的。
- vite还不算很成熟，有很多隐藏问题，甚至有一些问题无法从根本解决，如3.1.10。
- 并不是所有webpack插件都有对应的vite插件，自定义的更是需要重写，工作量也许很大。
- 一个庞大的项目，从webpack迁移vite，工作量很大，业务代码也有需要兼容的，例如各种require


