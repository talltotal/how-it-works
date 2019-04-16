# webpack

## 主要
1. 插件模式
    - [tapable](https://github.com/webpack/tapable)
    - 某些类似hook的存在
    - 对做复杂工作的类定义工作的流程和步骤，将task前后甚至某些task本身命名为一个hook；创建类或触发类方法时流程开始
    - 此模式贯彻webpack，应用于几乎所有流程中：Compiler、Compilation、Template、 ModuleFactory、Parser...
2. 语法树
    - js 解析器
        - [acorn](https://www.npmjs.com/package/acorn)
        - [acorn-dynamic-import](https://www.npmjs.com/package/acorn-dynamic-import)
    - 


template
    - main
    - chunk

- 一个文件视为 `dependency`
- `dependency` ----`ModuleFactory`-->> `module`
- `module` 的 `dependency` ->> `module` ==》 `module graph`
- 
- 用 `loader` 预处理 `module`
- 模块之间的依赖关系 `dependency`


## 顺序
### 前期准备
1. 入参校验
    - 定义所有可配项的校验规则（[ajv](https://www.npmjs.com/package/ajv)）
    - 校验错误时直接抛出错误（[Custom Error Types](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error#Custom_Error_Types)）
2. 配置补全
    - 定义配置项的默认值/值处理函数（包括深拷贝、兼容处理、附加项等）
    - 基于默认配置合并/包装入参配置
3. 编辑器赋能（node）
    - inputFileSystem
    - outputFileSystem
    - watchFileSystem


### 编译准备
1. 配置插件运行 ··································· `plugins` 
    - 插件的`apply`函数会传入编辑器实例对象，在**hook**上加处理
- **hook**: `environment(): void` <br/>
- **hook**: `after-environment(): void`
2. 内置插件运行（根据配置转换成编译器的属性/webpack内置插件并运行）
    - 交付件的运行环境 ····························· `target`
        - 根据不同环境向编译器增加适配插件
            - this-compilation -> MainTemplatePlugin / ChunkTemplatePlugin / HotUpdateChunkTemplatePlugin
            - compilation -> ModuleTemplatePlugin / params.normalModuleFactory / compilation.normal-module-loader
            - after-resolvers -> compiler.resolvers.normal
    - 以库形式输出的打包处理 ························ `library`
        - this-compilation -> MainTemplatePlugin
    - 外部依赖 ···································· `externals`
        - compile -> params.normalModuleFactory
    - 开发者工具 ··································· `devtool`
        - compilation -> ModuleTemplatePlugin
    - 解析 `entry` 做到支持 `String, Array, Function`，增加 `make` 插件使增加入口
    - **hook**: `entry-option`
    - `compilation` 插件
        - 
    - ...
    - **hook**: `after-plugins` 插件增加完毕
    - `resolvers`
    - **hook**: `after-resolvers`
- **hook**: `before-run(): void` <br/>
- **hook**: `run(): void`
3. 读取已存储的编译状态
    - 以对象的形式存储**编译状态**
    - json 文件持久化 ············ `recordsInputPath/recordsOutputPath/recordsPath`


### 编译执行
1. 初始化编译参数 `params`
    - 一般的模块处理工厂 【`normalModuleFactory`】 ··········· `module`
        > 插件可以：将自定义的模块类的工厂指定为此；给此工厂增加插件
    - **hook**: `normal-module-factory(normalModuleFactory): void`
        > 基础的模块工厂实例创建完成，第一个可用hook
    - 上下文的模块处理工厂【`contextModuleFactory`】
    - **hook**: `context-module-factory(contextModuleFactory): void`
    - `compilationDependencies: Array<>`
- **hook**: `before-compile(params, cb): void` <br/>
- **hook**: `compile(params): void`
2. 创建编译实例 【`compilation`】
    - mainTemplate
    - chunkTemplate
    - hotUpdateChunkTemplate
    - **hook**: `this-compilation(compilation, params): void` <br/>
    - **hook**: `compilation(compilation, params): void`
        - 注册依赖工厂（只有注册过的依赖可以使用） ··· `compilation.dependencyFactories`
- **hook**: `make(compilation, cb): void`
    - 真正编译阶段，插件在这个hook中调用 `compilation.prefetch` / `compilation.addEntry` 开始
    - 依赖（`dependencie`）交给模块工厂得到模块实例 `module`
        > 自定义的工厂需有create函数
        - **normalModuleFactory.hook**: `before-resolve`
        - **normalModuleFactory.hook**: `factory`
        - **normalModuleFactory.hook**: `resolver(): resolver`
            - `require` 字符串正则解析，得到内敛 `loader`
                > 格式：`loader!loader!loader!file`
                > 前部可以设置此文件是否使用外部的前/中/后处理
                > 1. '-!xxxx' 只使用外部后处理
                > 2. '!xxxx' 不使用外部中处理
                > 3. '!!xxxx' 不使用任何外部loader
            - 内敛结合外部配置得到所有 `loader`
                > `loader` 根据 `enforce` 指定使用的时机并以此排序
                > 顺序：外部后 - 内敛 - 外部中 - 外部前
                > 后续会从左往右调用 `loader` 的 `pitch` 方法（有返回值时不再执行后面的 `loader`），再从右往左调用 `loader` 方法
            - 根据 `resolve` 验证模块和loader有效
            - 构建解析器
            - **normalModuleFactory.hook**: `parser`
        - **normalModuleFactory.hook**: `after-resolve`
        - **normalModuleFactory.hook**: `create-module()`
        - 构建 `module` 实例
        - **normalModuleFactory.hook**: `module(): module`
        - 在 `dependencie` 绑定 `module` 做缓存 ············ `__NormalModuleFactoryCache`
    - 存储模块
        - 缓存
    - 构建模块
        - **compilation.hook**: `build-module(modules): void`
        - 构建
            - 代码文本传给`loader`处理
                > `loader` 内部解析文件处理完后转成**js格式文本**返回或直接调用`loaderContext.callback`
            - 解析器解析处理后的代码，得到 `dependencies`
                - **parser.hook**: `program(ast, comments): any`
        - 收集构建过程的warn/error
        - 对依赖排序
        - **compilation.hook**: `failed-module(modules): void`
        - **compilation.hook**: `succeed-module(modules): void`
    - 构建模块依赖树
        - 每个依赖即模块，根据对应的模块工厂开始实例->存储->构建
        - 形成整一个以入口为开始的模块依赖网络
        - 利用缓存和实例标识结束递归
    - 开始入口的 `module` 作为 `preparedChunk`
3. 整理编译的错误和警告
    - **compilation.hook**: `finish-modules(modules): void`
4. chunk 包装
    - **compilation.hook**: `seal(modules): void`
    - 优化 Dependencie
        - **compilation.hook**: `optimizeDependenciesBasic(modules): Boolean`
        - **compilation.hook**: `optimizeDependencies(modules): Boolean`
        - **compilation.hook**: `optimizeDependenciesAdvanced(modules): Boolean`
        - **compilation.hook**: `afterOptimizeDependencies(modules): void`
    - 创建 chunk
        - **compilation.hook**: `beforeChunks(): void`
        - 由 `~~preparedChunk~~_preparedEntrypoints` 创建 `chunk`
        - 根据模块网络创建chunk网络
        - module 排序
        - **compilation.hook**: `afterChunks(): void`
    - 优化 module
        - **compilation.hook**: `optimize(): void`
        - **compilation.hook**: `optimize-modules-basic(modules): Boolean`
        - **compilation.hook**: `optimize-modules(modules): Boolean`
        - **compilation.hook**: `optimize-modules-advanced(modules): Boolean`
        - **compilation.hook**: `after-optimize-modules(modules): void`
    - 优化 chunk
        - **compilation.hook**: `optimize-chunks-basic(chunks): Boolean`
        - **compilation.hook**: `optimize-chunks(chunks): Boolean`
        - **compilation.hook**: `optimize-chunks-advanced(chunks): Boolean`
        - **compilation.hook**: `after-optimize-chunks(chunks): void`
    - 优化 module-chunk 树
        - **compilation.hook**: `optimize-tree(chunks, modules, cb): void`
        - **compilation.hook**: `after-optimize-tree(chunks, modules): void`
        - **compilation.hook**: `optimize-chunk-modules-basic(chunks, modules): Boolean`
        - **compilation.hook**: `optimize-chunk-modules(chunks, modules): Boolean`
        - **compilation.hook**: `optimize-chunk-modules-advanced(chunks, modules): Boolean`
        - **compilation.hook**: `after-chunk-modules(chunks, modules): void`
    - **compilation.hook**: `should-record(): Boolean`
    - **compilation.hook**: `revive-modules(modules, records): void`
    - **compilation.hook**: `optimize-module-order(modules): void`
    - **compilation.hook**: `advanced-optimize-module-order(modules): void`
    - **compilation.hook**: `before-module-ids(modules): void`
    - **compilation.hook**: `module-ids(modules): void`
    - **compilation.hook**: `optimize-module-ids(modules): void`
    - **compilation.hook**: `after-optimize-module-ids(modules): void`
    - **compilation.hook**: `revive-chunks(chunks, records): void`
    - **compilation.hook**: `optimize-chunk-order(chunks): void`
    - **compilation.hook**: `before-chunk-ids(chunks): void`
    - **compilation.hook**: `optimize-chunk-ids(chunks): void`
    - **compilation.hook**: `after-optimize-chunk-ids(chunks): void`
    - **compilation.hook**: `record-modules(modules, records): void`
    - **compilation.hook**: `record-chunks(chunks, records): void`
    - 创建hash
        - **compilation.hook**: `before-hash(): void`
        - **compilation.hook**: `chunk-hash(chunk, chunkHash): void`
        - **compilation.hook**: `record-hash(records): void`
    - 创建模块静态化
        - **compilation.hook**: `before-module-assets(): void`
        - **compilation.hook**: `module-asset(module, fileName): void`
    - **compilation.hook**: `should-generate-chunk-assets(): Boolean`
    - 创建chunk静态化
        - **compilation.hook**: `before-chunk-assets(): Boolean`
        - **compilation.hook**: `chunk-asset(chunk, file): void`
    - **compilation.hook**: `additional-chunk-assets(chunks): void`
    - summarizeDependencies
    - **compilation.hook**: `record(compilation, records): void`
    - **compilation.hook**: `additional-assets(cb): void`
    - **compilation.hook**: `optimize-chunk-assets(chunks, cb): void`
    - **compilation.hook**: `after-optimize-chunk-assets(chunks): void`
    - **compilation.hook**: `optimize-assets(assets, cb): void`
    - **compilation.hook**: `after-optimize-assets(assets): void`
    - **compilation.hook**: `need-additional-seal(): Boolean`
    - **compilation.hook**: `after-seal(cb): Boolean`
- **hook**: `after-compile(compilation, cb): void`


### 编译完成
- **hook**: `should-emit(compilation): Boolean`
    - **hook**: `done(stats): void` <br/>
1. 输出
    - **hook**: `emit(compilation, cb): void`
    - 生成交付件（创建文件夹、写文件）······················· `output.path`
    - **hook**: `after-emit(compilation, cb): void` <br/>
2. additional-pass
    - **hook**: `need-additional-pass(): Boolean` <br/>
    - **hook**: `done(stats): void` <br/>
    - **hook**: `additional-pass(cb): void`
    - [重新编译](#编译执行)
3. 存储编译状态
    - **hook**: `done(stats): void` <br/>
