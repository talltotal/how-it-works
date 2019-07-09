# [mini-css-extract-plugin](https://github.com/webpack-contrib/mini-css-extract-plugin)

> plugin + loader 的组合

- loader.pitch
    - 创建子解析器，并运行解析其他 `loader` 作用后的结果，将其转换为自定义 `Dependency` 类
    - 另外用 `async` 给依赖返回提示内容
- plugin
    - 注册自定义 `Dependency`/`DependencyFactory`/`DependencyTemplate` 类
    - 在 `mainTemplate.renderManifest` 和 `chunkTemplate.renderManifest` 时，为自定义类增加 `chunk` 从而增加文件
