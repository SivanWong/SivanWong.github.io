---
title: cocos：cocos接入react组件
Date: 2021-09-17
tags: [cocos]
categories: cocos
comments: true
---

1. 接入redeem store，react组件，cocos不支持tsx
2. ts把tsx编译成js引入
3. 有引入别的文件使用，ts无法把两个文件打成一个文件
4. 使用rolllup编译成js
5. 引入文件过大，导致ts文件崩溃
6. 把js改为插件脚本
7. 把js导出项改为全局变量，直接引用
8. 分包
9. 需要把依赖一起打包到js进行分包
10. window不适用，继续使用引入的方式
11. load成功后引入redeem store
12. process is not defined，打包时替换js里的process
13. 部署时，无法获取process，无法替换，直接插入html，全局使用，production不替换

## 需求
基于cocos的游戏接入基于react的兑换商店，即cocos接入react组件

## tsx
由于兑换商店暴露的是react组件，所以封装成一个tsx文件，接入cocos，html中增加一个节点，把兑换商店插入该节点

问题：cocos不支持接入tsx

## ts编译
通过typescript把tsx编译成js

使用命令行参数--project（或-p）指定一个包含tsconfig.json文件的目录
```
$ tsc -p redeemStore/tsconfig.json
```

```
// tsconfig.json

{
  "compilerOptions": {
    "allowSyntheticDefaultImports": true,
    "jsx": "react",
    "module":"esnext",
    "target": "es5",
    "rootDir": "./redeemStore.tsx", // 用来指定编译文件的根目录，编译器会在根目录查找入口文件
    "outDir": "../assets", // 用来指定输出文件夹
    "baseUrl": "../",  // 用于设置解析非相对模块名称的基本目录，相对模块不会受到baseUrl的影响
  }
}
```

由于有引入别的文件，希望可以全部编译成一个文件

```
// 指定输出文件合并为一个文件，只有设置module的值为amd和system模块时才支持这个配置
"outFile": "./",
```

问题：无法多个文件编译成一个文件输出

## rollup打包

```
// rollup.config.js

import typescript from 'rollup-plugin-typescript2';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';


export default {
    input: 'redeemStore/redeemStore.tsx', // 源文件入口
    output: {
        file: 'assets/script/page/ui/redeemStore/redeemStore.js',
        format: 'cjs',
        sourcemap: true,
        compact: true
    },
    plugins: [
        resolve(),
        commonjs(),
        replace({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
            'process.env.country': JSON.stringify(process.env.cid || process.env.country),
            'process.env.environment': JSON.stringify(process.env.env || process.env.environment),
        }),
        typescript(),
        uglify()
    ],
}
```
plugins是有顺序的
### rollup-plugin-typescript2
使rollup可作用于typescript

### rollup-plugin-node-resolve / @rollup/plugin-node-resolve
- rollup 不会去寻找从npm安装到你的node_modules文件夹中的软件包
- 该插件可以告诉 Rollup 如何查找外部模块
- 解析 node_modules 中的模块，将所有依赖编译进同一个文件

### rollup-plugin-commonjs / @rollup/plugin-commonjs
- 将 CommonJS 模块转换为 ES6
- npm中的大多数包都是以 CommonJS 模块的形式出现的。 在它们更改之前，我们需要将CommonJS模块转换为 ES2015 供 Rollup 处理
- 该插件应该用在其他插件转换你的模块之前 - 这是为了防止其他插件的改变破坏CommonJS的检测

rollup-plugin-commonjs 会有以下问题
```
[!] Error: 'createElement' is not exported by node_modules/react/index.js, imported by node_modules/@gameplatform-fe-component/redeem-store/dist/es/index.mjs
https://rollupjs.org/guide/en/#error-name-is-not-exported-by-module
node_modules/@gameplatform-fe-component/redeem-store/dist/es/index.mjs (1:25)
```

```
commonjs({
    namedExports: {
        'react': Object.keys(React),
    }
})
```

### rollup-plugin-replace / @rollup/plugin-replace

编译过程中可以进行字符串替换

@rollup/plugin-replace 会含有如下警告，仅仅是警告⚠️，不会影响编译
```
(!) Plugin replace: @rollup/plugin-replace: 'preventAssignment' currently defaults to false. It is recommended to set this option to `true`, as the next major version will default this option to `true`.
```
### rollup-plugin-uglify
代码压缩，使编译后的包更小

## 全局变量
1. 打包后直接import会导致脚本崩溃，失效。
2. 把其设置为插件脚本。
3. 用window，redeem store设为全局变量去调用。
4. 以上，在分包后都不是问题，因此，这里只是一个小插曲，分包后依然是直接import

## 分包

[Asset Bundle 中的脚本](https://docs.cocos.com/creator/3.2/manual/zh/asset/bundle.html#asset-bundle-%E4%B8%AD%E7%9A%84%E8%84%9A%E6%9C%AC)

### 构建
cocos可以把一个文件夹设置为bundle，其下的文件都会在构建时单独打包成一个子包，仅仅构建时生效，开发预览依然是一个整包。

### 加载

```
enterRedeemPage() {
    let bundle = assetManager.getBundle('redeemStore');
    if (!bundle) {
        assetManager.loadBundle('redeemStore', err => {
            if (err) {
                return console.error(err);
            }
            this.loadRedeemStore();
        });
    } else {
        this.loadRedeemStore();
    }
}

async loadRedeemStore() {
    const store = await import('./redeemStore/redeemStore.js');
    store.default.openStore(app.data.gameConfig, app.data.player.uid, () => app.ui.open(UIDef.UILandingPage));
    this.close();
}
```

### development vs production
#### development
- 开发环境，分包策略不生效，依然是整包。
- 直接通过特定的命令编译redeemStore，编译过程某些参数通过特定的命令注入。
- 若切换地区需要重新编译

```
rollup:test:id": "cross-env NODE_ENV=development cid=id env=test rollup -c"
```
#### production
- 部署的同时，对redeemStore进行编译
- 由于参数无法注入，因此在部署时，通过脚本把参数设为全局变量，以供redeemStore直接读取

```
window.process = {
    env: {
        NODE_ENV: 'production',
        country: '${buildConfig.COUNTRY}',
        environment: '${buildConfig.ENVIRONMENT}'
    }
};
```
