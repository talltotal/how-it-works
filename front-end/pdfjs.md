# [pdf.js](https://github.com/mozilla/pdf.js)
> pdf（Portable Document Format） 的 HTML5 查看器

- stream 流
    > 文件流管理
    - node
        - 根据协议`file:`区分，`fs.createReadStream`
        - 根据协议`http:`区分，`http.request` / `https.request` => `response`
    - 浏览器页面/chrome插件
        - `XMLHttpRequest` / `fetch`
- worker
    > 使用 web worker 保证大文件处理的性能
    - 消息管理
        - 约定通信的数据结构
        - 管理注册的事件，每个事件名只能有一个事件
        - 用递增id管理需要响应的请求，请求用`Promise`定义
        - 用递增id管理传递流的请求，请求用`ReadableStream`定义
            > 在两端消息内用‘暗语’传递状态变更
            1. 请求方`ReadableStream.start`‘发送请求’
            2. 响应方‘初始操作’、‘发送暗语-开始吧’
            3. 请求方`ReadableStream.start`的`promise`完成，`ReadableStream.pull`‘发送暗语-传吧’
            4. 响应方‘执行流获取操作’、‘发送暗语-给你流内容’；完了‘发送暗语-没了’、‘发送暗语-关闭’
            5. 请求方`controller.enqueue()`数据入流；`ReadableStream.pull`的`promise`完成，`controller.close()`
    - 主线程
        - worker文件加载管理
            - `onready`-`sendtest`-`ontest`，做`三次握手`确保worker准备好了
        - 缓存worker处理过的数据
        - 流获取操作
    - worker线程
        - 消息管理
        - 初始化的握手，`sendready`-`ontest`-`sendtest`
        - 流处理操作
- pdf
    - 基本格式
        > PostScript
        > 内容按对象存储，页面由对对象的引用构成，文件首位做标识做辨认
        > 线性内容，即只有一个对象，直接按页面展示？
        - HEADER
            - `%PDF-${version}`
            - 验证字符‘%PDF-’：`new Uint8Array([0x25, 0x50, 0x44, 0x46, 0x2d])`
            - 取版本号：取非空格字符，最长7个字符
        - 对象
            - 结束标识‘endobj’：`new Uint8Array([0x65, 0x6e, 0x64, 0x6f, 0x62, 0x6a])`
        - XRef
            > 交叉引用表
            - 开始标识
                > 不一定有
                - `startxref ${开始位置}`
                - 从文件最后开始找字符‘startxref’：`new Uint8Array([0x73, 0x74, 0x61, 0x72, 0x74, 0x78, 0x72, 0x65, 0x66])`
            - xref 表示一个‘交叉引用表’的开始
    - 语法解析


## 目录结构
- docs 文档，由`wintersmith`根据`./config.json`配置构建，加上`jsdoc`，交付在`gh-pages`分支，用于github-doc


## 构建
- chrome 插件 `gulp chromium`
    - 对`src/pdf.js`、`src/pdf.worker.js`和`web/viewer.js`做`webpack`打包输出
- 文件获取服务 `gulp server`
- 编译 `gulp generic`
- 交付编译 `gulp dist-install`

### buildnumber
1. 获取本次编译信息
    - 以`git``commit`信息为依据
    - 从‘某基础版本-commit’开始的数字数为版本号（随机递增的效果）
    - 最后一次commit的hash为标记。
2. 生成文件`version.json`

### default_preferences
```js
[
    "src/{display,shared}/*.js",
    "!src/shared/{cffStandardStrings,fonts_utils}.js",
    "src/pdf.js",
    "web/*.js",
    "!web/{app,pdfjs,preferences,viewer}.js"
]
```
1. 做本工程逻辑的预处理
    1. `acorn`做代码解析，构建AST
    2. 在AST上处理本工程逻辑
    3. `escodegen`从AST再生成代码
2. 使用babel做向后兼容编译
3. 获取并生成文件`default_preferences.json`

### locale
1. 遍历`I18n`文件夹内的文件夹，并验证处理
2. 拷贝文件夹内的`viewer.properties`文件
2. 拼接引用文本，生成文件`locale.properties`

