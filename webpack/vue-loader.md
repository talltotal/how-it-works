# [vue-loader](https://github.com/vuejs/vue-loader)

> @15.7.0

1. 模块基本划分
    - 解析 `.vue` 文件分成 `template`、`script`、`style`、`custom` 模块
    - 返回拼接依赖上述模块的 `js` 格式文本，带上 `type` 和 `id` 等标识后续的解析
2. 模块 loader 内敛设置
    - 配合 `plugin` 更新 `module.rules`，通过匹配 `resourceQuery`，在最前面加入解析上述模块的内置 loader `pitcher`
    - `pitcher` 的 `pitch` 函数根据 `type` 等，再次更新文本调整分发 `loader`
        > 根据 `loader` 的 `pitching`，将 `loader` 放在最前面，并使用 `pitch` 最先执行并返回值不被其他 `loader` 处理
        > 为了 style 模块划出去之后能用到其他 loader，把 lang 后缀加上，在下一轮中 webpack 会把匹配的 rule 都补上
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


- [loader API](https://www.webpackjs.com/api/loaders/)
    - 作为 webpack loader 基本接口依据
- [@vue/component-compiler-utils]()
    - RSS、Hot 等兼容封装层


## 过程展示
1. 加载一个`app.vue`文件
2. `webpack`根据配置，构成loader链`vue-loader??vue-loader-options!./app.vue`
3. `vue-loader`解析`app.vue`文件，返回拆分成多个加载项文本
    - `./app.vue?vue&type=template&id=ed45c92a&`
    - `./app.vue?vue&type=script&lang=js&`
    - `./app.vue?vue&type=style&index=0&lang=less&`
4. `vue-loader.plugin`中，在插件加载时给原`rule`增加了`?vue&lang=`匹配，在`rule`最前面插入匹配`?vue`的`pitch`
5. `webpack`根据配置，构成loader链`vue-loader.plugin.pitcher!...langLoaders!vue-loader??vue-loader-options!./app.vue?vue&type=xxx&lang=xxx`
6. `vue-loader.plugin.pitcher`做拦截处理；结合‘langLoaders’拼接完整的loader链，直接返回
    - template：`...postLoaders!templateLoader!...preLoaders!vue-loader??vue-loader-options!./app.vue?type=template&id=ed45c92a&`
    - script：`...loaders!vue-loader??vue-loader-options!./app.vue?type=script&id=ed45c92a&`
    - style：`...afterLoaders!stylePostLoader!...beforeLoaders!vue-loader??vue-loader-options!./app.vue?type=style&id=ed45c92a&index=0&lang=less&`
7. `vue-loader`再次解析，针对不同的`type`处理返回`.vue`文件中不同的部分
8. ‘templateLoader’-[`vue-template-compiler`](#vue-template-compiler) 模版解析返回js，即render方法
9. ‘stylePostLoader’-`postcss` 解析返回



## [vue-template-compiler](https://github.com/vuejs/vue/tree/dev/packages/vue-template-compiler#readme)
> 文本解析主模块


### compiler
- 闭包封装默认 option
- 构建 ast
    - 文本解析构建树形结构
        > 字符串查找、正则匹配
        - 用 index 打标，last 备份
        - 用 children 、 parent 关联元素形成树
        - 用 root 保留根结点，currentParent 处理当前节点，stack 存储节点栈
    - 提供 module 插件模式
        - `transformNode`
        - `preTransformNode`
        - `postTransformNode`
- 递归遍历 ast 给所有节点打标 static、staticRoot 属性
- 遍历 ast 输出 render 文本


## style
### style scoped
检测到`<style>`标签有`scoped`属性时，主要做两件事：组件节点增加属性、css选择器都增加属性选择器。
- 节点增加属性
    1. 在loader过程中，给组件配置项增加`_scopeId`
    2. 在组件实例运行时中，创建dom元素时，取函数式组件虚拟dom上的`fnScopeId`或直接配置项的`_scopeId`做属性
- 增加css选择器
    1. 在loader过程中，在`@vue/component-compiler-utils/lib/compileStyle.ts`使用`postcss`中增加scoped处理插件
    2. 在插件中，重置节点选择器函数，使用`postcss-selector-parser`给选择器增加一个属性选择器


### style module
检测到`<style>`标签有`module`属性时，主要做两件事：构建样式对象、更新css选择器。
- 构建样式对象
    1. 在loader第一阶段中，在组件配置项增加`beforeCreate`hook，注册`$style`（或其他自定义模块名）实例属性
    2. 在loader第二阶段中，`vue-style-loader`将`css-loader`提供的`export.locals`插入到脚本中
- 更新css选择器
    1. 在loader第二阶段中，给`css-loader`传递了`modules`参数
    2. 在`css-loader`中`postcss`处理css时增加 modules 相关插件
        - `postcss-modules-values`
        - `postcss-modules-local-by-default`
        - `postcss-modules-extract-imports`
        - `postcss-modules-scope`


#### ast 节点属性说明
<<< @/webpack/ele.ts
