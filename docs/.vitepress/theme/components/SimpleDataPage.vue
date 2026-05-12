<script setup>
import { computed, ref } from 'vue'
import completion from '../../../data/english/completion.json'
import patterns from '../../../data/english/sentence-patterns.json'

const props = defineProps({
  type: {
    type: String,
    required: true
  }
})

const query = ref('')
const data = computed(() => props.type === 'patterns' ? patterns : completion)
const filteredItems = computed(() => {
  const key = query.value.trim().toLowerCase()
  if (!key) return data.value
  return data.value.filter(item => JSON.stringify(item).toLowerCase().includes(key))
})
</script>

<template>
  <div class="tool-row">
    <input v-model="query" class="study-search" placeholder="搜索标题、内容、标签" />
  </div>

  <div class="item-list">
    <article v-for="item in filteredItems" :key="item.title" class="study-card detail-card">
      <h3>{{ item.title }}</h3>
      <p>{{ item.content }}</p>
      <p v-if="item.examPoint" class="highlight-line">{{ item.examPoint }}</p>
      <div class="tag-row"><span v-for="tag in item.tags" :key="tag">{{ tag }}</span></div>
    </article>
  </div>
</template>
