(window.webpackJsonp=window.webpackJsonp||[]).push([[27],{292:function(t,e,n){"use strict";n.r(e);var o=n(14),_=Object(o.a)({},(function(){var t=this,e=t._self._c;return e("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[e("h1",{attrs:{id:"qiankun"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#qiankun"}},[t._v("#")]),t._v(" "),e("a",{attrs:{href:"https://qiankun.umijs.org",target:"_blank",rel:"noopener noreferrer"}},[t._v("qiankun"),e("OutboundLink")],1)]),t._v(" "),e("blockquote",[e("p",[t._v("微前端解决方案")])]),t._v(" "),e("p",[t._v("主要依赖包")]),t._v(" "),e("ul",[e("li",[e("a",{attrs:{href:"https://github.com/single-spa/single-spa",target:"_blank",rel:"noopener noreferrer"}},[t._v("SPA微前端基础框架·single-spa"),e("OutboundLink")],1)]),t._v(" "),e("li",[e("a",{attrs:{href:"https://github.com/kuitos/import-html-entry",target:"_blank",rel:"noopener noreferrer"}},[t._v("子应用HTML解析及脚本运行·import-html-entry"),e("OutboundLink")],1)])]),t._v(" "),e("p",[t._v("整体逻辑：")]),t._v(" "),e("ul",[e("li",[t._v("主应用和子应用都是独自运行的站点")]),t._v(" "),e("li",[t._v("主应用根据当前路径和配置内容，匹配对应子应用")]),t._v(" "),e("li",[t._v("请求子应用的html文件，解析得到子应用资源\n"),e("blockquote",[e("p",[t._v("所以一般要求子应用是SPA")])])]),t._v(" "),e("li",[t._v("使用"),e("code",[t._v("eval")]),t._v("执行子应用的脚本；识别其中带有"),e("code",[t._v("entry")]),t._v("属性的脚本或最后一个脚本，取其"),e("code",[t._v("exports")]),t._v("，按需触发脚本披露的‘生命周期钩子’\n"),e("blockquote",[e("p",[t._v("子应用必须提供"),e("code",[t._v("mount")]),t._v("和"),e("code",[t._v("unmount")]),t._v("，用来挂载和卸载dom")])])]),t._v(" "),e("li",[t._v("子应用切换时装载/卸载"),e("code",[t._v("<style>")]),t._v("；控制样式的相互污染")])]),t._v(" "),e("h3",{attrs:{id:"沙箱sandbox"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#沙箱sandbox"}},[t._v("#")]),t._v(" 沙箱sandbox")]),t._v(" "),e("ul",[e("li",[t._v("全局对象\n"),e("ul",[e("li",[t._v("使用 "),e("code",[t._v("Proxy")]),t._v(" 代理 "),e("code",[t._v("window")]),t._v(" "),e("ul",[e("li",[e("code",[t._v("ProxySandbox")])]),t._v(" "),e("li",[e("code",[t._v("LegacySandbox")])])])]),t._v(" "),e("li",[t._v("遍历 "),e("code",[t._v("window")]),t._v(" 的直接属性，独立储存应用内挂载在上面的属性（在应用运行前注入应用修改的，应用运行后换回应用修改前的）\n"),e("ul",[e("li",[e("code",[t._v("SnapshotSandbox")])])])])])]),t._v(" "),e("li",[t._v("包装子应用脚本\n"),e("ul",[e("li",[t._v("通过‘闭包’和"),e("code",[t._v("with")]),t._v("，使子应用脚本执行的全局对象指向代理对象")])])])])])}),[],!1,null,null,null);e.default=_.exports}}]);