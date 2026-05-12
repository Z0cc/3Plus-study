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
    nav: [],
    sidebar: {},
    socialLinks: []
  }
})
