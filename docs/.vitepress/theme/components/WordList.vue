<script setup>
import { computed, ref } from 'vue'
import words from '../../../data/english/words.json'

const query = ref('')
const revealed = ref({})

const filteredWords = computed(() => {
  const key = query.value.trim().toLowerCase()
  if (!key) return words
  return words.filter(item => JSON.stringify(item).toLowerCase().includes(key))
})

function isShown(word) {
  return Boolean(revealed.value[word])
}

function toggle(word) {
  revealed.value = { ...revealed.value, [word]: !revealed.value[word] }
}

function showAll() {
  revealed.value = Object.fromEntries(filteredWords.value.map(item => [item.word, true]))
}

function hideAll() {
  revealed.value = {}
}
</script>

<template>
  <div class="tool-row">
    <input v-model="query" class="study-search" placeholder="搜索单词、中文、标签、搭配" />
    <button type="button" @click="showAll">全部显示翻译</button>
    <button type="button" @click="hideAll">全部隐藏翻译</button>
  </div>

  <div class="item-list">
    <article v-for="item in filteredWords" :key="item.word" class="study-card detail-card">
      <div class="card-title-row">
        <h3>{{ item.word }}</h3>
        <span v-if="item.phonetic" class="muted">{{ item.phonetic }}</span>
      </div>
      <button type="button" class="soft-button" @click="toggle(item.word)">
        {{ isShown(item.word) ? '隐藏翻译' : '显示翻译' }}
      </button>
      <p v-if="isShown(item.word)" class="meaning">{{ item.meaning }}</p>
      <dl>
        <template v-if="item.partOfSpeech"><dt>词性</dt><dd>{{ item.partOfSpeech }}</dd></template>
        <template v-if="item.phrases?.length"><dt>固定搭配</dt><dd>{{ item.phrases.join('；') }}</dd></template>
        <template v-if="item.examPoint"><dt>高频考法</dt><dd>{{ item.examPoint }}</dd></template>
        <template v-if="item.mistake"><dt>易错点</dt><dd>{{ item.mistake }}</dd></template>
      </dl>
      <div class="tag-row"><span v-for="tag in item.tags" :key="tag">{{ tag }}</span></div>
    </article>
  </div>
</template>
