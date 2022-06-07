# antd

## Typography·measure

通过`ReactDom.render`渲染并计算内容高度；
超出配置限制后，通过内容的子节点逐个添加后的高度，来判断保留多少子节点。


## Tree·rc-virtual-list

- 组件实现滚动条
    - 长度计算
        - 可见高度 / 总高度 * 10
        - 最小20
        - 最大高度的一半
- 列表
    - 容器按实际高度计；但只渲染显示区域内的元素
    - 监听容器的`scroll`事件，在事件里根据滚动高度计算更新需显示的元素