# createFromIconfontCN
> `@ant-design/icons/es/components/IconFont.js`
对于使用 iconfont.cn 的用户，通过设置 createFromIconfontCN 方法参数对象中的 scriptUrl 字段， 即可轻松地使用已有项目中的图标。

- 使用 [iconfont.cn](http://iconfont.cn/) 提供的 Symbol 地址
- 依次以`<script>`插入`<body>`，加载脚本，脚本中将图像的`<svg>`插入`<body>`；这里用`customCache:Set<string>`做缓存避免重复加载
    - 以字符串形式定义svg内容
    - 根据`<script>`属性`data-injectcss`判断是否插入默认iconfont样式
    - 判断文档加载完毕后执行svg dom的插入
        - `document.readyState` 已经是`"complete", "loaded", "interactive"`
        - 监听`DOMContentLoaded`事件 / 监听`onreadystatechange`事件`document.readyState`变为`complete`
    - svg dom的插入
        - 借助div为svg字符串构建dom `document.createElement("div")).innerHTML = svgText`
        - 清除svg字符串变量内存 `svgText = null`
        - 设置svg隐藏 `aria-hidden="true" style="position:absolute; width:0; height:0; overflow:hidden;"`
        - 在body中插入svg
- 定义组件返回



基本形式：
```html
<!-- 插入icon定义 -->
<svg aria-hidden="true" style="position:absolute; width:0; height:0; overflow:hidden;">
    <symbol id="icon_1"><path /></symbol>
    <symbol id="icon_2"><path /></symbol>
    <symbol id="icon_3"><path /></symbol>
</svg>

<!-- icon使用 -->
<svg>
    <use xlink:href="#icon_1"/>
</svg>
```


