# [thread-loader](https://github.com/webpack-contrib/thread-loader)
Runs the following loaders in a worker pool.

- 维护worker池·`WorkerPool`
    - 限制worker最大数量
    - 新任务的分配·`WorkerPool.prototype.distributeJob`
        - 如果当前worker列表中有任务为0的，则由此worker运行任务
        - 如果当前worker数未达最大限度，则创建并使用新的worker
        - 由当前worker列表中任务数最少的运行
- worker·`PoolWorker`·`worker.js`
    - 使用`require('child_process').spawn`生成新的指令进程
    - 新进程使用`node`指令运行`worker.js`，用读写流io进程不会结束
    - 在父进程与子进程之间使用管道`pipe`通信
    - `fd=3`管道做父进程读 子进程写；`fd=4`管道做父进程写 子进程读
    - 约定信息格式：`{ type, id, ...otherData }`
    - 子进程使用`loader-runner`运行 loader
- loader 的限制
    - 不能产生新的文件
    - 不能使用定制的 loader API（也就是说，通过插件）
    - 无法获取 webpack 的选项设置

