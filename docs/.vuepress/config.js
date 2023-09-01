// .vuepress/config.js
module.exports = {
  themeConfig: {
    // base: "",
    title: 'minivueBarrage',
    smoothScroll: true,
    nav: [
      { text: '首页', link: 'https://xiaozhangclassmater.github.io/minivueBarrage-docs-web/#/dashboard', target: '_self', rel: '' },
      {
        text: 'JavaScript笔记', link: '/web/javascript/javascript.md'
      },
      {
        text: 'vue笔记', link: '/web/vue/vue3.md'
      },
      {
        text: 'react笔记', link: '/web/React/React.md'
      },
      {
        text: 'NodeJS笔记', link: '/web/node/Node.md'
      },
      {
        text: 'webpack笔记', link: '/web/webpack/webpack.md'
      },
      {
        text: 'sql笔记', link: '/web/sql/mysql.md'
      },
      {
        text: '计算机网络笔记', link: '/web/netWork/netWork.md'
      },
      {
        text: '面试题', link: '/web/InterviewQuestion/InterviewQuestion.md'
      }
    ],
    sidebar: [
      {
        title: '快速上手',   // 必要的
        path: '/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
        collapsable: true, // 可选的, 默认值是 true,
        sidebarDepth: 1,    // 可选的, 默认值是 1
        children: [
          '/'
        ]
      },
      {
        title: '个人笔记',
        children: [
          {
            collapsable: true,
            title: 'JavaScript',
            path: '../web/javascript/javascript.md',
          },
          {
            collapsable: true,
            title: 'webpack',
            path: '../web/webpack/webpack.md',
          },
          {
            collapsable: true,
            title: 'vue3',
            path: '../web/vue/vue3.md',
          },
          {
            collapsable: true,
            title: 'React',
            path: '../web/React/React.md',
          },
          {
            collapsable: true,
            title: 'NodeJS',
            path: '../web/node/Node.md',
          },
          {
            collapsable: true,
            title: 'Mysql',
            path: '../web/sql/mysql.md',
          },
          {
            collapsable: true,
            title: '面试题',
            path: '../web/InterviewQuestion/InterviewQuestion.md',
          },
          {
            collapsable: true,
            title: '计算机网络',
            path: '../web/netWork/netWork.md',
          },


        ],
        initialOpenGroupIndex: -1 // 可选的, 默认值是 0
      }
    ]
  },
}
