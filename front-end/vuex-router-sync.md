# [vuex-router-sync](https://www.npmjs.com/package/vuex-router-sync)

1. 在 vuex 中为 router 增加 module
2. 在 router 加监听事件，更新 vuex 中的 state
3. 监听 vuex 的 state 的变动，操作 router 改变
4. 2/3相互同步时，会触发另一个事件，需排除同步的事件
