# vue-lazyload

## main
- 加载阈值：临近视窗范围内
- 处理方式
    - 事件监听：`'scroll', 'wheel', 'mousewheel', 'resize', 'animationend', 'transitionend', 'touchmove'`
    - `IntersectionObserver`
- 处理算法：所有懒加载图片元素在一个队列里
- 图片载入：异步请求，利用缓存

### 细节
- loading class / loading img ｜ error class / error img
- 加入 container 概念，在 dom 树节点做统一处理
- throttle
- 加载失败可重新尝试加载：attempt 加载次数
- 不同分辨率的屏幕可以用不同像素的图片，平衡网络带宽和视觉效果：srcset 支持多值，根据 devicePixelRatio 取最佳值


## vue
* 插件: `{ install: (Vue, options) => {} }`
* 注册能力
    1. 属性：`Vue.prototype`
    2. 组件：`Vue.component`
    3. 指令：`Vue.directive` - `bind / update / componentUpdated / unbind`



