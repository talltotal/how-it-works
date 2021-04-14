# [chromium@88.0.4298.0](https://github.com/chromium/chromium)
> https://www.chromium.org


文档入口·`docs/README.md`



导航过程·`docs/navigation.md`
1. 执行当前页面`beforeunload`
2. 请求URL
    - `ServiceWorkers, WebUI, cache, data:`等请求不会真正触发网络
    1. DNS resolution
    2. socket connection
3. 先处理`response headers`
    - 状态码`204或205`响应成功，但是后面没有内容
    - `Content-Disposition` 该响应头指示必须将响应视为下载而不是导航
    - 状态码`3xx`，根据`Location`进行重定向
    - 当返回不是`204或205`、下载、没有提供`Content-Type`、没有`X-Content-Type-Options: nosniff`，则会在进程返回前取一部分内容进行‘MIME类型嗅探’确定返回内容类型
4. commit
    - 响应从网络堆栈传递到浏览器进程
    - 浏览器进程根据`origin`、`headers`、当前的进程模型和隔离策略，确定合适的渲染进程
    - 将响应传递给渲染进程
    - 渲染进程执行旧文档的`unload`，创建新文档
        - 如在同一渲染进程则先后执行
        - 如跨进程，则并行执行
5. 加载
    - 渲染进程继续加载相应内容，解析、渲染、执行附带的任何脚本，并加载文档指定的任何子资源


网络请求
- 浏览器进程
    - 清缓存·`extensions/browser/api/web_request/web_request_api.cc`
        - 限制webRequest.handlerBehaviorChanged()清除缓存的次数；
        - 要统计的是缓存真正被清除的次数，而不是函数被调用的次数；
        - 即在下个页面加载时，缓存被清除时计数1次。
- 网络进程
    - ·`net/url_request/url_request_context_builder.h`
        - 缓存的最大比特数，默认由算法根据磁盘可用空间计算得出



cache·`components/web_cache/browser/web_cache_manager.cc`
- 浏览器端的缓存管理；跟踪渲染进程的活动，且分配可用的内存缓存资源
- 更新缓存· Ln 150


Sandbox·`docs/design/sandbox.md`
- 安全是Chromium最重要的目标之一。安全的关键就是理解：只有充分了解系统在所有可能状态下的所有可能输入组合行为，
- 才能真正保障系统的安全。对于像Chromium这样大而多样的代码库，几乎不可能对其所有部分的组合行为进行推理。
- 沙箱的目标就是让一段代码最终能做什么或不能做什么提供强硬的保证，而不管它的输入是什么。


浏览器的静态地址·`ios/chrome/browser/chrome_url_constants.cc`


Blink·`third_party/blink/README.md`
- DOM·`third_party/blink/renderer/core/dom/README.md`
- 样式计算·`third_party/blink/renderer/core/css/style-calculation.md`
- 布局·`third_party/blink/renderer/core/layout/README.md`
- cc·`docs/how_cc_works.md`
- 绘制·`third_party/blink/renderer/core/paint/README.md`




