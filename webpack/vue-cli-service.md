# [vue-cli-service](https://cli.vuejs.org/)
> 基于 webpack 的 vue 项目编译打包的最佳实践

## 最佳实践
- 默认启用缓存/多线程
- 默认安装githooks-[yorkie](https://github.com/yyx990803/yorkie)用于一些git流程管理
- 浏览器兼容性
    - css: [browserslist](https://github.com/browserslist/browserslist)
    - es: polyfill
    - modern
- 自动注入 resource hint (preload/prefetch、manifest 和图标链接 (当用到 PWA 插件时) 以及构建过程中处理的 JavaScript 和 CSS 文件的资源链接（消耗带宽，根据具体情况调整）
- 默认支持`postcss` `css modules` `less` `sass` `stylus`
- 更便捷的多页面配置`pages`


## .
- 编译进度 `webpack.ProgressPlugin`


## MODERN
> 现代模式
> 按两个线程进行编译（@vue/cli-service/lib/commands/build/index.js---Ln55）

- 用环境变量`VUE_CLI_MODERN_MODE``VUE_CLI_MODERN_BUILD`做标识，区分线程类型
- 先以非 modern 模式
    - `outputFilename`加后缀`-legacy`
    - 不做 html 的 preload 插入，不做静态文件的 copy；这些在后面 modern 模式中做一次就够了
    - 在 htmlWebpackPluginAlterAssetTags 保存要插入的内容
- 后以 modern 模式
    - 注意`clean:false`，即保留上面的编译结果；相应的，相同文件将被覆盖
    - 对`babel`配置`useESModules:true`，不使用`@babel/plugin-transform-modules-commonjs`
    - 对`babel`配置`ignoreBrowserslistConfig:true`，不使用默认的browserslist
    - 在 htmlWebpackPluginAlterAssetTags
        - 给script加type:module属性
        - 取出上面保存的script加nomodule属性，并加到当前的html中，删除临时文件