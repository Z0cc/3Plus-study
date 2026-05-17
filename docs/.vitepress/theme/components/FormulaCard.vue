<script setup>
import { computed, reactive, watch } from 'vue'

const props = defineProps({
  topic: {
    type: Object,
    required: true
  }
})

const values = reactive({
  n: -3,
  base: -3,
  p: 3,
  q: 5,
  m: 2,
  c: 3,
  a: 2,
  b: 3,
  common: 3,
  f: 2,
  den: 4,
  eqA: 2,
  eqB: 3,
  eqC: 11
})

const absLeft = computed(() => `${Math.min(values.n, 0) * 5 + 50}%`)
const absWidth = computed(() => `${Math.abs(values.n) * 5}%`)
const square = computed(() => values.base * values.base)
const cube = computed(() => values.base * values.base * values.base)
const polynomialSum = computed(() => values.p + values.q)
const distributeN = computed(() => values.m * values.c)
const midTerm = computed(() => 2 * values.a * values.b)
const firstSquare = computed(() => values.a * values.a)
const lastSquare = computed(() => values.b * values.b)
const factorSquare = computed(() => values.b * values.b)
const fractionReduced = computed(() => reduce(values.f, values.den))
const equationRight = computed(() => values.eqC - values.eqB)
const equationX = computed(() => formatNumber(equationRight.value / values.eqA))

function reduce(a, b) {
  const g = gcd(Math.abs(a), Math.abs(b)) || 1
  return `${a / g}/${b / g}`
}

function gcd(a, b) {
  while (b) [a, b] = [b, a % b]
  return a
}

function formatNumber(num) {
  return Number.isInteger(num) ? String(num) : num.toFixed(2).replace(/0+$/, '').replace(/\.$/, '')
}

function xTerm(coef) {
  if (coef === 1) return 'x'
  if (coef === -1) return '-x'
  return `${coef}x`
}

function formulaHtml(text) {
  return text
    .replace(/√\(a²\)/g, '<span class="root inline"><span class="root-radicand">(a²)</span></span>')
    .replace(/√a/g, '<span class="root inline"><span class="root-radicand">a</span></span>')
    .replace(/√25/g, '<span class="root inline"><span class="root-radicand">25</span></span>')
}

watch(
  () => props.topic.id,
  () => {
    values.n = -3
    values.base = -3
    values.p = 3
    values.q = 5
    values.m = 2
    values.c = 3
    values.a = 2
    values.b = 3
    values.common = 3
    values.f = 2
    values.den = 4
    values.eqA = 2
    values.eqB = 3
    values.eqC = 11
  }
)
</script>

<template>
  <section class="formula-card formula-paper">
    <header class="formula-card-head">
      <span class="eyebrow">基础公式</span>
      <h2>{{ topic.title }}</h2>
      <p>{{ topic.plain }}</p>
    </header>

    <div class="formula-showcase">
      <div class="math-display">
        <template v-if="topic.interactive.type === 'absolute'">
          <p class="math-line">|{{ values.n }}| = {{ Math.abs(values.n) }}</p>
          <p>因为 {{ values.n }} 到 0 的距离是 {{ Math.abs(values.n) }}。</p>
        </template>
        <template v-else-if="topic.interactive.type === 'power'">
          <p class="math-line">{{ values.base }}² = {{ values.base }} × {{ values.base }} = {{ square }}</p>
          <p class="math-line">{{ values.base }}³ = {{ values.base }} × {{ values.base }} × {{ values.base }} = {{ cube }}</p>
          <p class="math-line">
            <span class="root"><span class="root-radicand">{{ square }}</span></span>
            = {{ Math.abs(values.base) }}
          </p>
          <p class="math-line small">
            <span class="root"><span class="root-radicand">({{ values.base }}²)</span></span>
            = |{{ values.base }}| = {{ Math.abs(values.base) }}
          </p>
        </template>
        <template v-else-if="topic.interactive.type === 'polynomial'">
          <p class="math-line">{{ values.p }}x + {{ values.q }}x = ({{ values.p }} + {{ values.q }})x = {{ polynomialSum }}x</p>
          <p class="math-line">{{ values.m }}(x + {{ values.c }}) = {{ values.m }}x + {{ distributeN }}</p>
        </template>
        <template v-else-if="topic.interactive.type === 'multiply'">
          <p class="math-line">({{ xTerm(values.a) }} + {{ values.b }})²</p>
          <p>利用完全平方公式：</p>
          <p class="math-line small">(a + b)² = a² + 2ab + b²</p>
          <p>所以：</p>
          <p class="math-line small">= ({{ xTerm(values.a) }})² + 2 × {{ xTerm(values.a) }} × {{ values.b }} + {{ values.b }}²</p>
          <p class="math-line">= {{ firstSquare }}x² + {{ midTerm }}x + {{ lastSquare }}</p>
        </template>
        <template v-else-if="topic.interactive.type === 'factor'">
          <p class="math-line">x² - {{ factorSquare }} = (x + {{ values.b }})(x - {{ values.b }})</p>
          <p>这是平方差：</p>
          <p class="math-line small">a² - b² = (a + b)(a - b)</p>
          <p>其中 a = x，b = {{ values.b }}。</p>
        </template>
        <template v-else-if="topic.interactive.type === 'fraction'">
          <p class="fraction-line"><span>{{ values.f }}x</span><i></i><span>{{ values.den }}x</span></p>
          <p>上下同时约去 x，条件是 x≠0。</p>
          <p class="math-line">{{ values.f }}x / {{ values.den }}x = {{ fractionReduced }}</p>
        </template>
        <template v-else-if="topic.interactive.type === 'equation'">
          <p class="math-line">{{ values.eqA }}x + {{ values.eqB }} = {{ values.eqC }}</p>
          <p class="math-line small">{{ values.eqA }}x = {{ values.eqC }} - {{ values.eqB }}</p>
          <p class="math-line small">{{ values.eqA }}x = {{ equationRight }}</p>
          <p class="math-line">x = {{ equationX }}</p>
        </template>
      </div>

      <div class="formula-controls">
        <label v-if="topic.interactive.type === 'absolute'">a = {{ values.n }}<input v-model.number="values.n" type="range" min="-10" max="10" /></label>
        <label v-if="topic.interactive.type === 'power'">a = {{ values.base }}<input v-model.number="values.base" type="range" min="-10" max="10" /></label>
        <template v-if="topic.interactive.type === 'polynomial'">
          <label>a = {{ values.p }}<input v-model.number="values.p" type="range" min="-9" max="9" /></label>
          <label>b = {{ values.q }}<input v-model.number="values.q" type="range" min="-9" max="9" /></label>
          <label>括号外系数 = {{ values.m }}<input v-model.number="values.m" type="range" min="-6" max="6" /></label>
          <label>常数 = {{ values.c }}<input v-model.number="values.c" type="range" min="-9" max="9" /></label>
        </template>
        <template v-if="topic.interactive.type === 'multiply'">
          <label>a = {{ values.a }}x<input v-model.number="values.a" type="range" min="1" max="8" /></label>
          <label>b = {{ values.b }}<input v-model.number="values.b" type="range" min="1" max="10" /></label>
        </template>
        <label v-if="topic.interactive.type === 'factor'">b = {{ values.b }}<input v-model.number="values.b" type="range" min="1" max="12" /></label>
        <template v-if="topic.interactive.type === 'fraction'">
          <label>分子系数 = {{ values.f }}<input v-model.number="values.f" type="range" min="1" max="12" /></label>
          <label>分母系数 = {{ values.den }}<input v-model.number="values.den" type="range" min="1" max="12" /></label>
        </template>
        <template v-if="topic.interactive.type === 'equation'">
          <label>a = {{ values.eqA }}<input v-model.number="values.eqA" type="range" min="1" max="9" /></label>
          <label>b = {{ values.eqB }}<input v-model.number="values.eqB" type="range" min="-10" max="10" /></label>
          <label>右边 = {{ values.eqC }}<input v-model.number="values.eqC" type="range" min="-20" max="30" /></label>
        </template>
      </div>

      <div v-if="topic.interactive.type === 'absolute'" class="visual-card number-visual">
        <div class="number-axis"><i :style="{ left: absLeft, width: absWidth }"></i><span>-10</span><span>0</span><span>10</span></div>
      </div>
      <div v-else-if="topic.interactive.type === 'multiply'" class="visual-card area-visual">
        <div class="square-diagram">
          <span class="area-a">a²</span><span class="area-ab">ab</span><span class="area-ab second">ab</span><span class="area-b">b²</span>
        </div>
      </div>
      <div v-else-if="topic.interactive.type === 'factor'" class="visual-card split-visual">
        <div class="rect left">a²</div><div class="rect cut">b²</div><div class="rect right">(a+b)(a-b)</div>
      </div>
    </div>

    <section class="formula-notes">
      <div>
        <h3>公式含义</h3>
        <ul><li v-for="formula in topic.formulas" :key="formula.text"><strong v-html="formulaHtml(formula.text)"></strong>：{{ formula.meaning }}</li></ul>
      </div>
      <div class="mistake-box clean">
        <h3>易错点</h3>
        <p v-for="mistake in topic.mistakes" :key="mistake" v-html="formulaHtml(mistake)"></p>
      </div>
    </section>

    <section v-if="topic.squares" class="square-memory clean">
      <h3>必背平方数</h3>
      <span v-for="item in topic.squares" :key="item">{{ item }}</span>
    </section>

    <div class="exam-tip clean">考试提醒：{{ topic.examTip }}</div>
  </section>
</template>
