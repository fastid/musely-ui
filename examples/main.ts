import Vue from 'vue'
import App from './App.vue'
import router from './router'
import SvgIcon from 'vue-svgicon'
import MuselyUI from '../packages/index'
// import MuselyUI from '../../musely-ui'
import codeView from './components/codeView.vue'
// icons
import '@/assets/icons/components'

import '../packages/theme-default/src/index.scss'
import '@/assets/index.scss'
Vue.component('code-view', codeView)
console.log(MuselyUI)
Vue.use(MuselyUI)

Vue.use(SvgIcon, {
  tagName: 'svgicon'
})

Vue.config.productionTip = false

new Vue({
  router,
  render: (h) => h(App)
}).$mount('#app')
