import Vue from 'vue'
import App from './App.vue'
import router from './router'
import SvgIcon from 'vue-svgicon'
// import MuselyUI from '~/'
import { Alert, Aside, Avatar, Badge, Button, ButtonGroup, Col, Container, Dialog, Footer, Header, Icon, Input, Link, Main, PageHeader, Popup, Rate, Row } from '~/'
// import MuselyUI from '../../musely-ui'
import codeView from './components/codeView.vue'
// icons
import '@/assets/icons/components'
import icon from './settings/icon.json'

// import 'highlight.js/styles/default.css'
import '~/theme-default/src/index.scss'
import '@/assets/index.scss'
console.log(codeView.name)
Vue.component('CodeView', codeView)

Vue.component('MuAlert', Alert)
Vue.component('MuAside', Aside)
Vue.component('MuAvatar', Avatar)
Vue.component('MuBadge', Badge)
Vue.component('MuContainer', Container)
Vue.component('MuIcon', Icon)
Vue.component('MuInput', Input)
Vue.component('MuButtonGroup', ButtonGroup)
Vue.component('MuButton', Button)
Vue.component('MuCol', Col)
Vue.component('MuDialog', Dialog)
Vue.component('MuFooter', Footer)
Vue.component('MuHeader', Header)
Vue.component('MuLink', Link)
Vue.component('MuMain', Main)
Vue.component('MuPageHeader', PageHeader)
Vue.component('MuPopup', Popup)
Vue.component('MuRate', Rate)
Vue.component('MuRow', Row)

// Vue.use(MuselyUI)

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
