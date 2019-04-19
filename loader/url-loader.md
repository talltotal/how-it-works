# [url-loader](https://github.com/webpack-contrib/url-loader)

- 根据配置 `limit`，对文件小于限制的计算 `base64` 直接返回
- 对大于限制的用 `file-loader` 处理
    - 调用 `loaderContext.emitFile` 增加此 `module` 的 `asset`
    - 直接返回文件的路径
> 直接返回：`module.exports = ${content}`
