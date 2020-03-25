# [JSON.minify](https://github.com/fkei/JSON.minify)

> 去掉json中的空白和**注释** （设定注释为`/* 块注释 */`与`// 行注释`）

- `/"|(\/\*)|(\*\/)|(\/\/)|\n|\r|\[|]/g`
    - 用`g`的‘迭代器’遍历匹配字符
    - 取`RegExp.leftContext`和`RegExp.rightContext`判断当前匹配位置的上下文
    - 注：‘字符串’内符号皆保留


按自己的理解造个轮子：

```js
JSON.minify = (json) => {
    // 特殊字符
    const r = /"|\/\*|\*\/|\/\/|\s/g
    /**
     * 0: 一般
     * 1: in string
     * 2: in block commit
     * 3: in line commit
     */
    let inState = 0
    let tmp
    let result = []
    let preIndex = 0

    while (tmp = r.exec(json)) {
        const match = tmp[0]
        if (inState < 2) {
            // 非特殊字符在非注释中，可直接使用
            result.push(RegExp.leftContext.substring(preIndex))
            // "和字符串中的特殊字符，可直接使用
            if (inState == 1 || match == '"') {
                result.push(match)
            }
        }
        preIndex = r.lastIndex
        if (match == '/*' && inState == 0) {
            inState = 2
        } else if (match == '*/' && inState == 2) {
            inState = 0
        } else if (match == '//' && inState == 0) {
            inState = 3
        } else if ((match == '\n' || match == '\r') && inState == 3) {
            inState = 0
        } else if (match == '"' && inState < 2) {
            // 字符串中的"
            if (!RegExp.leftContext.match(/\\$/)) {
                inState = inState == 1 ? 0 : 1
            }
        }
    }

    if (inState < 2) {
        result.push(json.substring(preIndex, json.length))
    }

    return result.join('')
}
```