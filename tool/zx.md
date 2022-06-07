# [zx](https://github.com/google/zx#readme)
> 使用`$`符号包装node的`child_process`模块
> 使用形式支持指令、模块载入

- 指令：（node）在当前进程中，将能力注册到全局对象`global`上，再加载要执行的文件
- 模块载入：模块内将能力注册到全局对象`global`上
- `$`支持“带标签的模板字符串”形式，使用`child_process.spawn`实现指令的执行

