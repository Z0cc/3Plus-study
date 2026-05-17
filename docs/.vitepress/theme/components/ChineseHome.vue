<script setup>
import { computed, ref } from 'vue'
import { withBase } from 'vitepress'
import poems from '../../../data/chinese/poems.json'

const query = ref('')

const filteredPoems = computed(() => {
  const keyword = query.value.trim().toLowerCase()
  if (!keyword) return poems
  return poems.filter((poem) => {
    const haystack = [
      poem.title,
      poem.dynasty,
      poem.author,
      poem.translation,
      poem.intro,
      ...(poem.tags || []),
      ...poem.lines.map((line) => line.text)
    ].join(' ').toLowerCase()
    return haystack.includes(keyword)
  })
})
</script>

<template>
  <BackButton />
  <main class="chinese-page">
    <section class="chinese-hero">
      <p class="eyebrow">Chinese Library</p>
      <h1>语文学习库</h1>
      <p>古诗文测试页面，先放入一首《静女》，后续可继续导入。</p>
    </section>

    <label class="chinese-search" aria-label="搜索古诗">
      <input v-model="query" type="search" placeholder="搜索古诗、作者、译文或关键词" />
    </label>

    <section class="poem-list">
      <a v-for="poem in filteredPoems" :key="poem.id" class="poem-card" :href="withBase(`/chinese/${poem.id}`)">
        <strong>{{ poem.title }}</strong>
        <span>{{ poem.dynasty }} · {{ poem.author }}</span>
        <p>{{ poem.lines.map((line) => line.text).join('') }}</p>
      </a>
    </section>
  </main>
</template>
