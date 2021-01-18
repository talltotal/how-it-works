# [cache-loader](https://github.com/webpack-contrib/cache-loader)
> 将其他loader处理后的文本和依赖关系，持久化储存；下次取时直接返回。

webpack 匹配执行 loader 顺序：
1. 从首向尾依次执行loader的`pitch`属性函数
2. 从尾向首依次执行loader的`default`函数

由此，在`pitch`中做拦截判断，取得缓存后直接返回：
1. 取得储存的文件
2. 判断`remainingRequest`一致
3. 判断loader处理的依赖文件未修改
4. 提供依赖，返回原处理结果

持久化其他loader的处理结果：
1. 获取依赖
2. 获取各依赖的文件修改时间
3. 储存
