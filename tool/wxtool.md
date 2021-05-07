# [微信开发者工具@1.05.2103190](https://developers.weixin.qq.com/miniprogram/dev/devtools/devtools.html)
> MacOS

```tree
└── Contents
    ├── Frameworks
    │   └── nwjs Framework.framework ···nwjs引擎
    ├── MacOS
    │   ├── cli ························命令行工具可执行文件，内容为：使用`Frameworks`中的`node`执行`cli.js`
    │   ├── cli.js ·····················js脚本，子进程执行`package.nw/js/common/cli/index.js`
    │   ├── wechatdevtools ·············开发模式IDE Mac程序
    │   └── wechatwebdevtools ··········IDE Mac程序
    ├── Resources
    │   ├── bin
    │   ├── package.nw ·················包代码，由nwjs驱动，即源码解析的主要文件夹
    │   ├── en.lproj ···················以下均为国际化key-value文件
    │   │   └── InfoPlist.strings
    │   ├── en_GB.lproj
    │   │   └── InfoPlist.strings
    │   ├── zh_CN.lproj
    │   │   └── InfoPlist.strings
    │   ├── zh_TW.lproj
    │   │   └── InfoPlist.strings
    │   ├── document.icns ··············图标
    │   ├── nw.icns ····················图标
    │   └── app.icns ···················图标
    ├── _CodeSignature
    │   └── CodeResources ··············property list 属性列表文件
    ├── PkgInfo ························包信息
    └── Info.plist ·····················property list 属性列表文件
```


结构
- 编辑器·基于vscode/monaco-editor `package.nw/js/libs/`


数据文件
- wxml·tag·attr：`package.nw/js/ideplugin/wx-page-types/datas/datas.js`
- js·snippets：`package.nw/js/libs/vseditor/extensions/wx-snippets/snippets/snippets.js.json`
- game·snippets：`package.nw/js/libs/vseditor/extensions/wx-game-snippets/snippets/snippets.js.json`



## 小程序/小游戏编译
[miniprogram-ci](https://www.npmjs.com/package/miniprogram-ci)

1. 确定‘项目根路径’
2. 找到‘project.config.json’文件
3. 解读配置文件信息
4. watch 配置文件和 miniprogramRoot 内文件变化


