# [Rollup](https://github.com/rollup/rollup)
> https://rollupjs.org/


主编译流程·`cli/run/build.ts`
1. 由 input 得到 bundle
    - module加载·`src/ModuleLoader.ts`
    - 脚本解析·`src/utils/transform.ts`
2. 由 bundle 得到 output

