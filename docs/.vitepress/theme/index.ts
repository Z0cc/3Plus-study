import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'
import './style.css'
import HomeLanding from './components/HomeLanding.vue'
import SubjectSelect from './components/SubjectSelect.vue'
import EnglishHome from './components/EnglishHome.vue'
import WordList from './components/WordList.vue'
import PhraseList from './components/PhraseList.vue'
import IrregularVerbTable from './components/IrregularVerbTable.vue'
import GrammarLibrary from './components/GrammarLibrary.vue'
import SimpleDataPage from './components/SimpleDataPage.vue'
import ThemeToneToggle from './components/ThemeToneToggle.vue'

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
    app.component('WordList', WordList)
    app.component('PhraseList', PhraseList)
    app.component('IrregularVerbTable', IrregularVerbTable)
    app.component('GrammarLibrary', GrammarLibrary)
    app.component('SimpleDataPage', SimpleDataPage)
  }
}
