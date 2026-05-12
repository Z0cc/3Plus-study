<script setup>
import { withBase } from 'vitepress'

function goBack() {
  if (typeof window === 'undefined') return
  if (window.history.length > 1) {
    window.history.back()
    return
  }
  window.location.href = withBase('/subjects')
}
</script>

<template>
  <button type="button" class="back-button" @click="goBack">返回上一页</button>
</template>
