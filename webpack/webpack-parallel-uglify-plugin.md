# [webpack-parallel-uglify-plugin@1.0.2](https://github.com/gdborton/webpack-parallel-uglify-plugin)
> js 代码混淆插件，支持缓存/多进程

1. 在 `compilation.optimize-chunk-assets` 做文件压缩，修改 `assetHash[assetName]` 值
2. 在 `compiler.done` 清除无效缓存文件


## 缓存
- hash key
    - 计算内容：文件内容+配置项+插件版本 `source + options + webpack-parallel-uglify-plugin.package.json`
    - 计算方式：`crypto.sha256.hex`
- 缓存文件保存：以 key 为文件名保存在缓存文件夹内
- 已缓存：缓存文件夹内是否已有此文件


## 多进程
> 进程任务（即单文件混淆）相互独立

- [`worker-farm`](../back-end/worker-farm.html)
- 进程数：配置值 / 任务数 / cpu数
- 子进程中需要 webpack 相关信息，用文件的形式共享（临时文件tmpFile）


## 混淆
- `uglify-es` / `uglify-js`

