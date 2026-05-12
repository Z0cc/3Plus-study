<script setup>
import { computed, ref } from 'vue'
import { withBase } from 'vitepress'
import words from '../../../data/english/words.json'
import phrases from '../../../data/english/phrases.json'
import verbs from '../../../data/english/irregular-verbs.json'
import grammar from '../../../data/english/grammar.json'
import completion from '../../../data/english/completion.json'
import patterns from '../../../data/english/sentence-patterns.json'

const query = ref('')
const categories = [
  { title: '高频词汇', text: '单词、词性、搭配、考法', link: '/english/words', count: words.length },
  { title: '固定短语', text: '短语含义、用法、考点', link: '/english/phrases', count: phrases.length },
  { title: '不规则动词', text: '原形、过去式、过去分词', link: '/english/irregular-verbs', count: verbs.length },
  { title: '英语语法', text: '来自 english-note 等资料的复习版', link: '/english/grammar', count: grammar.length },
  { title: '完成句子', text: '常考结构与同义转换', link: '/english/completion', count: completion.length },
  { title: '高频句型', text: '可直接用于复习的句型', link: '/english/sentence-patterns', count: patterns.length }
]

const pool = [
  ...words.map(item => ({ type: '单词', title: item.word, text: item.meaning, link: '/english/words', raw: item })),
  ...phrases.map(item => ({ type: '短语', title: item.phrase, text: item.meaning, link: '/english/phrases', raw: item })),
  ...verbs.map(item => ({ type: '动词', title: `${item.base} - ${item.past} - ${item.pastParticiple}`, text: item.meaning, link: '/english/irregular-verbs', raw: item })),
  ...grammar.map(item => ({ type: '语法', title: item.title, text: item.plain, link: '/english/grammar', raw: item })),
  ...completion.map(item => ({ type: '完成句子', title: item.title, text: item.content, link: '/english/completion', raw: item })),
  ...patterns.map(item => ({ type: '句型', title: item.title, text: item.content, link: '/english/sentence-patterns', raw: item }))
]

const results = computed(() => {
  const key = query.value.trim().toLowerCase()
  if (!key) return []
  return pool.filter(item => JSON.stringify(item.raw).toLowerCase().includes(key)).slice(0, 12)
})
</script>

<template>
  <section class="module-head">
    <div>
      <p class="eyebrow">English Library</p>
      <h2>英语学习库</h2>
      <p>按词汇、短语、语法和题型整理，适合长期复习。</p>
    </div>
    <input v-model="query" class="study-search" placeholder="搜索单词、中文、短语、标签、语法标题" />
  </section>

  <div v-if="results.length" class="result-panel">
    <a v-for="item in results" :key="item.type + item.title" :href="withBase(item.link)" class="result-row">
      <span>{{ item.type }}</span>
      <strong>{{ item.title }}</strong>
      <em>{{ item.text }}</em>
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
