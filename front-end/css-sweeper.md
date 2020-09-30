# [css-sweeper](https://github.com/propjockey/css-sweeper)
> 只用 css 和 html 做扫雷游戏
> https://raw.githubusercontent.com/propjockey/css-sweeper/master/index.html

涉及技术：
- [自定义属性（以及它的继承性使用）](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Using_CSS_custom_properties)
- [var()函数（以及它的嵌套使用）](https://developer.mozilla.org/zh-CN/docs/Web/CSS/var)
    - 函数第一个参数：要替换的自定义属性的名称
    - 函数第二个参数：回退值，在第一个参数引用的自定义属性无效（即未定义或非法值）时使用
- 各种选择器的搭配


实现：
- 选择 1-16 的难度等级
    - 即16种固定的布雷方式
    - `<input type="radio">` 用`:checked`选择器定义对应模式下的属性值
    - `<a>` 做`:visited`和`:hover`样式效果
- 剩余雷数
- 计时
    - `animation` + `content`
- 30*16的扫雷区
    - 30*16个 `<input[type="checkbox"]>` sweep 暴露层
    - 30*16个 `<input[type="checkbox"]>` qm 问号层
    - 30*16个 `<input[type="checkbox"]>` flag 旗帜层
    - 30*16个 `<i>` tile
- 游戏结束
- 游戏胜利

