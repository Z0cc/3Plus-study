<script setup>
import { computed, ref } from 'vue'
import { withBase } from 'vitepress'
import wordsRaw from '../../../data/english/words.json'
import phrasesRaw from '../../../data/english/phrases.json'
import verbsRaw from '../../../data/english/irregular-verbs.json'
import completionRaw from '../../../data/english/completion.json'
import patternsRaw from '../../../data/english/sentence-patterns.json'

const query = ref('')
const categories = [
  { title: '高频词汇', text: '单词与翻译', link: '/english/words', count: wordsRaw.length },
  { title: '固定短语', text: '短语与翻译', link: '/english/phrases', count: phrasesRaw.length },
  { title: '不规则动词', text: '原形、过去式、过去分词、中文', link: '/english/irregular-verbs', count: verbsRaw.length },
  { title: '英语语法', text: '原版 english-note 语法页面', link: '/english/grammar', count: '原站' },
  { title: '完成句子', text: '英文与中文', link: '/english/completion', count: completionRaw.length },
  { title: '高频句型', text: '重要句型100条', link: '/english/sentence-patterns', count: patternsRaw.length }
]

function pair(item, fallbackTerm, fallbackTranslation) {
  if (Array.isArray(item)) return { term: item[0], translation: item[1] }
  return { term: item[fallbackTerm], translation: item[fallbackTranslation] }
}

const pool = [
  ...wordsRaw.map(item => ({ type: '单词', ...pair(item, 'word', 'meaning'), link: '/english/words', raw: item })),
  ...phrasesRaw.map(item => ({ type: '短语', ...pair(item, 'phrase', 'meaning'), link: '/english/phrases', raw: item })),
  ...verbsRaw.map(item => {
    const row = Array.isArray(item) ? item : [item.base, item.past, item.pastParticiple, item.meaning]
    return { type: '动词', term: `${row[0]} - ${row[1]} - ${row[2]}`, translation: row[3], link: '/english/irregular-verbs', raw: item }
  }),
  ...completionRaw.map(item => ({ type: '完成句子', ...pair(item, 'title', 'content'), link: '/english/completion', raw: item })),
  ...patternsRaw.map(item => ({ type: '句型', ...pair(item, 'title', 'content'), link: '/english/sentence-patterns', raw: item }))
]

const results = computed(() => {
  const key = query.value.trim().toLowerCase()
  if (!key) return []
  return pool.filter(item => `${item.term} ${item.translation}`.toLowerCase().includes(key)).slice(0, 20)
})
</script>

<template>
  <BackButton />
  <section class="module-head">
    <div>
      <h2>英语学习库</h2>
    </div>
    <input v-model="query" class="study-search" placeholder="搜索单词、中文、短语、句型" />
  </section>

  <div v-if="results.length" class="result-panel">
    <a v-for="item in results" :key="item.type + item.term" :href="withBase(item.link)" class="result-row">
      <span>{{ item.type }}</span>
      <strong>{{ item.term }}</strong>
      <em>{{ item.translation }}</em>
    </a>
  </div>

  <div class="category-grid">
    <a v-for="item in categories" :key="item.title" class="study-card" :href="withBase(item.link)">
      <span class="card-kicker">{{ item.count }} 条</span>
      <strong>{{ item.title }}</strong>
      <span class="card-note">{{ item.text }}</span>
    </a>
  </div>
</template>
