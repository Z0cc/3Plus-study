<script setup>
import { computed, ref } from 'vue'
import verbsRaw from '../../../data/english/irregular-verbs.json'

const query = ref('')
const showBase = ref(true)
const showPast = ref(true)
const showParticiple = ref(true)
const showChinese = ref(false)

const verbs = computed(() => verbsRaw.map((item, index) => Array.isArray(item)
  ? { id: `${index}-${item[0]}`, base: item[0], past: item[1], pastParticiple: item[2], meaning: item[3] }
  : { id: `${index}-${item.base}`, ...item }
))

const filteredVerbs = computed(() => {
  const key = query.value.trim().toLowerCase()
  if (!key) return verbs.value
  return verbs.value.filter(item => `${item.base} ${item.past} ${item.pastParticiple} ${item.meaning}`.toLowerCase().includes(key))
})
</script>

<template>
  <BackButton />
  <div class="tool-row sticky-tools">
    <input v-model="query" class="study-search" placeholder="搜索原形、过去式、过去分词、中文" />
    <button type="button" @click="showBase = !showBase">{{ showBase ? '隐藏原形' : '显示原形' }}</button>
    <button type="button" @click="showPast = !showPast">{{ showPast ? '隐藏过去式' : '显示过去式' }}</button>
    <button type="button" @click="showParticiple = !showParticiple">{{ showParticiple ? '隐藏过去分词' : '显示过去分词' }}</button>
    <button type="button" @click="showChinese = !showChinese">{{ showChinese ? '隐藏中文' : '显示中文' }}</button>
  </div>

  <div class="table-wrap">
    <table class="study-table">
      <thead>
        <tr><th>原形</th><th>过去式</th><th>过去分词</th><th>中文</th></tr>
      </thead>
      <tbody>
        <tr v-for="item in filteredVerbs" :key="item.id">
          <td>{{ showBase ? item.base : '已隐藏' }}</td>
          <td>{{ showPast ? item.past : '已隐藏' }}</td>
          <td>{{ showParticiple ? item.pastParticiple : '已隐藏' }}</td>
          <td>{{ showChinese ? item.meaning : '已隐藏' }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
