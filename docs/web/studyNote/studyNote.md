# 工作学习笔记

## 正则 exce()

**参数 1** ：要匹配的字符串

**返回值** ： 如果匹配失败，`exec()` 方法返回 [`null`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/null)，并将正则表达式的 [`lastIndex`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp/lastIndex) （匹配索引）重置为 0。

如果匹配成功，`exec()` 方法返回一个数组，并更新正则表达式对象的 [`lastIndex`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp/lastIndex) 属性。完全匹配成功的文本将作为返回数组的第一项，从第二项起，后续每项都对应一个匹配的捕获组。数组还具有以下额外的[属性](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp/exec)：

**示例1**

~~~js
/(\d+)(?:(.\d+)|)/.exec('100.2') // 输出 ['100.2' ，'123' , '.2' ， index： 0 ， groups: undefined , input:'123.2']

~~~

## 正则?:

忘记匹配?:后的结果，不将它划入匹配结果中

**非捕获组：**匹配 “x”，但不记得匹配。不能从结果数组的元素中收回匹配的子字符串 (`[1], ..., [n]`) or from the predefined `RegExp` object's properties (`$1, ..., $9`).

~~~js
reg=/abc(?:de|fg)/g
console.log(...str.matchAll(reg))
// ['abcde'] ['abcfg']
~~~



~~~js
reg=/abc(de|fg)/g
str='abcde12abcfg'
console.log(...str.matchAll(reg))
// ['abcde', 'de'] ['abcfg', 'fg']
~~~

