<script setup>
import { computed, ref } from 'vue'
import phrasesRaw from '../../../data/english/phrases.json'

const query = ref('')
const revealed = ref({})
const phrases = computed(() => phrasesRaw.map((item, index) => ({
  id: `${index}-${Array.isArray(item) ? item[0] : item.phrase}`,
  term: Array.isArray(item) ? item[0] : item.phrase,
  translation: Array.isArray(item) ? item[1] : item.meaning
})))

const filteredPhrases = computed(() => {
  const key = query.value.trim().toLowerCase()
  if (!key) return phrases.value
  return phrases.value.filter(item => `${item.term} ${item.translation}`.toLowerCase().includes(key))
})

function isShown(id) {
  return Boolean(revealed.value[id])
}

function toggle(id) {
  revealed.value = { ...revealed.value, [id]: !revealed.value[id] }
}

function showAll() {
  revealed.value = Object.fromEntries(filteredPhrases.value.map(item => [item.id, true]))
}

function hideAll() {
  revealed.value = {}
}
</script>

<template>
  <BackButton />
  <div class="tool-row sticky-tools">
    <input v-model="query" class="study-search" placeholder="搜索短语或中文" />
    <button type="button" @click="showAll">全部显示意思</button>
    <button type="button" @click="hideAll">全部隐藏意思</button>
  </div>

  <div class="pair-list">
    <article v-for="item in filteredPhrases" :key="item.id" class="pair-row">
      <strong>{{ item.term }}</strong>
      <button type="button" class="soft-button" @click="toggle(item.id)">
        {{ isShown(item.id) ? '隐藏意思' : '显示意思' }}
      </button>
      <span v-if="isShown(item.id)" class="pair-translation">{{ item.translation }}</span>
    </article>
  </div>
</template>
