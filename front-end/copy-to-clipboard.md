# [copy-to-clipboard](https://github.com/sudodoki/copy-to-clipboard#readme)

> 相关[react-copy-to-clipboard](https://github.com/nkbt/react-copy-to-clipboard)

- 创建一个`white-space:pre`的`span`元素`mark`，加入到document；并监听`copy`事件，做额外的format
- 选中元素内容
    - `document.createRange().selectNodeContents(mark)`
    - `document.getSelection().addRange(range)`
- 执行复制`document.execCommand("copy")`
