# [terser-webpack-plugin](https://github.com/webpack-contrib/terser-webpack-plugin)
webpack JS 文件混淆插件

- 使用 [`schema-utils`] 做 option 验证
- 在 `compilation.hooks.optimizeChunkAssets` 钩子做混淆操作
- 使用 [`jest-worker`](https://github.com/facebook/jest) 做多线程执行混淆任务
    - 子 worker 数量最大为系统 cpu 个数减一
    - 在主线程中判断缓存，有缓存直接取缓存结果
    - 无缓存再使用 worker 运行，之后在主线程将结果缓存下来
- 使用 [`terser`](https://github.com/terser-js/terser) 对js文件做混淆
    - 保留必要的注释，如 `/@preserve|@lic|@cc_on|^\**!/i`
- webpack4中，使用 [`cacache`](https://github.com/npm/cacache) 做 key-content 的持久化缓存
- webpack5中，使用 `compilation.cache` 做缓存


