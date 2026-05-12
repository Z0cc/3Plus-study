import { defineConfig } from 'vitepress'

export default defineConfig({
  title: '三加证书数据库',
  description: '广东3+证书高职高考学习资料库',
  base: '/3Plus-study/',
  cleanUrls: true,
  markdown: {
    math: true
  },
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '学科', link: '/subjects' },
      { text: '英语', link: '/english/' }
    ],
    sidebar: {
      '/english/': [
        { text: '英语学习库', link: '/english/' },
        { text: '高频词汇', link: '/english/words' },
        { text: '固定短语', link: '/english/phrases' },
        { text: '不规则动词', link: '/english/irregular-verbs' },
        { text: '英语语法', link: '/english/grammar' },
        { text: '完成句子', link: '/english/completion' },
        { text: '高频句型', link: '/english/sentence-patterns' }
      ]
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/Z0cc/3Plus-study' }
    ]
  }
})
