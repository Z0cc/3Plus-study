<script setup>
import { withBase } from 'vitepress'

const subjects = [
  { title: '语文', status: '已开放', href: '/chinese/', disabled: false, note: '语文日积月累' },
  { title: '数学', status: '已开放', href: '/math/day1-formulas', disabled: false, note: '基础公式交互复习' },
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
