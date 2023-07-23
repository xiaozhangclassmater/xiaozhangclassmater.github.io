// .vuepress/config.js
module.exports = {
  themeConfig: {
    base: "/stest/",
    title: 'minivueBarrage',
    smoothScroll: true,
    nav: [
      { text: 'Home', link: 'https://xiaozhangclassmater.github.io/minivueBarrage-docs-web/#/home', target: '_self', rel: '' },
    ],
    sidebar: [
      {
        title: '快速上手',   // 必要的
        path: '/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
        collapsable: false, // 可选的, 默认值是 true,
        sidebarDepth: 1,    // 可选的, 默认值是 1
        children: [
          '/'
        ]
      },
      {
        title: '在线演示',
        children: [ /* ... */],
        initialOpenGroupIndex: -1 // 可选的, 默认值是 0
      }
    ]
  },
}
