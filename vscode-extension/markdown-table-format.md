# Fomart 'markdown table'
> [Markdown Table Formatter](https://github.com/fcrespo82/vscode-markdown-table-formatter)

## [Markdown Table Prettifier](https://github.com/darkriszty/MarkdownTablePrettify-VSCodeExt)

use vscode api:
- `vscode.languages.registerDocumentRangeFormattingEditProvider`
    > 注册‘文档选中一个范围内容，对其做格式化’的提供者
    - `provideDocumentRangeFormattingEdits`
        1. get document range txt
        2. Validate txt is valid table
        3. build table modal
        4. output
- `vscode.languages.registerDocumentFormattingEditProvider`
    > 注册‘对整个文档做格式化’的提供者
    - `provideDocumentFormattingEdits`
        1. find table
        2. 'provideDocumentRangeFormattingEdits'

### Validate Table
```js
// table row
/\r\n|\r|\n/

// table = header row + separator row + body rows

// separator
/^ *:?-+:? *$/
```

## [markdown-it](https://markdown-it.github.io)
1. parse
2. render

- `state` 数据对象，每一个解析的所有过程的共享数据
- `rule` 对原数据做匹配处理的


- 分`inline`,`block`
- 定义不同元素的匹配规则`rule`
- block
    1. 用换行字符`0x0A`将文本按行记录行首/行末`position`
    2. 逐行依次给 block rules 匹配处理


### table
> 主要为*验证*是否为标准的table，解析table行列的position

1. 至少两行
2. offset [0,4) -- 大于等于4的按`code`处理
3. 第二行满足正则`/^[-:|][-:|\s]*$/`
4. 确定 columns
    - 按第二行的 | 
    - 允许前后空白，不允许中间空白；如`|---|`,`--||--`
    - 前后空白不视为一列
    - align
        - 最后一个字符是`:`
            - 第一个字符是`:` - `center`
            - `right`
        - 第一个字符是`:` - `left`

