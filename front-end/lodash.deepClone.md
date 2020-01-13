# [lodash.deepClone](https://github.com/lodash/lodash/blob/master/.internal/baseClone.js)

## 浅拷贝与深拷贝
- 浅拷贝：两个对象共享属性
- 深拷贝：区分不同的数据类型，递归拷贝；另避免属性中的循环引用


## 基本类型与引用类型
- 基本类型：值不可变
    > 值称为原始值( primitive values )
    > 有：`Boolean`、`Null`、`Undefined`、`Number`、`BigInt`、`String`、`Symbol`
- 引用类型：以标识符引用的一块内存区域，此区域即一组属性的集合
    > 都继承自 `Object`


### 区分方式
1. 使用`typeof`操作符
    - 引用类型中除了`Function`对象为`function`，其他都是`object`；
    - 基本类型中`null`值为`object`，即`typeof null === 'object'`，理解为‘空指针’
2. 使用`Object.prototype.toString`
    - `Object.prototype.toString.call(value)` 即可
    - 其中`Null`、`Undefined`从「JavaScript 1.8.5」开始支持，需做兼容处理


## 引用类型的拷贝
> 使用原对象的构造函数构造新的对象
> 遍历对象属性

- `Array`
    - `RegExp.prototype.exec` 返回的数组中`index`、`input`属性需保留
- `Regexp`
    - `lastIndex`属性额外复制
- `Symbol`
    - `Object(Symbol.prototype.valueOf.call(value))`


## 对象遍历
> `Object.prototype.propertyIsEnumerable` 判断某属性是否可枚举
> `Object.prototype.hasOwnProperty()` 判断对象**自身**是否有某**可枚举**属性，包括 ‘字符串’、‘Symbol’
> ‘自身’指非原型链继承的属性

- 类数组对象的`index`
- `for...in` 获取对象上的所有**可枚举**的 ‘字符串’ 属性
- `Object.keys` 获取对象**自身**上的所有**可枚举**的 ‘字符串’ 属性
- `Object.getOwnPropertyNames()` 获取对象**自身**上的所有 ‘字符串’ 属性（包括不可枚举）
- `Object.getOwnPropertySymbols()` 获取对象**自身**上的所有 ‘Symbol’ 属性（包括不可枚举）
    > 对象初始的时候不会有任何‘Symbol’属性


## 位运算状态器
> 在一个值中定义多种状态值

```js
/**
 * @param {number} bitmask The bitmask flags.
 *  1 - Deep clone
 *  2 - Flatten inherited properties
 *  4 - Clone symbols
 */
function baseClone(value, bitmask, customizer, key, object, stack) {
  ...
  const isDeep = bitmask & (CLONE_DEEP_FLAG = 1)
  const isFlat = bitmask & (CLONE_FLAT_FLAG = 2)
  const isFull = bitmask & (CLONE_SYMBOLS_FLAG = 4)
  ...
}
```

- 设计：在0/1的值中，0代表`false`，1代表`true`，将值的某一位的0/1值约定为一种状态的是与否；
- 取值：使用`&`操作符
- 定值：同时多个状态为`true`时，状态值相加即可


