# element-ui

## table·col-resize

- 监听 th 的 mousemove 事件，通过鼠标位置与 th 右侧距离判断是否可 resize；且以此 th 为确定位置和宽度的元素。
- 监听 th 的 mousedown 事件，在有确认元素的情况下，给 document 增加 mousemove 和 mouseup 事件，来确定移动的位置和宽度；移动过程使用额外的元素`.resize-proxy`标记当前位置，也作为偏移数据的存储方式；对应设置到 col 元素的 width 属性，作为 table layout 的依据。
- header 和 body/footter 分别有各自的 table 元素，通过 table 组件中创建的 store 共享 columns 数据，做样式对其；在组件初始渲染时计算 各其实宽度，后根据 header 中手动调整/容器resize变化。
- column 使用 width 属性存储用户设置（组件定义+手动拖拽）宽度，用 realWidth 属性存储实际显示（组件定义+手动拖拽+最小值计算）宽度；没有用户设置的 column 计算宽度按最小宽度平分。

