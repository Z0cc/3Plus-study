<script setup>
import { withBase } from 'vitepress'

const highlights = ['英语语法原站', '不规则动词', '完成句子', '高频句型']
</script>

<template>
  <main class="landing-page study-ambient">
    <section class="landing-hero glass-panel compact-landing">
      <p class="eyebrow">广东3+证书高职高考</p>
      <h1>三加证书数据库</h1>
      <p class="subtitle">把英语复习内容整理成适合长期翻阅的清爽学习库。</p>
      <a class="primary-action" :href="withBase('/subjects')">开始学习</a>
      <div class="landing-chips" aria-label="学习模块">
        <span v-for="item in highlights" :key="item">{{ item }}</span>
      </div>
    </section>
  </main>
</template>
