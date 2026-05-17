<script setup>
import { reactive, watch } from 'vue'

const props = defineProps({
  topic: {
    type: Object,
    required: true
  },
  showAnswers: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['answered', 'reset'])

const answers = reactive({})
const results = reactive({})

function normalize(value) {
  return String(value || '')
    .toLowerCase()
    .replace(/\s+/g, '')
    .replace(/（/g, '(')
    .replace(/）/g, ')')
    .replace(/＝/g, '=')
    .replace(/，/g, ',')
}

function check(question, index) {
  const userAnswer = normalize(answers[index])
  const accepted = question.answer.map(normalize)
  const correct = accepted.includes(userAnswer)
  results[index] = correct
  emit('answered', { index, correct })
}

function reset() {
  Object.keys(answers).forEach((key) => delete answers[key])
  Object.keys(results).forEach((key) => delete results[key])
  emit('reset')
}

watch(
  () => props.topic.id,
  () => reset()
)
</script>

<template>
  <aside class="practice-panel">
    <div class="practice-head">
      <span class="eyebrow">即时练习</span>
      <h3>{{ topic.title }}</h3>
    </div>

    <div v-for="(item, index) in topic.practices" :key="item.question" class="practice-card">
      <span class="practice-type">{{ item.type }}</span>
      <p class="practice-question">{{ item.question }}</p>
      <input v-model="answers[index]" class="practice-input" type="text" placeholder="输入答案" @keyup.enter="check(item, index)" />
      <button type="button" class="math-button primary" @click="check(item, index)">检查答案</button>

      <div v-if="results[index] !== undefined" class="practice-result" :class="results[index] ? 'right' : 'wrong'">
        <strong>{{ results[index] ? '正确' : '错误' }}</strong>
        <span v-if="!results[index]" class="mistake-tag">{{ item.tag }}</span>
        <p>{{ item.explanation }}</p>
      </div>

      <div v-if="showAnswers" class="answer-line">答案：{{ item.answer[0] }}</div>
    </div>

    <button type="button" class="math-button ghost" @click="reset">重新练习</button>
  </aside>
</template>
