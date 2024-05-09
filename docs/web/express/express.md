## express是什么？🖥

`express` 是基于 [Node.js](https://nodejs.org/en/) 平台，快速、开放、极简的 Web 开发框架。

他能干什么？

1. 帮助我们更高效的开发nodejs
2. 拥有灵活的中间件
3. 分成结构清晰 ，易上手

## nodemon的基本使用🛒

作用 ： `nodemon`可以只需要启动一次服务，nodemo可以监听文件变化，当文件发生变化时会重新编译服务

[nodemon-github文档](https://github.com/remy/nodemon)

**配置 **`nodemon.json`

~~~json
{
  "watch": [ // 监听哪些文件的变化 
    "*.js",
    "*.json"
  ],
  "ignore": [
    "package*.json", // 忽略那些文件
    "nodemon.json"
  ]
}
~~~



## express 的基本使用✌

### 1 ： **安装**

~~~shell
npm install express --save	
~~~

### 2 : **启动一个简单服务器**

~~~js
const express = require('express')
const path = require('path')
const app = express()
const port = 8081
app.listen(port, () => {
  console.log(`server running in ${port}`);
})
~~~

### 3：**开发接口**

通过 `get` or `post`...等方法进行处理接口请求

**req** :请求信息 包含了 url 和 请求方法 等等

**res** : 响应对象，包含了响应的方法 `send` or `setHeader` 等等。

~~~js
app.get('/api/student' , (req , res ， next) => {
  console.log(req.body)
  res.send({
    data: []
  })
}，() => {} ) // 多个callback，你也可以在里面接入中间件
~~~

## Router🎫

作用 ： **express**的router是接近于 `restful `api接口规范,它能够帮助你统一根据某个url地址进行匹配。

例如 

~~~js
const express = require('express')
const path = require('path')
const app = express()
const studentRouter = express.Router()
studentRouter.get('/' , getStudent)
studentRouter.get('/:id' , getStudentById)
studentRouter.post('/' , addStudent)
studentRouter.delete('/:id' , deleteStudent)
function getStudent （req , res）{
    // 处理函数
}
app.use('/bff/student' , studentRouter)
app.listen(port, () => {
  console.log(`server running in ${port}`);
})
~~~

## 中间件🎃

[更多中间件，见文档](https://www.expressjs.com.cn/guide/using-middleware.html#middleware.application)

### 常用中间件

1 ：`express`.static("静态资源路径")

针对服务端的静态资源做处理的中间件，它可以将指定的服务器资源进行返回到浏览器

2：`express`.json

针对请求体，数据为 JSON 类型的数据进行解析，因为网络传输的数据都是以`stream`流的形式传输，所以需要json中间件进行统一转换，最后返回对象。

3：`express`.urlencoded

针对`application/x-www-form-urlencoded` 请求的数据进行解析处理，将数据转换完成后存放到req.body中，原理同` express`.json

### 实现 `urlencoded` 中间件

~~~JS
const qs = require('querystring')
module.exports = (req , res , next) => {
    let str = '';
    if(req.headers['content-type'] === 'application/x-www-form-urlencoded') {
        req.on("data", chunk => {
            str += chunk.toString('utf-8')
        })
        req.on("end", async () => {
            // console.log()
            const query = qs.parse(str)
            req.body = query
            next()
        })
    }else{
        next()
    }
}
~~~

## 实现客户端访问一个地址，自动下载文件到本地？

实现改功能的核心在于 ，服务端将 请求的响应头设置为 

`Content-Disposition ： attachment; filename="filename.jpg"`

这样 浏览器识别的 响应头的时候 遇到 attachment 会自动下载该文件

~~~JS
const { Router } = require('express')
const downloadRouter = Router()
const { downloadService  } = require('@/services')
downloadRouter.get('/:filename', handleGetFile) // 设置 路由

/**
 * @Description: 处理客户端下载文件
 * @author xiaoZhang
 * @date 2023/9/20
*/
async function handleGetFile (req, res) {
    await downloadService.downloadFile(req,res)
}

module.exports = downloadRouter

~~~

`Service.js`

~~~JS

const path = require('path')
/**
 * @Description: 下载文件
 * @author xiaoZhang
 * @date 2023/9/20
*/
exports.downloadFile = function downloadFile (req ,res) {
  try {
      const { filename } = req.params
      const absPath = path.resolve(__dirname , `../../../public/assets/${filename}`)
      res.download(absPath , filename)
  }catch (e) {}
}

~~~

### Content-Disposition

在 HTTP 场景中，第一个参数或者是 `inline`（默认值，表示回复中的消息体会以页面的一部分或者整个页面的形式展示），或者是 `attachment`（意味着消息体应该被下载到本地；大多数浏览器会呈现一个“保存为”的对话框，将 `filename` 的值预填为下载后的文件名，假如它存在的话）



```JSON
Content-Disposition: inline
Content-Disposition: attachment
Content-Disposition: attachment; filename="filename.jpg"
```

## cookie的组成⚽

cookie是浏览器中特有的一个概念，它就像浏览器的专属卡包，管理着各个网站的身份信息。

每个cookie就相当于是属于某个网站的一个卡片，它记录了下面的信息：

- key：键，比如「身份编号」
- value：值，比如袁小进的身份编号「14563D1550F2F76D69ECBF4DD54ABC95」，这有点像卡片的条形码，当然，它可以是任何信息
- domain：域，表达这个cookie是属于哪个网站的，比如`yuanjin.tech`，表示这个cookie是属于`yuanjin.tech`这个网站的
- path：路径，表达这个cookie是属于该网站的哪个基路径的，就好比是同一家公司不同部门会颁发不同的出入证。比如`/news`，表示这个cookie属于`/news`这个路径的。（后续详细解释）
- secure：是否使用安全传输（后续详细解释）
- expire：过期时间，表示该cookie在什么时候过期

当浏览器向服务器发送一个请求的时候，它会瞄一眼自己的卡包，看看哪些卡片适合附带捎给服务器

如果一个cookie**同时满足**以下条件，则这个cookie会被附带到请求中

- cookie没有过期
- cookie中的域和这次请求的域是匹配的
  - 比如cookie中的域是`yuanjin.tech`，则可以匹配的请求域是`yuanjin.tech`、`www.yuanjin.tech`、`blogs.yuanjin.tech`等等
  - 比如cookie中的域是`www.yuanjin.tech`，则只能匹配`www.yuanjin.tech`这样的请求域
  - cookie是不在乎端口的，只要域匹配即可
- cookie中的path和这次请求的path是匹配的
  - 比如cookie中的path是`/news`，则可以匹配的请求路径可以是`/news`、`/news/detail`、`/news/a/b/c`等等，但不能匹配`/blogs`
  - 如果cookie的path是`/`，可以想象，能够匹配所有的路径
- 验证cookie的安全传输
  - 如果cookie的secure属性是true，则请求协议必须是`https`，否则不会发送该cookie
  - 如果cookie的secure属性是false，则请求协议可以是`http`，也可以是`https`

如果一个cookie满足了上述的所有条件，则浏览器会把它自动加入到这次请求中

具体加入的方式是，**浏览器会将符合条件的cookie，自动放置到请求头中**，例如，当我在浏览器中访问百度的时候，它在请求头中附带了下面的cookie：

![](http://mdrs.yuanjin.tech/img/image-20200417170328584.png)

看到打马赛克的地方了吗？这部分就是通过请求头`cookie`发送到服务器的，它的格式是`键=值; 键=值; 键=值; ...`，每一个键值对就是一个符合条件的cookie。

**cookie中包含了重要的身份信息，永远不要把你的cookie泄露给别人！！！**否则，他人就拿到了你的证件，有了证件，就具备了为所欲为的可能性。

## 设置cookie🤷‍♂️

由于cookie是保存在浏览器端的，同时，很多证件又是服务器颁发的

所以，cookie的设置有两种模式：

- 服务器响应：这种模式是非常普遍的，当服务器决定给客户端颁发一个证件时，它会在响应的消息中包含cookie，浏览器会自动的把cookie保存到卡包中
- 客户端自行设置：这种模式少见一些，不过也有可能会发生，比如用户关闭了某个广告，并选择了「以后不要再弹出」，此时就可以把这种小信息直接通过浏览器的JS代码保存到cookie中。后续请求服务器时，服务器会看到客户端不想要再次弹出广告的cookie，于是就不会再发送广告过来了。

## 服务器端设置cookie🤦‍♂️

服务器可以通过设置响应头，来告诉浏览器应该如何设置cookie

响应头按照下面的格式设置：

```yaml
set-cookie: cookie1
set-cookie: cookie2
set-cookie: cookie3
...
```

通过这种模式，就可以在一次响应中设置多个cookie了，具体设置多少个cookie，设置什么cookie，根据你的需要自行处理

其中，每个cookie的格式如下：

```
键=值; path=?; domain=?; expire=?; max-age=?; secure; httponly
```

每个cookie除了键值对是必须要设置的，其他的属性都是可选的，并且顺序不限

当这样的响应头到达客户端后，**浏览器会自动的将cookie保存到卡包中，如果卡包中已经存在一模一样的卡片（其他key、path、domain相同），则会自动的覆盖之前的设置**。

下面，依次说明每个属性值：

- **path**：设置cookie的路径。如果不设置，浏览器会将其自动设置为当前请求的路径。比如，浏览器请求的地址是`/login`，服务器响应了一个`set-cookie: a=1`，浏览器会将该cookie的path设置为请求的路径`/login`
- **domain**：设置cookie的域。如果不设置，浏览器会自动将其设置为当前的请求域，比如，浏览器请求的地址是`http://www.yuanjin.tech`，服务器响应了一个`set-cookie: a=1`，浏览器会将该cookie的domain设置为请求的域`www.yuanjin.tech`
  - 这里值得注意的是，如果服务器响应了一个无效的域，浏览器是不认的
  - 什么是无效的域？就是响应的域连根域都不一样。比如，浏览器请求的域是`yuanjin.tech`，服务器响应的cookie是`set-cookie: a=1; domain=baidu.com`，这样的域浏览器是不认的。
  - 如果浏览器连这样的情况都允许，就意味着张三的服务器，有权利给用户一个cookie，用于访问李四的服务器，这会造成很多安全性的问题
- **expire**：设置cookie的过期时间。这里必须是一个有效的GMT时间，即格林威治标准时间字符串，比如`Fri, 17 Apr 2020 09:35:59 GMT`，表示格林威治时间的`2020-04-17 09:35:59`，即北京时间的`2020-04-17 17:35:59`。当客户端的时间达到这个时间点后，会自动销毁该cookie。
- **max-age**：设置cookie的相对有效期。expire和max-age通常仅设置一个即可。比如设置`max-age`为`1000`，浏览器在添加cookie时，会自动设置它的`expire`为当前时间加上1000秒，作为过期时间。
  - 如果不设置expire，又没有设置max-age，则表示会话结束后过期。
  - 对于大部分浏览器而言，关闭所有浏览器窗口意味着会话结束。
- **secure**：设置cookie是否是安全连接。如果设置了该值，则表示该cookie后续只能随着`https`请求发送。如果不设置，则表示该cookie会随着所有请求发送。
- **httponly**：设置cookie是否仅能用于传输。如果设置了该值，表示该cookie仅能用于传输，而不允许在客户端通过JS获取，这对防止跨站脚本攻击（XSS）会很有用。 
  - 关于如何通过JS获取，后续会讲解
  - 关于什么是XSS，不在本文讨论范围

下面来一个例子，客户端通过`post`请求服务器`http://yuanjin.tech/login`，并在消息体中给予了账号和密码，服务器验证登录成功后，在响应头中加入了以下内容：

```
set-cookie: token=123456; path=/; max-age=3600; httponly
```

当该响应到达浏览器后，浏览器会创建下面的cookie：

```yaml
key: token
value: 123456
domain: yuanjin.tech
path: /
expire: 2020-04-17 18:55:00 #假设当前时间是2020-04-17 17:55:00
secure: false  #任何请求都可以附带这个cookie，只要满足其他要求
httponly: true #不允许JS获取该cookie
```

于是，随着浏览器后续对服务器的请求，只要满足要求，这个cookie就会被附带到请求头中传给服务器：

```yaml
cookie: token=123456; 其他cookie...
```

现在，还剩下最后一个问题，就是如何删除浏览器的一个cookie呢？

如果要删除浏览器的cookie，只需要让服务器响应一个同样的域、同样的路径、同样的key，只是时间过期的cookie即可

**所以，删除cookie其实就是修改cookie**

下面的响应会让浏览器删除`token`

```yaml
cookie: token=; domain=yuanjin.tech; path=/; max-age=-1
```

浏览器按照要求修改了cookie后，会发现cookie已经过期，于是自然就会删除了。

> 无论是修改还是删除，都要注意cookie的域和路径，因为完全可能存在域或路径不同，但key相同的cookie
>
> 因此无法仅通过key确定是哪一个cookie

## 客户端设置cookie🐱‍👓

既然cookie是存放在浏览器端的，所以浏览器向JS公开了接口，让其可以设置cookie

```js
document.cookie = "键=值; path=?; domain=?; expire=?; max-age=?; secure";
```

可以看出，在客户端设置cookie，和服务器设置cookie的格式一样，只是有下面的不同

- 没有httponly。因为httponly本来就是为了限制在客户端访问的，既然你是在客户端配置，自然失去了限制的意义。
- path的默认值。在服务器端设置cookie时，如果没有写path，使用的是请求的path。而在客户端设置cookie时，也许根本没有请求发生。因此，path在客户端设置时的默认值是当前网页的path
- domain的默认值。和path同理，客户端设置时的默认值是当前网页的domain
- 其他：一样
- 删除cookie：和服务器也一样，修改cookie的过期时间即可

## cookie 总结🎂

以上，就是cookie原理部分的内容。

如果把它用于登录场景，就是如下的流程：

**登录请求**

1. 浏览器发送请求到服务器，附带账号密码
2. 服务器验证账号密码是否正确，如果不正确，响应错误，如果正确，在响应头中设置cookie，附带登录认证信息（至于登录认证信息是设么样的，如何设计，要考虑哪些问题，就是另一个话题了，可以百度 jwt）
3. 客户端收到cookie，浏览器自动记录下来



**后续请求**

1. 浏览器发送请求到服务器，希望添加一个管理员，并将cookie自动附带到请求中
2. 服务器先获取cookie，验证cookie中的信息是否正确，如果不正确，不予以操作，如果正确，完成正常的业务流程

