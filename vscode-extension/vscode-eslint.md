# [vscode-eslint](https://github.com/Microsoft/vscode-eslint)

[vscode 插件入门指南](https://github.com/talltotal/all/blob/master/docs/dev/vscode-extension.md)

## 先从 `package.json` 看做了什么
- 配置项
    - 总开关：`enable`
    - 包管理器：`packageManager`
    - 显示状态：`alwaysShowStatus`
    - node路径：`nodePath`
    - eslint规则配置：`options`
    - 和服务器同步：`trace.server`
    - 运行的时机，输入/保存：`run`
    - 保存时自动fix：`autoFixOnSave`
    - 关闭warning提示：`quiet`
    - 使用eslint的语言：`validate`
    - ...
- 指令
    - 自动fix：`executeAutofix`
    - 显示输出：`showOutputChannel`
    - 创建配置文件：`createConfig`
    - 开关：`enable/disable`
    - ...
- 工程构建：webpack
- 工程编译：tsc



## 代码部分

> client + server

### client-activate
1. 监听文件打开 / 监听配置文件变化
    > `vscode.workspace.onDidOpenTextDocument`
    > `vscode.workspace.onDidChangeConfiguration`
    - 创建右下角状态 `StatusBar` > `command.showOutputChannel`
    - 创建并开启 `client`
        - 根据从 server 收到的验证状态更新右下角状态
2. 注册指令
    > `context.subscriptions.push(vscode.commands.registerCommand('command name', func))`
3. 监听配置文件变化 / 监听工作区文件变化
    > `vscode.workspace.onDidChangeConfiguration`
    > `vscode.workspace.onDidChangeWorkspaceFolders`
    - 根据配置 `eslint.provideLintTask`，创建并执行 `.vscode.tasks.json` 中的 `eslint` 任务


### `autoFixOnSave` 过程
- 注册
    * client 注册指令 `eslint.executeAutofix`（根据指令执行）
    * server 监听事件 `documents.onWillSaveWaitUntil`（根据配置执行）
- 指令传递
    1. 触发 client 中注册的事件
    2. `client.sendRequest` 用 `command` 的值做标识
    3. `createConnection().onRequest` 注册请求，通过数据中的 `command` 执行相应任务
- 修改文本
    * `TextEdit.replace`
    * 增加编辑 `WorkspaceChange.getTextEditChange().add(TextEdit[])`
    * 在 `documents.onWillSaveWaitUntil` 返回 `TextEdit[]`

