<script setup>
import { computed, ref } from 'vue'
import poems from '../../../data/chinese/poems.json'

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

const poem = computed(() => poems.find((item) => item.id === props.id) || poems[0])
const showPinyin = ref(false)
const showTranslation = ref(true)
const showNotes = ref(true)
</script>

<template>
  <BackButton />
  <article class="poem-reader">
    <div class="poem-topbar">
      <button type="button" class="poem-tool" :class="{ active: showTranslation }" @click="showTranslation = !showTranslation">译文</button>
      <button type="button" class="poem-tool" :class="{ active: showNotes }" @click="showNotes = !showNotes">注释</button>
      <button type="button" class="poem-tool" :class="{ active: showPinyin }" @click="showPinyin = !showPinyin">拼音</button>
    </div>

    <section class="poem-panel">
      <header class="poem-title-block">
        <h1>{{ poem.title }}</h1>
        <p>{{ poem.dynasty }} · {{ poem.author }}</p>
      </header>

      <div class="poem-lines">
        <span v-for="line in poem.lines" :key="line.text" class="poem-line">
          <span class="poem-pinyin">{{ showPinyin ? line.pinyin : '' }}</span>
          <span class="poem-text">{{ line.text }}</span>
        </span>
      </div>
    </section>

    <section v-if="showNotes" class="poem-section soft">
      <h2>注释</h2>
      <ol>
        <li v-for="note in poem.notes" :key="note">{{ note }}</li>
      </ol>
    </section>

    <section v-if="showTranslation" id="translation" class="poem-section">
      <h2>译文</h2>
      <p>{{ poem.translation }}</p>
    </section>

    <nav class="poem-section-nav" aria-label="古诗内容导航">
      <a href="#intro">简介</a>
      <a href="#appreciation">赏析</a>
      <a href="#background">背景</a>
      <a href="#author">作者介绍</a>
      <a href="#reviews">作品评价</a>
    </nav>

    <section id="intro" class="poem-section">
      <h2>简介</h2>
      <p>{{ poem.intro }}</p>
    </section>

    <section id="appreciation" class="poem-section">
      <h2>赏析</h2>
      <p v-for="paragraph in poem.appreciation" :key="paragraph">{{ paragraph }}</p>
    </section>

    <section id="background" class="poem-section">
      <h2>背景</h2>
      <p>{{ poem.background }}</p>
    </section>

    <section id="author" class="poem-section">
      <h2>作者介绍</h2>
      <p>{{ poem.authorIntro }}</p>
    </section>

    <section id="reviews" class="poem-section">
      <h2>作品评价</h2>
      <ul>
        <li v-for="review in poem.reviews" :key="review">{{ review }}</li>
      </ul>
    </section>
  </article>
</template>
