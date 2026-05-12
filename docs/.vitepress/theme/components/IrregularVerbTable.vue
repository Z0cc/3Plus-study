<script setup>
import { computed, ref } from 'vue'
import verbs from '../../../data/english/irregular-verbs.json'

const query = ref('')
const showChinese = ref(false)

const filteredVerbs = computed(() => {
  const key = query.value.trim().toLowerCase()
  if (!key) return verbs
  return verbs.filter(item => JSON.stringify(item).toLowerCase().includes(key))
})
</script>

<template>
  <div class="tool-row">
    <input v-model="query" class="study-search" placeholder="搜索原形、过去式、过去分词、中文" />
    <button type="button" @click="showChinese = !showChinese">
      {{ showChinese ? '隐藏中文' : '显示中文' }}
    </button>
  </div>

  <div class="table-wrap">
    <table class="study-table">
      <thead>
        <tr><th>原形</th><th>过去式</th><th>过去分词</th><th>中文</th></tr>
      </thead>
      <tbody>
        <tr v-for="item in filteredVerbs" :key="item.base">
          <td>{{ item.base }}</td>
          <td>{{ item.past }}</td>
          <td>{{ item.pastParticiple }}</td>
          <td>{{ showChinese ? item.meaning : '已隐藏' }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
