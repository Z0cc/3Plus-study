<script setup>
import { computed, ref } from 'vue'
import completionRaw from '../../../data/english/completion.json'
import patternsRaw from '../../../data/english/sentence-patterns.json'

const props = defineProps({
  type: {
    type: String,
    required: true
  }
})

const query = ref('')
const revealed = ref({})
const isPatterns = computed(() => props.type === 'patterns')
const data = computed(() => isPatterns.value ? patternsRaw : completionRaw)
const items = computed(() => data.value.map((item, index) => {
  const term = Array.isArray(item) ? item[0] : item.term || item.title
  const translation = Array.isArray(item) ? item[1] : item.meaning || item.content
  return {
    id: `${props.type}-${index}-${term || translation}`,
    term,
    translation,
    examples: Array.isArray(item) ? [] : item.examples || []
  }
}))
const filteredItems = computed(() => {
  const key = query.value.trim().toLowerCase()
  if (!key) return items.value
  return items.value.filter(item => `${item.term} ${item.translation} ${item.examples.join(' ')}`.toLowerCase().includes(key))
})

function isShown(id) {
  return Boolean(revealed.value[id])
}

function toggle(id) {
  revealed.value = { ...revealed.value, [id]: !revealed.value[id] }
}

function showAll() {
  revealed.value = Object.fromEntries(filteredItems.value.map(item => [item.id, true]))
}

function hideAll() {
  revealed.value = {}
}
</script>

<template>
  <BackButton />

  <div v-if="isPatterns" class="tool-row sticky-tools">
    <input v-model="query" class="study-search" placeholder="搜索句型、中文或例句" />
  </div>

  <div v-else class="tool-row sticky-tools">
    <input v-model="query" class="study-search" placeholder="搜索内容或中文" />
    <button type="button" @click="showAll">全部显示</button>
    <button type="button" @click="hideAll">全部隐藏</button>
  </div>

  <div v-if="isPatterns" class="pattern-list">
    <article v-for="item in filteredItems" :key="item.id" class="pattern-card">
      <h3>{{ item.term || item.translation }}</h3>
      <p v-if="item.term && item.translation" class="pattern-meaning">{{ item.translation }}</p>
      <ol class="example-list">
        <li v-for="example in item.examples" :key="example">{{ example }}</li>
      </ol>
    </article>
  </div>

  <div v-else class="pair-list">
    <article v-for="item in filteredItems" :key="item.id" class="pair-row">
      <strong>{{ item.term }}</strong>
      <button type="button" class="soft-button" @click="toggle(item.id)">
        {{ isShown(item.id) ? '隐藏' : '显示' }}
      </button>
      <span v-if="isShown(item.id)" class="pair-translation">{{ item.translation }}</span>
    </article>
  </div>
</template>
