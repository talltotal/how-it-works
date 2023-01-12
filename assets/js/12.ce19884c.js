(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{277:function(e,v,_){"use strict";_.r(v);var r=_(14),o=Object(r.a)({},(function(){var e=this,v=e._self._c;return v("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[v("h1",{attrs:{id:"nuxt"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#nuxt"}},[e._v("#")]),e._v(" "),v("a",{attrs:{href:"https://zh.nuxtjs.org/",target:"_blank",rel:"noopener noreferrer"}},[e._v("NUXT"),v("OutboundLink")],1)]),e._v(" "),v("h2",{attrs:{id:"工程"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#工程"}},[e._v("#")]),e._v(" 工程")]),e._v(" "),v("ul",[v("li",[e._v("终端脚本工具·"),v("code",[e._v("cli")]),e._v(" "),v("ul",[v("li",[e._v("在"),v("code",[e._v("package.json")]),e._v("配置"),v("code",[e._v("bin")]),e._v("，相关说明见"),v("a",{attrs:{href:"https://docs.npmjs.com/files/package.json.html#bin",target:"_blank",rel:"noopener noreferrer"}},[e._v("配置可执行文件"),v("OutboundLink")],1)]),e._v(" "),v("li",[v("code",[e._v("#!/usr/bin/env node")]),e._v(" 声明可执行文件以nodejs运行")]),e._v(" "),v("li",[e._v("由"),v("code",[e._v("NuxtCommand")]),e._v("类组织不同指令的整体运行流程、配置获取、Nuxt能力获取")])])]),e._v(" "),v("li",[e._v("核心·"),v("code",[e._v("core")])])]),e._v(" "),v("h2",{attrs:{id:"设计"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#设计"}},[e._v("#")]),e._v(" 设计")]),e._v(" "),v("h3",{attrs:{id:"代码分层"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#代码分层"}},[e._v("#")]),e._v(" 代码分层")]),e._v(" "),v("blockquote",[v("p",[e._v("强制划分一级目录，以文件路径/文件名作为key，省去配置")]),e._v(" "),v("ul",[v("li",[e._v("默认提供根据不同性质划分的目录结构，📢良好的组织应用代码的设计；")]),e._v(" "),v("li",[e._v("不同的资源/源码虽然都可以根据依赖关系/文件后缀做加载处理/构建，进行强制的划分也便于nuxt的区分管理")])])]),e._v(" "),v("ul",[v("li",[e._v("pages 生成路由（约定式路由）；设定文件名规则，用于不同形式的拓展")]),e._v(" "),v("li",[e._v("middleware 中间件；")])]),e._v(" "),v("h3",{attrs:{id:"plugin-hook"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#plugin-hook"}},[e._v("#")]),e._v(" plugin(hook)")]),e._v(" "),v("blockquote",[v("p",[e._v("整个过程中的事件钩子")])]),e._v(" "),v("ul",[v("li",[e._v("build")]),e._v(" "),v("li",[e._v("generate")]),e._v(" "),v("li",[e._v("modules（资源模块）\n"),v("ul",[v("li",[v("code",[e._v("modules:before")]),e._v(" 加载之前")]),e._v(" "),v("li",[v("code",[e._v("modules:done")]),e._v(" 加载之后")])])]),e._v(" "),v("li",[e._v("render（后端渲染）\n"),v("ul",[v("li",[v("code",[e._v("render:before")]),e._v(" 渲染之前")]),e._v(" "),v("li",[v("code",[e._v("render:setupMiddleware")]),e._v(" 安装中间件")]),e._v(" "),v("li",[v("code",[e._v("render:resourcesLoaded")]),e._v(" SSR资源加载完成")]),e._v(" "),v("li",[v("code",[e._v("render:errorMiddleware")]),e._v(" 安装错误中间件")]),e._v(" "),v("li",[v("code",[e._v("render:done")]),e._v(" 渲染就绪")]),e._v(" "),v("li",[v("code",[e._v("render:route")]),e._v(" "),v("strong",[e._v("异步触发")]),e._v(" 请求进入 nuxt route，且渲染过程无异常")])])]),e._v(" "),v("li",[e._v("app（服务本身）\n"),v("ul",[v("li",[v("code",[e._v("ready")]),e._v(" 服务就绪")]),e._v(" "),v("li",[v("code",[e._v("error")]),e._v(" 服务出错")]),e._v(" "),v("li",[v("code",[e._v("listen")]),e._v(" 服务开始监听端口")]),e._v(" "),v("li",[v("code",[e._v("close")]),e._v(" 服务关闭")])])])]),e._v(" "),v("h3",{attrs:{id:"middleware"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#middleware"}},[e._v("#")]),e._v(" middleware")]),e._v(" "),v("blockquote",[v("p",[e._v("网络请求中间件，类似 express.router；\n另做了兼容处理，支持")]),e._v(" "),v("ul",[v("li",[v("code",[e._v("string")]),e._v(": 脚本地址，脚本输出"),v("code",[e._v("(req, res, next) => viod")])]),e._v(" "),v("li",[v("code",[e._v("(req, res, next) => viod")])]),e._v(" "),v("li",[v("code",[e._v("object{ prefix: boolean, path: string, handler: (req, res, next) => viod | string }")])])])]),e._v(" "),v("ul",[v("li",[v("s",[e._v("⬇️"),v("code",[e._v("hook::render:setupMiddleware")]),e._v(" hook中间件")])]),e._v(" "),v("li",[e._v("⬇️gzip 压缩header/文件处理（compression）")]),e._v(" "),v("li",[e._v("⬇️过滤用于SSR的静态文件请求")]),e._v(" "),v("li",[e._v("⬇️webpack server dev tool")]),e._v(" "),v("li",[e._v("⬇️根据请求，在编辑器打开对于文件（"),v("a",{attrs:{href:"https://github.com/yyx990803/launch-editor#readme",target:"_blank",rel:"noopener noreferrer"}},[v("code",[e._v("launch-editor-middleware")]),v("OutboundLink")],1),e._v("）")]),e._v(" "),v("li",[e._v("⬇️静态文件")]),e._v(" "),v("li",[e._v("⬇️"),v("code",[e._v("options.serverMiddleware")]),e._v(" option中间件: API接口？")]),e._v(" "),v("li",[e._v("⬇️⭐️"),v("strong",[e._v("nuxt route")]),e._v(" "),v("ul",[v("li",[e._v("vue-server-render")]),e._v(" "),v("li",[e._v("response-header\n"),v("ul",[v("li",[e._v("ETag")]),e._v(" "),v("li",[e._v("preload")]),e._v(" "),v("li",[e._v("CSP")])])])])]),e._v(" "),v("li",[v("s",[e._v("⬇️"),v("code",[e._v("hook::render:errorMiddleware")]),e._v(" hook中间件")])]),e._v(" "),v("li",[e._v("⏺以上匀未返回响应，以错误处理")])]),e._v(" "),v("h2",{attrs:{id:"框架"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#框架"}},[e._v("#")]),e._v(" 框架")]),e._v(" "),v("ul",[v("li",[e._v("编译 "),v("RouterLink",{attrs:{to:"/webpack/webpack.html"}},[v("code",[e._v("webpack")])])],1),e._v(" "),v("li",[e._v("服务 "),v("code",[e._v("connect")])]),e._v(" "),v("li",[e._v("SSR "),v("code",[e._v("vue-server-renderer")])]),e._v(" "),v("li",[e._v("加密 "),v("code",[e._v("crypto")])])])])}),[],!1,null,null,null);v.default=o.exports}}]);