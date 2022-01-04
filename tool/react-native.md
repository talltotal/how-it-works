# react-native

- [官方站点](https://reactnative.dev)
- [中文网](https://reactnative.cn/)
- [常用的第三方库](https://github.com/jondot/awesome-react-native)


## React Native

页面的所有元素都是视图（Views）。
React Native 封装原生组件，提供基本的视图。
主要有`<View>``<Text>``<Image>``<ScrollView>``<TextInput>`；
更多组件见[组件文档](https://reactnative.cn/docs/components-and-apis)。

- 组件
- 平台`Platform`
    - `Platform.OS === 'ios'`
    - Android `Platform.Version === 25` / IOS `parseInt(Platform.Version, 10)`
    - 「文件扩展名」区分特定平台
        - `BigButton.ios.js`
        - `BigButton.android.js`
        - `BigButton.native.js` web端不会使用


### 开发环境
> 以[最新文档](https://reactnative.cn/docs/environment-setup)为准
- IOS
    - [Node](http://nodejs.org/)
        > 编译react基本环境
    - [Watchman](https://facebook.github.io/watchman/)
        > 观察文件变化
    - [Xcode](https://developer.apple.com/xcode/downloads/)
        > IOS 开发环境
    - [CocoaPods](https://guides.cocoapods.org/using/getting-started.html)
        > react native 的 iOS 版本需要使用 CocoaPods 来管理依赖
        - 安装：`$ sudo gem install cocoapods` / `$ brew install cocoapods`
- Android
    - Node
    - Watchman
    - [JDK](https://www.oracle.com/java/technologies/downloads/)
        > java 开发环境（React Native 需要 Java Development Kit [JDK] 1.8）
        - 安装：`$ brew install adoptopenjdk/openjdk/adoptopenjdk8`
    - [Android Studio](https://developer.android.google.cn/studio/)
        > Android 开发环境
    - 真机调试
        1. 设备中开启USB调试
        2. `$ adb devices`查看有效设备
        3. 设备访问电脑服务（实时更新最新编译结果）
            - Android5.0以上 `$ adb reverse tcp:8081 tcp:8081`


### 快速开始
- `$ npx react-native init AwesomeProject` 初始化一项项目
- `$ yarn react-native run-ios` 编译并运行ios
    - 对 ios 目录（原生部分）的编译，并运行
    - **对 js 代码**实时打包
        - 内部已有`Metro`做实时打包
        - 也可以用`$ node node_modules/react-native/local-cli/cli.js start`单独运行
- `$ yarn react-native run-android` 编译并运行android
    - 对 android 目录（原生部分）的编译，并运行
    - **对 js 代码**实时打包


### 调试
- 在 chrome 打开 `http://localhost:8081/debugger-ui` 调试 js 代码
- Android
    - `Command⌘ + M` / `$ adb shell input keyevent 82` 唤出设备的开发菜单
    - 在 chrome 打开 `chrome://inspect/#devices` 调试嵌入的 web
    - `$ npx react-native log-android` 查看日志
    - `$ adb logcat > a.log` 捕获设备日志并写入文件
- IOS
    - `Command⌘ + D` 唤出设备的开发菜单
    - 在 safari 打开`Develop/开发 → Simulator/模拟器 → JSContext`
    - `$ npx react-native log-ios` 查看日志
    - 模拟器 `Debug → Open System Log...` 查看日志
- [react-devtools](https://github.com/facebook/react/tree/main/packages/react-devtools)调试视图
    - 安装：`$ npm install -g react-devtools`
    - 运行：`$ react-devtools`
    - 开启设备中开发菜单中的`Inspector`，同步选择的视图节点
    - `http://localhost:8081/debugger-ui` 站点的 `console` 域切换为 `debuggerWorker`，同步日志
- `metro-symbolicate` 根据 source map 翻译生产包日志
    - `$ npx metro-symbolicate android/app/build/generated/sourcemaps/react/release/index.android.bundle.map < stacktrace.txt`
    - `$ adb logcat -d | npx metro-symbolicate android/app/build/generated/sourcemaps/react/release/index.android.bundle.map`





## Code Push
> 热更新可以使你绕过 AppStore 的审核机制，直接修改已经上架的应用。




## [adb](http://developer.android.com/tools/help/adb.html)
- `$ adb devices` 查看有效设备
- `$ adb logcat > a.log` 捕获设备日志并写入文件


