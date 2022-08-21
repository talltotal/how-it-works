# [mini-css-extract-plugin](https://github.com/webpack-contrib/mini-css-extract-plugin)

> plugin + loader 的组合

- loader.pitch
    - 创建子解析器，用于运行解析剩余 `loader` 作用后的结果
        - 在子解析器的`afterCompile`拿到编译结果，并移除所有 chunk assets
        - 将编译结果以`CssDependency`依赖的形式，关联到`module`上
    - 用`async`，在子解析器`runAsChild`的`callback`函数内，返回不包含实际编译结果
- plugin
    - 注册自定义`Dependency`的 `DependencyFactory`/`DependencyTemplate` 类
        - `CssDependency`
        - `CssModuleFactory`
        - `CssDependencyTemplate`
    - 根据`module.type`判断，整体从`chunk`维度
        - `mainTemplate.renderManifest`/`chunkTemplate.renderManifest`多加一个 manifest
