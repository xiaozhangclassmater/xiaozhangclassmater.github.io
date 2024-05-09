# 1：webpack基础篇

## webpack启动一个服务

webpack 启动一个服务的必要因素

1：需要 webpack-dev-serve 插件的支持

2：webpack-CLI 的脚手架包支持

~~~json
{
    "serve": "webpack-dev-serve --config ./webpack.config.js"
}
~~~

~~~js
// webpack.config.js
module.exports = {
    entry:{
        index: './src/index.js',
    },
    output:{
        path: path.resolve(__dirname , './dist')
        filename: '[name].js'
    }
}
~~~

## webpack 中如何配置打包 指定的入口文件？

```js
// webpack.config.js
module.exports = {
    entry ： '需要打包的文件入口路径',
    output ： {
        path ： 绝对路径，
        pathname ：'' // 打包的文件别名
    }
    
}
```

## npm 与 npx 的区别 ?

npm 主要是对包的资源进行下载 ，或者设置镜像地址等 

在 node 5.2 以后 安装 node 自带一个 npx 指令 ， npx 会从当前项目的node_modules 中寻找对应的资源执行代码

## webpack 开启自动编译的三种模式

1 ： webpack --watch

2： webpack-dev-server

3:    watch选项

### 通过 --watch

​	通过执行 webpack --watch  命令实现 自动编译

```JS
    "watch": "webpack --watch"
```

### 通过 配置 watch 选项

```JS
const path = require('path')
module.exports = {
  entry : './src/index.js',
  output :  {
    path : path.resolve(__dirname , './dist/'),
    filename : 'bound.js'
  },
  mode : 'production',
  watch : true  // 配置watch 选项
}
```

### 通过插件 webpack-dev-server

```HTML
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <ul>
    <li>1</li>
    <li>2</li>
    <li>3</li>
    <li>4</li>
    <li>5</li>
  </ul>
  <script src="./main.js"> </script>
</body>
</html>
```



```JS
1:下载插件
// npm install webpack-dev-server -D

// webpack5.0 之后配置 找到服务启动的静态资源
 devServer : {
    static : './dist/index.html'
 },

```

## Html-Webpack-plugin 和 webpack-dev-middleware 的作用

`Html-Webpack-plugin` : 将 指定的html模板文件作为一个新的html放入到指定目录，并自动引入打包完成的JS文件

`webpack-dev-middleware` : 将webpack.config.js 文件的配置 作为配置项，给到中间件 进行编译，并开启一台服务器

```JS
plgins : [
    new HtmlWebpackPlugin({
      filename : 'index.html',
      template : './index.html'
    })
]
```

## webpack loader 的作用 

### **1:style-loader 与 css-loader 的区别 ？** 

css-loader : 将 css 进行解析

style-loader ： 将样式 插入到html style 标签里

### styles | css loader 的解析顺序

webpack 打包 解析 loader ，从右到左进行执行。

### config

```JS
 module : {
    rules : [
      {
        test : /\.css$/,
        use : ['style-loader' , 'css-loader']
      },
      {
        test : /\.less$/,
        use : ['style-loader' , 'css-loader' , 'less-loader']
      }
    ]
  },
```

### babel-loader 

主要作用 将 es6 的js 代码 转换为 es5 的 代码

```JS
 { 
     test : /\.js$/,
       use : {
         loader : 'babel-loader',
         plugin : ['@babel/env']
       },
      exclude : /node_modules/

 }
```

## javascript scourse map 的作用

```js
// 主要功能方便代码调试 能够精准的定位打印的行数
devTool： 'eval'

```

## bannerPlugin 和 clean-webpack-plugin和 cpoy-webpack-plugin

### bannerPlugin 

​	对 打包的js文件 在首行 添加指定的注释 （插件）

### clean-webpack-plugin

​	功能： 自动清除 打包完成后的 dist 目录

### cpoy-webpack-plugin

​	功能 ： 复制指定的文件 到指定的 目录 ，主要作用是 未参与 webpack 打包的文件 进行复制 

**配置** 

```JS
const copyWebpackPlugin =  require('cpoy-webpack-plugin')
plugins:[
    new copyWebpackPlugin({
        patterns : [
            {
                from : path.resolve(__dirname , 'assets'),
                to : 'assets' // 复制到哪里 ， 可支持 相对路径 和 绝对路径
            }
        ]
    })
]
```

## webpack中如何对html文件中引入的资源进行打包

### 使用 html-withimg-loader 对 html文件中的静态资源进行打包

```JS
 {
        test : /\.(htm|html)$/,
        use : {
          loader : 'html-withimg-loader'
        }
 },
```

# 2：wenpack进阶篇

## webpack 对多个html页面进行打包。

```js
//在 entry 配置对象中 
entry ： {
    index : ‘./index.js’ // 主入口js文件
    other : './other.js' // other文件 
}
plugins : [
 new HtmlWebpackPlugin({
      filename : 'index.html',
      template : './index.html',
      chunks : ['index']  // 打包完成的 html 需要引入哪个js文件
 }),
 new HtmlWebpackPlugin({
      filename : 'other.html',
      template : './other.html',
      // 打包完成的 html 需要 引入哪个js文件
      chunks : ['other']
 }),
]
```

## 第三方库 webpack 引入 注入到全局

```JS
{
     // 将三方包注入 全局变量中
 test : require.resolve('jquery'),
   use : {
        loader : 'expose-loader',
        options : {
            exposes : ['$','jquery']
          }
    }
}
```

或者通过 webpack 内部插件 进行 注入`webpack.ProvidePlugin`

```JS
new webpack.ProvidePlugin({
    $:'jquery',
    jquery : 'jquery'
})
```

## webpack 区分环境打包配置

webpack 如何根据 不同环境 进行 不同配置打包？

​	我们可以将 webpack 打包配置 分为  `webpack.prod,js`  ， `webpack.dev.js` , `webpack.base.js`

### webpack.base.js 

​	该文件配置打包的基本配置 ， webpack 提供了 `merge`函数，可以将多个配置进行合并

```JS
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CpoyWebpackPlugin = require('copy-webpack-plugin')
const { webpack } = require('webpack')
module.exports = {
  // 多页应用打包
  entry : {
    index :  './src/index.js',
    other : './src/other.js'
  },
  output :  {
    path : path.join(__dirname ,'..', './dist/'),
    filename : '[name].js'
  },
  module : {
    rules : [
      {
        test : /\.css$/,
        use : ['style-loader' , 'css-loader']
      },
      {
        test : /\.less$/,
        use : ['style-loader' , 'css-loader' , 'less-loader']
      },
      // 配置 file-loader 解析文件 
      {
        test : /\.(png|jpeg|jpg|bmp)$/,
        use : {
          loader : 'url-loader',
          options : {
            limit : 5 * 1024,
            outputPath : 'images',
            name : '[name].[ext]'
          }
        }
      },
      { 
        test : /\.js$/,
        use : {
          loader : 'babel-loader',

        },
        exclude : /node_modules/
        
      },
      {
        test : /\.(htm|html)$/,
        use : {
          loader : 'html-withimg-loader'
        }
      },
      {
        // 将三方包注入 全局变量中
        test : require.resolve('jquery'),
        use : {
          loader : 'expose-loader',
          options : {
            exposes : ['$','jquery']
          }
        }
      }
    ]
  },
  plugins : [
    //  配置多个 html页面打包
    new HtmlWebpackPlugin({
      filename : 'index.html',
      template : './index.html',
      chunks : ['index']
    }),
    new HtmlWebpackPlugin({
      filename : 'other.html',
      template : './other.html',
      // 打包完成的 html 需要 引入哪个js文件
      chunks : ['other']
    }),
    new CleanWebpackPlugin(),
    new CpoyWebpackPlugin ({
      patterns : [
        {
          from : path.resolve(__dirname , '..' , 'assets'),
          to : 'assets'
        }
      ]
    }),
    
  ],
}
```



### webpack.dev.js

该文件中 ， 通常是编写开发环境的配置，例如配置 sourceMap ， devServer 等

```JS
const { merge } = require('webpack-merge')  // webpack 提供 merge ，当然你需要先下载 npm install webpack-merge
const baseConfig = require('./webpack.base')
const webpack = require("webpack");
// 合并 基础配置 和 dev 配置 
module.exports = merge(baseConfig , {
  devServer : {
    open : true,
    hot : true,
  },
  plugins : [
    new webpack.DefinePlugin({
      dev : 'true'
    })
  ],
  mode : 'development',
  devtool : 'cheap-module-source-map'
}) 
```

### webpack.prod.js

该文件 通常配置 生产时需要的一些配置 

```JS
const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.base')
const webpack = require("webpack");
module.exports = merge(baseConfig , {
  mode : 'production',
  plugins :[
      // 注入 变量到全局 ，便于环境配置 
    new webpack.DefinePlugin({
      // 注意 此时 value 是当作 表达式去执行的 ，如果你希望 true 是字符串 你需要 '"true"' 这样编写
      dev : 'false'
    })
  ],
  devtool : 'cheap-module-source-map'
})  
```

## webpack跨域解决方案

### 什么是跨域 ？

出于浏览器的同源策略限制。同源策略（Sameoriginpolicy）是一种约定，它是浏览器最核心也最基本的安全功能，如果缺少了同源策略，则浏览器的正常功能可能都会受到影响。可以说Web是构建在同源策略基础之上的，浏览器只是针对同源策略的一种实现。同源策略会阻止一个域的。javascript脚本和另外一个域的内容进行交互。所谓同源（即指在同一个域）就是两个页面具有相同的协议（protocol），主机（host）和端口号 

### 前端解决跨域方案

#### 使用 代理进行跨域解决

​	出现时机 ： 一般出现在 开发时，上线后前端代码与后端代码在一台服务器上，因此不会出现跨域

​	**原理** ： 项目在本地通过开启一台服务器，由服务器转发到服务端，同源策略只是在浏览器与服务器之间的一种限制，服务器与服务器之前不会进行同源策略限制，因此我们在本地接口像本地服务器发送，本地服务器再向服务端发送，就可以解决跨域。

#### 利用JSONP进行跨域解决

**原理** ： jsonp 原理 就是 ， 通过动态创建 script 标签 进行请求服务端 ，然后将 参数拼接到 script src 路径上进行请求。

#### 使用nginx 代理进行跨域解决

**原理** ： 客户端向服务器进行请求发送，由于nginx 的代理，可以将指定的路径代理到指定的服务器，然后响应处理，即可解决跨域。

```js
module.exports = {
    
    devServer ：{
      proxy : {
          '/api' : {
            target : 'http://localhost:3000',
            pathRewrite: { '^/api': '' },
           }
    	}
	}
    
}
```

# 3：webpack优化篇

## webpack性能优化

### webpack中的 treeshaking 和 scoped-hoisting

#### **13.1.1 tree Shaking（摇树优化）**

webpack 会根据当前的环境，来决定打包完的代码是否需要压缩，当在开发环境下时，代码是不会进行压缩，

如果，你的代码需要进行手动配置 `tree shaking` ，那你可以在 `package.json`文件中，添加 `side-effect-free` 选项，如果打包的代码不包含副作用，那webpack会自动 删除 未使用并export 的代码

​      **1： webpack中的 `sideEffects`  和 `usedExports` 的区别**。

sideEffects 会根据你设置的文件，去进行treeShking，如果你没有副作用文件，那webpack将会将所有的代码进行treeShaking。

useExports ，是依赖于 `terser` 去检测语句中的副作用，但terser 在每次解析的时候也无法确认哪些代码是需要的还是不需要的，因为js是一门动态语言，如果你想要指定哪些代码被 `treeShking`，你可以在代码 上添加 `/*#__PURE__*/`  进行标志。

#### scoped-hoisting 优化

**作用**： scoped-hoisting 可以在webpack打包构建的时候，进行分析，将一些函数运算结果计算完成后返回给你，以提高性能。

​	例如 ：

```JS
export const add (a , b) {
    return a + b 
}
export const sub (a , b) {
   return a - b 
}
const num1 = add (5 , 3)
const num2 = sub (5 , 3)
```

对于 `webpack`来说 这段代码会变成 这个样子，并且add | sub 函数被删除。

```js
console.log("输出的结果add",5+3),console.log("输出的结果sub",function(e,t){return e-t}(5,3))
```

## webpack 将css打包并抽取到单独文件

作用 ： 将css打包后生成css文件，进行引入，不需要在通过 `style-loader` 创建style 标签，并插入内容

​	**配置**l

我们可以借助 `MiniCssExtractPlugin` 插件，来进行对css进行管理,并且，如果你是将css单独打包到文件中去时，你需要将`style.loader`  更换为 `MiniCssExtractPlugin.loader ` 这样css才能生效。

​	**注意事项(warring)**

对于 css `source map` 只在 `source-map/nosources-source-map/hidden-nosources-source-map/hidden-source-map` 值情况下起作用，因为 CSS 仅支持带有 `sourceMappingURL` 注释的 `source map` (例如 //# sourceMappingURL=style.css.map)。如果你需要将 devtool 设置为其他值，你可以使用 css-loader 中的 sourceMap: true 来启用提取并生成 CSS 的 source map。

```js
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
module ： {
    rules : [
        {
            test : /\.css$/,
            use : [MiniCssExtractPlugin.loader,'css-loader' , 'postcss-loader']
        }
    ]
}
plugins : [
    new MiniCssExtractPlugin({
       filename : '[name].css',
       chunkFilename : '[name].css' // 将打包完成的css 进行 拆分 ，分为每一个小模块，并生成对应的css文件
    })
]
```

## webpack处理css兼容性问题，自动加上前缀

作用 ： 处理一些css新属性，兼容  chrom `webkit`，`-moz`兼容火狐等等。

 	配置 

安装 `postcss-loader` ，`autoprefixer`，`postcss-preset-env`

```JS
// postCss.config,js

module.exports = {
    plugins : [
        require('autoprefixer')
    ]   
    
}

// webpack.config.js  中配置

{
   loader : 'postcss-loader',
   options : {
   postcssOptions : {
   plugins : [ ['postcss-preset-env'] ]
    },
  }
}
```

**匹配规则**

​	`postcss-loader`必须在 less-loader 或者 sass-loader 之前，因为，webpack打包借助 less | sass loader 解析完成后，再对css进行添加前缀。

**注意事项（warring）**

webpack5之后，如果你想要对css自动添加前缀，你还需要额外在`package.json文件中`，添加对应的浏览器版本控制，这样才能生效。

```json
 "browserslist": [
    "defaults",
    "not ie < 11",
    "last 2 versions",
    "> 1%",
    "iOS 7",
    "last 3 iOS versions"
  ]
```

## 使用 CssMinimizerWebpackPlugin 对css进行压缩(优化)

**作用** ：压缩css，优化性能；

​	**配置**

**安装插件 ** 

```node
yarn add css-minimizer-webpack-plugin -D 
```

**编写配置**

```JS
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin')
//在生产上进行配置，在我们平时开发中打包，无需压缩
optimization : {
    minimizer : [new CssMinimizerWebpackPlugin()]
}
// 如果你需要在开发环境下也s进行压缩 ，你需要配置
module.exports = {
       optimization : {
       		minimize : true,
           include // 包含哪些进行压缩
           exclude // 哪些不进行压缩
       }
}
```

**注意(warring)**

​	css压缩和js压缩在生产环境下是webpack自带的优化性能的配置选项，如果你手动去配置了css压缩，那将会覆盖原有的默认配置，js压缩也将会失效，你需要配置 `terserPlugin`对js进行压缩。

​	在 webpack4以前js压缩采用的是 ` ugliflyJSPlugin` 进行压缩，在webpack5中 准备了一款开箱即用的插件`terserPlugin`。

## CodeSpliting对JS进行代码分割优化

**作用** ： 将业务代码，根据设置的大小进行文件拆分，不需要一次请求，请求很大的文件。

​	**配置**

**方式一** : 通过多入口，多出口打包，进行代码分割

```JS
module.exports = {
	entry : {
        index : {
            import : './src/index.js',
            dependOn : 'shared', // 指定用提取出来的公共文件
        },
        other : {
            import : './src/other.js',
            dependOn : 'shared', // 指定用提取出来的公共文件
        },
        share : 'lodash' // 将公共的库抽取到一个 shared.bundle.js
	}
    output ： {
    	filename : '[name].boundle,js'
	}
}
```

**方式二** :  使用 `splitChunksPlugin` 进行代码拆分

在webpack4之前采用的是 `CommonsChunkPlugin`，webpack4开始，已经移除了`CommonsChunkPlugin`，采用` optimization.splitChunks` `

**触发条件**

webpack 将根据以下条件自动拆分 chunks：

- 新的 chunk 可以被共享，或者模块来自于 `node_modules` 文件夹
- 新的 chunk 体积大于 20kb（在进行 min+gz 之前的体积）
- 当按需加载 chunks 时，并行请求的最大数量小于或等于 30
- 当加载初始化页面时，并发请求的最大数量小于或等于 30

当尝试满足最后两个条件时，最好使用较大的 chunks。

**配置**

```JS
module.exports = {
  //...
  optimization: {
    splitChunks: {
      chunks: 'async', // 可选的值  all , async , initial
      minSize: 20000, // 模块大于 20 kb才进行拆分
      minRemainingSize: 0, // 在 webpack 5 中引入了 splitChunks.minRemainingSize 选项，通过确保拆分后剩余的最小 chunk 体积超过限制来避免大小为零的模块。 'development' 模式 中默认为 0。对于其他情况，splitChunks.minRemainingSize 默认为 splitChunks.minSize 的值，因此除需要深度控制的极少数情况外，不需要手动指定它
      minChunks: 1, // 模块至少被引用一次才被拆分
      maxAsyncRequests: 30, // 最大的异步请求 不能超过30 个 超过30 个 不对代码进行拆分
      maxInitialRequests: 30, // 入口点的最大并行请求数，超过30个不拆分
      enforceSizeThreshold: 50000, // 强制执行拆分的体积阈值和其他限制，就是按照文件多少大小进行拆分
      cacheGroups: { // 缓存组
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10, // 权重
          reuseExistingChunk: true, // 当模块之间相互引用同一个模块时，reuseExistingChunk会单独拆分出一个模块出来
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
};
```

**异步导入自动分割（codeSpliting）**

​	当我们在项目中，使用`import`函数进行异步导入时，webpack打包该文件会自动`codeSpliting`

```JS
const btn = document.querySeletor('button').addEventListener('click', () -> {
  import('lodash').then( (res,rej) => {
    console.log('res' , res);
  })
})
```

## 优化webpack构建性能-noparse

webpack中，有些模块未使用第三方包，或者 `import` , `require`, `define`，其他导入机制，我们可以配置no-parse，进行优化提高构建性能

**注意（warring）**

如果你在模块中，运用了第三方资源或者导入，那我建议你不要编写该配置，否则会出现不可预知的错误。

**配置**

```JS
module.exports = {
  //...
  module: {
    noParse: /jquery|lodash/, // 不对 jqurey或者lodash 进行模块分析
  },
};
```

## 使用ignorePlugin插件进行构建性能优化

**作用**：可以将一些三方资源包中的未使用的包忽略，不对它进行构建

​	**类型**

webpack 内置插件，忽略匹配到的文件，不进行构建。

**配置**

```JS
const webpack = require('webpack')
module.exports = {
   new webpack.IgnorePlugin({
      contextRegExp :/^\.\/locale$/, // 忽略 moment.js包中的国际化 local
      resourceRegExp : /moment$/,
    })
}
```

## 使用 dllPugin 和 dllReference 进行构建优化 

**作用** ：将一些重量的框架库(Vue | React)，固定的包单独打包到一个文件中去，通过 `dllReferencePlugin`进行引用。

 **配置**

​	1：创建 `webpack.reactDll.js`

```JS
const path = require('path')
const webpack = require('webpack')
module.exports = {
  entry : {
    react : [
      'react',
      'react-dom/client'
    ]
  },
  output : {
    filename : '[name].dll.js', // 输出的文件名称
    path : path.resolve(__dirname,'../dist/react/'),//输出 生成的dll文件目录
    library : '[name]_dll' // 暴露全局对象 react_dll
  },
  plugins : [
    new webpack.DllPlugin({ // 
      name : '[name]_dll', // 创建的文件名称
      path : path.resolve(__dirname , '../dist/react/manifest.json'), // 创建引用json文件，并输出到指定目录
    })
  ],
  mode : 'production'// 环境选择
}
```

​	2： 在 `package.json`中 添加 `build:react` script

```JSON
    "build:react": "webpack --config ./build/webpack.reactDll.js" // 构建上方创建的文件
```

​	3 ： 通过 `DllReferencePlugin`进行引用,创建的映射JSON文件

```JS
  new webpack.DllReferencePlugin({
      manifest : path.resolve(__dirname , '../dist/react/manifest.json'),
  }),
```

​	4 ： 通过 `add-asset-html-webpack-plugin` 将创建好的dll文件自动引入`index.html`

```JS
const AddAssteHtmlWebpackPlugin = require('add-asset-html-webpack-plugin')
plugins : [
    new AddAssteHtmlWebpackPlugin({
        // 指定添加那个文件
        filepath : path.resolve(__dirname , '../dist/react/react.dll.js'),
        // warning 注意 ，在webpack5之后，如果你只提供了文件路径，index.html 引入的 script
        //src 会变成 auto/reactDll.js
        //如果需要解决该问题 ， 你需要指定 publicPath
        publicPath ：'./react/'
    })
]
```

## 使用boundleAnalysis进行打包分析

**作用** ： 能够快速构建出项目包之间的占比分析，生成可视化的图形界面

​	**配置**

下载插件

`yarn add webpack-bundle-analyzer -D `

```JS
const BoundAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

modul.expoets = {
    plugins : [
        new BoundAnalyzerPlugin()
    ]
}
```

![1683702816617](C:\Users\Zhang\AppData\Roaming\Typora\draftsRecover\assets\1683702816617.png)

## 使用 prefetching 优化首屏加载速度

**作用**：优化首屏加载速度，并提准备好一些资源包。

​	**话术**

采用webpack中的魔法注释 ， 进行异步加载，它会将一些一些同步加载的文件先加载完成后再去加载一些需要的资源，如果是需要等待 `主资源`加载完成后，再去加载`子资源`，那你可以在异步导入的函数中 加上 `模块注释`并且将  `webpackPrefetch: true`指定为 true。

~~~JS

const getDate = () => {
  import(/* webpackPrefetch: true  */ 'dayjs').then(res => {
    console.log('dayjs' , res);
  })
}
~~~

## prefetch和 preload的区别

- **prefetch**(预获取)：将来某些导航下可能需要的资源
- **preload**(预加载)：当前导航下可能需要资源

prefetch ：

- 会在父级的 `chunks` 加载完成后 再去加载子级导入的chunks

preload ： 

- preload chunk 会在父 chunk 加载时，以并行方式开始加载。prefetch chunk 会在父 chunk 加载结束后开始加载。



## webpack 构建流程分析

1. 分析入口，读取入口文件配置
2. 将入口文件的require 递归转换为 webpack__require
3. 将读取的内容以字符串的形式写入到对象中，对象的键为相对于文件的路径
4. 通过ejs模板生成打包完的代码，在模板内通过ejs模板语法循环读取对象内容，然后将创建完的内容写到output配置项目录下的文件中
5. 解析loader ， loader 的本质其实是一个函数，将源代码传入到loader中，loader 将需要处理的地方处理完成后返回新的代码给你
6. 解析plugin，每个插件应该都遵循插件的开发原则，需要提供Apply方法，在Apply方法中去触发webpack的生命周期函数，在一定的时候执行逻辑操作
7. mode， 环境，webpack会根据环境执行内置的一些优化，例如terr-shaking ， scoped-hositing，代码压缩等