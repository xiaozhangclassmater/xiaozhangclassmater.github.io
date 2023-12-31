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
        text: '浏览器笔记', link: '/web/Browser/Browser.md'
      },
      {
        text: 'Node_ORM框架笔记', link: '/web/ORM/ORM.md'
      },
      {
        text: 'express笔记', link: '/web/express/express.md'
      },
      {
        text: '计算机网络笔记', link: '/web/netWork/netWork.md'
      },
      {
        text: '面试题', link: '/web/InterviewQuestion/InterviewQuestion.md'
      },
      {
        text: '工作笔记', link: '/web/studyNote/index.md'
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
            collapsable: false,
            title: 'JavaScript',
            path: '../web/javascript/javascript.md',
          },
          {
            collapsable: false,
            title: 'webpack',
            path: '../web/webpack/webpack.md',
          },
          {
            collapsable: false,
            title: 'vue3',
            path: '../web/vue/vue3.md',
          },
          {
            collapsable: false,
            title: 'React',
            path: '../web/React/React.md',
          },
          {
            collapsable: false,
            title: 'NodeJS',
            path: '../web/node/Node.md',
          },
          {
            collapsable: false,
            title: 'Mysql',
            path: '../web/sql/mysql.md',
          },
          {
            collapsable: false,
            title: 'Node_ORM',
            path: '../web/ORM/ORM.md',
          },
          {
            collapsable: false,
            title: 'express',
            path: '../web/express/express.md',
          },
          {
            collapsable: false,
            title: 'Browser',
            path: '../web/Browser/Browser.md',
          },
          {
            collapsable: false,
            title: '面试题',
            path: '../web/InterviewQuestion/InterviewQuestion.md',
          },
          {
            collapsable: false,
            title: '计算机网络',
            path: '../web/netWork/netWork.md',
          },
          {
            collapsable: false,
            title: '工作笔记',
            path: '../web/studyNote/studyNote.md',
          },
        ]
        // children: [
        //   {
        //     collapsable: true,
        //     text: 'JavaScript',
        //     path: '../web/javascript/javascript.md',
        //   },
        //   {
        //     collapsable: true,
        //     title: 'webpack',
        //     path: '../web/webpack/webpack.md',
        //   },
        //   {
        //     collapsable: true,
        //     title: 'vue3',
        //     path: '../web/vue/vue3.md',
        //   },
        //   {
        //     collapsable: true,
        //     title: 'React',
        //     path: '../web/React/React.md',
        //   },
        //   {
        //     collapsable: true,
        //     title: 'NodeJS',
        //     path: '../web/node/Node.md',
        //   },
        //   {
        //     collapsable: true,
        //     title: 'Mysql',
        //     path: '../web/sql/mysql.md',
        //   },
        //   {
        //     collapsable: true,
        //     title: 'Node_ORM',
        //     path: '../web/ORM/ORM.md',
        //   },
        //   {
        //     collapsable: true,
        //     title: 'express',
        //     path: '../web/express/express.md',
        //   },
        //   {
        //     collapsable: true,
        //     title: 'Browser',
        //     path: '../web/Browser/Browser.md',
        //   },
        //   {
        //     collapsable: true,
        //     title: '面试题',
        //     path: '../web/InterviewQuestion/InterviewQuestion.md',
        //   },
        //   {
        //     collapsable: true,
        //     title: '计算机网络',
        //     path: '../web/netWork/netWork.md',
        //   },
        //   {
        //     collapsable: true,
        //     title: '工作笔记',
        //     path: '../web/studyNote/index.md',
        //   },

        // ],
        // initialOpenGroupIndex: -1 // 可选的, 默认值是 0
      }
    ]
  },
}
