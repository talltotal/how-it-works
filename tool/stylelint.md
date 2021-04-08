# stylelint

主流程：
1. 使用`postcss`解析文本，得到样式部分的语法树 (`stylelint/lib/getPostcssResult.js`)
2. 在语法树上应用定义的规则`rules` (`stylelint/lib/lintSource.js`)

