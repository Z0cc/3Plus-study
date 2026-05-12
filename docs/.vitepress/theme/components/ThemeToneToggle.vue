<script setup>
import { onMounted, ref } from 'vue'

const modes = [
  { id: 'white', label: '纯白' },
  { id: 'eye', label: '护眼' },
  { id: 'black', label: '黑色' }
]

const current = ref('white')

function applyMode(mode) {
  current.value = mode
  if (typeof document === 'undefined') return
  const root = document.documentElement
  root.classList.remove('dark', 'tone-white', 'tone-eye', 'tone-black')
  root.classList.add(`tone-${mode}`)
  if (mode === 'black') root.classList.add('dark')
  localStorage.setItem('study-tone', mode)
}

onMounted(() => {
  applyMode(localStorage.getItem('study-tone') || 'white')
})
</script>

<template>
  <div class="tone-toggle" aria-label="阅读模式">
    <button
      v-for="mode in modes"
      :key="mode.id"
      type="button"
      :class="{ active: current === mode.id }"
      @click="applyMode(mode.id)"
    >
      {{ mode.label }}
    </button>
  </div>
</template>
