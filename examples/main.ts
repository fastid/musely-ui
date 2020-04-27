import Vue from 'vue'
import App from './App.vue'
import router from './router'
import SvgIcon from 'vue-svgicon'
import MuselyUI from '../packages'
// import MuselyUI from '../../musely-ui'
import codeView from './components/codeView.vue'
// icons
import '@/assets/icons/components'
import icon from './settings/icon.json'

import '../packages/theme-default'
import '@/assets/index.scss'

Vue.component('code-view', codeView)

Vue.use(MuselyUI)

Vue.use(SvgIcon, {
  tagName: 'svgicon'
})

// Icon 列表页用

Vue.prototype.$icon = icon

Vue.config.productionTip = false

new Vue({
  router,
  render: (h) => h(App)
}).$mount('#app')
