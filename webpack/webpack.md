# webpack

## 设计
1. **插件模式**（[tapable](https://github.com/webpack/tapable)）
    - 对做复杂工作的类定义工作的流程和步骤，将task前后甚至某些task本身命名为一个hook；创建类或触发类方法时流程开始
    - 此模式贯彻webpack，应用于几乎所有流程中：Compiler、Compilation、Template、 ModuleFactory、Parser...
2. **语法树**（js 解析器: [acorn](https://www.npmjs.com/package/acorn) / [acorn-dynamic-import](https://www.npmjs.com/package/acorn-dynamic-import)）
    - 解析文本，得到依赖项；为整个依赖网的构建提供基本依据
3. **健壮性**
    1. 入参校验
        - 定义所有可配项的校验规则（[ajv](https://www.npmjs.com/package/ajv)）
        - 校验有错误时，直接抛出错误（[Custom Error Types](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error#Custom_Error_Types)）
    2. 多编译支持
    3. 配置补全
        - 定义配置项的默认值/值处理函数（包括深拷贝、兼容处理、附加项等）
        - 基于默认配置合并/包装入参配置
    4. node环境
        - Logger
        - inputFileSystem
        - outputFileSystem
        - watchFileSystem


```
    template
        - main
        - chunk

    - 一个文件视为 `dependency`
    - `dependency` ----`ModuleFactory`-->> `module`
    - `module` 的 `dependency` ->> `module` ==》 `module graph`
    - 
    - 用 `loader` 预处理 `module`
    - 模块之间的依赖关系 `dependency`
```

## 流程
### 编译准备
- 配置插件：`options.plugins` `{apply(compiler){}}`
- `compiler.hooks.environment`
- `compiler.hooks.afterEnvironment`
- 内置插件：`WebpackOptionsApply`
    - 交付件的运行环境：`target`
        - this-compilation -> MainTemplatePlugin / ChunkTemplatePlugin / HotUpdateChunkTemplatePlugin
        - compilation -> ModuleTemplatePlugin / params.normalModuleFactory / compilation.normal-module-loader
        - after-resolvers -> compiler.resolvers.normal
    - 以库形式输出的打包处理：`library`
        - this-compilation -> MainTemplatePlugin
    - 外部依赖：`externals`
        - compile -> params.normalModuleFactory
    - 开发者工具：`devtool`
        - compilation -> ModuleTemplatePlugin
    - `module`
    - entry
        - 解析 `entry` 做到支持 `String, Array, Function`，增加 `make` 插件使增加入口
    - **hook**: `entry-option`
    - `compilation` 插件
    - ...
- `compiler.hooks.afterPlugins`
- `compiler.resolverFactory.hooks.resolveOptions`
- `compiler.hooks.afterResolvers`

### run
- `compiler.hooks.beforeRun`
- `compiler.hooks.run`
- compile
- emit
- `compilation.hooks.needAdditionalPass`
- `compiler.hooks.done`
- `compiler.hooks.additionalPass`
- `compiler.hooks.failed`

### watch
- `compiler.hooks.watchRun`
- compile
- emit
- `compiler.hooks.watchClose`

### compile
- `compiler.hooks.beforeCompile`
- `compiler.hooks.compile`
- `compiler.hooks.thisCompilation`
- `compiler.hooks.compilation`
- `compiler.hooks.make`
    - 真正编译阶段，插件在这个hook中调用 `compilation.prefetch` / `compilation.addEntry` 开始
    - 依赖（`dependencie`）交给模块工厂得到模块实例 `module`
        > 自定义的工厂需有`create`函数
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
            - 解析器解析处理后的代码
                - **parser.hook**: `program(ast, comments): any`
                    > 得到 `dependencies`
                - 得到初始 `hash`
        - 收集构建过程的 `warn/error`
        - 对依赖排序
        - **compilation.hook**: `failed-module(modules): void`
        - **compilation.hook**: `succeed-module(modules): void`
    - 构建模块依赖树
        - 每个依赖即模块，根据对应的模块工厂开始实例->存储->构建
        - 形成整一个以入口为开始的模块依赖网络
        - 利用缓存和实例标识结束递归
    - 开始入口的 `module` 作为 `preparedChunk`
- 整理编译的错误和警告
- `compilation.hooks.finishModules`
- `compilation.hooks.seal`
- `compilation.hooks.optimizeDependenciesBasic`
- `compilation.hooks.optimizeDependencies`
- `compilation.hooks.optimizeDependenciesAdvanced`
- `compilation.hooks.afterOptimizeDependencies`
- `compilation.hooks.beforeChunks`
- `compilation.hooks.afterChunks`
- `compilation.hooks.optimize`
- `compilation.hooks.optimizeModulesBasic`
- `compilation.hooks.optimizeModules`
- `compilation.hooks.optimizeModulesAdvanced`
- `compilation.hooks.afterOptimizeModules`
- `compilation.hooks.optimizeChunksBasic`
- `compilation.hooks.optimizeChunks`
- `compilation.hooks.optimizeChunksAdvanced`
- `compilation.hooks.afterOptimizeChunks`
- `compilation.hooks.optimizeTree`
- `compilation.hooks.afterOptimizeTree`
- `compilation.hooks.optimizeChunkModulesBasic`
- `compilation.hooks.optimizeChunkModules`
- `compilation.hooks.optimizeChunkModulesAdvanced`
- `compilation.hooks.afterOptimizeChunkModules`
- `compilation.hooks.shouldRecord`
- `compilation.hooks.reviveModules`
- `compilation.hooks.optimizeModuleOrder`
- `compilation.hooks.advancedOptimizeModuleOrder`
- `compilation.hooks.beforeModuleIds`
- `compilation.hooks.moduleIds`
- `compilation.hooks.optimizeModuleIds`
- `compilation.hooks.afterOptimizeModuleIds`
- `compilation.hooks.reviveChunks`
- `compilation.hooks.optimizeChunkOrder`
- `compilation.hooks.beforeChunkIds`
- `compilation.hooks.optimizeChunkIds`
- `compilation.hooks.afterOptimizeChunkIds`
- `compilation.hooks.recordModules`
- `compilation.hooks.recordChunks`
- hash 
    > `crypto`
    - `compilation.hooks.beforeHash`
    - `compilation.hooks.afterHash`
    - `compilation.hooks.recordHash`
- 静态化
    - `compilation.hooks.beforeModuleAssets`
    - `compilation.hooks.shouldGenerateChunkAssets`
    - `compilation.hooks.beforeChunkAssets`
    - `compilation.hooks.additionalChunkAssets`
    - `compilation.hooks.record`
    - `compilation.hooks.additionalAssets`
    - `compilation.hooks.optimizeChunkAssets`
    - `compilation.hooks.afterOptimizeChunkAssets`
    - `compilation.hooks.optimizeAssets`
    - `compilation.hooks.afterOptimizeAssets`
- `compilation.hooks.needAdditionalSeal`
- `compilation.hooks.afterSeal`
- `compiler.hooks.afterCompile`

### emit
- `compiler.hooks.shouldEmit`
- `compiler.hooks.assetEmitted`
- `compiler.hooks.afterEmit`
- `compiler.hooks.emit`
- 读取已存储的编译状态
    - 以对象的形式存储**编译状态**
    - json 文件持久化 ············ `recordsInputPath/recordsOutputPath/recordsPath`

