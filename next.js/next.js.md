# [next.js](https://github.com/vercel/next.js)


## build@10.0.2

1. 初始
    1. 使用`@next/env`根据运行模式，加载全局环境配置文件，使用`dotenv`解析
        - `.env.${mode}.local`
        - `.env.local`
        - `.env.${mode}`
        - `.env`
    2. 加载`next.config.js`配置
        - 支持`function`配置，`(phase, {defaultConfig}) => config`
        - 指定`target`必须是`['server', 'serverless', 'experimental-serverless-trace']`中的一项
        - 验证配置项数据类型、有效值、使用默认配置补全
        - 没有找到`next.config.js`，但找到不同后缀名的文件，提示格式不支持
    3. 确定`buildId`
    4. 加载自定义路由`headers, rewrites, redirects`（只影响服务端）
    5. 开启`Spinner`提示当前任务（后面不再列出）
    6. 开启`Telemetry`数据收集（后面不再列出） · **配置`NEXT_TELEMETRY_DISABLED = true`不运行**
        - 基本信息
        - `package.json`中的dep以及version
    7. 验证`TypeScript`安装
        - 根据“`tsconfig.json`文件的存在”、“pages目录下有ts/tsx文件”确认项目使用了`TypeScript`
        - 确认`typescript`/`@types/react`/`@types/node`安装
        - 补全`tsconfig.json`内的配置
        - 创建`next-env.d.ts`文件
        - 运行type验证 · **配置`typescript.ignoreBuildErrors=true`不运行**
2. 编译
    1. 收集所有page路径`pagePaths` · **删除不用的页面，非页面脚本移到其他目录下**
    2. 构建`pageKey`到`pagePath`的映射对象`mappedPages`
    3. 根据`mappedPages`构建用于webpack配置`entry`，分为`client`和`server`
        - `client`如：`pages/user: next-client-pages-loader?page=xxx&absolutePagePath=xxx`
        - `server`如：`pages/user: [absolutePagePath_xxx]`
    4. 页面路径确认
        - 确认没有和`public`下有冲突
        - `_app|_document|_error`只在`pages`根目录下有
    5. 输出`routes-manifest.json`
        - 由一些基本信息和`headers, rewrites, redirects`构成
    6. 构建`webpack`编译配置
        - client
        - 
    7. 运行`webpack`编译（此时编译结果已在`.next`目录下）
    8. 输出`webpack`编译`errors`和`warnings`
3. 收集页面数据
    - 输出‘manifest’文件
    - 打印页面树结构

