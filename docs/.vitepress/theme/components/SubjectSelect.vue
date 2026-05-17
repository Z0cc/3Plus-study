<script setup>
import { withBase } from 'vitepress'

const subjects = [
  { title: '语文', status: '已开放', href: '/chinese/', disabled: false, note: '古诗文测试' },
  { title: '数学', status: '待整理', href: '', disabled: true, note: '后续支持 LaTeX 公式' },
  { title: '英语', status: '已开放', href: '/english/', disabled: false, note: '进入学习库' }
]
</script>

<template>
  <BackButton />
  <section class="study-section-head glass-panel">
    <p class="eyebrow">Subject Library</p>
    <h2>选择学科</h2>
  </section>

  <div class="subject-grid">
    <a
      v-for="subject in subjects"
      :key="subject.title"
      class="study-card subject-card spotlight-card"
      :class="{ disabled: subject.disabled }"
      :href="subject.disabled ? undefined : withBase(subject.href)"
      :aria-disabled="subject.disabled"
    >
      <span class="card-kicker">{{ subject.status }}</span>
      <strong>{{ subject.title }}</strong>
      <span class="card-note">{{ subject.note }}</span>
    </a>
  </div>
</template>
