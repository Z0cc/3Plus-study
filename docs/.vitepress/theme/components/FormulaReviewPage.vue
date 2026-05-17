<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { day1FormulaTopics } from '../../../data/math/day1FormulaData.js'
import FormulaCard from './FormulaCard.vue'
import ProgressBar from './ProgressBar.vue'

const STORAGE_KEY = '3plus-math-formula-viewed'
const search = ref('')
const activeId = ref(day1FormulaTopics[0].id)
const viewed = ref({})

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
      ...topic.mistakes
    ].join(' ').toLowerCase()
    return text.includes(keyword)
  })
})

const activeTopic = computed(() => filteredTopics.value.find((item) => item.id === activeId.value) || filteredTopics.value[0] || day1FormulaTopics[0])

const totalProgress = computed(() => {
  const count = day1FormulaTopics.filter((topic) => viewed.value[topic.id]).length
  return Math.round((count / day1FormulaTopics.length) * 100)
})

function readStorage() {
  if (typeof window === 'undefined') return
  try {
    viewed.value = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '{}')
  } catch {
    viewed.value = {}
  }
}

function markRead(id) {
  viewed.value = { ...viewed.value, [id]: true }
  if (typeof window !== 'undefined') window.localStorage.setItem(STORAGE_KEY, JSON.stringify(viewed.value))
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
        <p class="eyebrow">Math Formula</p>
        <h1>基础公式互动演示</h1>
        <p>拖动参数，公式、步骤和图示会同步变化。先看懂公式，再记公式。</p>
      </div>
      <div class="math-hero-side">
        <ProgressBar :value="totalProgress" label="浏览进度" />
        <input v-model="search" class="math-search" type="search" placeholder="搜索：绝对值、平方差、移项、分母不能为0..." />
      </div>
    </section>

    <section class="math-layout no-practice">
      <aside class="math-nav">
        <strong>公式目录</strong>
        <button
          v-for="topic in filteredTopics"
          :key="topic.id"
          type="button"
          :class="{ active: activeTopic.id === topic.id }"
          @click="selectTopic(topic.id)"
        >
          <span>{{ topic.navTitle }}</span>
          <em>{{ viewed[topic.id] ? '已看' : '未看' }}</em>
        </button>
      </aside>

      <div class="math-main">
        <FormulaCard :topic="activeTopic" />
      </div>
    </section>
  </main>
</template>
