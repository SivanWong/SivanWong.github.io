---
title: SDK：SDK框架搭建
date: 2022-04-26
tags: [SDK]
categories: SDK
comments: true
---

### 踩坑
- eslint安装，需要node 10以上
- 注意rollup plugins的顺序，看eslint要使用在打包前还是后
- 本地调试包时，若包内容有修改，不需要重连，如果修改不起作用，可以尝试先断开连接，重新link


- package.json
- rollup配置
- eslint
- babel
- jest
- 本地测试

### 创建项目

```
├── bin  // 用于存放可执行二进制文件的目录
├── dist // 产物输出目录
├── package.json
├── README.md // 包说明，会在npm展示
├── scripts // rollup配置脚本
├── src // 源码
├── test // 单元测试
└── ...  // 一些配置文件（eg: eslint、babel）
```

### rollup配置
#### 通用配置

- @rollup/plugin-json
- rollup-plugin-clear
- @rollup/plugin-alias
- @rollup/plugin-node-resolve
- @rollup/plugin-commonjs
- rollup-plugin-typescript2
- @rollup/plugin-eslint
- @rollup/plugin-babel

```
// scripts/rollup.config.base.js
 
import json from '@rollup/plugin-json';
import clear from 'rollup-plugin-clear';
import alias from '@rollup/plugin-alias';
import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import { eslint } from 'rollup-plugin-eslint';
import babel from '@rollup/plugin-babel';
 
export default {
    input: 'src/index.ts', // 源文件入口
    output: {
        file: 'dist/index.js',
        format: 'umd',
        name: 'SPGAT',
    },
    plugins: [
        json(),
        clear({ targets: ['dist/index.js']  }),
        alias(),
        nodeResolve(),
        commonjs({ include: 'node_modules/**' }),
        eslint({
            throwOnError: true, // 抛出异常并阻止打包
            include: ['src/*.ts'],
            exclude: ['node_modules/**', 'dist/**']
        }),
        typescript(),
        babel({ babelHelpers: 'bundled' }),
    ]
};
```
#### 开发环境配置

- rollup-plugin-serve
- rollup-plugin-livereload

```
// scripts/rollup.config.dev.js

import baseConfig from './rollup.config.base';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
 
export default {
    ...baseConfig,
    plugins: [
        ...baseConfig.plugins,
        serve({
            port: 8080,
            contentBase: ['dist', 'examples/browser'],
            openPage: 'index.html'
        }),
        livereload({
            watch: 'examples/browser'
        })
    ]
}
```


#### 正式环境配置

- [rollup-plugin-obfuscator](https://github.com/getkey/rollup-plugin-obfuscator)
- rollup-plugin-filesize

```
// scripts/rollup.config.prod.js
import baseConfig from './rollup.config.base';
import filesize from 'rollup-plugin-filesize';
import JavascriptObfuscator from 'rollup-plugin-obfuscator';

export default {
    ...baseConfig,
    plugins: [
        ...baseConfig.plugins,
        JavascriptObfuscator({
            globalOptions: {
                compact: true,
                controlFlowFlattening: true,
                controlFlowFlatteningThreshold: 0.75,
                deadCodeInjection: true,
                deadCodeInjectionThreshold: 0.4,
                debugProtection: true,
                debugProtectionInterval: true,
                disableConsoleOutput: true,
                identifierNamesGenerator: 'hexadecimal',
                log: false,
                numbersToExpressions: true,
                renameGlobals: false,
                selfDefending: true,
                simplify: true,
                splitStrings: true,
                splitStringsChunkLength: 10,
                stringArray: true,
                stringArrayEncoding: ['rc4'],
                stringArrayIndexShift: true,
                stringArrayRotate: true,
                stringArrayShuffle: true,
                stringArrayWrappersCount: 2,
                stringArrayWrappersChainedCalls: true,    
                stringArrayWrappersParametersMaxCount: 4,
                stringArrayWrappersType: 'function',
                stringArrayThreshold: 0.75,
                transformObjectKeys: true,
                unicodeEscapeSequence: false
            },
            compact: true
        }),
        filesize()
    ]
}
```

### eslint
使用@typescript-eslint/parser解析器

执行eslint时报错

```
TypeError: Failed to load plugin 'vue' declared in '.eslintrc.js' : createRequire is not a function
```
应注意node版本，升级到12即可



### jest

使用ts进行编写
```
npm i -D jest @types-jest ts-jest
```
注意：由于业务中有涉及TextEncoder、TextDecoder，jest使用jsdom，但其没有包含这两个类，因此需要自己在自定义环境中注入。

```
// custom-test-env.js

const Environment = require('jest-environment-jsdom');

/**
 * A custom environment to set the TextEncoder that is required by TensorFlow.js.
 */
module.exports = class CustomTestEnvironment extends Environment {
    async setup() {
        await super.setup();
        if (typeof this.global.TextEncoder === 'undefined') {
            const { TextEncoder, TextDecoder } = require('util');
            this.global.TextEncoder = TextEncoder;
            this.global.TextDecoder = TextDecoder;
        }
    }
};
```

```
// package.json

"jest": {
    "preset": "ts-jest",
    "testEnvironment": "./test/custom-test-env.js"
 },
```


### 本地测试
在包的根目录执行，将包发布到本地全局

```
$ npm link
```
在另一个可运行的项目中执行

```
// name 为包的名字，即package.json中的name
$ npm link <name> 
```
引入使用即可

```
// name 为包的名字，即package.json中的name
import <name>;
```

### 参考
- [开发一个规范的 npm 包](https://juejin.cn/post/6945376222863949831#heading-11)
- [手把手教你使用Rollup打包📦并发布自己的工具库🔧](https://segmentfault.com/a/1190000038387977)
- [开发一个规范的 npm 包](https://xiu2.net/it/details/60669d7a0a6c6440e0560d70)