# vue-router

- 作为`Vue`插件
    > 静态属性 `VueRouter.install: (Vue: Function) => void`
    > 用属性`VueRouter.install.installed: boolean`标识是否已经`install`，避免重复操作，另对比`app`，支持多个根节点共享路由实例
    1. 属性注入
        - 在实例上
            - 使用`Vue.mixin`在实例生命周期中做操作
            - 在`beforeCreate`hook中，将配置了`router`VueRouter实例的组件视为路由根节点，
            - 执行VueRouter实例的`init`函数
            - 以此为整个树上的节点增加`_routerRoot`属性，为 此组件
        - 在原型上
            - 增加*访问器属性*
                - `$router` 为 VueRouter实例
                - `$route` 为 当前匹配路由
                    > 在VueRouter实例中，监听`history`变化，更新`_routerRoot._route`
                    > 即做到每次获取`$route`都是当前路由
    2. 注册全局组件`<router-link>`、`<router-view>`
    3. 为自定义‘生命周期’，增加`Vue`配置处理项：`Vue.config.optionMergeStrategies`
        > 等于`created`
        - `beforeRouteEnter`
        - `beforeRouteLeave`
        - `beforeRouteUpdate`
- 作为路由原型
    > 根据配置的不同`mode`，用不同的`history`做历史管理
    > 根据配置的`routes`，做正则、别名、重定向等匹配、跳转操作


## VueRouter
- `app: VueComponent`
    > 路由根节点
    - 在`history`变化的时候，更新`app._route`
    - 组件销毁时，清空引用
- `apps: VueComponent[]`
    > 支持多个路由根节点
- `options: RouterOptions`
- `mode: 'hash'|'history'|'abstract'`
- `history: HashHistory | HTML5History | AbstractHistory`
    > 继承基类`History`
    - 跳转
        - 和当前路由相同，不操作
        - 对比目标路由和当前路由的匹配情况，确定激活的组件、更新的组件、替换的组件
        - 依次执行
            - 替换的组件生命周期`beforeRouteLeave`
                - 通过`Vue.extend(component).options['hookName']`拿到`Vue`处理过的组件函数
                - 用`bind`绑定`instance`上下文
            - `router.beforeHooks`
            - 更新的组件生命周期`beforeRouteUpdate`
            - 激活的组件的`RouteConfig.beforeEnter`
            - 加载匹配的组件中‘异步未加载’的
                > 兼容以下两种形式，即把`resolve`和`reject`传给函数，再传给`return`值的`then`
                > [webpack dynamic imports](https://webpack.js.org/guides/code-splitting/#dynamic-imports)
                - `resolve => resolve(Component)`
                    - `resolve => require(['./Foo.vue'], resolve)`
                - `() => Promise<Component>`
                    - `() => import('./Foo.vue')`
            - `replace` / `push` 处理history，并用匹配的组件在对应的位置更新页面
            - 激活的组件生命周期`beforeRouteEnter`
            - `router.resolveHooks`
        - 在`popstate`事件缓存上一个页面以时间戳为key的滚动数据，并取出当前页面的数据做滚动处理
            - 这里的缓存只在内存，所以页面一刷新，或做非单页的跳转就没了；前一个页面的滚动位置靠浏览器支持
            - 可自行实现在`sessionStorage`的缓存+缓存最大历史数
    - `HashHistory`
        > `mode==='hash'`
        - `window.history`
        - `window.addEventListener('popstate'|'hashchange')`
        - `window.history.replaceState` / `window.location.replace('xxx')`
        - `window.history.pushState` / `window.location.hash='xxx'`
    - `HTML5History`
        > `mode==='history'`
        - `window.history`
        - `window.addEventListener('popstate')`
        - `window.history.replaceState`
        - `window.history.pushState`
    - `AbstractHistory`
        > `mode==='abstract'`
        - 非浏览器环境必选模式
        - 实例内部维护`stack`历史栈，`index`做当前指针
- `matcher: Matcher`
    > 匹配器，路径匹配做‘跳转’（组件替换）、高亮
    - 解析配置
        - 递归解析节点树
        - `path`都处理为绝对路径
        - 按`path-to-regexp`做正则匹配规则
        - 按别名`alias`重复处理，即用`alias`解析后作为`path`再做一次存储
    - 闭包存储
        > 用于快速路径匹配，获取`RouteRecord`
        - `pathList`
            > 所有`path`
            > 以此数组做匹配的先后顺序（`*`值排在最后）
            > 匹配中没有指明`name`，有`path`的，循环`pathList`，取`pathMap`中的`RouteRecord`做正则匹配，获取`Route`
        - `pathMap`
            > 以`path`为key存储`RouteRecord`
        - `nameMap`
            > 以`name`为key存储`RouteRecord`
            > 匹配中指明`name`的，直接由`nameMap`获取`Route`
    - 匹配
        1. 根据相对路由，获取绝对路由
        2. 获取`RouteRecord`
        3. 指定重定向的，按重定向再做匹配操作
        4. 指定别名的，用别名匹配的结果做返回
- `beforeHooks`
- `resolveHooks`
- `afterHooks`


## router-link 组件
- 处理链接激活状态
    - class
        - 当前组件的配置值 > 总的配置值 > 默认值 
        - `activeClass` > `linkActiveClass` > `router-link-active`
        - `exactActiveClass` > `linkExactActiveClass` > `router-link-exact-active`
    - 匹配程度
        - 相等
        - 包含
- 链接跳转
    - 事件
        > 默认`click`
        > 考虑`Weex`环境没有`event.preventDefault`
    - 不使用路由跳转的情况
        - 组合了修改键
        - 取消了默认事件
        - 右键点击
        - `target="_blank"`
- `scopedSlot`支持
    > 提供数据，组件整个按默认插槽渲染返回
- `tag`非`a`支持
    - 插槽内有`<a>`，则将组件上的事件和属性都加到这个`<a>`上
    - 插槽内没有`<a>`，事件加到本组件上



## router-view 组件
> 匹配路由的占位组件
> 函数式组件（无需管理状态、不用生命周期、只接收些prop）
> 配置`functional`为`true`

```js
{
    functional: true,
    // Props 是可选的
    props: {
        // ...
    },
    // 为了弥补缺少的实例
    // 提供第二个参数作为上下文
    render: function (createElement, context) {
        // ...
    }
}
```

- 使用`context.parent.$createElement`做元素的创建，而不用`createElement`
    > 用父节点的上下文渲染组件
    > 可以实现在`<router-view>`内定义`<slot name="slotName">`
- `keep-active`的缓存组件存在父节点对象上
    - `parent._routerViewCache`
    - 判断组件的激活/未激活状态
- 做`<router-view>`中的匹配同步`$route.matched`对象
    - 计组件嵌套深度做`matched`的父子关系
        - `routerView: boolean`
        - `routerViewDepth: number`
            > 路由组件的判断依据：放置`$route.matched`的第`depth`项的配置`name`组件
            - 获取：循环判断`$parent`，累计`routerView`为`true`的组件数
            - 使用：对应`$route.matched`的下标
    - 在以下时机，`$route.matched[depth].instances`存放组件实例
        - 当`router-view`创建的时候
            - `Vue.mixin`
            - 在`beforeCreate`hook中赋值，`destroyed`hook中置空
        - 当`component`实例重复用于不同的`router-view`中时
- 支持通过`<router-view>`传递的属性值和插槽
    - 配置中的`props`
    - 组件上的`attrs`



## 知识点回顾
- 注册生命周期
- 函数式组件
- history栈


## 工程

### examples
- 做SPA的服务器配置 [`express-urlrewrite`](https://www.npmjs.com/package/express-urlrewrite)
- webpack配置 `resolve.alias['vue-router']` 为本工程相对路径
    - 作为 examples 更规范
    - 作为 dev 开发模式做调试
- 权限控制的`beforeEnter`可以直接放到配置的`routes`的某一层组件上
- Vue watch 配置值为 `String` 类型，会获取本实例的此属性

```js
/**
 * 多个根节点共享路由组件
 */
const router = new VueRouter({})
const routerVue = Vue.extend({router})
new routerVue({
    el: '.app1'
})
new routerVue({
    el: '.app2'
})

/**
 * 路由实例的嵌套
 */
const routerOut = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/nested-router',
            component: {
                router: new VueRouter({
                    mode: 'abstract',
                    routes: []
                }),
                template: '<div><router-view/></div>'
            }
        }
    ]
})
```

### test
- unit: jasmine
- e2e: nightwatch

### type
- 静态数据类型 [flow](https://flow.org/en/docs/getting-started/)
    - 执行 check `flow-bin`
    - 在 vue 文件中使用 `babel-preset-flow-vue`
    - 在 eslint 中支持 `eslint-plugin-flowtype`
- `types`目录

### lint
- eslint
- commit msg
    - 正则匹配`/^(v\d+\.\d+\.\d+(-(alpha|beta|rc.\d+))?$)|((revert: )?(feat|fix|docs|style|refactor|perf|test|workflow|ci|chore|types|build)(\(.+\))?: .{1,50})/`
    - 另推荐工具：[CommitLint](https://github.com/conventional-changelog/commitlint)
- gitHooks + lint-staged

### build
- rollup
- terser.minify
- zlib.gzip

### 其他
- docs: vuepress + [netlify](https://www.netlify.com)
- changelog: [conventional-changelog](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-cli#readme)
- ci + docker
- 支持 esm / jsdelivr


