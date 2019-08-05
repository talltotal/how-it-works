# [NUXT](https://zh.nuxtjs.org/)

## 工程
- bin
    - `package.json-bin` [配置可执行文件](https://docs.npmjs.com/files/package.json.html#bin)
    - `#!/usr/bin/env node` 声明可执行文件以nodejs运行
- 


## 设计
### 代码分层
> 强制划分一级目录，以文件路径/文件名作为key，省去配置
> * 默认提供根据不同性质划分的目录结构，📢良好的组织应用代码的设计；
> * 不同的资源/源码虽然都可以根据依赖关系/文件后缀做加载处理/构建，进行强制的划分也便于nuxt的区分管理

- pages 生成路由；设定文件名规则，用于不同形式的拓展
- middleware 中间件；


### plugin(hook)
> 整个过程中的事件钩子

- build
- generate
- modules（资源模块）
    - `modules:before` 加载之前
    - `modules:done` 加载之后
- render（后端渲染）
    - `render:before` 渲染之前
    - `render:setupMiddleware` 安装中间件
    - `render:resourcesLoaded` SSR资源加载完成
    - `render:errorMiddleware` 安装错误中间件
    - `render:done` 渲染就绪
    - `render:route` **异步触发** 请求进入 nuxt route，且渲染过程无异常
- app（服务本身）
    - `ready` 服务就绪
    - `error` 服务出错
    - `listen` 服务开始监听端口
    - `close` 服务关闭


### middleware
> 网络请求中间件，类似 express.router；
> 另做了兼容处理，支持
> - `string`: 脚本地址，脚本输出`(req, res, next) => viod`
> - `(req, res, next) => viod`
> - `object{ prefix: boolean, path: string, handler: (req, res, next) => viod | string }`

- ~~⬇️`hook::render:setupMiddleware` hook中间件~~
- ⬇️gzip 压缩header/文件处理（compression）
- ⬇️过滤用于SSR的静态文件请求
- ⬇️webpack server dev tool
- ⬇️根据请求，在编辑器打开对于文件（[`launch-editor-middleware`](https://github.com/yyx990803/launch-editor#readme)）
- ⬇️静态文件
- ⬇️`options.serverMiddleware` option中间件: API接口？
- ⬇️⭐️**nuxt route**
    - vue-server-render
    - response-header
        - ETag
        - preload
        - CSP
- ~~⬇️`hook::render:errorMiddleware` hook中间件~~
- ⏺以上匀未返回响应，以错误处理


## 框架
- 编译 [`webpack`](./webpack/webpack.html)
- 服务 `connect`
- SSR `vue-server-renderer`
- 加密 `crypto`

