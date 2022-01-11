# [react-dev-utils](https://github.com/facebook/create-react-app/tree/main/packages/react-dev-utils)


## launchEditor
> 打开文本编辑器，并定位到文件位置

在 react dev 中的运行场景：webpack dev server 中注册`__open-stack-frame-in-editor`接口
- 在 web 端点击链接时，发送此请求
- 在 node 端收到请求时，触发`launchEditor`
- 参数：文件的绝对路径、行数、列数


单独运行的前提
- 当前有编辑器正在运行
- 脚本运行环境可访问设备文件


运行过程
1. 验证参数合法性
    - 文件存在
    - 行数大于等于1
    - 列数大于等于1，默认1
2. ‘猜测’使用的编辑器
    - react编辑器：`process.env.REACT_EDITOR`
    - 预置常见的编辑器运行地址，获取系统进程信息，进行比对判断
        - `process.platform === 'darwin'` => `ps x`
        - `process.platform === 'win32'` => `wmic process where "executablepath is not null" get executablepath`
        - `process.platform === 'linux'` => `ps x --no-heading -o comm --sort=comm`
3. 根据判断所得的编辑器，确定运行的‘指令’以及‘传参方式’，并执行


这里提取vscode相关信息
```js
const COMMON_EDITORS_OSX = {
  // ...
  '/Applications/Visual Studio Code.app/Contents/MacOS/Electron': 'code',
  // ...
};

const COMMON_EDITORS_LINUX = {
  // ...
  code: 'code',
  // ...
};

const COMMON_EDITORS_WIN = [
  // ...
  'Code.exe',
  // ...
];

function addWorkspaceToArgumentsIfExists(args, workspace) {
  if (workspace) {
    args.unshift(workspace);
  }
  return args;
}

function getArgumentsForLineNumber(
  editor,
  fileName,
  lineNumber,
  colNumber,
  workspace
) {
  const editorBasename = path.basename(editor).replace(/\.(exe|cmd|bat)$/i, '');
  switch (editorBasename) {
    // ...
    case 'code':
    case 'Code':
      return addWorkspaceToArgumentsIfExists(
        ['-g', fileName + ':' + lineNumber + ':' + colNumber],
        workspace
      );
    // ...
  }
  return [fileName];
}
```