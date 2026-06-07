<script setup>
import { withBase } from 'vitepress'
</script>

<template>
  <main class="landing-page study-ambient">
    <section class="landing-hero glass-panel compact-landing">
      <p class="eyebrow">广东3+证书高职高考</p>
      <h1>三加证书数据库</h1>
      <p class="subtitle">广东3+证书高职高考学习资料库</p>
      <div class="landing-actions">
        <a class="primary-action" :href="withBase('/subjects')">开始学习</a>
        <a class="primary-action live-entry-action" :href="withBase('/live/')">直播</a>
      </div>
    </section>
  </main>
</template>
