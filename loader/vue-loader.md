# [vue-loader](https://github.com/vuejs/vue-loader)

> @15.7.0

- [loader API](https://www.webpackjs.com/api/loaders/)
    - 作为 webpack loader 基本接口依据
- [@vue/component-compiler-utils]()
    - RSS、Hot 等兼容封装层
- [vue-template-compiler](https://github.com/vuejs/vue/tree/dev/packages/vue-template-compiler#readme)
    - 文本解析主模块

1. 模块基本划分
    - 解析 `.vue` 文件分成 `template`、`script`、`style`、`custom` 模块
    - 返回拼接依赖上述模块的 `js` 格式文本，带上 `type` 和 `id` 等标识后续的解析
2. 模块 loader 内敛设置
    - 配合 `plugin` 更新 `module.rules`，通过匹配 `resourceQuery`，在最前面加入解析上述模块的内置 loader `pitcher`
    - `pitcher` 的 `pitch` 函数根据 `type` 等，再次更新文本调整分发 `loader`
        > 根据 `loader` 的 `pitching`，将 `loader` 放在最前面，并使用 `pitch` 最先执行并返回值不被其他 `loader` 处理
3. 依据内敛 loader 模块处理
    - template
        - 得到 template 部分的代码
        - `templateLoader` 解析 `template` 模块，转成 `render` 函数
    - style
        - `vue-style-loader` 的 `pitch` 函数基于 `pitcher` 指定的 loader ，根据 RSS、hot 等做调整
        - 得到 script 部分的代码
        - less/sass/styl...
        - `styleLoader` 解析 `script` 模块，处理 `scoped` 给节点加上 `data-v${id}` 属性
        - `css-loader` 以一般css文件处理
