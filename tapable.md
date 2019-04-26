# [tapable](https://github.com/webpack/tapable)

> 插件的绑定和使用，继承 tapable 使用

## 0.2.9
- 维护 `_plugins` 对象: `{ name: Array<{ apply: Function }> }`
- 运行插件
    - `apply(Array<{ apply: Function }>)`
        - 直接执行入参插件的 `apply` 函数
    - `plugin(name: String, fn: { apply: Function })`
        - 注册插件
    - `hasPlugins(name: String): Array<{ apply: Function }>`
        - 是否有此插件
    - `applyPlugins(name: String, ...args)`
        - 同步执行插件
    - `applyPluginsWaterfall(name: String, init: any, ...args): any`
        - 上一个插件的返回值作为下一个插件的第一个参数，init为第一个插件的第一个参数
    - `applyPluginsBailResult(name: String, ...args): any`
        - 插件数组有一个返回就返回结果
    - `applyPluginsAsync/applyPluginsAsyncSeries(name: String, ...args, callback: Function -> void)`
        - callback 形式实现插件内的异步，插件间的顺序执行
        - 将 args 传给每一个插件，而 callback 封装为‘执行下一个插件’，后面没有插件了才执行原callback
        - callback 第一个入参为err，只判断是否err，其他参数均无效
    - `applyPluginsAsyncWaterfall(name: String, init: any, callback: Function -> void)`
        - callback 形式实现插件内的异步，插件间的顺序执行
        - 上一个插件调用callback的入参作为下一个插件的第一个参数，init为第一个插件的第一个参数
        - callback 封装为‘执行下一个插件’，后面没有插件了才执行原callback
    - `applyPluginsAsyncSeriesBailResult(name: String, ...args, callback: Function -> void)`
        - callback 形式实现插件内的异步，插件间的顺序执行
        - 插件调用 callback 时有任何入参即结束
    - `applyPluginsParallel(name: String, ...args, callback: Function -> void)`
        - 同步执行所有插件，一旦插件调用callback的错误形式即计为结束
        - 结束则终止当前event，且其他插件调用callback也不会再执行
        - callback 是异步的，所以在函数体内维护 remaining 数据纪录还未执行完成的插件数
    - `applyPluginsParallelBailResult(name: String, ...args, callback: Function -> void)`
        - 同步执行所有插件，当插件callback带参数且它的**前面的插件都已执行完成**调用过callback，或者所以插件调用了callback，即计为结束
        - callback 是异步的，所以在函数体内维护 currentPos (带参数的插件)、done (currentPos前已经执行完的index)，当 currentPos 和 done 一致时即结束

## 1.1.1
- 将插件直接定位为`hook`
- 将不同执行形式的`hook`抽象为类
    - 注册插件
        - `tap`
        - `tapAsync`
        - `tapPromise`
            > 增加了 `Promise` 形式的异步
    - 执行插件
        - `call`
        - `callAsync`
        - `promise`
    - hook 类型
        - `SyncHook` -> `applyPlugins`
        - `SyncBailHook` -> `applyPluginsBailResult`
        - `SyncLoopHook`
        - `SyncWaterfallHook` -> `applyPluginsWaterfall`
        - `AsyncParallelHook` -> `applyPluginsParallel`
        - `AsyncParallelBailHook` -> `applyPluginsParallelBailResult`
        - `AsyncSeriesHook` -> `applyPluginsAsync/applyPluginsAsyncSeries`
        - `AsyncSeriesBailHook` -> `applyPluginsAsyncSeriesBailResult`
        - `AsyncSeriesWaterfallHook` -> `applyPluginsAsyncWaterfall`
