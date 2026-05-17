<script setup>
defineProps({
  value: {
    type: Number,
    default: 0
  },
  label: {
    type: String,
    default: '熟练度'
  }
})
</script>

<template>
  <div class="math-progress" role="progressbar" :aria-valuenow="value" aria-valuemin="0" aria-valuemax="100">
    <div class="math-progress-head">
      <span>{{ label }}</span>
      <strong>{{ value }}%</strong>
    </div>
    <div class="math-progress-track">
      <span :style="{ width: `${value}%` }"></span>
    </div>
  </div>
</template>
