# [i18next-scanner](https://github.com/i18next/i18next-scanner)

1. 使用 `vinyl-fs` 做文件处理管理；加载 `input` 文件，`options` 配置解析器，`output` 输出文件
2. 为所有文件单例一个解析器实例
    - 加载支持指定 `lngs` 和 `ns` 的 `loadPath` 文件，并存入内存数据结构中
3. 当文件后缀匹配配置 `extensions` 时，使用解析器实例做相应处理
    - 获取key
        - 函数：`Func` 如 `i18next.t('key')`
            - 使用 `func.list` 配置，拼接 `key` 部分的正则，匹配文件内容获取函数的 `key` 部分
            - 使用 `{}[]()` 栈结构获取函数的参数部分，并用 `esprima` 做解析，得到各属性名，取其中的以下属性作为配置数据
                - `defaultValue`
                - `defaultValue_plural`
                - `count: number` 配置了即说明存在复数形式
                - `context: any` 上下文数据
                - `ns`
                - `keySeparator`
                - `nsSeparator`
        - 属性：`Attr` 如 `data-i18n="key"`
            - 使用 `parse5` 得到 `ast`
            - 递归遍历节点找到匹配 `attrs.list` 的属性，得到 `key`
        - 组件：`Comp` 如 `<Trans />`
            - 使用 `acorn`+`acorn-stage3`+`acornJsx` 得到 `ast` （所以不支持`.tsx`）
            - 使用 `acorn-walk` 遍历节点，对 `JSXElement` 即组件元素进行判断取组件属性
            - 从属性中取 `key`、默认值等配置
    - 缓存key
        - 按 `nsSeparator` 拆分，得到 `ns` ；按 `keySeparator` 拆分，得到分层级的 `key`
        - 处理上下文、单复数后缀后，得到多个 `key`
        - 配合默认值得到 `key` 的 `value`
        - 将 `key`/`value` 存入 `lngs` 下对应 `ns`
4. 取单例解析器中数据，使用 `this.push`+`vinyl` 生成对应的文件

