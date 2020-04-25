/*
 * @Author: Victor wang
 * @Date: 2020-03-31 16:27:01
 * @LastEditors: Victor.wang
 * @LastEditTime: 2020-04-26 02:51:22
 * @Description:
 */

import { VueConstructor } from 'vue'
import { InstallationOptions } from 'types/musely-ui'
// basic
import Link from './link'
// layout
import Row from './row'
import Col from './col/src/index'

// skeleton
import Container from './container/src/index.vue'
import Aside from './aside/src/index.vue'
import Header from './header/src/index.vue'
import Footer from './footer/src/index.vue'
import Main from './main/src/index.vue'
// notice
import Alert from './alert/src/index.vue'

export const components = [Container, Row, Col, Aside, Header, Footer, Main, Alert, Link]

const install = (Vue: VueConstructor, opts: InstallationOptions = {}) => {
  components.forEach((component: any) => {
    Vue.component(component.name, component)
  })
  Vue.prototype.$MUSELY = {
    zIndex: opts.zIndex || 2000
  }
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}
export default { version: '0.0.1', install, Container, Row, Col, Aside, Header, Footer, Main, Alert, Link }
