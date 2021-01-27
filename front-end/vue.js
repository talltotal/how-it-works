vue: Vue = {
    /** 全局唯一标识，从数字0递增 */
    _uid: number,
    /** 渲染代理 */
    _renderProxy: vm,
    _self: vm,
    /** vue对象标识 */
    _isVue = true,
    /**
     * option处理：
     * - 与构造函数上的静态 options 合并
     *      - 递归获取构造函数上的静态 super
     *          - superOptions做父项缓存
     *          - sealedOptions做父项修改项缓存
     *          - 以及extendOptions
     * - 递归合并 option.extends / option.mixins
     * 
     * 所有配置项
     * 1. 默认取父项
     * 2. 子项覆盖父项
     * 3. 所有函数绑vm上下文
     */
    $options: {
        // _base?
        /** ? */
        _parentListeners: Object,
        _parentVnode: Vnode,
        _renderChildren: [VNode],
        /**
         * 传入配置兼容array/object，object中value兼容object/type
         * 父子项合并
         */
        props: {
            [name]: {
                type: null
            }
        },
        /**
         * 注入
         * 传入配置兼容array/object，object中value兼容object/type
         * 父子项合并
         */
        inject: {
            [name]: {
                from: name
            }
        },
        /**
         * 
         * 父子项合并
         */
        methods: {
            [name]: Function
        },
        /**
         * 
         * 父子项合并
         */
        computed: {
            [name]: {
                hander: Function
            }
        },
        /**
         * 传入建议为函数，将`call(vm,vm)`执行返回，不同组件实例有新的数据对象
         */
        data: Object,
        /**
         * 传入建议为函数，将`call(vm,vm)`执行返回，不同组件实例有新的数据对象
         */
        provide: Object,
        /**
         * 生命周期hook函数，同一hook以数组类型，从父函数开始排列，后续也以此顺序执行
         */
        beforeCreate: [Function],
        created: [Function],
        beforeMount: [Function],
        mounted: [Function],
        beforeUpdate: [Function],
        updated: [Function],
        beforeDestroy: [Function],
        destroyed: [Function],
        activated: [Function],
        deactivated: [Function],
        errorCaptured: [Function],
        ssrPrefetch: [Function],
        /**
         * 资产类型配置，父子项合并
         */
        components: Object,
        /** 组件内指令 */
        directives: {
            [name]: {
                bind: Function,
                update: Function,
            }
        },
        filters: Object,
        /**
         * 监听函数以数组类型，从父函数开始排列，后续也以此顺序执行
         */
        watch: Object,
    },
    /**
     * 父节点
     * $options.parent
     */
    $parent: Vue,
    /**
     * 根节点
     * $parent.$root || vm
     */
    $root: Vue,
    $children: [Vue],
    $refs: {},
    /**
     * lifecycle
     */
    _watcher = null,
    _inactive = null,
    _directInactive = false,
    _isMounted = false,
    _isDestroyed = false,
    _isBeingDestroyed = false,
    /**
     * event
     */
    _events = {},
    _hasHookEvent = false,
    /**
     * render
     */
    _vnode = null,
    /** v-once缓存数 */
    _staticTrees = null,
    /** options._parentVnode */
    $vnode: Vnode = {
        isComment: Boolean,
        tag: String,
        text: String,
        context: Component,
        fnContext,
        asyncFactory,
        data: {
            attrs: [{
                slot,
            }],
            slot,
        },
        children: [Vnode],
    },
    /** 从$options._renderChildren */
    $slots: [],
    $scopedSlots: [],
    _c: (a, b, c, d) => createElement(vm, a, b, c, d, false),
    $createElement: (a, b, c, d) => createElement(vm, a, b, c, d, true),
    $attrs: [],
    $listeners: [],
    /**
     * Vue 原型
     * === Vue.prototype
     */
    __proto__: Object = {
        /**
         * `this instanceof Vue` 判断this，做作用域安全的构造函数
         */
        constructor: Function === Vue,
        /**
         * 实例初始化函数：
         * 1. options处理
         * 2. 定义私有实例属性，为后续操作做准备
         * 3. 触发 beforeCreate
         */
        _init: Function
    }
}
