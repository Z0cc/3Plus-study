<script setup>
import { computed, reactive, ref, watch } from 'vue'

const props = defineProps({
  topic: {
    type: Object,
    required: true
  }
})

const opened = reactive({})
const squareSelected = reactive({ left: '', right: '' })
const squareMatches = reactive({})
const activeStep = ref(0)
const selectedMode = ref('')
const placedTerms = reactive({ x: [], x2: [], const: [] })

const squareValues = ['25', '36', '49', '64', '81', '100']
const squareFormulas = ['5²', '6²', '7²', '8²', '9²', '10²']
const squareAnswer = { '25': '5²', '36': '6²', '49': '7²', '64': '8²', '81': '9²', '100': '10²' }
const terms = [
  { text: 'x²', group: 'x2' },
  { text: '3x', group: 'x' },
  { text: '5x²', group: 'x2' },
  { text: '2x', group: 'x' },
  { text: '7', group: 'const' },
  { text: '4', group: 'const' }
]
const factorQuestions = [
  { text: 'x²+10x+25', mode: '完全平方', reason: '25=5²，中间项 10x=2×x×5。' },
  { text: 'x²-16', mode: '平方差', reason: '两个平方相减：x²-4²。' },
  { text: '6x+12', mode: '提公因式', reason: '两项都有公因式 6。' }
]
const factorIndex = ref(0)

const currentFactor = computed(() => factorQuestions[factorIndex.value])
const factorResult = computed(() => {
  if (!selectedMode.value) return ''
  return selectedMode.value === currentFactor.value.mode ? `正确：${currentFactor.value.reason}` : `再想想：${currentFactor.value.reason}`
})

function toggleFormula(index) {
  opened[index] = !opened[index]
}

function chooseSquare(side, value) {
  squareSelected[side] = value
  if (!squareSelected.left || !squareSelected.right) return
  if (squareAnswer[squareSelected.left] === squareSelected.right) {
    squareMatches[squareSelected.left] = squareSelected.right
  }
  squareSelected.left = ''
  squareSelected.right = ''
}

function putTerm(term, group) {
  if (placedTerms.x.includes(term.text) || placedTerms.x2.includes(term.text) || placedTerms.const.includes(term.text)) return
  placedTerms[group].push(term.text)
}

function nextStep() {
  activeStep.value = Math.min(activeStep.value + 1, 3)
}

function nextFactor() {
  factorIndex.value = (factorIndex.value + 1) % factorQuestions.length
  selectedMode.value = ''
}

watch(
  () => props.topic.id,
  () => {
    Object.keys(opened).forEach((key) => delete opened[key])
    Object.keys(squareMatches).forEach((key) => delete squareMatches[key])
    placedTerms.x = []
    placedTerms.x2 = []
    placedTerms.const = []
    activeStep.value = 0
    selectedMode.value = ''
    factorIndex.value = 0
  }
)
</script>

<template>
  <section class="formula-card">
    <div class="formula-card-head">
      <span class="eyebrow">基础公式</span>
      <h2>{{ topic.title }}</h2>
      <p>{{ topic.plain }}</p>
    </div>

    <div class="formula-list">
      <button v-for="(formula, index) in topic.formulas" :key="formula.text" type="button" class="formula-pill" @click="toggleFormula(index)">
        <strong>{{ formula.text }}</strong>
        <span>{{ opened[index] ? '收起' : '展开含义' }}</span>
      </button>
      <div v-for="(formula, index) in topic.formulas" :key="`${formula.text}-detail`" v-show="opened[index]" class="formula-detail">
        <p><strong>公式含义：</strong>{{ formula.meaning }}</p>
        <p><strong>使用条件：</strong>{{ formula.condition }}</p>
      </div>
    </div>

    <div class="formula-grid-blocks">
      <div class="example-box">
        <h3>例题拆解</h3>
        <ul>
          <li v-for="example in topic.examples" :key="example">{{ example }}</li>
        </ul>
      </div>
      <div class="mistake-box">
        <h3>易错点</h3>
        <p v-for="mistake in topic.mistakes" :key="mistake">{{ mistake }}</p>
      </div>
    </div>

    <div class="exam-tip">考试提醒：{{ topic.examTip }}</div>

    <div v-if="topic.squares" class="square-memory">
      <h3>必背平方数</h3>
      <span v-for="item in topic.squares" :key="item">{{ item }}</span>
    </div>

    <div class="interactive-box">
      <h3>交互理解</h3>

      <div v-if="topic.interactive.type === 'numberLine'" class="number-line-demo">
        <div class="number-line">
          <span>-3</span><span>0</span><span>3</span>
          <i></i>
        </div>
        <p>{{ topic.interactive.result }}</p>
      </div>

      <div v-else-if="topic.interactive.type === 'squareMatch'" class="match-game">
        <div>
          <button v-for="value in squareValues" :key="value" type="button" :class="{ selected: squareSelected.left === value, done: squareMatches[value] }" @click="chooseSquare('left', value)">{{ value }}</button>
        </div>
        <div>
          <button v-for="formula in squareFormulas" :key="formula" type="button" :class="{ selected: squareSelected.right === formula }" @click="chooseSquare('right', formula)">{{ formula }}</button>
        </div>
        <p>已匹配 {{ Object.keys(squareMatches).length }} / 6</p>
      </div>

      <div v-else-if="topic.interactive.type === 'classifyTerms'" class="term-classify">
        <div class="term-bank">
          <span v-for="term in terms" :key="term.text">{{ term.text }}</span>
        </div>
        <div class="term-zones">
          <div v-for="zone in [{ id: 'x', label: 'x类' }, { id: 'x2', label: 'x²类' }, { id: 'const', label: '常数类' }]" :key="zone.id" class="term-zone">
            <strong>{{ zone.label }}</strong>
            <button v-for="term in terms.filter((item) => item.group === zone.id)" :key="term.text" type="button" @click="putTerm(term, zone.id)">放入 {{ term.text }}</button>
            <p>{{ placedTerms[zone.id].join('、') || '等待分类' }}</p>
          </div>
        </div>
      </div>

      <div v-else-if="topic.interactive.type === 'expandSteps'" class="step-demo">
        <strong>(2x+3)²</strong>
        <ol>
          <li :class="{ on: activeStep >= 1 }">第一项平方：(2x)²=4x²</li>
          <li :class="{ on: activeStep >= 2 }">中间项：2×2x×3=12x</li>
          <li :class="{ on: activeStep >= 3 }">最后一项平方：3²=9，结果 4x²+12x+9</li>
        </ol>
        <button type="button" class="math-button primary" @click="nextStep">下一步</button>
      </div>

      <div v-else-if="topic.interactive.type === 'identifyFactor'" class="identify-demo">
        <strong>{{ currentFactor.text }}</strong>
        <div>
          <button v-for="mode in ['提公因式', '平方差', '完全平方']" :key="mode" type="button" :class="{ selected: selectedMode === mode }" @click="selectedMode = mode">{{ mode }}</button>
        </div>
        <p v-if="factorResult">{{ factorResult }}</p>
        <button type="button" class="math-button ghost" @click="nextFactor">换一题</button>
      </div>

      <div v-else-if="topic.interactive.type === 'reduceFraction'" class="reduce-demo">
        <p><strong>2x / 4x</strong></p>
        <p>共同因子：<mark>x</mark>，上下同时约去 x</p>
        <p>2x/4x = 2/4 = 1/2，条件是 x≠0</p>
      </div>

      <div v-else-if="topic.interactive.type === 'equationSteps'" class="step-demo">
        <strong>2x+3=11</strong>
        <ol>
          <li :class="{ on: activeStep >= 1 }">+3 从左边移动到右边，变成 -3</li>
          <li :class="{ on: activeStep >= 2 }">2x=11-3，所以 2x=8</li>
          <li :class="{ on: activeStep >= 3 }">两边除以 2，x=4</li>
        </ol>
        <button type="button" class="math-button primary" @click="nextStep">下一步</button>
      </div>
    </div>
  </section>
</template>
