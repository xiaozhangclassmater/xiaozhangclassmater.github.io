## JavaScript 数据类型 

###  基本数据类型:  

~~~JS
Boolean（布尔值 ）
String (字符型) 
number （数字型，不区分浮点型和double） 
undefined （定义了变量 但未给值）
Null  (定义了变量 但赋值为 Null)
symbol (ES6 新增类型  实例是唯一且不可改变的)
~~~

### 引用数据类型

~~~JS

object （Object/Array/RegExp/Date）

~~~

**JavaScript 早期数据在底层存储以二进制方式进行存储  如果二进制的前三位为 0 则JavaScript 会认为该数据是个对象即object** 

**所以 null 的前三位均为 0  即 null 又是基本数据类型 又是 引用数据类型。（null 为object是第一版JavaScript 遗留的bug ）**

## JavaScript中为什么0.1+0.2不等于0.3？

转换过程会经过一下3步

### 1 转换二进制

**示例范文** ： https://www.javascriptc.com/books/nodejs-roadmap/javascript/floating-point-number-0.1-0.2.html

由于计算机内部存储都是由二进制进行存储，当进行运算的时候会先将0.1 进行二进制转换，而转换二进制的方式是 0.1 *2 不断乘2 进行取整， 000110011 ， 后面将会 0011 无限循环，

```js
0.1 * 2 = 0.2 --------------- 取整数 0，小数 0.2
0.2 * 2 = 0.4 --------------- 取整数 0，小数 0.4
0.4 * 2 = 0.8 --------------- 取整数 0，小数 0.8
0.8 * 2 = 1.6 --------------- 取整数 1，小数 0.6
0.6 * 2 = 1.2 --------------- 取整数 1，小数 0.2
0.2 * 2 = 0.4 --------------- 取整数 0，小数 0.4
0.4 * 2 = 0.8 --------------- 取整数 0，小数 0.8
0.8 * 2 = 1.6 --------------- 取整数 1，小数 0.6
0.6 * 2 = 1.2 --------------- 取整数 1，小数 0.2
...
```

### 使用IEEE 754标准存储

针对无限循环的问题，**IEEE754** 标准 

#### 64Bits 分为以下 3 个部分

1 ： sign  （符号位）

2 ： exponent （指数偏移值）

3 :  fraction（分数值）

![img](https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/General_floating_point_frac.svg/490px-General_floating_point_frac.svg.png)

#### sign 

​	由于计算器无法识别 正数和负数，所以会通过 0 和 1 来区分是正数还是负数 **0 为 正 1 为 负**（1 bit）

#### exponent

​	指数用来表示次方数

#### fraction(尾数)

最大后面可以存储多少位，由于尾数的第一位永远是 1 所以 可以在 52位基础上 + 1 也就是最大存储53 bit

### 对位运算，尾数求和 ，规格化和舍入

#### 对位运算

将转换完二进制进行对位匹配运算，浮点数加减会判断指数位是否相同，如果相同则进行运算 ，否则 `小阶向大阶看齐原则 `尾数向右移位，每移动一位，指数位加 1 直到指数位相同，即完成对阶。

#### 尾数求和

两个尾数直接求和

~~~js
 0  01111111100   1100110011001100110011001100110011001100110011001101 // 0.1 
+ 0  01111111100   1001100110011001100110011001100110011001100110011010 // 0.2
= 0  01111111100 100110011001100110011001100110011001100110011001100111 // 产生进位，待处理
~~~

#### 规格化和舍入

将存储多余的部分移除，然后进行十进制转换得出结果。

## String 类型  的字符操作执行过程 与存储大小？

- 创建 String 类型的一个实例
- 在实例上调用指定的方法
- 销毁这个实例

```JS
let obj = new String('JavaScript');
let value = obj.substr(2,1);
name = null;

字符串存储大小  1 字符  == 2 字节    1 字节(byte) ===  8比特 （bit 位 	）
```



## 什么是Trailing -commas ？

Trailing -commas 是JS ES8提出的一种语法规范， 它允许我们能够在参数后面跟上逗号

~~~JS
function foo (a , b ) {
    
}
foo( 1 , 2 ,)

//在es8之前  此类语法被解析时会发生报错 ， es8新增了 trailing commas
~~~



## JS中 ?? 和  || 的 区别 ？ 

~~~JS
/**
 * || 和 ?? 的区别 ? 
 * 
 * || 会将 0 "" undefined null  都识别 为 false  因此 执行后续代码 
 * 
 * ?? 只会 识别 null 或者 undefined  为false  其他的 0 "" 均为 true 
 */
~~~

## ES6中的Proxy 的捕获器	

~~~JS
// ES6的proxy 常见的 捕获器 
set (target ， key ， newVal) {
/*
 给对象设置值的时候 触发 
*/
}

get() {
}

has () {
    
}

deleteProperty () {
    
}

~~~

## 迭代器 和 迭代器协议

### 什么是迭代器？

​	1;：迭代器 : 本质上是一个对象 ， 它必须拥有 next 方法 ， 并且 next 是一个 无参数 的函数 

​	2：迭代器返回一个兑现 必须包含 done 和 value 

​	3： 当 迭代器的 done 值为 true 时证明该对象已经迭代完成。

#### 创建一个 迭代器？

~~~js
const nums = [1,2,,3,4]

const iterator = {
    next () {
       let index = 0
       if (index < num.length) {
           return {done : false , value : nums[index ++ ]
       }
           else {
               return { done : true : value : undefined } 
           }
    }
}
~~~

#### 创建一个生成迭代器的函数

~~~js

function createNuberIterator (arr) {
  let index = 0
  return {
    next : function () {
      return  index < arr.length ?  {done : false , value: nubmers[index ++]} : {done : true , value : undefined}
    }

  }
}

~~~

### 可迭代对象

~~~js

/**
 *可迭代对象 的原则 
  可迭代对象 中 必须包含  [Symbol.iterator]  且 类型是 函数类型 
  且 该函数 返回一个 迭代器 
   return {next()}
   有  [Symbol.iterator] 函数 才能使 一个可迭代的对象 ， 反之 不可迭代 
  [Symbol.iterator] : Function
 */


const iterator = {
  names : ["张三" , '李四' , '王五'],
  [Symbol.iterator] : function () {
    let index = 0
    return {
      next : () => index < this.names.length ? { done : false , value : this.names[index ++ ] } : { done : true , value : undefined }
    }
  }
}



for (const item of iterator) {
  console.log(item);
  
}

~~~



## 生成器对象

~~~JS
/**
 * 
 * 
 * 
 * 1： 生成器中 yield  与 retuen 的 区别 ？
 * 
 *    yield 能够阻止 代码的执行 ， return 则是将整合函数结束掉
 *    
 * 
 * 2 ： 生成器 中 next() 方法的返回值 ？ 
 *    next 方法 返回 生成器对象 ， 对象中包含 done , value 
 * 
 * 3 : 如何将 某些值获得的 结果 注入到 生成器对象中 
 *    通过 yield value 即可将该值 注入到此次 next 函数 返回的对象value 中
 * 
 * 4 ： 生成器 函数 调用 next 传入的参数如何获取？
 *   上一次的 yield 的 返回值 就是 此次的 调用 next 的参数 
 * 
 * 5： 生成器 函数 的 return 返回的值 会注入到 哪里去 ? 
 *  
 *    生成器 return 的值 会注入到最后 一个 生成器对象中 并且 返回的值 是 生成器对象的value 
 * 
 * 
 * 
 */

function request (url) {
  return new Promise((resolve , reject) => {
    setTimeout(() => {
      resolve(url)
    },1000);
  })
}


/**
 * 
 *实现 三次调用  why + aaa + bbb + ccc
 * 
 */


// 创建生成器对象
 function* getFun () {
  const res1 = yield request("zhang")
  const res2 = yield request(res1 + 'aaa')
  const res3 = yield request(res2 + 'bbb')
  const res4 = yield request(res3 + 'ccc')
  console.log(res4);
 }



// 递归调用请求

 function createGenerator (getFun) {
  const  generator = getFun()

    function exec (res) {
      const result = generator.next(res)
      if(result.done)  return result.value
      result.value.then(res => {
        exec(res)
      })
    }

    exec()
 }
 

 createGenerator(getFun)

async await 的实现原理？

~~~

## node环境下的事件循环

Node 环境下 每一个`Tick` 会执行 一个完整的 事件循环 ， 分别执行循序为

1. node中的定时器
2. 待定的回调 ， 例如 某些系统操作 执行的一些回调函数 
3. udle， prepare ： 系统内部使用
4. 轮询 ：检索新的 I/O事件 与 I/O回调
5. 检测 setimmediate  回调函数 
6. 关闭的一些函数，关闭某些进程或者socket 技术 

## commonJS中 require 函数查找机制 

1：当导入某个 文件路径时 不跟上后缀时 ， `require` 的`查找机制`为

​	根据导入的文件名称 先查找 文件，找到之后 则  `文件名 + js`

​	如果 没找到 ，则是 查找 `文件名 + .js , 文件名 + .JSON , 文件名 + .node`,

​	如果上面这些流程走完还没找到 ，则根据文件名找文件夹 ，，如果有 则直接找当前文件夹下的index.js

否则 ，则是 查找 `文件名 + .js , 文件名 + .JSON , 文件名 + .node`,



最终还没找到 ， 则会报错未找到该文件

## AMD CMD与commonJS 三种标准规范

### AMD

​	AMD的规范与 commonJS的规范区别是最大的，它采用的是 require.config() 定义模块配置 ， defind 导出当前模块的内容

~~~js
// CMD 规范导入配置需选项
require.config({
  baseUrl : '',
    // 初始化模块注入 
  paths : {
    foo : './src/foo',
    bar : './src/bar'
  }
})
// 加载模块
require(['foo'] , function (foo) {
  console.log(foo);
}) 


//导出 模块 

defind(function () {
    const name = 18 
    return {
        name //即可
    }
    
})

~~~

## 前端数据传输格式

传输格式  ： JSON（JavaScript Object Notation） ,XML , ProtoBuf

### JSON 

#### JSON.stringify() 方法 参数

 params1 : 需要转换的对象

params2 ： 需要对哪些属性进行转换 ， 也可以传入回调函数

params3 ： 以某种字符进行格式JSON对象

> toJSON 方法 ： 如果被转换的对象中 有 toJSON 方法 ， 则 本次转换会把toJSON函数的返回值 作为转换结果

## cookie常见的属性	

>expries : 设置过期时间
>
>max-age : 设置过期的秒钟
>
>domain ： 哪些主机地址可以接收 cookie 

