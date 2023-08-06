# 	Vue3源码笔记

## 1 : vue3中 ref and reactive根本区别到底在哪里？

### 1.1 ref and reactive 怎么用 ?

相信大家都知道在vue3中我们可以通过一些api去定义响应式数据，比如 `ref`, `reactive` ,`shallowRef`.

`ref 基本使用`
~~~js
<template>
    <div>
        <span>{{inner.content.text}}</span>
         <span>{{count}}</span>
    </div>
 </template>
<script setup>
const inner = ref({
  content: {
    text: "内部内容"
  }
}); // 你可以通过 ref 定义复杂数据类型
// or
const count = ref(20); //  定义普通数据类型
</script>
~~~
`reactive 基本使用`
~~~js
<template>
  <div>
    <div>{{wapper.subText}}</div>
    <div v-for="item in list" :key="item.id">{{item.content}}</div>
  </div>
</template>
<script setup>
const wapper = reactive({
  subText: inner
});
const list = reactive([
  {
    id: 1,
    content: "render"
  },
  {
    id: 2,
    content: "render2"
  }
]);
</script>
~~~
当然你还可以配合 `computed` od `watchEffec`使用 这里我就不再过多介绍了。

### 1.2 ref 和 reactive 的区别？
相信大家读到这里可以看出 ref 既可以定义基本数据类型 也可以 定义复杂数据类型，而reactive只定义复杂数据类型。

那有人就问了 ？ reactive 只能存 复杂数据类型吗？

答案很明显不是的 reactive也可以存基本数据类型

那他们到底区别在哪里呢？ 我想这个时候 从我们开发者的角度上没办法看出本质的区别，无非是定义变量呗，那接下来请随者我一起进入`源码`的是世界。

### 1.3 源码实现流程 ？ 

**1.3.1 如何找到源码?**

先回答第一个问题，怎么找源码，这个需要你对源码的包非常熟悉 我们可以通过看`package.json`文件先找到它打包的入口文件，然后再去根据不同的情况找不同的文件。

**1.3.2 ： 找到ref函数的源码文件 ，看看函数内部做了什么事情？**

源码文件 : `core\packages\reactivity\src\ref.ts`
 
`ref.ts`

**核心代码实现**
~~~js
// ref.ts 文件93 行 
export function ref(value?: unknown) {
  return createRef(value, false) //1 ： 提供 ref函数 ， false 是否浅复制
}
// ref.ts文件第 127行  
// 调用 ref 返回一个 创建 的方法 createRef 传入 两个值 
/**
 * @param rawValue ref函数传入的参数
 * @param shallow 是否浅复制
 */
function createRef(rawValue: unknown, shallow: boolean) {
  if (isRef(rawValue)) { // 是否是ref对象 如果是 则 直接返回
    return rawValue
  }
  return new RefImpl(rawValue, shallow) // 否则 创建 ref 对象 传入 rawValue shallow
}


// ref.ts 文件第 134行 
class RefImpl<T> { // 创建一个 ref的 实现类 
  private _value: T // 创建私有的 _value 变量 
  private _rawValue: T // 创建私有的 _rawValue 变量 

  public dep?: Dep = undefined // 是否 dep 
  public readonly __v_isRef = true // 只读的 属性 是否是 ref 

  constructor(value: T, public readonly __v_isShallow: boolean) {
    // 实例被 new时 执行 constructor 保存 传入的值
    this._rawValue = __v_isShallow ? value : toRaw(value) // 是否浅复制 ， 如果时 则直接返回 传入的值 否则进行 获取其原始对象
        this._value = __v_isShallow ? value : toReactive(value) // 是否浅复制 是 返回原value 否则 转换成 reactive 对象
  }

  get value() { // 获取值的时候 直接将 constructor 保存的值 返回 
    trackRefValue(this) // 跟踪 ref 的 value
    return this._value  // 获取value 是 返回 _value 对象
  }

  set value(newVal) {// 当 设置值的时候 往下看 
  
  // 是否浅复制 or 值身上是否有 __v_isShallow 标识 or 是否是只读的 标识__v_isReadonly
    const useDirectValue = this.__v_isShallow || isShallow(newVal) || isReadonly(newVal); 
    // 如果满足 则 返回新设置的值  ， 如果不是 则 取出 新值的原始对象 
    newVal = useDirectValue ? newVal : toRaw(newVal)  // 如果 你一个 浅层对象（普通数据类型） 则 原值返回 否则 判断是否能从 代理对象中 取出源值
    if (hasChanged(newVal, this._rawValue)) { // 判断对象是否发生 变化 变了向下走  
      this._rawValue = newVal // 将最新值 赋给 _rawValue
      this._value = useDirectValue ? newVal : toReactive(newVal) // 判断是否是基本数据类型  如果 是 则 将最新值返回 否则 继续转换 reactive
      triggerRefValue(this, newVal) // 触发 ref 的 value 值进行监听更新
    }
  }
}
// 判断是否 是对象 如果是 则 reactive代理 否则 返回 当前的value
export const toReactive = <T extends unknown>(value: T): T => 
isObject(value) ? reactive(value) : value
~~~
以上代码就是 ref 的核心实现 ， 相信看来好像源码也没有那么难。

**1.3.3.总结一下 ref做了什么？**
1. 调用ref将 定义的数据传入，返回一个创建ref响应式数据的函数，是否需要浅层复制，默认为false，也就意味着一定会走 转换成 `reactive`
2. 调用`createRef`， 判断是否 是一个 ref对象 ，是 原值返回 否则 ， new 一个 实现ref类 
3. 创建类的私有变量 ，保存传入的`value` 和 `shallow`
4. 判断是否浅层复制，如果是则 返回传入的 value，否则取出 ref的原始值对象
5. 获取值的时候将 保存的值 返回 出去 
6. 设置值的时候 判断当前属性 是否是浅层对象 ，如果是 则返回该数据 否则 调用 toreactive转换 reactive 进行操作 
7. 触发更新

**1.3.4 ： 找到reactve函数的源码文件 ，看看函数内部做了什么事情？**

`reactive.ts`

~~~js
export function reactive(target: object) {
  // if trying to observe a readonly proxy, return the readonly version.
  if (isReadonly(target)) { // 如果是 只读的 不允许 写入 则返回只读对象
    return target
  }
  return createReactiveObject( // 返回一个创建 reactive 的对象
    target, // 传入 目标对象
    false, // 是否是只读对象 
    mutableHandlers, //提供 get, set, deleteProperty, has, ownKeys 方法
    mutableCollectionHandlers, // 太多了 自己看源码 
    reactiveMap // 提供一个 weakmap 集合
    
  )
}
function createReactiveObject(
  target: Target,
  isReadonly: boolean,
  baseHandlers: ProxyHandler<any> 
  collectionHandlers: ProxyHandler<any>,
  proxyMap: WeakMap<Target, any>
) {
  if (!isObject(target)) {  // 如果不是一个对象 则 返回当前 traget 
    if (__DEV__) {
      console.warn(`value cannot be made reactive: ${String(target)}`)
    }
    return target
  }
  // target is already a Proxy, return it.
  // exception: calling readonly() on a reactive object
  if (
    target[ReactiveFlags.RAW] && // 如果target 已经是一个 代理对象 则 返回当前对象
    !(isReadonly && target[ReactiveFlags.IS_REACTIVE])
  ) {
    return target
  }
  // target already has corresponding Proxy
  const existingProxy = proxyMap.get(target) // 如果对象已经有了代理对象 则直接取值 返回 
  if (existingProxy) {
    return existingProxy
  }
  // only specific value types can be observed.
  const targetType = getTargetType(target) // 观察指定类型
  if (targetType === TargetType.INVALID) {
    return target
  }
  const proxy = new Proxy( // 将对象进行代理 
    target,
    targetType === TargetType.COLLECTION ? collectionHandlers : baseHandlers
  )
  proxyMap.set(target, proxy) // 设置目标为代理对象 
  return proxy // 将对象返回出去
}  
~~~
**1.3.5.总结一下 reactive做了什么？**

1. 调用`reactive`方法 传数据，判断 对象是否是只读对象 如果是 直接返回 无法操作 否则向下继续执行
2. 调用 `createReactiveObject` 返回一个代理对象
3. 判断传入的值是不是一个对象 如果不是则直接原路返回，否则判断target 是不是一个 已经代理过了的对象
4. 如果是代理过的对象 原路返回 否则 判断目标对象是否有相应代理有直接取出响应代理对象 否则 继续向下
5. 针对不同的 值类型处理
6. 代理整个`trarget` 我，将当前代理的对象设置到weakmap 中 将代理完的对象返回



### 1.4 总结

从源码的角度来说 `ref`本身是必然会调用 `reactive`，所以ref底层一定是通过reactive实现的，针对不同的数据类型会进行操作，当你ref为 对象时会转换 `reactive`对象 将代理的对象 返回给 `_value`对象,如果是基本数据则会判断是否需要浅层复制，不需要则直接返回了。
而 `reactive` 这边也会判断 是不是 基本数据类型 是 直接返回 否则就直接将对象进行了代理并返回。相信本篇文章能够给你带来一些启发。


## 2 ： Vue是如何对异常错误进行统一处理的

1： Vue提供了 `callWithErrorHandling`  ， `handleError`，函数，前者对函数错误进行异常捕获，后者 对错误进行处理

~~~JS
export function callWithErrorHandling(
  fn: Function,
  instance: ComponentInternalInstance | null,
  type: ErrorTypes,
  args?: unknown[]
) {
  let res
  try {
    res = args ? fn(...args) : fn()
  } catch (err) {
    handleError(err, instance, type)
  }
  return res
}
~~~