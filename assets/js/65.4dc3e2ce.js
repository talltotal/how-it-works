(window.webpackJsonp=window.webpackJsonp||[]).push([[65],{330:function(o,e,_){"use strict";_.r(e);var r=_(14),v=Object(r.a)({},(function(){var o=this,e=o._self._c;return e("ContentSlotsDistributor",{attrs:{"slot-key":o.$parent.slotKey}},[e("h1",{attrs:{id:"thread-loader"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#thread-loader"}},[o._v("#")]),o._v(" "),e("a",{attrs:{href:"https://github.com/webpack-contrib/thread-loader",target:"_blank",rel:"noopener noreferrer"}},[o._v("thread-loader"),e("OutboundLink")],1)]),o._v(" "),e("p",[o._v("Runs the following loaders in a worker pool.")]),o._v(" "),e("ul",[e("li",[o._v("维护worker池·"),e("code",[o._v("WorkerPool")]),o._v(" "),e("ul",[e("li",[o._v("使用"),e("code",[o._v("neo-async/queue")]),o._v("，根据"),e("code",[o._v("options.poolParallelJobs")]),o._v("管控池子里的任务数")]),o._v(" "),e("li",[o._v("新任务的分配·"),e("code",[o._v("WorkerPool.prototype.distributeJob")]),o._v(" "),e("ul",[e("li",[o._v("如果当前worker列表中有任务为0的，则由此worker运行任务")]),o._v(" "),e("li",[o._v("如果当前worker数未达最大限度，则创建并使用新的worker")]),o._v(" "),e("li",[o._v("由当前worker列表中任务数最少的运行")])])]),o._v(" "),e("li",[o._v("所有job完成后，根据"),e("code",[o._v("options.poolTimeout")]),o._v("定时销毁所有子进程")])])]),o._v(" "),e("li",[o._v("worker·"),e("code",[o._v("PoolWorker")]),o._v("·"),e("code",[o._v("worker.js")]),o._v(" "),e("ul",[e("li",[o._v("使用"),e("code",[o._v("require('child_process').spawn")]),o._v("生成新的指令进程")]),o._v(" "),e("li",[o._v("新进程使用"),e("code",[o._v("node")]),o._v("指令运行"),e("code",[o._v("worker.js")]),o._v("，传入"),e("code",[o._v("options.workerNodeArgs")]),o._v("/"),e("code",[o._v("options.workerParallelJobs")]),o._v(" "),e("ul",[e("li",[o._v("开启读写io流，使此进程不会结束")]),o._v(" "),e("li",[o._v("使用"),e("code",[o._v("neo-async/queue")]),o._v("，根据"),e("code",[o._v("options.workerParallelJobs")]),o._v("管控进程里的任务数")]),o._v(" "),e("li",[o._v("使用"),e("code",[o._v("loader-runner")]),o._v("运行 loader")])])]),o._v(" "),e("li",[o._v("在父进程与子进程们之间使用管道"),e("code",[o._v("pipe")]),o._v("通信\n"),e("ul",[e("li",[o._v("子进程的"),e("code",[o._v("fd=3")]),o._v("管道做父进程读、子进程写（子=>父）；子进程的"),e("code",[o._v("fd=4")]),o._v("管道做父进程写、子进程读（父=>子）")]),o._v(" "),e("li",[o._v("约定信息格式："),e("code",[o._v("{ type, id, ...otherData }")])])])])])]),o._v(" "),e("li",[o._v("warmup 预热\n"),e("ul",[e("li",[o._v("根据"),e("code",[o._v("options.workers")]),o._v("创建对应数量的子进程")]),o._v(" "),e("li",[o._v("通知所有子进程加载执行脚本")])])]),o._v(" "),e("li",[o._v("loader 的限制\n"),e("ul",[e("li",[o._v("不能产生新的文件")]),o._v(" "),e("li",[o._v("不能使用定制的 loader API（也就是说，通过插件）")]),o._v(" "),e("li",[o._v("无法获取 webpack 的选项设置")])])])])])}),[],!1,null,null,null);e.default=v.exports}}]);