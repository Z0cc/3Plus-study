<script setup>
import { computed, ref } from 'vue'
import wordsRaw from '../../../data/english/words.json'

const query = ref('')
const revealed = ref({})
const words = computed(() => wordsRaw.map((item, index) => ({
  id: `${index}-${Array.isArray(item) ? item[0] : item.word}`,
  term: Array.isArray(item) ? item[0] : item.word,
  translation: Array.isArray(item) ? item[1] : item.meaning
})))

const filteredWords = computed(() => {
  const key = query.value.trim().toLowerCase()
  if (!key) return words.value
  return words.value.filter(item => `${item.term} ${item.translation}`.toLowerCase().includes(key))
})

function isShown(id) {
  return Boolean(revealed.value[id])
}

function toggle(id) {
  revealed.value = { ...revealed.value, [id]: !revealed.value[id] }
}

function showAll() {
  revealed.value = Object.fromEntries(filteredWords.value.map(item => [item.id, true]))
}

function hideAll() {
  revealed.value = {}
}
</script>

<template>
  <BackButton />
  <div class="tool-row sticky-tools">
    <input v-model="query" class="study-search" placeholder="搜索单词或中文" />
    <button type="button" @click="showAll">全部显示翻译</button>
    <button type="button" @click="hideAll">全部隐藏翻译</button>
  </div>

  <div class="pair-list">
    <article v-for="item in filteredWords" :key="item.id" class="pair-row">
      <strong>{{ item.term }}</strong>
      <button type="button" class="soft-button" @click="toggle(item.id)">
        {{ isShown(item.id) ? '隐藏翻译' : '显示翻译' }}
      </button>
      <span v-if="isShown(item.id)" class="pair-translation">{{ item.translation }}</span>
    </article>
  </div>
</template>
