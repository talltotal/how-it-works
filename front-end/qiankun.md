# [qiankun](https://qiankun.umijs.org)
> 微前端解决方案

主要依赖包
- [SPA微前端基础框架·single-spa](https://github.com/single-spa/single-spa) 
- [子应用HTML解析及脚本运行·import-html-entry](https://github.com/kuitos/import-html-entry)


整体逻辑：
- 主应用和子应用都是独自运行的站点
- 主应用根据当前路径和配置内容，匹配对应子应用
- 请求子应用的html文件，解析得到子应用资源
    > 所以一般要求子应用是SPA
- 使用`eval`执行子应用的脚本；识别其中带有`entry`属性的脚本或最后一个脚本，取其`exports`，按需触发脚本披露的‘生命周期钩子’
    > 子应用必须提供`mount`和`unmount`，用来挂载和卸载dom
- 子应用切换时装载/卸载`<style>`；控制样式的相互污染


### 沙箱sandbox
- 全局对象
    - 使用 `Proxy` 代理 `window`
        - `ProxySandbox` 
        - `LegacySandbox`
    - 遍历 `window` 的直接属性，独立储存应用内挂载在上面的属性（在应用运行前注入应用修改的，应用运行后换回应用修改前的）
        - `SnapshotSandbox`
- 包装子应用脚本
    - 通过‘闭包’和`with`，使子应用脚本执行的全局对象指向代理对象
