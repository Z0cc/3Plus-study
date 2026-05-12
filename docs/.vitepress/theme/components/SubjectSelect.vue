<script setup>
import { withBase } from 'vitepress'

const subjects = [
  { title: '语文', status: '待整理', href: '', disabled: true },
  { title: '数学', status: '待整理', href: '', disabled: true },
  { title: '英语', status: '已开放', href: '/english/', disabled: false }
]
</script>

<template>
  <BackButton />
  <div class="subject-grid">
    <a
      v-for="subject in subjects"
      :key="subject.title"
      class="study-card subject-card"
      :class="{ disabled: subject.disabled }"
      :href="subject.disabled ? undefined : withBase(subject.href)"
      :aria-disabled="subject.disabled"
    >
      <span class="card-kicker">{{ subject.status }}</span>
      <strong>{{ subject.title }}</strong>
      <span class="card-note">{{ subject.disabled ? '资料整理中' : '进入学习' }}</span>
    </a>
  </div>
</template>
