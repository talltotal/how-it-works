# [Vetur](https://vuejs.github.io/vetur)


## 功能
- 根据大标签的type，做不同处理：高亮 / lint
- 自动补全 component names 和 attributes）


## 工程
- vuepress 为文档工具
    - 分支 `gh-pages`
    - md文档正常编辑，增加vuepress配置
    - 需要更新文档时，执行脚本
        1. 执行build；
        2. 在交付件文件夹构建git环境；
        3. 强推到分支；
        4. 清除交付件
    > 源码与交付件分离；交付件分支无需git跟踪
- husky + lint-staged + (tslint + prettier) 为自动语法lint
- ts 为编程语言和编译工具
    - 入口配置文件 `./tsconfig.json` => `references`
    - scripts、client、server、test 四个模块不同编译配置，都继承(`extends`) `./tsconfig.options.json`
        - scripts: 默认语法文件导出脚本
        - test: 测试


## 语言插件基础
- 定位：[Language Extensions](https://code.visualstudio.com/api/language-extensions/overview#programmatic-language-features)
    - [语法高亮](https://code.visualstudio.com/api/language-extensions/syntax-highlight-guide)
        - [分词 - TextMate](https://macromates.com/manual/en/language_grammars)
        - 样式map
    - [Language Configuration Guide](https://code.visualstudio.com/api/language-extensions/language-configuration-guide)
        - 注释 Comment toggling
        - 代码块 Brackets definition
        - 自动关闭 Autoclosing
        - 自动包裹 Autosurrounding
        - 折叠 Folding
        - 写字板 Word pattern
        - 缩减规则 Indentation Rules
    - [Programmatic Language Features](https://code.visualstudio.com/api/language-extensions/programmatic-language-features)
        - ways
            1. [vscode.languages.registerHoverProvider](https://code.visualstudio.com/api/references/vscode-api#languages.registerHoverProvider) API
            2. Server
                1. 提供 Client + Server
                2. Client 像方法1一样独立的插件运行；另外有进程与 Server 通过 Protocol 通信
                3. Client 接受 vscode 响应，通知 Server 处理，再反馈给 vscode；Server 使用 LSP 接口
                > 比方法1麻烦，但是 Server 端不限制开发语言；一个 Server 可以同时为不同编辑器提供服务
        - 常用接口
            - 代码补全 Auto completion: [VS Code API](https://code.visualstudio.com/api/references/vscode-api#languages.registerCompletionItemProvider)/[LSP method](https://microsoft.github.io/language-server-protocol/specification#textDocument_completion)
            - 定义跳转 Jump to definition: [VS Code API](https://code.visualstudio.com/api/references/vscode-api#languages.registerDefinitionProvider)/[LSP method](https://microsoft.github.io/language-server-protocol/specification#textDocument_definition)
            - Hover: [VS Code API](https://code.visualstudio.com/api/references/vscode-api#languages.registerHoverProvider)/[LSP method](https://microsoft.github.io/language-server-protocol/specification#textDocument_hover)
            - ...
        - 错误验证
            - Client 不是发验证请求
            - Server 会**push** `textDocument/publishDiagnostics` 信息给 Client
- 定义 `packages.json`
    - `categories: ['Programming Languages']`
    - 指定语法 json TextMate grammars `contributes.grammars`
        - json file path `path`
        - 内嵌的 languages `embeddedLanguages`
    - 语言配置 `contributes.languages`
        - config file path `configuration`


## 实现细节
- 定义激活插件时机 `packages.json.activationEvents = 'onLanguage:vue'`
- server
    - `createConnection()`
- client
    - `new LanguageClient(id, name, ServerOptions, LanguageClientOptions)`
    - `client.start()`
- mode 划分
    > vue,pug,'vue-html',css,postcss,scss,less,stylus,javascript,typescript,tsx
    1. 获取文档 `doc: TextDocument` - `new TextDocuments().listen(connection).get(uri)`
    2. 判定mode
        1. 解析（文本扫描，正则匹配）整个文本 `doc.getText()`，构成‘位置-mode’组合
        2. 根据用户当前聚焦位置 position 确定 mode
- 功能
    > 不同 mode 具有类似功能，但实现不同
    - `connection.onCompletion`
        - [html](https://github.com/vuejs/vetur/blob/master/server/src/modes/template/services/htmlCompletion.ts): 当前组件的 props,data,computed,methods / 支持的组件库(vetur内置+配有vetur)组件,属性配置数据+当前组件
            > 从工程 `package.json.dependencies` 判断是否有[配置vetur的依赖](https://github.com/vuejs/vetur/blob/master/server/src/modes/template/tagProviders/index.ts)
    - `connection.onDefinition`
        - html: 只取当前文件定义的子组件，且有.d.ts文件
            > 解析 script mode 时，用 ts 编译文件，获取 export 的 components 内容
    - `connection.onHover`
    - ...

