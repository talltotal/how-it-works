# [Webpack Progress](https://github.com/wk-j/bitbar-webpack-progress-plugin)
> webpack 插件 + vscode 插件组合，提示编译进度

## 怎么定义进度
- 0-10% buildModule 之前
- 10-70% buildModule-succeedModule
- 70-71% ～seal
- 71-73% ～optimize
- 73-75% ～beforeHash
- 75-76% ～beforeChunkAssets
- 76-78% ～additionalChunkAssets
- 78-80% ～optimizeChunkAssets
- 80-90% ～optimizeAssets
- 90-95% ～emit
- 90-100% ～done

## 怎么让插件对话
文件更新写/循环查文件修改时间/读

```js
fs.writeFileSync(`${os.tmpdir()}/webpack-progress`, percentage);
```
