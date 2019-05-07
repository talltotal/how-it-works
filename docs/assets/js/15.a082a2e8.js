(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{179:function(e,t,v){"use strict";v.r(t);var _=v(0),r=Object(_.a)({},function(){var e=this,t=e.$createElement,v=e._self._c||t;return v("div",{staticClass:"content"},[v("h1",{attrs:{id:"vue-loader"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#vue-loader","aria-hidden":"true"}},[e._v("#")]),e._v(" "),v("a",{attrs:{href:"https://github.com/vuejs/vue-loader",target:"_blank",rel:"noopener noreferrer"}},[e._v("vue-loader"),v("OutboundLink")],1)]),e._v(" "),e._m(0),e._v(" "),e._m(1),e._v(" "),v("ul",[v("li",[v("a",{attrs:{href:"https://www.webpackjs.com/api/loaders/",target:"_blank",rel:"noopener noreferrer"}},[e._v("loader API"),v("OutboundLink")],1),e._v(" "),e._m(2)]),e._v(" "),e._m(3)]),e._v(" "),v("h2",{attrs:{id:"vue-template-compiler"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#vue-template-compiler","aria-hidden":"true"}},[e._v("#")]),e._v(" "),v("a",{attrs:{href:"https://github.com/vuejs/vue/tree/dev/packages/vue-template-compiler#readme",target:"_blank",rel:"noopener noreferrer"}},[e._v("vue-template-compiler"),v("OutboundLink")],1)]),e._v(" "),e._m(4),e._v(" "),e._m(5),e._v(" "),e._m(6)])},[function(){var e=this.$createElement,t=this._self._c||e;return t("blockquote",[t("p",[this._v("@15.7.0")])])},function(){var e=this,t=e.$createElement,v=e._self._c||t;return v("ol",[v("li",[e._v("模块基本划分\n"),v("ul",[v("li",[e._v("解析 "),v("code",[e._v(".vue")]),e._v(" 文件分成 "),v("code",[e._v("template")]),e._v("、"),v("code",[e._v("script")]),e._v("、"),v("code",[e._v("style")]),e._v("、"),v("code",[e._v("custom")]),e._v(" 模块")]),e._v(" "),v("li",[e._v("返回拼接依赖上述模块的 "),v("code",[e._v("js")]),e._v(" 格式文本，带上 "),v("code",[e._v("type")]),e._v(" 和 "),v("code",[e._v("id")]),e._v(" 等标识后续的解析")])])]),e._v(" "),v("li",[e._v("模块 loader 内敛设置\n"),v("ul",[v("li",[e._v("配合 "),v("code",[e._v("plugin")]),e._v(" 更新 "),v("code",[e._v("module.rules")]),e._v("，通过匹配 "),v("code",[e._v("resourceQuery")]),e._v("，在最前面加入解析上述模块的内置 loader "),v("code",[e._v("pitcher")])]),e._v(" "),v("li",[v("code",[e._v("pitcher")]),e._v(" 的 "),v("code",[e._v("pitch")]),e._v(" 函数根据 "),v("code",[e._v("type")]),e._v(" 等，再次更新文本调整分发 "),v("code",[e._v("loader")]),e._v(" "),v("blockquote",[v("p",[e._v("根据 "),v("code",[e._v("loader")]),e._v(" 的 "),v("code",[e._v("pitching")]),e._v("，将 "),v("code",[e._v("loader")]),e._v(" 放在最前面，并使用 "),v("code",[e._v("pitch")]),e._v(" 最先执行并返回值不被其他 "),v("code",[e._v("loader")]),e._v(" 处理\n为了 style 模块划出去之后能用到其他 loader，把 lang 后缀加上，在下一轮中 webpack 会把匹配的 rule 都补上")])])])])]),e._v(" "),v("li",[e._v("依据内敛 loader 模块处理\n"),v("ul",[v("li",[e._v("template\n"),v("ul",[v("li",[e._v("得到 template 部分的代码")]),e._v(" "),v("li",[v("code",[e._v("templateLoader")]),e._v(" 解析 "),v("code",[e._v("template")]),e._v(" 模块，转成 "),v("code",[e._v("render")]),e._v(" 函数")])])]),e._v(" "),v("li",[e._v("style\n"),v("ul",[v("li",[v("code",[e._v("vue-style-loader")]),e._v(" 的 "),v("code",[e._v("pitch")]),e._v(" 函数基于 "),v("code",[e._v("pitcher")]),e._v(" 指定的 loader ，根据 RSS、hot 等做调整")]),e._v(" "),v("li",[e._v("得到 script 部分的代码")]),e._v(" "),v("li",[e._v("less/sass/styl...")]),e._v(" "),v("li",[v("code",[e._v("styleLoader")]),e._v(" 解析 "),v("code",[e._v("script")]),e._v(" 模块，处理 "),v("code",[e._v("scoped")]),e._v(" 给节点加上 "),v("code",[e._v("data-v${id}")]),e._v(" 属性")]),e._v(" "),v("li",[v("code",[e._v("css-loader")]),e._v(" 以一般css文件处理")])])])])])])},function(){var e=this.$createElement,t=this._self._c||e;return t("ul",[t("li",[this._v("作为 webpack loader 基本接口依据")])])},function(){var e=this.$createElement,t=this._self._c||e;return t("li",[t("a",{attrs:{href:""}},[this._v("@vue/component-compiler-utils")]),this._v(" "),t("ul",[t("li",[this._v("RSS、Hot 等兼容封装层")])])])},function(){var e=this.$createElement,t=this._self._c||e;return t("blockquote",[t("p",[this._v("文本解析主模块")])])},function(){var e=this.$createElement,t=this._self._c||e;return t("h3",{attrs:{id:"compiler"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#compiler","aria-hidden":"true"}},[this._v("#")]),this._v(" compiler")])},function(){var e=this,t=e.$createElement,v=e._self._c||t;return v("ul",[v("li",[e._v("闭包封装默认 option")]),e._v(" "),v("li",[e._v("构建 ast\n"),v("ul",[v("li",[e._v("文本解析构建树形结构\n"),v("blockquote",[v("p",[e._v("字符串查找、正则匹配")])]),e._v(" "),v("ul",[v("li",[e._v("用 index 打标，last 备份")]),e._v(" "),v("li",[e._v("用 children 、 parent 关联元素形成树")]),e._v(" "),v("li",[e._v("用 root 保留根结点，currentParent 处理当前节点，stack 存储节点栈")])])]),e._v(" "),v("li",[e._v("提供 module 插件模式\n"),v("ul",[v("li",[v("code",[e._v("transformNode")])]),e._v(" "),v("li",[v("code",[e._v("preTransformNode")])]),e._v(" "),v("li",[v("code",[e._v("postTransformNode")])])])]),e._v(" "),v("li",[e._v("节点属性说明\n<<< @/loader/ele.ts")])])]),e._v(" "),v("li",[e._v("递归遍历 ast 给所有节点打标 static、staticRoot 属性")]),e._v(" "),v("li",[e._v("遍历 ast 输出 render 文本")])])}],!1,null,null,null);t.default=r.exports}}]);