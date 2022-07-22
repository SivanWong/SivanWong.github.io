---
title: SDK：反作弊SDK实现
date: 2022-04-26
tags: [SDK]
categories: SDK
comments: true
---

# 行为数据
## src目录结构

```
├── bridgeUtil.ts // jsBridge
├── config.ts 
├── encode.ts // 编码模块
├── index.ts
├── record.ts // 记录模块
├── report.ts // 上报模块
├── service.ts // 最底层的服务
├── type.ts // 类型定义
└── util.ts  // 一些公共方法
```


## 行为监听
- touchstart
- touchmove
- touchend
- didTapBack
- viewWillReappear
- viewDidDisappear
- shake

对于cocos，window.addEventListener并不起作用，原因是底层阻止冒泡。因此touch事件在捕获阶段进行监听

```
window.addEventListener(eventName[op], (ev: TouchEvent) => {
    const touch = ev.type === eventName[OperationType.touchend] ? ev.changedTouches[0] : ev.touches[0];
    console.log({ x: Math.round(touch.pageX), y: Math.round(touch.pageY) });
    // record
}, true);
```
didTapBack、viewWillReappear、viewDidDisappear、shake可以通过jsBridge进行监听

```
window['bridgeInit'](() => {
    window['bridgeRegisterHandler']('didTapBack', (e: any) => {
        // record
    });
});
```

```
## 行为数据存储
按module和token进行存储
- 一个项目可以有多个module，每个module也可以有多个token，token可选。
- 例如，module可以分为home、game。home中不区分token，全部存储成一份。game中每一局游戏都有一个不一样的token，每一局的行为数据将分别存储。

## 行为数据上报
### 初始化module/token
记录当前module及token，并对当前模块进行初始化，时间戳、数据均清空

### 上报
#### 批量上报
- 存储第一个动作时开始计时，满60s进行上报，重新计时
- 存储的动作满60个
- 触发flush方法，会把现存的未上报的动作全部上报

#### 打包上报
- 触发report方法，传参start，开始进行动作的存储。
- 触发report方法，传参end，结束存储并全部上报


### 二进制
通过ArrayBuffer、TypedArray、DataView、TextEncoder进行二进制的存储及操作。
- ArrayBuffer：用来表示通用的、固定长度的原始二进制数据缓冲区。是一个字节数组。
- TypedArray：一个描述二进制数据缓冲区（buffer）的视图（view），这个视图是一个 类数组。
- DataView：用于从 ArrayBuffer 缓冲区中读写数据的视图接口，其特点就是考虑了 字节序 的问题。
- TextEncoder：将传入的文本转换成该数据对应的 类型化数组，与之对应的是TextDecoder

#### 十进制和二进制

```
// 编码
numberEncode(value: number | bigint, byteLength: number) {
    const functionKey = {
        1: 'setInt8',
        2: 'setInt16',
        4: 'setInt32',
        8: 'setBigInt64'
    };
    const buffer = new ArrayBuffer(byteLength);
    const view = new DataView(buffer);
    if(byteLength === 8) value = BigInt(value);
    view[functionKey[byteLength]](0, value);
    return buffer;
}

// 解码
numberDecode(buffer: ArrayBuffer, byteLength: number) {
    const functionKey = {
        1: 'getInt8',
        2: 'getInt16',
        4: 'getInt32',
        8: 'getBigInt64'
    }
    const view = new DataView(buffer);
    let value = view[functionKey[byteLength]](0);
    if(byteLength === 8) value = Number(value);
    return value;
}
```

#### 字符串和二进制

```
textEncode(str: string) {
    const encoder = new TextEncoder();
    const array = encoder.encode(str);
    return array.buffer;
    // 如果需要兼容低版本机型，用下面的方法
    // return new Int8Array(str.split('').map(v=> v.charCodeAt(0))).buffer;
}

textDecode(buffer: ArrayBuffer) {
    const decoder = new TextDecoder();
    const text = decoder.decode(buffer);
    return text;
}
```

#### array buffer拼接

```
concatArrayBuffer(...arrays: ArrayBuffer[]) {
    const totalByteLength = arrays.reduce((previous, current) => previous + current.byteLength, 0);
    const result = new Uint8Array(totalByteLength);
    let offset = 0;
    arrays.forEach(item => {
        result.set(new Uint8Array(item), offset);
        offset += item.byteLength;
    });
    return result.buffer;
}
```

### 异或加密

```
getXORKey() {
    // 随机生成8位的key
}

getXORMessage(message: ArrayBuffer, key: number) {
    let result = new Uint8Array(message);
    result = result.map(val => val ^ key);
    return result.buffer;
}
```


### 二进制和十六进制（不需要了）
- [JS:Uint8Array 数组类型、arraybuffer对象类型与十六进制字符串互转](https://blog.csdn.net/sinat_36728518/article/details/117132147)

```
buffer2Hex(buffer: ArrayBuffer) {
    return Array.prototype.map.call(new Uint8Array(buffer), x => ('00' + x.toString(16)).slice(-2)).join('');
}

hex2Buffer(hex: string) {
    const typedArray = new Uint8Array(hex.match(/[\da-f]{2}/gi).map(h => parseInt(h, 16)));
    return typedArray.buffer;
}
```
### 获取url上的参数

```
getUrlParam(name: string) {
    let value = '';
    let query = window.location.search.substr(1);
    if (query) {
        query = query.replace(/\?/g, '&'); // 经常出现添加参数的时候使用?添加，这里做个兜底
        const queryArr = query.split('&');
        queryArr.find((queryStr) => {
            const [key, val] = queryStr.split('=');
            if (key === name) value = val;
            return queryStr;
        });
    }
    return value;
}
```

# 遗留的问题
开发联调过程中发现可以优化或待处理的问题
- touchmove的数量稍微有点多，后续可以进行优化过滤一下

# 参考
- [XOR 加密简介](http://www.ruanyifeng.com/blog/2017/05/xor.html)
- [JavaScript与二进制数据的恩怨情仇](https://knightyun.github.io/2020/03/09/js-binary-data)
- [JavaScript 处理二进制数据](https://zhuanlan.zhihu.com/p/338850208)
- [JavaScript 二进制数组（ArrayBuffer、Typed Arrays、DataView）](https://juejin.cn/post/6844904152024236046)
- [JS ArrayBuffer 类型转换及拼接](https://blog.csdn.net/y523006369/article/details/103529700)
- [ArrayBuffer](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer)
- [DataView](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/DataView)
- [TypedArray](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypedArray)


# npm包发布
注意：只发布dist目录的内容。

1. 发布前先执行一下npm run build
2. 修改好package.json中的版本号
3. 执行npm publish进行发布即可，此时需要注意npm地址
4. 若需要测试则发布测试版本，版本号后加上-alpha
