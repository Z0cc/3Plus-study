import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'
import './style.css'
import './chinese.css'
import './math.css'
import HomeLanding from './components/HomeLanding.vue'
import SubjectSelect from './components/SubjectSelect.vue'
import EnglishHome from './components/EnglishHome.vue'
import IrregularVerbTable from './components/IrregularVerbTable.vue'
import GrammarLibrary from './components/GrammarLibrary.vue'
import GrammarOriginal from './components/GrammarOriginal.vue'
import SimpleDataPage from './components/SimpleDataPage.vue'
import ThemeToneToggle from './components/ThemeToneToggle.vue'
import BackButton from './components/BackButton.vue'
import ChineseHome from './components/ChineseHome.vue'
import PoemDetail from './components/PoemDetail.vue'
import FormulaReviewPage from './components/FormulaReviewPage.vue'
import FormulaCard from './components/FormulaCard.vue'
import PracticeCard from './components/PracticeCard.vue'
import ProgressBar from './components/ProgressBar.vue'

export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'layout-top': () => h(ThemeToneToggle)
    })
  },
  enhanceApp({ app }) {
    app.component('HomeLanding', HomeLanding)
    app.component('SubjectSelect', SubjectSelect)
    app.component('EnglishHome', EnglishHome)
    app.component('IrregularVerbTable', IrregularVerbTable)
    app.component('GrammarLibrary', GrammarLibrary)
    app.component('GrammarOriginal', GrammarOriginal)
    app.component('SimpleDataPage', SimpleDataPage)
    app.component('ThemeToneToggle', ThemeToneToggle)
    app.component('BackButton', BackButton)
    app.component('ChineseHome', ChineseHome)
    app.component('PoemDetail', PoemDetail)
    app.component('FormulaReviewPage', FormulaReviewPage)
    app.component('FormulaCard', FormulaCard)
    app.component('PracticeCard', PracticeCard)
    app.component('ProgressBar', ProgressBar)
  }
}
