---
title: ant-design：Form.list使用
Date: 2021-05-11
tags: [react]
categories: react
comments: true
---

### 使用

```
<Form>
    <Form.List name='data'>
        {(fields) => (
            fields.map(field => (
                <Form.Item name={[field.name, 'name']}>
                    <Input style={{ width: 80 }} />
                </Form.Item>
                <Form.Item name={[field.name, 'age']}>
                    <InputNumber style={{ width: 80 }} />
                </Form.Item>
            ))
        )}
    </Form.Lsit>
</Form>
```


### 数据结构

```
{
    data: [
        {
            name: 'aaa',
            age: 11
        },
        {
            name: 'aaa',
            age: 111
        }
    ]
}
```
### 实际应用
- 结构和数据一定要对应
```
// 数据结构
const listFields = {
    1: [{name:a}, {name:b}],
    2: [{name:aa}, {name:bb}],
}
const data = {
    1: [{a:11}, {b:10}],
    2: [{aa:11}, {bb:10}],
}

// 使用
<Form>
    {
        Object.keys(listFields).map(name => (
            <Form.List name={name}>
                {(fields) => (
                    listFields[name].map((item, index) => (
                        <Form.Item name={[fields[index]?.name, item.name]}>
                            <Input style={{ width: 80 }} />
                        </Form.Item>
                    ))
                )}
            </Form.Lsit>
        ))
    }
</Form>
```
