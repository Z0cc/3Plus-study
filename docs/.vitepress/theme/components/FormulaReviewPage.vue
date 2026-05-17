<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { day1FormulaTopics } from '../../../data/math/day1FormulaData.js'
import FormulaCard from './FormulaCard.vue'
import PracticeCard from './PracticeCard.vue'
import ProgressBar from './ProgressBar.vue'

const STORAGE_KEY = '3plus-math-basic-formula-progress'
const search = ref('')
const activeId = ref(day1FormulaTopics[0].id)
const progress = ref({})
const showAnswers = ref(false)

const filteredTopics = computed(() => {
  const keyword = search.value.trim().toLowerCase()
  if (!keyword) return day1FormulaTopics
  return day1FormulaTopics.filter((topic) => {
    const text = [
      topic.title,
      topic.plain,
      topic.examTip,
      ...(topic.keywords || []),
      ...topic.formulas.map((item) => `${item.text} ${item.meaning} ${item.condition}`),
      ...topic.examples,
      ...topic.mistakes,
      ...topic.practices.map((item) => `${item.question} ${item.explanation} ${item.tag}`)
    ].join(' ').toLowerCase()
    return text.includes(keyword)
  })
})

const activeTopic = computed(() => filteredTopics.value.find((item) => item.id === activeId.value) || filteredTopics.value[0] || day1FormulaTopics[0])

const totalProgress = computed(() => {
  const sum = day1FormulaTopics.reduce((total, topic) => total + getMastery(topic.id), 0)
  return Math.round(sum / day1FormulaTopics.length)
})

function readStorage() {
  if (typeof window === 'undefined') return
  try {
    progress.value = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '{}')
  } catch {
    progress.value = {}
  }
}

function saveStorage() {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress.value))
}

function ensureTopic(id) {
  if (!progress.value[id]) progress.value[id] = { read: false, correct: [] }
  return progress.value[id]
}

function markRead(id) {
  const item = ensureTopic(id)
  item.read = true
  progress.value = { ...progress.value, [id]: item }
  saveStorage()
}

function getMastery(id) {
  const item = progress.value[id]
  if (!item) return 0
  const correctCount = new Set(item.correct || []).size
  if (correctCount >= 3) return 100
  if (correctCount === 2) return 70
  if (correctCount === 1) return 50
  return item.read ? 30 : 0
}

function onAnswered(payload) {
  if (!payload.correct) return
  const item = ensureTopic(activeTopic.value.id)
  item.correct = Array.from(new Set([...(item.correct || []), payload.index]))
  progress.value = { ...progress.value, [activeTopic.value.id]: item }
  saveStorage()
}

function resetTopicPractice() {
  const item = ensureTopic(activeTopic.value.id)
  item.correct = []
  progress.value = { ...progress.value, [activeTopic.value.id]: item }
  saveStorage()
}

function selectTopic(id) {
  activeId.value = id
  markRead(id)
}

onMounted(() => {
  readStorage()
  markRead(activeId.value)
})

watch(activeId, (id) => markRead(id))
watch(filteredTopics, (topics) => {
  if (topics.length && !topics.some((topic) => topic.id === activeId.value)) activeId.value = topics[0].id
})
</script>

<template>
  <BackButton />
  <main class="math-review-page">
    <section class="math-hero glass-panel">
      <div>
        <p class="eyebrow">Math Review</p>
        <h1>基础公式交互复习</h1>
        <p>看公式、看解释、做练习，把基础公式先稳稳吃透。</p>
      </div>
      <div class="math-hero-side">
        <ProgressBar :value="totalProgress" label="总进度" />
        <input v-model="search" class="math-search" type="search" placeholder="搜索：绝对值、平方差、移项、分母不能为0..." />
      </div>
    </section>

    <section class="math-layout">
      <aside class="math-nav">
        <strong>知识树</strong>
        <button
          v-for="topic in filteredTopics"
          :key="topic.id"
          type="button"
          :class="{ active: activeTopic.id === topic.id }"
          @click="selectTopic(topic.id)"
        >
          <span>{{ topic.navTitle }}</span>
          <em>{{ getMastery(topic.id) }}%</em>
        </button>
      </aside>

      <div class="math-main">
        <div class="math-topic-tools">
          <ProgressBar :value="getMastery(activeTopic.id)" :label="`${activeTopic.title} 熟练度`" />
          <button type="button" class="math-button ghost" @click="showAnswers = !showAnswers">{{ showAnswers ? '隐藏答案' : '显示答案' }}</button>
        </div>
        <FormulaCard :topic="activeTopic" />
      </div>

      <PracticeCard :topic="activeTopic" :show-answers="showAnswers" @answered="onAnswered" @reset="resetTopicPractice" />
    </section>
  </main>
</template>
