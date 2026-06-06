<script setup>
import { computed, ref } from 'vue'
import { accumulationCategories } from '../../../data/chinese/accumulationData.js'

const query = ref('')
const activeCategory = ref('all')

const categoryCounts = computed(() => Object.fromEntries(accumulationCategories.map((item) => [item.id, item.entries.length])))

const visibleCategories = computed(() => {
  const keyword = query.value.trim().toLowerCase()
  return accumulationCategories
    .filter((category) => activeCategory.value === 'all' || category.id === activeCategory.value)
    .map((category) => ({
      ...category,
      entries: keyword
        ? category.entries.filter((entry) => [entry.term, entry.reading, entry.content, entry.note].join(' ').toLowerCase().includes(keyword))
        : category.entries
    }))
    .filter((category) => category.entries.length)
})

const resultCount = computed(() => visibleCategories.value.reduce((total, category) => total + category.entries.length, 0))
</script>

<template>
  <BackButton />
  <main class="accumulation-page">
    <header class="accumulation-header">
      <div>
        <p class="accumulation-label">广东3+证书语文</p>
        <h1>语文日积月累</h1>
        <p>把容易混淆、容易读错、需要反复看的基础知识分开整理，随时搜索，轻松早读。</p>
      </div>
      <div class="source-summary">
        <strong>47 页资料</strong>
        <span>4 个复习分类</span>
      </div>
    </header>

    <section class="accumulation-toolbar">
      <label class="accumulation-search">
        <span>搜索</span>
        <input v-model="query" type="search" placeholder="输入字、词语、拼音或成语含义" />
      </label>
      <span class="result-count">当前 {{ resultCount }} 条</span>
    </section>

    <nav class="accumulation-tabs" aria-label="资料分类">
      <button type="button" :class="{ active: activeCategory === 'all' }" @click="activeCategory = 'all'">
        <strong>全部内容</strong>
        <span>{{ accumulationCategories.reduce((sum, item) => sum + item.entries.length, 0 }} 条</span>
      </button>
      <button v-for="category in accumulationCategories" :key="category.id" type="button" :class="{ active: activeCategory === category.id }" @click="activeCategory = category.id">
        <strong>{{ category.shortTitle }}</strong>
        <span>{{ categoryCounts[category.id] }} 条</span>
      </button>
    </nav>

    <div v-if="visibleCategories.length" class="accumulation-content">
      <section v-for="category in visibleCategories" :key="category.id" class="accumulation-section">
        <header class="section-heading">
          <div>
            <h2>{{ category.title }}</h2>
            <p>{{ category.description }}</p>
          </div>
          <span>{{ category.pageRange }}</span>
        </header>

        <div class="accumulation-list">
          <article v-for="entry in category.entries" :key="`${category.id}-${entry.term}`" class="accumulation-entry">
            <div class="entry-word">
              <strong>{{ entry.term }}</strong>
              <span v-if="entry.reading">{{ entry.reading }}</span>
            </div>
            <p class="entry-content">{{ entry.content }}</p>
            <p class="entry-note">{{ entry.note }}</p>
          </article>
        </div>
      </section>
    </div>

    <section v-else class="accumulation-empty">
      <strong>没有找到相关内容</strong>
      <p>换一个字、拼音或词语试试。</p>
    </section>
  </main>
</template>
