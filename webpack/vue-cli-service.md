# [vue-cli-service](https://cli.vuejs.org/)
> 基于 webpack 的 vue 项目编译打包最佳实践工具

## 最佳实践
- 工程：
    - githooks-[yorkie](https://github.com/yyx990803/yorkie)用于一些git流程管理
- 编译：
    - 缓存/多线程
- 浏览器兼容
    - [browserslist](https://github.com/browserslist/browserslist)
    - css: autoprefixer、postcss
    - es: babel
    - modern
- 开发兼容
    - `postcss` `less` `sass` `stylus`
- 模块化
    - `css modules` 
- 自动注入 resource hint (preload/prefetch、manifest 和图标链接 (当用到 PWA 插件时) 以及构建过程中处理的 JavaScript 和 CSS 文件的资源链接（消耗带宽，根据具体情况调整）
- 更便捷的多页面配置`pages`


## 结构
1. `@vue/cli-service/bin/vue-cli-service.js` 接收终端指令
2. `@vue/cli-service/lib/Service.js` ‘终端指令’到‘用户配置’到‘插件’的处理层
    - 结合配置文件、终端指令参数，做脚本的不同环境和模式
    - 插件做对应指令的注册、配置的处理
    - 插件的来源
        - `@vue/cli-service`中默认的`command`和`config`
        - 工程`package.json`中
            - `devDependencies`和`dependencies`中匹配`/^(@vue\/|vue-|@[\w-]+(\.)?[\w-]+\/vue-)cli-plugin-/`的
            - 配置的`vuePlugins.service`
3. `@vue/cli-service/lib/PluginAPI.js` 做 server 和 plugin 的中间层，做一定的隔离效果


## webpack-config
```js
{
    // 编译模式，webpack提供了预配置
    mode: 'development',
    // 工程上下文
    context: process.cwd(),
    // 入口文件
    entry: {
        app: './src/main.js',
    },
    // c出口
    output: {
        path: 'dist',
        filename: '[name].js',
        publicPath: '/',
    },
    // 模块加载路径处理
    resolve: {
        plugin: [
            ...require('pnp-webpack-plugin')
        ],
        extensions: ['.mjs', '.js', '.jsx', '.vue', '.json', '.wasm'],
        modules: [
            'node_modules'
        ],
        alias: [
            '@': 'src',
            'vue$': 'vue/dist/vue.esm.js'
        ]
    },
    resolveLoader: {
        plugin: [
            ...require('pnp-webpack-plugin').topLevelLoader
        ],
        modules: [
            'node_modules'
        ]
    },
    module: {
        noParse: /^(vue|vue-router|vuex|vuex-router-sync)$/,
        rule: {
            'vue': {
                test: /\.vue$/,
                use: ['cache-loader', 'vue-loader'],
            },
            'images': {
                test: /\.(png|jpe?g|gif|webp)(\?.*)?$/,
                use: ['url-loader'],
            },
            'svg': {
                test: /\.(svg)(\?.*)?$/,
                use: ['file-loader'],
            },
            'media': {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                use: ['url-loader'],
            },
            'fonts': {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
                use: ['url-loader'],
            },
            'pug': {
                test: /\.pug$/,
                oneOf: {
                    'pug-vue': {
                        resourceQuery: /vue/,
                        use: ['pug-plain-loader'],
                    },
                    'pug-template': {
                        use: ['raw-loader', 'pug-plain-loader']
                    }
                }
            },
            // 由`package.json`中`devDependencies`或`dependencies`配置`@vue/cli-plugin-babel`
            'js': {
                test: /\.m?jsx?$/,
                use: ['cache-loader', 'thread-loader', 'babel-loader']
            }
        }
    },
    optimization: {
        minimizer: 'terser-webpack-plugin',
        splitChunks: {
            cacheGroups: {
                vendors: {
                    name: `chunk-vendors`,
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                    chunks: 'initial'
                },
                common: {
                    name: `chunk-common`,
                    minChunks: 2,
                    priority: -20,
                    chunks: 'initial',
                    reuseExistingChunk: true
                }
            }
        }
    },
    // 源码映射
    devtool: 'cheap-module-eval-source-map',
    plugin: [
        'vue-loader',
        // 模块热替换
        'webpack/lib/HotModuleReplacementPlugin',
        // 编译进度
        'webpack/lib/ProgressPlugin',
        require('webpack').DefinePlugin,
        'case-sensitive-paths-webpack-plugin',
        '@soda/friendly-errors-webpack-plugin',
        'html-webpack-plugin',
        ['@vue/preload-webpack-plugin', [{
            rel: 'preload',
            include: 'initial',
            fileBlacklist: [/\.map$/, /hot-update\.js$/]
        }]],
        ['@vue/preload-webpack-plugin', [{
            rel: 'prefetch',
            include: 'asyncChunks'
        }]],
        ['copy-webpack-plugin']
    ],
    devServer: {
        // 是否使用 https 协议
        https: false,
        // 域名
        host: '0.0.0.0',
        // 端口
        port: 8080,
        // 代理
        proxy: null,
        // 日志等级
        logLevel: 'silent',
        clientLogLevel: 'silent',
        // 使用html5 history接口，用index.html响应404请求
        historyApiFallback: {
            // 请求中有.符号时，不使用index.html
            disableDotRule: true,
            // 用于响应的index.html文件，这里支持匹配多页面模式对应的多html情况
            rewrites: []
        },
        // 静态资源基本上下文
        contentBase: 'public',
        // 观察静态资源文件的变化
        watchContentBase: true,
        // 启用热更新
        hot: true,
        // 不启用gzip压缩
        compress: false,
        // 获取静态资源的请求路径
        publicPath: '/',
        // 异常时，在整个页面上展示
        overlay: { warnings: false, errors: true },
        // 不启动自动在浏览器上打开
        open: false,
    }
}
```


## babel-config
```js
// 在文件 `babel.config.json` 或 `.babelrc.json` 配置 `presets: ['@vue/cli-plugin-babel/preset']`
// 即 `@vue/babel-preset-app/index.js`
// 通过 `process.env` 环境变量跨工程‘通信’

const envOptions = {
    bugfixes: true,
    corejs: require('core-js/package.json').version,
    loose: false,
    debug: false,
    modules: false,
    // 目标浏览器，默认取`.browserslistrc`文件/`package.json`的`browserslist`配置项
    targets: [
        "> 1%",
        "last 2 versions",
        "not dead"
    ],
    useBuiltIns: true,
    exclude: [
        // promise polyfill alone doesn't work in IE,
        // needs this as well. see: #1642
        require('core-js-compat').data['es.array.iterator'],
        // this is required for webpack code splitting, vuex etc.
        require('core-js-compat').data['es.promise'],
        // this is needed for object rest spread support in templates
        // as vue-template-es2015-compiler 1.8+ compiles it to Object.assign() calls.
        require('core-js-compat').data['es.object.assign'],
        // #2012 es.promise replaces native Promise in FF and causes missing finally
        require('core-js-compat').data['es.promise.finally']
    ],
}

{
    // 源码类型：如果存在import/export语句，则将文件视为“模块” ，否则将其视为“脚本”
    sourceType: 'unambiguous',
    // 合并当前配置，主要是为了把`@babel/runtime`拎出来处理
    overrides: [
        {
            exclude: [/@babel[\/|\\\\]runtime/, /core-js/],
            presets: [
                [require('@babel/preset-env'), envOptions]
            ],
            plugins: [
                // 小于等于 stage-3 的插件
                // 异步import
                require('@babel/plugin-syntax-dynamic-import'),
                [require('@babel/plugin-proposal-decorators'), {
                decoratorsBeforeExport,
                legacy: decoratorsLegacy !== false
                }],
                [require('@babel/plugin-proposal-class-properties'), { loose }],
                [require('@babel/plugin-transform-runtime'), {
                    regenerator: useBuiltIns !== 'usage',

                    // polyfills are injected by preset-env & polyfillsPlugin, so no need to add them again
                    corejs: false,

                    helpers: useBuiltIns === 'usage',
                    useESModules: !process.env.VUE_CLI_BABEL_TRANSPILE_MODULES,

                    absoluteRuntime,

                    version
                }],
            ]
        },
        {
            // there are some untranspiled code in @babel/runtime
            // https://github.com/babel/babel/issues/9903
            include: [/@babel[\/|\\\\]runtime/],
            presets: [
                [require('@babel/preset-env'), envOptions]
            ]
        }
    ]
}
```


## MODERN
> 现代模式
> 按两个线程进行编译（`@vue/cli-service/lib/commands/build/index.js`---Ln55）

差异：
- 使用 ESM 模块模式
- babel 去掉不需要的语法兼容处理

实现：
- 用环境变量`VUE_CLI_MODERN_MODE``VUE_CLI_MODERN_BUILD`做标识，区分线程类型
- 先以非 modern 模式
    - `outputFilename`加后缀`-legacy`
    - 不做 html 的 preload 插入，不做静态文件的 copy；这些在后面 modern 模式中做一次就够了
    - 在 htmlWebpackPluginAlterAssetTags 保存要插入的内容
- 后以 modern 模式
    - 注意`clean:false`，即保留上面的编译结果；相应的，相同文件将被覆盖
    - 对`babel`配置`useESModules:true`，不使用`@babel/plugin-transform-modules-commonjs`
    - 对`babel`配置`ignoreBrowserslistConfig:true`，不使用默认的browserslist
    - 在 htmlWebpackPluginAlterAssetTags
        - 给script加type:module属性
        - 取出上面保存的script加nomodule属性，并加到当前的html中，删除临时文件


