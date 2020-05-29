import Vue from 'vue'
import App from './App.vue'
import router from './router'
import SvgIcon from 'vue-svgicon'
import MuselyUI, { Main, Button } from '~/'
import codeView from './components/codeView.vue'
// icons
import '@/assets/icons/components'
import icon from './settings/icon.json'

// import 'highlight.js/styles/default.css'
import '~/theme-default/src/index.scss'
import '@/assets/index.scss'
Vue.component('codeView', codeView)

Vue.use(MuselyUI)

Vue.use(SvgIcon, {
  tagName: 'svgicon'
})

// Icon 列表页用
Vue.prototype.$icon = icon

Vue.config.productionTip = false

// router.afterEach((route) => {})

new Vue({
  router,
  render: (h) => h(App)
}).$mount('#app')
