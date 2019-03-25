# [supertest](https://github.com/visionmedia/supertest)
> http 测试断言工具

- 通过 [superagent](https://github.com/visionmedia/superagent) 做请求代理，继承为断言工具
    - 继承方式：
        - 构造函数中绑定实例执行父构造函数，合并 prototype 对象
        - 覆盖父原型上的方法
- 断言
    - 维护 _asserts 用户自定义的断言函数队列
    - 重构 end 函数，在 request 结束时执行断言函数