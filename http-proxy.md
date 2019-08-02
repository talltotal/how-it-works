# [http-proxy](https://github.com/nodejitsu/node-http-proxy)
> 指定请求匹配规则，代理请求


## [http-proxy-middleware](https://github.com/chimurai/http-proxy-middleware)

## 技巧？
- export兼容：`function A(){} A.a = 1; A.b = 1; module.export = A`
- 继承构造函数：`function Child () { Parent.call(this) }`
- 闭包/柯里化：`function A (type) { return function B (option) { return function C (...args) {} } }`

## 设计
- 请求的一步步处理函数化，保证函数名唯一，定义在一个对象上，再转成数组依次处理
    - 属性拷贝为数组：`Object.keys(a).map((k) =>a[k])`
- hook请求的过程，继承eventemitter3
    - web
        - start
        - proxyReq
        - econnreset
        - error
        - proxyRes
        - end
    - wx
        - open
        - proxyReqWs
        - proxySocket
        - error
        - close

## 请求处理
- Sets `content-length` to '0' if request is of DELETE type.
- Sets timeout in request socket if it was specified in options.
- Sets `x-forwarded-*` headers if specified in config.
- 


