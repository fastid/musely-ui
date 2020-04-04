import Vue from 'vue'
import App from './App.vue'
import router from './router'
import SvgIcon from 'vue-svgicon'
import MUSELYUI from '../packages/index'
// icons
import '@/assets/icons/components'

import '../packages/theme-default/index.scss'
// import '@/styles/index.scss'

Vue.use(MUSELYUI)

Vue.use(SvgIcon, {
  tagName: 'svgicon'
})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
