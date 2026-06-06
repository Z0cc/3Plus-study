<script setup>
import { computed, ref } from 'vue'
import pronunciationRaw from '../../../data/chinese/full-pronunciation.txt?raw'
import polyphonicRaw from '../../../data/chinese/full-polyphonic.txt?raw'
import synonymsRaw from '../../../data/chinese/full-synonyms.txt?raw'
import idiomsRaw1 from '../../../data/chinese/full-idioms-1.txt?raw'
import idiomsRaw2 from '../../../data/chinese/full-idioms-2.txt?raw'
import idiomsRaw3 from '../../../data/chinese/full-idioms-3.txt?raw'

const query = ref('')
const activeCategory = ref('all')

const splitPages = (raw, startPage, mode) => raw.split(/\n\s*---PAGE---\s*\n/).map((text, index) => {
  const pattern = mode === 'idioms' ? /(?=(?:【[A-Z]】\s*|\d+[.．]\s*))/g : /(?=【[A-Z]】\s*)/g
  return {
    page: startPage + index,
    blocks: text.split(pattern).map((block) => block.trim()).filter(Boolean)
  }
})

const categories = [
  {
    id: 'pronunciation',
    shortTitle: '易错字音',
    title: '常考易错字音',
    description: '按字母顺序整理常考字音、读音与组词。',
    pageRange: 'PDF 第 1—4 页',
    pages: splitPages(pronunciationRaw, 1, 'letters')
  },
  {
    id: 'polyphonic',
    shortTitle: '多音字',
    title: '常考多音字组词辨析',
    description: '同一个字的不同读音、常见词语和使用区别。',
    pageRange: 'PDF 第 5—14 页',
    pages: splitPages(polyphonicRaw, 5, 'letters')
  },
  {
    id: 'synonyms',
    shortTitle: '近义词',
    title: '近义词辨析',
    description: '从含义、语体、适用对象和感情色彩辨清易混词。',
    pageRange: 'PDF 第 15—24 页',
    pages: splitPages(synonymsRaw, 15, 'letters')
  },
  {
    id: 'idioms',
    shortTitle: '常见成语',
    title: '高考常见成语',
    description: '保留资料中的成语释义、使用范围与易错提醒。',
    pageRange: 'PDF 第 25—47 页',
    pages: splitPages(`${idiomsRaw1}\n\n---PAGE---\n\n${idiomsRaw2}\n\n---PAGE---\n\n${idiomsRaw3}`, 25, 'idioms')
  }
]

const totalPages = computed(() => categories.reduce((sum, category) => sum + category.pages.length, 0))
const visibleCategories = computed(() => {
  const keyword = query.value.trim().toLowerCase()
  return categories
    .filter((category) => activeCategory.value === 'all' || category.id === activeCategory.value)
    .map((category) => ({
      ...category,
      pages: category.pages.map((page) => ({
        ...page,
        blocks: keyword
          ? page.blocks.filter((block) => block.toLowerCase().includes(keyword))
          : page.blocks
      })).filter((page) => page.blocks.length)
    }))
    .filter((category) => category.pages.length)
})

const resultCount = computed(() => visibleCategories.value.reduce(
  (sum, category) => sum + category.pages.reduce((pageSum, page) => pageSum + page.blocks.length, 0),
  0
))
</script>

<template>
  <BackButton />
  <main class="accumulation-page">
    <header class="accumulation-header">
      <div>
        <p class="accumulation-label">广东3+证书语文</p>
        <h1>语文日积月累</h1>
        <p>完整收录早读资料中的易错字音、多音字、近义词辨析和常见成语，按原 PDF 页码整理。</p>
      </div>
      <div class="source-summary">
        <strong>{{ totalPages }} 页完整资料</strong>
        <span>4 个复习分类</span>
      </div>
    </header>

    <section class="accumulation-toolbar">
      <label class="accumulation-search">
        <span>搜索</span>
        <input v-model="query" type="search" placeholder="输入字、拼音、词语、成语或释义" />
      </label>
      <span class="result-count">{{ query ? `找到 ${resultCount} 处内容` : 'PDF 全文' }}</span>
    </section>

    <nav class="accumulation-tabs" aria-label="资料分类">
      <button type="button" :class="{ active: activeCategory === 'all' }" @click="activeCategory = 'all'">
        <strong>全部内容</strong>
        <span>{{ totalPages }} 页</span>
      </button>
      <button v-for="category in categories" :key="category.id" type="button" :class="{ active: activeCategory === category.id }" @click="activeCategory = category.id">
        <strong>{{ category.shortTitle }}</strong>
        <span>{{ category.pages.length }} 页</span>
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

        <div class="source-pages">
          <article v-for="page in category.pages" :key="`${category.id}-${page.page}`" class="source-page">
            <header><span>原资料</span><strong>第 {{ page.page }} 页</strong></header>
            <div class="source-blocks">
              <p v-for="(block, index) in page.blocks" :key="`${page.page}-${index}`" class="source-block">{{ block }}</p>
            </div>
          </article>
        </div>
      </section>
    </div>

    <section v-else class="accumulation-empty">
      <strong>没有找到相关内容</strong>
      <p>换一个字、拼音、词语或成语试试。</p>
    </section>
  </main>
</template>
