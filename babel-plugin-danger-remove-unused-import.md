# [babel-plugin-danger-remove-unused-import](https://github.com/imcuttle/babel-plugin-danger-remove-unused-import#readme)

> 删除文件中未使用的import（有些import除了export，还是有执行一些内容，所以删除存在风险）

- 定义数据储存对象`runtimeData`
    - 在`pre`定义，在`post`删除
- 在`ImportDeclaration`path以变量名为`key`存储path
- 在`JSXIdentifier`/`Identifier`path删除使用的变量path
- `runtimeData`中残留的即未使用的`import`，做删除操作
