<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'

const text = ref('欢迎来到直播间\n今天一起学习广东3+证书知识')
const fontSize = ref(46)
const lineHeight = ref(1.45)
const stageWidth = ref(760)
const stageHeight = ref(430)
const textAlign = ref('center')
const theme = ref('paper')
const timerMode = ref('up')
const countdownMinutes = ref(30)
const elapsed = ref(0)
const running = ref(false)
const showTimer = ref(true)
const timerPosition = ref('top')
let timerId

const themes = {
  paper: { label: '纯白', className: 'live-theme-paper' },
  eye: { label: '护眼', className: 'live-theme-eye' },
  dark: { label: '深色', className: 'live-theme-dark' }
}

const totalSeconds = computed(() => Math.max(1, countdownMinutes.value * 60))
const displaySeconds = computed(() => timerMode.value === 'up'
  ? elapsed.value
  : Math.max(0, totalSeconds.value - elapsed.value))
const timeText = computed(() => {
  const hours = Math.floor(displaySeconds.value / 3600)
  const minutes = Math.floor((displaySeconds.value % 3600) / 60)
  const seconds = displaySeconds.value % 60
  return [hours, minutes, seconds].map((item) => String(item).padStart(2, '0')).join(':')
})
const stageStyle = computed(() => ({
  width: `${stageWidth.value}px`,
  height: `${stageHeight.value}px`,
  '--live-font-size': `${fontSize.value}px`,
  '--live-line-height': lineHeight.value,
  textAlign: textAlign.value
}))

function stopTimer() {
  running.value = false
  clearInterval(timerId)
  timerId = undefined
}

function toggleTimer() {
  if (running.value) {
    stopTimer()
    return
  }
  running.value = true
  timerId = window.setInterval(() => {
    if (timerMode.value === 'down' && elapsed.value >= totalSeconds.value) {
      stopTimer()
      return
    }
    elapsed.value += 1
  }, 1000)
}

function resetTimer() {
  stopTimer()
  elapsed.value = 0
}

function requestStageFullscreen() {
  document.querySelector('.live-stage')?.requestFullscreen?.()
}

watch([text, fontSize, lineHeight, stageWidth, stageHeight, textAlign, theme, showTimer, timerPosition], () => {
  localStorage.setItem('three-plus-live-settings', JSON.stringify({
    text: text.value,
    fontSize: fontSize.value,
    lineHeight: lineHeight.value,
    stageWidth: stageWidth.value,
    stageHeight: stageHeight.value,
    textAlign: textAlign.value,
    theme: theme.value,
    showTimer: showTimer.value,
    timerPosition: timerPosition.value
  }))
})

onMounted(() => {
  try {
    const saved = JSON.parse(localStorage.getItem('three-plus-live-settings') || '{}')
    if (typeof saved.text === 'string') text.value = saved.text
    if (saved.fontSize) fontSize.value = saved.fontSize
    if (saved.lineHeight) lineHeight.value = saved.lineHeight
    if (saved.stageWidth) stageWidth.value = saved.stageWidth
    if (saved.stageHeight) stageHeight.value = saved.stageHeight
    if (saved.textAlign) textAlign.value = saved.textAlign
    if (saved.theme) theme.value = saved.theme
    if (typeof saved.showTimer === 'boolean') showTimer.value = saved.showTimer
    if (saved.timerPosition) timerPosition.value = saved.timerPosition
  } catch {
    localStorage.removeItem('three-plus-live-settings')
  }
})

onBeforeUnmount(stopTimer)
</script>

<template>
  <BackButton />
  <main class="live-studio-page">
    <header class="live-page-head">
      <div>
        <p class="eyebrow">Douyin Live Canvas</p>
        <h1>直播排版</h1>
      </div>
      <button class="live-fullscreen-button" type="button" @click="requestStageFullscreen">全屏画面</button>
    </header>

    <div class="live-workspace">
      <aside class="live-controls">
        <section class="live-control-section">
          <h2>显示文字</h2>
          <textarea v-model="text" rows="7" maxlength="500" placeholder="输入直播中需要展示的文字"></textarea>
          <span class="live-field-note">{{ text.length }}/500</span>
        </section>

        <section class="live-control-section">
          <h2>画面尺寸</h2>
          <label>
            <span>宽度 <strong>{{ stageWidth }}px</strong></span>
            <input v-model.number="stageWidth" type="range" min="320" max="1200" step="10" />
          </label>
          <label>
            <span>高度 <strong>{{ stageHeight }}px</strong></span>
            <input v-model.number="stageHeight" type="range" min="240" max="800" step="10" />
          </label>
        </section>

        <section class="live-control-section">
          <h2>文字排版</h2>
          <label>
            <span>字号 <strong>{{ fontSize }}px</strong></span>
            <input v-model.number="fontSize" type="range" min="20" max="100" step="2" />
          </label>
          <label>
            <span>行距 <strong>{{ lineHeight }}</strong></span>
            <input v-model.number="lineHeight" type="range" min="1" max="2.2" step="0.05" />
          </label>
          <div class="live-segmented" aria-label="文字对齐">
            <button type="button" :class="{ active: textAlign === 'left' }" @click="textAlign = 'left'">左对齐</button>
            <button type="button" :class="{ active: textAlign === 'center' }" @click="textAlign = 'center'">居中</button>
            <button type="button" :class="{ active: textAlign === 'right' }" @click="textAlign = 'right'">右对齐</button>
          </div>
        </section>

        <section class="live-control-section">
          <h2>计时器</h2>
          <div class="live-inline-options">
            <label><input v-model="showTimer" type="checkbox" /> 显示计时器</label>
            <select v-model="timerPosition" aria-label="计时器位置">
              <option value="top">顶部</option>
              <option value="bottom">底部</option>
            </select>
          </div>
          <div class="live-segmented">
            <button type="button" :class="{ active: timerMode === 'up' }" @click="timerMode = 'up'; resetTimer()">正计时</button>
            <button type="button" :class="{ active: timerMode === 'down' }" @click="timerMode = 'down'; resetTimer()">倒计时</button>
          </div>
          <label v-if="timerMode === 'down'" class="live-number-field">
            <span>倒计时分钟</span>
            <input v-model.number="countdownMinutes" type="number" min="1" max="600" @change="resetTimer" />
          </label>
          <div class="live-timer-actions">
            <button type="button" class="live-primary-control" @click="toggleTimer">{{ running ? '暂停' : '开始' }}</button>
            <button type="button" @click="resetTimer">重置</button>
          </div>
        </section>

        <section class="live-control-section">
          <h2>画面颜色</h2>
          <div class="live-theme-options">
            <button
              v-for="(item, key) in themes"
              :key="key"
              type="button"
              :class="[{ active: theme === key }, item.className]"
              @click="theme = key"
            >{{ item.label }}</button>
          </div>
        </section>
      </aside>

      <section class="live-preview-panel">
        <div class="live-preview-label">
          <span>直播画面预览</span>
          <span>{{ stageWidth }} × {{ stageHeight }}</span>
        </div>
        <div class="live-stage-shell">
          <div class="live-stage" :class="[themes[theme].className, `timer-${timerPosition}`]" :style="stageStyle">
            <time v-if="showTimer" class="live-stage-timer">{{ timeText }}</time>
            <div class="live-stage-text">{{ text || '请输入直播文字' }}</div>
          </div>
        </div>
      </section>
    </div>
  </main>
</template>
