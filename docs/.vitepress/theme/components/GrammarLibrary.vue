<script setup>
import { computed, ref } from 'vue'
import grammar from '../../../data/english/grammar.json'

const query = ref('')
const filteredGrammar = computed(() => {
  const key = query.value.trim().toLowerCase()
  if (!key) return grammar
  return grammar.filter(item => JSON.stringify(item).toLowerCase().includes(key))
})
</script>

<template>
  <div class="tool-row">
    <input v-model="query" class="study-search" placeholder="搜索语法标题、标签、考法" />
  </div>

  <div class="item-list">
    <article v-for="item in filteredGrammar" :key="item.title" class="study-card grammar-card">
      <div class="card-title-row">
        <h3>{{ item.title }}</h3>
        <a class="source-link" href="https://github.com/hzpt-inet-club/english-note" target="_blank" rel="noreferrer">资料源</a>
      </div>
      <section>
        <h4>一句话理解</h4>
        <p>{{ item.plain }}</p>
      </section>
      <section>
        <h4>常见形式</h4>
        <ul><li v-for="form in item.forms" :key="form">{{ form }}</li></ul>
      </section>
      <section>
        <h4>高职高考考法</h4>
        <p>{{ item.examPoint }}</p>
      </section>
      <section>
        <h4>易错点</h4>
        <p>{{ item.mistake }}</p>
      </section>
      <section>
        <h4>自测题</h4>
        <ol><li v-for="question in item.quiz" :key="question">{{ question }}</li></ol>
      </section>
      <div class="tag-row"><span v-for="tag in item.tags" :key="tag">{{ tag }}</span></div>
    </article>
  </div>
</template>
