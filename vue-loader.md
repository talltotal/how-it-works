# [vue-loader]()

> @15.7.0

- `@vue/component-compiler-utils` 解析 `.vue` 文件分成 `template`、`script`、`style`、`custom` 模块
- 返回拼接依赖上述模块的 `js` 格式文本，带上 `type` 和 `id` 标识后续的解析
    > 阶段一完成
- 配合 `plugin` 更新 `module.rules`，通过匹配 `resourceQuery`，加入解析上述模块的内置 `loader`
- `loader` 的 `pitch` 函数根据 `type` 等，再次更新文本调整分发 `loader`
    - `templateLoader`
        - 解析 `template` 模块，转成 `render` 函数
    - `styleLoader`
        - 解析 `script` 模块，处理 `scoped` 给节点加上 `data-v${id}` 属性

