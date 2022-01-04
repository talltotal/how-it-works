# [dumi](https://github.com/umijs/dumi)
> 依托`umi`，通过 ‘umi 插件’形式 实现文档功能。



## routes
> 确定文档文件，并构建路由结构
> `dumi/packages/preset-dumi/src/plugins/features/routes.ts`
> `@umijs/preset-dumi/src/routes/getRouteConfig.ts`

1. 递归获取文件夹中符合条件的文件
2. 根据文件夹结构对应构建路由结构


## `dumi-loader`
> `.md`文件的处理方式；
> `dumi/packages/preset-dumi/src/plugins/features/compile.ts`；
> 使用`dumi-loader`处理返回`.tsx`内容传递给`babel-loader`

1. `.md`文件处理
    > `@umijs/preset-dumi/src/transformer/index.ts`
    0. 根据文件修改时间，缓存处理结果
    1. 使用`remark`解析`.md`文件
    2. 使用个别自定义插件处理 md 内容
2. 由`theme`和`markdownResult`拼接`tsx`页面内容

