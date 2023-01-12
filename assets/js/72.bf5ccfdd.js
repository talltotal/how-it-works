(window.webpackJsonp=window.webpackJsonp||[]).push([[72],{337:function(e,o,t){"use strict";t.r(o);var a=t(14),s=Object(a.a)({},(function(){var e=this,o=e._self._c;return o("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[o("h1",{attrs:{id:"webpack"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#webpack"}},[e._v("#")]),e._v(" webpack")]),e._v(" "),o("h2",{attrs:{id:"_4-x"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#_4-x"}},[e._v("#")]),e._v(" @4.x")]),e._v(" "),o("p",[e._v("从入口文件开始，构建module，匹配文件类型的loader链，运行loader进行处理，得到module的依赖文件。\n再对依赖文件进行module构建，由此递归形成module的依赖网。\n根据入口和其他成组需要，组织chunk与module映射关系，并分组chunkGroup。最后根据chunk做静态文件的输出。")]),e._v(" "),o("h3",{attrs:{id:"设计"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#设计"}},[e._v("#")]),e._v(" 设计")]),e._v(" "),o("ol",[o("li",[o("strong",[e._v("插件模式")]),e._v("（"),o("a",{attrs:{href:"https://github.com/webpack/tapable",target:"_blank",rel:"noopener noreferrer"}},[e._v("tapable"),o("OutboundLink")],1),e._v("）\n"),o("ul",[o("li",[e._v("对做复杂工作的类定义工作的流程和步骤，将task前后甚至某些task本身命名为一个hook；创建类或触发类方法时流程开始")]),e._v(" "),o("li",[e._v("此模式贯彻webpack，应用于几乎所有流程中：Compiler、Compilation、Template、 ModuleFactory、Parser...")])])]),e._v(" "),o("li",[o("strong",[e._v("语法树")]),e._v("（js 解析器: "),o("a",{attrs:{href:"https://www.npmjs.com/package/acorn",target:"_blank",rel:"noopener noreferrer"}},[e._v("acorn"),o("OutboundLink")],1),e._v(" / "),o("a",{attrs:{href:"https://www.npmjs.com/package/acorn-dynamic-import",target:"_blank",rel:"noopener noreferrer"}},[e._v("acorn-dynamic-import"),o("OutboundLink")],1),e._v("）\n"),o("ul",[o("li",[e._v("解析文本，得到依赖项；为整个依赖网的构建提供基本依据")])])])]),e._v(" "),o("div",{staticClass:"language- extra-class"},[o("pre",{pre:!0,attrs:{class:"language-text"}},[o("code",[e._v("    template\n        - main\n        - chunk\n\n    - 一个文件视为 `dependency`\n    - `dependency` ----`ModuleFactory`--\x3e> `module`\n    - `module` 的 `dependency` ->> `module` ==》 `module graph`\n    - \n    - 用 `loader` 预处理 `module`\n    - 模块之间的依赖关系 `dependency`\n")])])]),o("h3",{attrs:{id:"流程"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#流程"}},[e._v("#")]),e._v(" 流程")]),e._v(" "),o("h4",{attrs:{id:"编译准备"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#编译准备"}},[e._v("#")]),e._v(" 编译准备")]),e._v(" "),o("ul",[o("li",[e._v("入参校验\n"),o("ul",[o("li",[e._v("定义所有可配项的校验规则（"),o("a",{attrs:{href:"https://www.npmjs.com/package/ajv",target:"_blank",rel:"noopener noreferrer"}},[e._v("ajv"),o("OutboundLink")],1),e._v("）")]),e._v(" "),o("li",[e._v("校验有错误时，直接抛出错误（"),o("a",{attrs:{href:"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error#Custom_Error_Types",target:"_blank",rel:"noopener noreferrer"}},[e._v("Custom Error Types"),o("OutboundLink")],1),e._v("）")])])]),e._v(" "),o("li",[e._v("多编译支持")]),e._v(" "),o("li",[e._v("配置补全\n"),o("ul",[o("li",[e._v("定义配置项的默认值/值处理函数（包括深拷贝、兼容处理、附加项等）")]),e._v(" "),o("li",[e._v("基于默认配置合并/包装入参配置")])])]),e._v(" "),o("li",[e._v("node环境·"),o("code",[e._v("lib/node/NodeEnvironmentPlugin.js")])]),e._v(" "),o("li",[e._v("【call·hook】\n"),o("ul",[o("li",[o("code",[e._v("compiler.hooks.environment")])]),e._v(" "),o("li",[o("code",[e._v("compiler.hooks.afterEnvironment")])])])]),e._v(" "),o("li",[e._v("配置应用·"),o("code",[e._v("lib/WebpackOptionsApply.js")]),e._v(" "),o("ul",[o("li",[e._v("交付件的运行环境："),o("code",[e._v("target")]),e._v(" "),o("ul",[o("li",[e._v("this-compilation -> MainTemplatePlugin / ChunkTemplatePlugin / HotUpdateChunkTemplatePlugin")]),e._v(" "),o("li",[e._v("compilation -> ModuleTemplatePlugin / params.normalModuleFactory / compilation.normal-module-loader")]),e._v(" "),o("li",[e._v("after-resolvers -> compiler.resolvers.normal")])])]),e._v(" "),o("li",[e._v("以库形式输出的打包处理："),o("code",[e._v("library")]),e._v(" "),o("ul",[o("li",[e._v("this-compilation -> MainTemplatePlugin")])])]),e._v(" "),o("li",[e._v("外部依赖："),o("code",[e._v("externals")]),e._v(" "),o("ul",[o("li",[e._v("compile -> params.normalModuleFactory")])])]),e._v(" "),o("li",[e._v("开发者工具："),o("code",[e._v("devtool")]),e._v(" "),o("ul",[o("li",[e._v("compilation -> ModuleTemplatePlugin")])])]),e._v(" "),o("li",[o("code",[e._v("module")])]),e._v(" "),o("li",[e._v("entry\n"),o("ul",[o("li",[e._v("解析 "),o("code",[e._v("entry")]),e._v(" 做到支持 "),o("code",[e._v("String, Array, Function")]),e._v("，增加 "),o("code",[e._v("make")]),e._v(" 插件使增加入口")])])]),e._v(" "),o("li",[o("strong",[e._v("hook")]),e._v(": "),o("code",[e._v("entry-option")])]),e._v(" "),o("li",[o("code",[e._v("compilation")]),e._v(" 插件")]),e._v(" "),o("li",[e._v("...")])])]),e._v(" "),o("li",[e._v("【call·hook】\n"),o("ul",[o("li",[o("code",[e._v("compiler.hooks.afterPlugins")])]),e._v(" "),o("li",[o("code",[e._v("compiler.resolverFactory.hooks.resolveOptions")])]),e._v(" "),o("li",[o("code",[e._v("compiler.hooks.afterResolvers")])])])])]),e._v(" "),o("h4",{attrs:{id:"run"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#run"}},[e._v("#")]),e._v(" run")]),e._v(" "),o("ul",[o("li",[o("code",[e._v("compiler.hooks.beforeRun")])]),e._v(" "),o("li",[o("code",[e._v("compiler.hooks.run")])]),e._v(" "),o("li",[e._v("compile")]),e._v(" "),o("li",[e._v("emit")]),e._v(" "),o("li",[o("code",[e._v("compilation.hooks.needAdditionalPass")])]),e._v(" "),o("li",[o("code",[e._v("compiler.hooks.done")])]),e._v(" "),o("li",[o("code",[e._v("compiler.hooks.additionalPass")])]),e._v(" "),o("li",[o("code",[e._v("compiler.hooks.failed")])])]),e._v(" "),o("h4",{attrs:{id:"watch-watchpack"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#watch-watchpack"}},[e._v("#")]),e._v(" watch("),o("RouterLink",{attrs:{to:"/webpack/watchpack.html"}},[e._v("watchpack")]),e._v(")")],1),e._v(" "),o("blockquote",[o("p",[e._v("根据文件变化时间戳判断是否更新")])]),e._v(" "),o("ul",[o("li",[o("code",[e._v("compiler.hooks.watchRun")])]),e._v(" "),o("li",[e._v("compile")]),e._v(" "),o("li",[e._v("emit")]),e._v(" "),o("li",[o("code",[e._v("compiler.hooks.watchClose")])])]),e._v(" "),o("h4",{attrs:{id:"compile"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#compile"}},[e._v("#")]),e._v(" compile")]),e._v(" "),o("h5",{attrs:{id:"准备"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#准备"}},[e._v("#")]),e._v(" 准备")]),e._v(" "),o("ul",[o("li",[e._v("【call·hook】\n"),o("ul",[o("li",[o("code",[e._v("compiler.hooks.beforeCompile")])]),e._v(" "),o("li",[o("code",[e._v("compiler.hooks.compile")])]),e._v(" "),o("li",[o("code",[e._v("compiler.hooks.thisCompilation")])]),e._v(" "),o("li",[o("code",[e._v("compiler.hooks.compilation")])])])])]),e._v(" "),o("h5",{attrs:{id:"进行-构建依赖网"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#进行-构建依赖网"}},[e._v("#")]),e._v(" 进行（构建依赖网）")]),e._v(" "),o("ul",[o("li",[o("code",[e._v("compiler.hooks.make")]),e._v(" "),o("ol",[o("li",[e._v("从入口文件开始；即构建 dependencie 实例，调用"),o("code",[e._v("compilation.prefetch")]),e._v(" / "),o("code",[e._v("compilation.addEntry")]),e._v(" "),o("blockquote",[o("p",[e._v("SingleEntryPlugin\nMultiEntryPlugin\nDllEntryPlugin\nDynamicEntryPlugin\nPrefetchPlugin\nAutomaticPrefetchPlugin")])]),e._v(" "),o("ul",[o("li",[o("code",[e._v("compilation.hooks.addEntry")])]),e._v(" "),o("li",[o("code",[e._v("compilation.hooks.failedEntry")])]),e._v(" "),o("li",[o("code",[e._v("compilation.hooks.succeedEntry")])])])]),e._v(" "),o("li",[e._v("创建模块：由入口 dependencie 的 moduleFactory 实例 "),o("code",[e._v("module")]),e._v("（这里以"),o("code",[e._v("normalModuleFactory")]),e._v("作说明）\n"),o("blockquote",[o("p",[e._v("自定义模块类需绑定工厂："),o("code",[e._v("compilation.dependencyFactories.set(userDependency, userFactory)")]),e._v("\n自定义的 dependencie 需继承"),o("code",[e._v("webpack/lib/Dependency.js")]),e._v("\n自定义的 factory 需有"),o("code",[e._v("create(data: ModuleFactoryCreateData, callback: ModuleCallback)")]),e._v("函数\n"),o("code",[e._v("lib/NormalModule.js")]),e._v(" / "),o("code",[e._v("lib/NormalModuleFactory.js")])])]),e._v(" "),o("ul",[o("li",[o("strong",[e._v("normalModuleFactory.hook")]),e._v(": "),o("code",[e._v("before-resolve")])]),e._v(" "),o("li",[o("strong",[e._v("normalModuleFactory.hook")]),e._v(": "),o("code",[e._v("factory")])]),e._v(" "),o("li",[o("strong",[e._v("normalModuleFactory.hook")]),e._v(": "),o("code",[e._v("resolver(): resolver")]),e._v(" "),o("ul",[o("li",[o("code",[e._v("require")]),e._v(" 字符串正则解析，得到内敛 "),o("code",[e._v("loader")]),e._v(" "),o("blockquote",[o("p",[e._v("格式："),o("code",[e._v("loader!loader!loader!file")]),e._v("\n前部可以设置此文件是否使用外部的前/中/后处理")]),e._v(" "),o("ol",[o("li",[e._v("'-!xxxx' 只使用外部后处理")]),e._v(" "),o("li",[e._v("'!xxxx' 不使用外部中处理")]),e._v(" "),o("li",[e._v("'!!xxxx' 不使用任何外部loader")])])])]),e._v(" "),o("li",[e._v("内敛结合外部配置得到所有 "),o("code",[e._v("loader")]),e._v(" "),o("blockquote",[o("p",[o("code",[e._v("loader")]),e._v(" 根据 "),o("code",[e._v("enforce")]),e._v(" 指定使用的时机并以此排序\n顺序：外部后 - 内敛 - 外部中 - 外部前\n后续会从左往右调用 "),o("code",[e._v("loader")]),e._v(" 的 "),o("code",[e._v("pitch")]),e._v(" 方法（有返回值时不再执行后面的 "),o("code",[e._v("loader")]),e._v("），再从右往左调用 "),o("code",[e._v("loader")]),e._v(" 方法")])])]),e._v(" "),o("li",[e._v("根据 "),o("code",[e._v("resolve")]),e._v(" 验证模块和loader有效")]),e._v(" "),o("li",[e._v("构建解析器")]),e._v(" "),o("li",[o("strong",[e._v("normalModuleFactory.hook")]),e._v(": "),o("code",[e._v("parser")])])])]),e._v(" "),o("li",[o("strong",[e._v("normalModuleFactory.hook")]),e._v(": "),o("code",[e._v("after-resolve")])]),e._v(" "),o("li",[o("strong",[e._v("normalModuleFactory.hook")]),e._v(": "),o("code",[e._v("create-module()")])]),e._v(" "),o("li",[e._v("构建 "),o("code",[e._v("module")]),e._v(" 实例")]),e._v(" "),o("li",[o("strong",[e._v("normalModuleFactory.hook")]),e._v(": "),o("code",[e._v("module(): module")])]),e._v(" "),o("li",[e._v("在 "),o("code",[e._v("dependencie")]),e._v(" 绑定 "),o("code",[e._v("module")]),e._v(" 做缓存 ············ "),o("code",[e._v("__NormalModuleFactoryCache")])])])]),e._v(" "),o("li",[e._v("构建模块\n"),o("ul",[o("li",[o("strong",[e._v("compilation.hook")]),e._v(": "),o("code",[e._v("build-module(modules): void")])]),e._v(" "),o("li",[e._v("构建\n"),o("ul",[o("li",[e._v("代码文本传给"),o("code",[e._v("loader")]),e._v("处理\n"),o("blockquote",[o("p",[o("code",[e._v("loader")]),e._v(" 内部解析文件处理完后转成"),o("strong",[e._v("js格式文本")]),e._v("返回或直接调用"),o("code",[e._v("loaderContext.callback")])])])]),e._v(" "),o("li",[e._v("解析器解析处理后的代码\n"),o("ul",[o("li",[o("strong",[e._v("parser.hook")]),e._v(": "),o("code",[e._v("program(ast, comments): any")]),e._v(" "),o("blockquote",[o("p",[e._v("得到 "),o("code",[e._v("dependencies")])])])]),e._v(" "),o("li",[e._v("得到初始 "),o("code",[e._v("hash")])])])])])]),e._v(" "),o("li",[e._v("收集构建过程的 "),o("code",[e._v("warn/error")])]),e._v(" "),o("li",[e._v("根据loc对依赖排序，确保后续按依赖顺序构建依赖")]),e._v(" "),o("li",[o("strong",[e._v("compilation.hook")]),e._v(": "),o("code",[e._v("failed-module(modules): void")])]),e._v(" "),o("li",[o("strong",[e._v("compilation.hook")]),e._v(": "),o("code",[e._v("succeed-module(modules): void")])])])]),e._v(" "),o("li",[e._v("构建依赖：由3得到的模块的依赖列表即新的模块，从3开始递归创建/构建，得到最后的模块依赖网")])]),e._v(" "),o("ul",[o("li",[e._v("开始入口的 "),o("code",[e._v("module")]),e._v(" 作为 "),o("code",[e._v("preparedChunk")])])])])]),e._v(" "),o("h5",{attrs:{id:"整理"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#整理"}},[e._v("#")]),e._v(" 整理")]),e._v(" "),o("ul",[o("li",[e._v("整理编译的错误和警告")]),e._v(" "),o("li",[o("code",[e._v("compilation.hooks.finishModules")])]),e._v(" "),o("li",[o("code",[e._v("compilation.hooks.seal")])]),e._v(" "),o("li",[o("code",[e._v("compilation.hooks.optimizeDependenciesBasic")])]),e._v(" "),o("li",[o("code",[e._v("compilation.hooks.optimizeDependencies")])]),e._v(" "),o("li",[o("code",[e._v("compilation.hooks.optimizeDependenciesAdvanced")])]),e._v(" "),o("li",[o("code",[e._v("compilation.hooks.afterOptimizeDependencies")])]),e._v(" "),o("li",[o("code",[e._v("compilation.hooks.beforeChunks")])]),e._v(" "),o("li",[o("code",[e._v("compilation.hooks.afterChunks")])]),e._v(" "),o("li",[o("code",[e._v("compilation.hooks.optimize")])]),e._v(" "),o("li",[o("code",[e._v("compilation.hooks.optimizeModulesBasic")])]),e._v(" "),o("li",[o("code",[e._v("compilation.hooks.optimizeModules")])]),e._v(" "),o("li",[o("code",[e._v("compilation.hooks.optimizeModulesAdvanced")])]),e._v(" "),o("li",[o("code",[e._v("compilation.hooks.afterOptimizeModules")])]),e._v(" "),o("li",[o("code",[e._v("compilation.hooks.optimizeChunksBasic")])]),e._v(" "),o("li",[o("code",[e._v("compilation.hooks.optimizeChunks")])]),e._v(" "),o("li",[o("code",[e._v("compilation.hooks.optimizeChunksAdvanced")])]),e._v(" "),o("li",[o("code",[e._v("compilation.hooks.afterOptimizeChunks")])]),e._v(" "),o("li",[o("code",[e._v("compilation.hooks.optimizeTree")])]),e._v(" "),o("li",[o("code",[e._v("compilation.hooks.afterOptimizeTree")])]),e._v(" "),o("li",[o("code",[e._v("compilation.hooks.optimizeChunkModulesBasic")])]),e._v(" "),o("li",[o("code",[e._v("compilation.hooks.optimizeChunkModules")]),e._v(" "),o("ul",[o("li",[o("code",[e._v("terser-webpack-plugin")]),e._v(" 做 Tree-Shaking")])])]),e._v(" "),o("li",[o("code",[e._v("compilation.hooks.optimizeChunkModulesAdvanced")])]),e._v(" "),o("li",[o("code",[e._v("compilation.hooks.afterOptimizeChunkModules")])]),e._v(" "),o("li",[o("code",[e._v("compilation.hooks.shouldRecord")])]),e._v(" "),o("li",[o("code",[e._v("compilation.hooks.reviveModules")])]),e._v(" "),o("li",[o("code",[e._v("compilation.hooks.optimizeModuleOrder")])]),e._v(" "),o("li",[o("code",[e._v("compilation.hooks.advancedOptimizeModuleOrder")])]),e._v(" "),o("li",[o("code",[e._v("compilation.hooks.beforeModuleIds")])]),e._v(" "),o("li",[o("code",[e._v("compilation.hooks.moduleIds")])]),e._v(" "),o("li",[o("code",[e._v("compilation.hooks.optimizeModuleIds")])]),e._v(" "),o("li",[o("code",[e._v("compilation.hooks.afterOptimizeModuleIds")])]),e._v(" "),o("li",[o("code",[e._v("compilation.hooks.reviveChunks")])]),e._v(" "),o("li",[o("code",[e._v("compilation.hooks.optimizeChunkOrder")])]),e._v(" "),o("li",[o("code",[e._v("compilation.hooks.beforeChunkIds")])]),e._v(" "),o("li",[o("code",[e._v("compilation.hooks.optimizeChunkIds")])]),e._v(" "),o("li",[o("code",[e._v("compilation.hooks.afterOptimizeChunkIds")])]),e._v(" "),o("li",[o("code",[e._v("compilation.hooks.recordModules")])]),e._v(" "),o("li",[o("code",[e._v("compilation.hooks.recordChunks")])]),e._v(" "),o("li",[e._v("hash\n"),o("blockquote",[o("p",[o("code",[e._v("crypto")])])]),e._v(" "),o("ul",[o("li",[o("code",[e._v("compilation.hooks.beforeHash")])]),e._v(" "),o("li",[o("code",[e._v("compilation.hooks.afterHash")])]),e._v(" "),o("li",[o("code",[e._v("compilation.hooks.recordHash")])])])]),e._v(" "),o("li",[e._v("静态化\n"),o("ul",[o("li",[o("code",[e._v("compilation.hooks.beforeModuleAssets")])]),e._v(" "),o("li",[o("code",[e._v("compilation.hooks.shouldGenerateChunkAssets")])]),e._v(" "),o("li",[o("code",[e._v("compilation.hooks.beforeChunkAssets")])]),e._v(" "),o("li",[o("code",[e._v("compilation.hooks.additionalChunkAssets")])]),e._v(" "),o("li",[o("code",[e._v("compilation.hooks.record")])]),e._v(" "),o("li",[o("code",[e._v("compilation.hooks.additionalAssets")])]),e._v(" "),o("li",[o("code",[e._v("compilation.hooks.optimizeChunkAssets")])]),e._v(" "),o("li",[o("code",[e._v("compilation.hooks.afterOptimizeChunkAssets")])]),e._v(" "),o("li",[o("code",[e._v("compilation.hooks.optimizeAssets")])]),e._v(" "),o("li",[o("code",[e._v("compilation.hooks.afterOptimizeAssets")])])])]),e._v(" "),o("li",[o("code",[e._v("compilation.hooks.needAdditionalSeal")])]),e._v(" "),o("li",[o("code",[e._v("compilation.hooks.afterSeal")])]),e._v(" "),o("li",[o("code",[e._v("compiler.hooks.afterCompile")])])]),e._v(" "),o("h4",{attrs:{id:"emit"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#emit"}},[e._v("#")]),e._v(" emit")]),e._v(" "),o("ul",[o("li",[o("code",[e._v("compiler.hooks.shouldEmit")])]),e._v(" "),o("li",[o("code",[e._v("compiler.hooks.assetEmitted")])]),e._v(" "),o("li",[o("code",[e._v("compiler.hooks.afterEmit")])]),e._v(" "),o("li",[o("code",[e._v("compiler.hooks.emit")])]),e._v(" "),o("li",[e._v("读取已存储的编译状态\n"),o("ul",[o("li",[e._v("以对象的形式存储"),o("strong",[e._v("编译状态")])]),e._v(" "),o("li",[e._v("json 文件持久化 ············ "),o("code",[e._v("recordsInputPath/recordsOutputPath/recordsPath")])])])])]),e._v(" "),o("h3",{attrs:{id:"resolve-插件"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#resolve-插件"}},[e._v("#")]),e._v(" resolve 插件")]),e._v(" "),o("blockquote",[o("p",[o("a",{attrs:{href:"https://github.com/webpack/enhanced-resolve",target:"_blank",rel:"noopener noreferrer"}},[e._v("enhanced-resolve"),o("OutboundLink")],1)])]),e._v(" "),o("ul",[o("li",[e._v("配置位置："),o("code",[e._v("webpackConfig.resolve.plugins")])]),e._v(" "),o("li",[e._v("hooks：\n"),o("ul",[o("li",[o("code",[e._v("resolve")])]),e._v(" "),o("li",[o("code",[e._v("parsedResolve")])]),e._v(" "),o("li",[o("code",[e._v("describedResolve")])]),e._v(" "),o("li",[o("code",[e._v("rawModule")])]),e._v(" "),o("li",[o("code",[e._v("module")])]),e._v(" "),o("li",[o("code",[e._v("relative")])]),e._v(" "),o("li",[o("code",[e._v("describedRelative")])]),e._v(" "),o("li",[o("code",[e._v("directory")])]),e._v(" "),o("li",[o("code",[e._v("existingDirectory")])]),e._v(" "),o("li",[o("code",[e._v("undescribedRawFile")])]),e._v(" "),o("li",[o("code",[e._v("rawFile")])]),e._v(" "),o("li",[o("code",[e._v("file")])]),e._v(" "),o("li",[o("code",[e._v("existingFile")])]),e._v(" "),o("li",[o("code",[e._v("resolved")])])])]),e._v(" "),o("li",[e._v("定义在某hooks时执行的脚本\n"),o("blockquote",[o("p",[e._v("以‘下划线拼写’定义，"),o("code",[e._v("resolver.getHook")]),e._v("并支持"),o("code",[e._v("before-")]),e._v("和"),o("code",[e._v("after-")]),e._v("前缀")])]),e._v(" "),o("ul",[o("li",[o("code",[e._v("resolver.getHook(name).tapAsync(pluginName, (request, resolveContext, callback)=>{return callback()})")])]),e._v(" "),o("li",[o("code",[e._v("resolver.getHook(name).tapPromise(pluginName, (request, resolveContext)=>{return Promise.resolve(undefined)})")])])])])]),e._v(" "),o("h3",{attrs:{id:"splitchunksplugin"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#splitchunksplugin"}},[e._v("#")]),e._v(" SplitChunksPlugin")]),e._v(" "),o("blockquote",[o("p",[e._v("chunk 拆分插件，根据配置"),o("code",[e._v("options.optimization.splitChunks")]),e._v("运行")])]),e._v(" "),o("p",[e._v("在"),o("code",[e._v("compilation.hooks.optimizeChunksAdvanced")]),e._v("阶段")]),e._v(" "),o("p",[e._v("遍历"),o("code",[e._v("modules")]),e._v("根据"),o("code",[e._v("test")]),e._v("配置匹配 -> 根据优先级（"),o("code",[e._v("priority")]),e._v("/"),o("code",[e._v("size")]),e._v("/...）-> 根据"),o("code",[e._v("maxInitialRequests")]),e._v("/"),o("code",[e._v("maxAsyncRequests")]),e._v("去除多的chunk")]),e._v(" "),o("p",[e._v("默认：")]),e._v(" "),o("div",{staticClass:"language-js extra-class"},[o("pre",{pre:!0,attrs:{class:"language-js"}},[o("code",[o("span",{pre:!0,attrs:{class:"token keyword"}},[e._v("const")]),e._v(" splitChunks "),o("span",{pre:!0,attrs:{class:"token operator"}},[e._v("=")]),e._v(" "),o("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("{")]),e._v("\n    "),o("span",{pre:!0,attrs:{class:"token comment"}},[e._v("// 选择哪些 chunk 进行优化")]),e._v("\n    "),o("span",{pre:!0,attrs:{class:"token comment"}},[e._v("// all - 优化所有chunks，chunk 可以在异步和非异步 chunk 之间共享")]),e._v("\n    "),o("span",{pre:!0,attrs:{class:"token comment"}},[e._v("// async - 非异步 chunk")]),e._v("\n    "),o("span",{pre:!0,attrs:{class:"token comment"}},[e._v("// (chunk)=>boolean - 判断函数")]),e._v("\n    "),o("span",{pre:!0,attrs:{class:"token literal-property property"}},[e._v("chunks")]),o("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v(" "),o("span",{pre:!0,attrs:{class:"token string"}},[e._v("'async'")]),o("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(",")]),e._v("\n    "),o("span",{pre:!0,attrs:{class:"token comment"}},[e._v("// 生成 chunk 的最小体积（以 bytes 为单位）")]),e._v("\n    "),o("span",{pre:!0,attrs:{class:"token literal-property property"}},[e._v("minSize")]),o("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v(" "),o("span",{pre:!0,attrs:{class:"token number"}},[e._v("20000")]),o("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(",")]),e._v("\n    "),o("span",{pre:!0,attrs:{class:"token literal-property property"}},[e._v("minRemainingSize")]),o("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v(" "),o("span",{pre:!0,attrs:{class:"token number"}},[e._v("0")]),o("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(",")]),e._v("\n    "),o("span",{pre:!0,attrs:{class:"token comment"}},[e._v("// 拆分前必须共享模块的最小 chunks 数")]),e._v("\n    "),o("span",{pre:!0,attrs:{class:"token literal-property property"}},[e._v("minChunks")]),o("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v(" "),o("span",{pre:!0,attrs:{class:"token number"}},[e._v("1")]),o("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(",")]),e._v("\n    "),o("span",{pre:!0,attrs:{class:"token comment"}},[e._v("// 按需加载时的最大并行请求数")]),e._v("\n    "),o("span",{pre:!0,attrs:{class:"token literal-property property"}},[e._v("maxAsyncRequests")]),o("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v(" "),o("span",{pre:!0,attrs:{class:"token number"}},[e._v("30")]),o("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(",")]),e._v("\n    "),o("span",{pre:!0,attrs:{class:"token comment"}},[e._v("// 入口点的最大并行请求数")]),e._v("\n    "),o("span",{pre:!0,attrs:{class:"token literal-property property"}},[e._v("maxInitialRequests")]),o("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v(" "),o("span",{pre:!0,attrs:{class:"token number"}},[e._v("30")]),o("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(",")]),e._v("\n    "),o("span",{pre:!0,attrs:{class:"token literal-property property"}},[e._v("enforceSizeThreshold")]),o("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v(" "),o("span",{pre:!0,attrs:{class:"token number"}},[e._v("50000")]),o("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(",")]),e._v("\n    "),o("span",{pre:!0,attrs:{class:"token comment"}},[e._v("// 缓存组，继承上面的属性")]),e._v("\n    "),o("span",{pre:!0,attrs:{class:"token literal-property property"}},[e._v("cacheGroups")]),o("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v(" "),o("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("{")]),e._v("\n        "),o("span",{pre:!0,attrs:{class:"token literal-property property"}},[e._v("defaultVendors")]),o("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v(" "),o("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("{")]),e._v("\n            "),o("span",{pre:!0,attrs:{class:"token comment"}},[e._v("// 匹配规则")]),e._v("\n            "),o("span",{pre:!0,attrs:{class:"token literal-property property"}},[e._v("test")]),o("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v(" "),o("span",{pre:!0,attrs:{class:"token regex"}},[o("span",{pre:!0,attrs:{class:"token regex-delimiter"}},[e._v("/")]),o("span",{pre:!0,attrs:{class:"token regex-source language-regex"}},[e._v("[\\\\/]node_modules[\\\\/]")]),o("span",{pre:!0,attrs:{class:"token regex-delimiter"}},[e._v("/")])]),o("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(",")]),e._v("\n            "),o("span",{pre:!0,attrs:{class:"token comment"}},[e._v("// 优先级")]),e._v("\n            "),o("span",{pre:!0,attrs:{class:"token literal-property property"}},[e._v("priority")]),o("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v(" "),o("span",{pre:!0,attrs:{class:"token operator"}},[e._v("-")]),o("span",{pre:!0,attrs:{class:"token number"}},[e._v("10")]),o("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(",")]),e._v("\n            "),o("span",{pre:!0,attrs:{class:"token comment"}},[e._v("// 如果当前 chunk 包含已从主 bundle 中拆分出的模块，则它将被重用，而不是生成新的模块")]),e._v("\n            "),o("span",{pre:!0,attrs:{class:"token literal-property property"}},[e._v("reuseExistingChunk")]),o("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v(" "),o("span",{pre:!0,attrs:{class:"token boolean"}},[e._v("true")]),o("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(",")]),e._v("\n        "),o("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("}")]),o("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(",")]),e._v("\n        "),o("span",{pre:!0,attrs:{class:"token keyword"}},[e._v("default")]),o("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v(" "),o("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("{")]),e._v("\n            "),o("span",{pre:!0,attrs:{class:"token literal-property property"}},[e._v("minChunks")]),o("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v(" "),o("span",{pre:!0,attrs:{class:"token number"}},[e._v("2")]),o("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(",")]),e._v("\n            "),o("span",{pre:!0,attrs:{class:"token literal-property property"}},[e._v("priority")]),o("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v(" "),o("span",{pre:!0,attrs:{class:"token operator"}},[e._v("-")]),o("span",{pre:!0,attrs:{class:"token number"}},[e._v("20")]),o("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(",")]),e._v("\n            "),o("span",{pre:!0,attrs:{class:"token literal-property property"}},[e._v("reuseExistingChunk")]),o("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v(" "),o("span",{pre:!0,attrs:{class:"token boolean"}},[e._v("true")]),o("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(",")]),e._v("\n        "),o("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("}")]),o("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(",")]),e._v("\n        "),o("span",{pre:!0,attrs:{class:"token comment"}},[e._v("// 设置为 false 以禁用默认缓存组")]),e._v("\n        "),o("span",{pre:!0,attrs:{class:"token comment"}},[e._v("// defaultVendors: false")]),e._v("\n        "),o("span",{pre:!0,attrs:{class:"token comment"}},[e._v("// default: false")]),e._v("\n    "),o("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("}")]),o("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(",")]),e._v("\n"),o("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("}")]),e._v("\n")])])]),o("h3",{attrs:{id:"multicompiler"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#multicompiler"}},[e._v("#")]),e._v(" MultiCompiler")]),e._v(" "),o("p",[e._v("对有依赖关系的 compiler 同步编译；无依赖关系的，依次运行编译，因编译过程异步，即是同时编译的。")]),e._v(" "),o("p",[e._v("期间 chunks/modules 一直未释放，为 Stats 提供数据。")]),e._v(" "),o("h3",{attrs:{id:"loader"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#loader"}},[e._v("#")]),e._v(" loader")]),e._v(" "),o("ul",[o("li",[e._v("request\n"),o("ul",[o("li",[e._v("loader按顺序排列，最后是文件")]),e._v(" "),o("li",[e._v("loader和文件之间使用"),o("code",[e._v("!")]),e._v("分隔")]),e._v(" "),o("li",[e._v("即最后一个"),o("code",[e._v("!")]),e._v("之后为文件")]),e._v(" "),o("li",[o("code",[e._v("??")]),e._v("后面带"),o("code",[e._v("ident")]),e._v(" "),o("ul",[o("li",[e._v("规则由 "),o("code",[e._v("RuleSet")]),e._v(" 定义与解析(存在对象中)")]),e._v(" "),o("li",[e._v("对应 "),o("code",[e._v("compiler.options.module.defaultRules.concat(compiler.options.module.rules)")])])])])])])]),e._v(" "),o("h2",{attrs:{id:"_5-x"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#_5-x"}},[e._v("#")]),e._v(" @5.x")]),e._v(" "),o("h3",{attrs:{id:"cache"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#cache"}},[e._v("#")]),e._v(" cache")]),e._v(" "),o("p",[e._v("对文件的缓存，定义并保存"),o("code",[e._v("lastAccess")]),e._v("用于"),o("code",[e._v("maxAge")]),e._v("判断。")])])}),[],!1,null,null,null);o.default=s.exports}}]);