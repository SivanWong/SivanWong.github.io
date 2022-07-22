---
title: 安全：cookie和session
date: 2020-05-14
tags: [安全]
categories: 安全
comments: true
---

## 前言
- 会话（Session）跟踪是Web程序中常用的技术，用来跟踪用户的整个会话。常用的会话跟踪技术是Cookie与Session。
- Cookie通过在客户端记录信息确定用户身份。
- Session通过在服务器端记录信息确定用户身份。

## cookie
在程序中，会话跟踪是很重要的事情。理论上，一个用户的所有请求操作都应该属于同一个会话，而另一个用户的所有请求操作则应该属于另一个会话，二者不能混淆。

Web应用程序是使用HTTP协议传输数据的。==HTTP协议是无状态的协议==。一旦数据交换完毕，客户端与服务器端的连接就会关闭，再次交换数据需要建立新的连接。这就意味着服务器无法从连接上跟踪会话。
### 什么是cookie
cookie其实是存储在浏览器中的纯文本，是服务器发送出来存储在浏览器上的一组组键值对，浏览器的安装目录下会专门有一个cookie文件夹来存放各个域下设置的cookie。

### cookie怎么工作
- 存储cookie是浏览器提供的功能。
- 若客户端首次请求服务器，浏览器会添加请求头中的 cookie字段为{}，把请求的网址连同该Cookie一同提交给服务器。如果服务器需要记录该用户状态，就向客户端浏览器返回Cookie，客户端浏览器会把Cookie保存起来。
- 当网页要再次发http请求时，浏览器会先检查是否有相应的 cookie，有则自动把所有这个服务器Cookie添加在 request header中的 cookie字段中，把请求的网址连同该Cookie一同提交给服务器。这些是浏览器自动帮我们做的，而且每一次 http请求浏览器都会自动帮我们做。
- 服务器检查该Cookie，以此来辨认用户状态。服务器还可以根据需要修改Cookie的内容
- cookie的存放有大小限制，不可以超过4kb, 每一个域名下的cookie数量最多是20个

### 获取cookie
document.cookie，只能获取非HttpOnly类型的cookie。

打印出的结果是一个字符串类型，因为 cookie本身就是存储在浏览器中的字符串。但这个字符串是有格式的，由键值对 key=value构成，键值对之间由一个 分号和一个 空格隔开。

```
key=value; key=value
```

### Cookie的不可跨域名性

受同源策略限制，跨域的ajax请求默认不携带cookie，那为什么还会有csrf攻击呢？

```
由于script、img、iframe的src都不受同源策略影响，可以利用此来实现跨域请求，来实施攻击。
浏览器会依据加载的域名附带上对应域名的cookie
```
例如，a.com是一个银行网站，用户在此网站登录且生成了授权的cookie，此时浏览器保存了这个cookie。随后访问 b.com，在这个网站中伪造一个请求a网站的请求，如转账、删除操作等，利用script、img、iframe来加载a网站的地址，浏览器就会携带上a网站此登陆用户的授权cookie信息，这样就构成了csrf攻击。

![image](https://upload-images.jianshu.io/upload_images/3635292-906033c13ee628a5.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/800)

### cookie的属性

属性名 | 数据类型 | 描述
---|---|---
name | String | 该Cookie的名称。Cookie一旦创建，名称便不可更改
value | Object | 该Cookie的值。如果值为Unicode字符，需要为字符编码。如果值为二进制数据，则需要使用BASE64编码
maxAge | int | 该Cookie失效的时间，单位秒。如果为正数，则该Cookie在maxAge秒之后失效。如果为负数，该Cookie为临时Cookie，关闭浏览器即失效，浏览器也不会以任何形式保存该Cookie。如果为0，表示删除该Cookie。默认为–1
secure | boolean | 该Cookie是否仅被使用安全协议传输。安全协议。安全协议有HTTPS，SSL等，在网络上传输数据之前先将数据加密。默认为false
path | String | 该Cookie的使用路径。如果设置为“/sessionWeb/”，则只有contextPath为“/sessionWeb”的程序可以访问该Cookie。如果设置为“/”，则本域名下contextPath都可以访问该Cookie。注意最后一个字符必须为“/”
domain | String | 可以访问该Cookie的域名。如果设置为“.google.com”，则所有以“google.com”结尾的域名都可以访问该Cookie。注意第一个字符必须为“.”
comment | String | 该Cookie的用处说明。浏览器显示Cookie信息的时候显示该说明
version | int |  该Cookie使用的版本号。0表示遵循Netscape的Cookie规范，1表示遵循W3C的RFC 2109规范

### cookie的修改和删除
- 服务器可以对cookie进行操作，浏览器只能对非HttpOnly类型的cookie进行操作（为了预防xss攻击）。
- Cookie并不提供修改、删除操作。
- 如果要修改某个Cookie，只需要新建一个同名的Cookie，添加到response中覆盖原来的Cookie。
- 如果要删除某个Cookie，只需要新建一个同名的Cookie，并将maxAge设置为0，并添加到response中覆盖原来的Cookie。注意是0而不是负数。负数代表其他的意义。

注意：修改、删除Cookie时，新建的Cookie除value、maxAge之外的所有属性，例如name、path、domain等，都要与原Cookie完全一样。否则，浏览器将视为两个不同的Cookie不予覆盖，导致修改、删除失败。

## session
除了使用Cookie，Web应用程序中还经常使用Session来记录客户端状态。Session是服务器端使用的一种记录客户端状态的机制，使用上比Cookie简单一些，相应的也增加了服务器的存储压力。

session是另一种记录客户状态的机制，不同的是Cookie保存在客户端浏览器中，而Session保存在服务器上。

### 什么是session

- 客户端浏览器访问服务器的时候，服务器把客户端信息以某种形式记录在服务器上，这就是session。
- 客户端浏览器再次访问时只需要从该session中查找该客户的状态就可以了。
- session对象是在客户端第一次请求服务器的时候创建的。session也是一种key-value的属性对

如果说Cookie机制是通过检查客户身上的“通行证”来确定客户身份的话，那么Session机制就是通过检查服务器上的“客户明细表”来确认客户身份。session相当于程序在服务器上建立的一份客户档案，客户来访的时候只需要查询客户档案表就可以了。

### session的生命周期

session保存在服务器端。为了获得更高的存取速度，服务器一般把session放在内存里。每个用户都会有一个独立的session。如果session内容过于复杂，当大量客户访问服务器时可能会导致内存溢出。因此，session里的信息应该尽量精简。

session在用户第一次访问服务器的时候自动创建。需要注意只有访问JSP、Servlet等程序时才会创建session，只访问HTML、IMAGE等静态资源并不会创建session。如果尚未生成session，也可以使用request.getSession(true)强制生成session。

- session生成后，只要用户继续访问，服务器就会更新session的最后访问时间，并维护该session。用户每访问服务器一次，无论是否读写session，服务器都认为该用户的Session“活跃（active）”了一次。
- 为防止内存溢出，服务器会把长时间内没有活跃的session从内存删除。这个时间就是session的超时时间。如果超过了超时时间没访问过服务器，session就自动失效了。tomcat默认失效时间为20分钟。

### session对浏览器的要求
虽然session保存在服务器，对客户端是透明的，它的正常运行仍然需要客户端浏览器的支持。这是因为session需要使用Cookie作为识别标志。HTTP协议是无状态的，session不能依据HTTP连接来判断是否为同一客户，因此服务器向客户端浏览器发送一个名为JSESSIONID的Cookie，它的值为该session的id（也就是HttpSession.getId()的返回值）。session依据该Cookie来识别是否为同一用户。

如果客户端浏览器将Cookie功能禁用，或者不支持Cookie怎么办？例如，绝大多数的手机浏览器都不支持Cookie。Java Web提供了另一种解决方案：URL地址重写。

### URL地址重写

URL地址重写是对客户端不支持Cookie的解决方案。URL地址重写的原理是将该用户session的id信息重写到URL地址中。服务器能够解析重写后的URL获取session的id。这样即使客户端不支持Cookie，也可以使用session来记录用户状态。

## 两者区别
- cookie数据存放在客户的浏览器上，session数据放在服务器上的，但名为JSESSIONID的Cookie（值为该Session的id）是放在客户端的。
- cookie不是很安全，别人可以分析存放在本地的COOKIE并进行COOKIE欺骗考虑到安全应当使用session。
- 设置cookie时间可以使cookie过期。但是使用session-destory（），我们将会销毁会话。
- session会在一定时间内保存在服务器上。当访问增多，会比较占用你服务器的性能考虑到减轻服务器性能方面，应当使用cookie。
- 单个cookie保存的数据不能超过4K，很多浏览器都限制一个站点最多保存20个cookie。(Session对象没有对存储的数据量的限制，其中可以保存更为复杂的数据类型)
- 两者最大的区别在于生存周期，session是IE启动到IE关闭.(浏览器页面一关 ,session就消失了)，cookie是预先设置的生存周期，或永久的保存于本地的文件。