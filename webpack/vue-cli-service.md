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

