<script setup>
import { computed, ref } from 'vue'
import phrases from '../../../data/english/phrases.json'

const query = ref('')
const revealed = ref({})

const filteredPhrases = computed(() => {
  const key = query.value.trim().toLowerCase()
  if (!key) return phrases
  return phrases.filter(item => JSON.stringify(item).toLowerCase().includes(key))
})

function isShown(phrase) {
  return Boolean(revealed.value[phrase])
}

function toggle(phrase) {
  revealed.value = { ...revealed.value, [phrase]: !revealed.value[phrase] }
}

function showAll() {
  revealed.value = Object.fromEntries(filteredPhrases.value.map(item => [item.phrase, true]))
}

function hideAll() {
  revealed.value = {}
}
</script>

<template>
  <div class="tool-row">
    <input v-model="query" class="study-search" placeholder="搜索短语、中文、标签、用法" />
    <button type="button" @click="showAll">全部显示意思</button>
    <button type="button" @click="hideAll">全部隐藏意思</button>
  </div>

  <div class="item-list">
    <article v-for="item in filteredPhrases" :key="item.phrase" class="study-card detail-card">
      <h3>{{ item.phrase }}</h3>
      <button type="button" class="soft-button" @click="toggle(item.phrase)">
        {{ isShown(item.phrase) ? '隐藏意思' : '显示意思' }}
      </button>
      <p v-if="isShown(item.phrase)" class="meaning">{{ item.meaning }}</p>
      <dl>
        <template v-if="item.usage"><dt>用法</dt><dd>{{ item.usage }}</dd></template>
        <template v-if="item.examPoint"><dt>高频考法</dt><dd>{{ item.examPoint }}</dd></template>
      </dl>
      <div class="tag-row"><span v-for="tag in item.tags" :key="tag">{{ tag }}</span></div>
    </article>
  </div>
</template>
