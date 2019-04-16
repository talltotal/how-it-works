(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{178:function(l,a,i){"use strict";i.r(a);var e=i(0),_=Object(e.a)({},function(){var l=this,a=l.$createElement,i=l._self._c||a;return i("div",{staticClass:"content"},[i("h1",{attrs:{id:"tapable"}},[i("a",{staticClass:"header-anchor",attrs:{href:"#tapable","aria-hidden":"true"}},[l._v("#")]),l._v(" "),i("a",{attrs:{href:"https://github.com/webpack/tapable",target:"_blank",rel:"noopener noreferrer"}},[l._v("tapable"),i("OutboundLink")],1)]),l._v(" "),l._m(0),l._v(" "),l._m(1),l._v(" "),l._m(2),l._v(" "),l._m(3),l._v(" "),l._m(4)])},[function(){var l=this.$createElement,a=this._self._c||l;return a("blockquote",[a("p",[this._v("插件的绑定和使用，继承 tapable 使用")])])},function(){var l=this.$createElement,a=this._self._c||l;return a("h2",{attrs:{id:"_0-2-9"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_0-2-9","aria-hidden":"true"}},[this._v("#")]),this._v(" 0.2.9")])},function(){var l=this,a=l.$createElement,i=l._self._c||a;return i("ul",[i("li",[l._v("维护 "),i("code",[l._v("_plugins")]),l._v(" 对象: "),i("code",[l._v("{ name: Array<{ apply: Function }> }")])]),l._v(" "),i("li",[l._v("运行插件\n"),i("ul",[i("li",[i("code",[l._v("apply(Array<{ apply: Function }>)")]),l._v(" "),i("ul",[i("li",[l._v("直接执行入参插件的 "),i("code",[l._v("apply")]),l._v(" 函数")])])]),l._v(" "),i("li",[i("code",[l._v("plugin(name: String, fn: { apply: Function })")]),l._v(" "),i("ul",[i("li",[l._v("注册插件")])])]),l._v(" "),i("li",[i("code",[l._v("hasPlugins(name: String): Array<{ apply: Function }>")]),l._v(" "),i("ul",[i("li",[l._v("是否有此插件")])])]),l._v(" "),i("li",[i("code",[l._v("applyPlugins(name: String, ...args)")]),l._v(" "),i("ul",[i("li",[l._v("同步执行插件")])])]),l._v(" "),i("li",[i("code",[l._v("applyPluginsWaterfall(name: String, init: any, ...args): any")]),l._v(" "),i("ul",[i("li",[l._v("上一个插件的返回值作为下一个插件的第一个参数，init为第一个插件的第一个参数")])])]),l._v(" "),i("li",[i("code",[l._v("applyPluginsBailResult(name: String, ...args): any")]),l._v(" "),i("ul",[i("li",[l._v("插件数组有一个返回就返回结果")])])]),l._v(" "),i("li",[i("code",[l._v("applyPluginsAsync/applyPluginsAsyncSeries(name: String, ...args, callback: Function -> void)")]),l._v(" "),i("ul",[i("li",[l._v("callback 形式实现插件内的异步，插件间的顺序执行")]),l._v(" "),i("li",[l._v("将 args 传给每一个插件，而 callback 封装为‘执行下一个插件’，后面没有插件了才执行原callback")]),l._v(" "),i("li",[l._v("callback 第一个入参为err，只判断是否err，其他参数均无效")])])]),l._v(" "),i("li",[i("code",[l._v("applyPluginsAsyncWaterfall(name: String, init: any, callback: Function -> void)")]),l._v(" "),i("ul",[i("li",[l._v("callback 形式实现插件内的异步，插件间的顺序执行")]),l._v(" "),i("li",[l._v("上一个插件调用callback的入参作为下一个插件的第一个参数，init为第一个插件的第一个参数")]),l._v(" "),i("li",[l._v("callback 封装为‘执行下一个插件’，后面没有插件了才执行原callback")])])]),l._v(" "),i("li",[i("code",[l._v("applyPluginsAsyncSeriesBailResult(name: String, ...args, callback: Function -> void)")]),l._v(" "),i("ul",[i("li",[l._v("callback 形式实现插件内的异步，插件间的顺序执行")]),l._v(" "),i("li",[l._v("插件调用 callback 时有任何入参即结束")])])]),l._v(" "),i("li",[i("code",[l._v("applyPluginsParallel(name: String, ...args, callback: Function -> void)")]),l._v(" "),i("ul",[i("li",[l._v("同步执行所有插件，一旦插件调用callback的错误形式即计为结束")]),l._v(" "),i("li",[l._v("结束则终止当前event，且其他插件调用callback也不会再执行")]),l._v(" "),i("li",[l._v("callback 是异步的，所以在函数体内维护 remaining 数据纪录还未执行完成的插件数")])])]),l._v(" "),i("li",[i("code",[l._v("applyPluginsParallelBailResult(name: String, ...args, callback: Function -> void)")]),l._v(" "),i("ul",[i("li",[l._v("同步执行所有插件，当插件callback带参数且它的"),i("strong",[l._v("前面的插件都已执行完成")]),l._v("调用过callback，或者所以插件调用了callback，即计为结束")]),l._v(" "),i("li",[l._v("callback 是异步的，所以在函数体内维护 currentPos (带参数的插件)、done (currentPos前已经执行完的index)，当 currentPos 和 done 一致时即结束")])])])])])])},function(){var l=this.$createElement,a=this._self._c||l;return a("h2",{attrs:{id:"_1-1-1"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1-1-1","aria-hidden":"true"}},[this._v("#")]),this._v(" 1.1.1")])},function(){var l=this,a=l.$createElement,i=l._self._c||a;return i("ul",[i("li",[l._v("将插件直接定位为"),i("code",[l._v("hook")])]),l._v(" "),i("li",[l._v("将不同执行形式的"),i("code",[l._v("hook")]),l._v("抽象为类\n"),i("ul",[i("li",[l._v("注册插件\n"),i("ul",[i("li",[i("code",[l._v("tap")])]),l._v(" "),i("li",[i("code",[l._v("tapAsync")])]),l._v(" "),i("li",[i("code",[l._v("tapPromise")]),l._v(" "),i("blockquote",[i("p",[l._v("增加了 "),i("code",[l._v("Promise")]),l._v(" 形式的异步")])])])])]),l._v(" "),i("li",[l._v("执行插件\n"),i("ul",[i("li",[i("code",[l._v("call")])]),l._v(" "),i("li",[i("code",[l._v("callAsync")])]),l._v(" "),i("li",[i("code",[l._v("promise")])])])])])])])}],!1,null,null,null);a.default=_.exports}}]);