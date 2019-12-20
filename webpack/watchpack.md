# [watchpack](https://github.com/webpack/watchpack)
> `webpack` 的 `file watcher` 独立包
> 去重监听指定文件列表和文件夹列表的变化，维护对应变化时间戳map；用于 `webpack` 对比判断 `module` 重编
> 1. 事件管理`events.EventEmitter`
> 2. 文件监听`chokidar.watch`

### 定义文件事件
- `change` 文件/文件夹修改
- `remove` 文件被删除
- `aggregated`
    - 事件`change`与`remove`的聚合
    - 根据`options.aggregateTimeout`用`timeout`方式
        - 去抖动(debounce)；
        - 聚合timeout时间内变化的文件/文件夹(数组)


### 定义状态机
- 操作
    - 开始 `watch()`：开始监听
    - 关闭 `close()`：关闭监听
    - 暂停 `pause()`：仍监听，但事件不透出，以状态值`paused`做判断
- 状态
    - `paused`


### 文件监听
- 文件/文件夹的监听聚合到文件夹的去重监听（每层目录一个观察者/监听器map实例共享）；
- 因聚合到文件夹，且只需监听指定的文件/文件夹，作**计数器**计数，指定的都删除了即可不再监听此层目录
- 如果指定的是文件夹，**递归**监听内部所有目录的变化，某个目录变化，即这个文件夹变化
- 根据变更时间`stat.mtime`/`stat.ctime`触发相关事件


### 细节
- 文件路径小写处理
- 在必要的函数内再引用文件，避免循环引用
