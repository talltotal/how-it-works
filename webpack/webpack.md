# webpack@4.x
从入口文件开始，构建module，匹配文件类型的loader链，运行loader进行处理，得到module的依赖文件。
再对依赖文件进行module构建，由此递归形成module的依赖网。
根据入口和其他成组需要，组织chunk与module映射关系，并分组chunkGroup。最后根据chunk做静态文件的输出。



## 设计
1. **插件模式**（[tapable](https://github.com/webpack/tapable)）
    - 对做复杂工作的类定义工作的流程和步骤，将task前后甚至某些task本身命名为一个hook；创建类或触发类方法时流程开始
    - 此模式贯彻webpack，应用于几乎所有流程中：Compiler、Compilation、Template、 ModuleFactory、Parser...
2. **语法树**（js 解析器: [acorn](https://www.npmjs.com/package/acorn) / [acorn-dynamic-import](https://www.npmjs.com/package/acorn-dynamic-import)）
    - 解析文本，得到依赖项；为整个依赖网的构建提供基本依据


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
- 入参校验
    - 定义所有可配项的校验规则（[ajv](https://www.npmjs.com/package/ajv)）
    - 校验有错误时，直接抛出错误（[Custom Error Types](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error#Custom_Error_Types)）
- 多编译支持
- 配置补全
    - 定义配置项的默认值/值处理函数（包括深拷贝、兼容处理、附加项等）
    - 基于默认配置合并/包装入参配置
- node环境·`lib/node/NodeEnvironmentPlugin.js`
- 【call·hook】
    - `compiler.hooks.environment`
    - `compiler.hooks.afterEnvironment`
- 配置应用·`lib/WebpackOptionsApply.js`
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
- 【call·hook】
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

### watch([watchpack](./watchpack.html))
> 根据文件变化时间戳判断是否更新
- `compiler.hooks.watchRun`
- compile
- emit
- `compiler.hooks.watchClose`

### compile
#### 准备
- 【call·hook】
    - `compiler.hooks.beforeCompile`
    - `compiler.hooks.compile`
    - `compiler.hooks.thisCompilation`
    - `compiler.hooks.compilation`
#### 进行（构建依赖网）
- `compiler.hooks.make`
    1. 从入口文件开始；即构建 dependencie 实例，调用`compilation.prefetch` / `compilation.addEntry`
        > SingleEntryPlugin
        > MultiEntryPlugin
        > DllEntryPlugin
        > DynamicEntryPlugin
        > PrefetchPlugin
        > AutomaticPrefetchPlugin
        - `compilation.hooks.addEntry`
        - `compilation.hooks.failedEntry`
        - `compilation.hooks.succeedEntry`
    2. 创建模块：由入口 dependencie 的 moduleFactory 实例 `module`（这里以`normalModuleFactory`作说明）
        > 自定义模块类需绑定工厂：`compilation.dependencyFactories.set(userDependency, userFactory)`
        > 自定义的 dependencie 需继承`webpack/lib/Dependency.js`
        > 自定义的 factory 需有`create(data: ModuleFactoryCreateData, callback: ModuleCallback)`函数
        > `lib/NormalModule.js` / `lib/NormalModuleFactory.js`
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
    3. 构建模块
        - **compilation.hook**: `build-module(modules): void`
        - 构建
            - 代码文本传给`loader`处理
                > `loader` 内部解析文件处理完后转成**js格式文本**返回或直接调用`loaderContext.callback`
            - 解析器解析处理后的代码
                - **parser.hook**: `program(ast, comments): any`
                    > 得到 `dependencies`
                - 得到初始 `hash`
        - 收集构建过程的 `warn/error`
        - 根据loc对依赖排序，确保后续按依赖顺序构建依赖
        - **compilation.hook**: `failed-module(modules): void`
        - **compilation.hook**: `succeed-module(modules): void`
    4. 构建依赖：由3得到的模块的依赖列表即新的模块，从3开始递归创建/构建，得到最后的模块依赖网
    - 开始入口的 `module` 作为 `preparedChunk`
#### 整理
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
    - `terser-webpack-plugin` 做 Tree-Shaking
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


## SplitChunksPlugin
> chunk 拆分插件，根据配置`options.optimization.splitChunks`运行

在`compilation.hooks.optimizeChunksAdvanced`阶段

默认：
```js
const splitChunks = {
    // 选择哪些 chunk 进行优化
    // all - 优化所有chunks，chunk 可以在异步和非异步 chunk 之间共享
    // async - 非异步 chunk
    // (chunk)=>boolean - 判断函数
    chunks: 'async',
    // 生成 chunk 的最小体积（以 bytes 为单位）
    minSize: 20000,
    minRemainingSize: 0,
    // 拆分前必须共享模块的最小 chunks 数
    minChunks: 1,
    // 按需加载时的最大并行请求数
    maxAsyncRequests: 30,
    // 入口点的最大并行请求数
    maxInitialRequests: 30,
    enforceSizeThreshold: 50000,
    // 缓存组，继承上面的属性
    cacheGroups: {
        defaultVendors: {
            // 匹配规则
            test: /[\\/]node_modules[\\/]/,
            // 优先级
            priority: -10,
            // 如果当前 chunk 包含已从主 bundle 中拆分出的模块，则它将被重用，而不是生成新的模块
            reuseExistingChunk: true,
        },
        default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
        },
        // 设置为 false 以禁用默认缓存组
        // defaultVendors: false
        // default: false
    },
}
```



