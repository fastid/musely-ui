/*
 * @Author: Victor wang
 * @Date: 2020-03-31 16:27:01
 * @LastEditors: Victor.wang
 * @LastEditTime: 2020-04-23 19:16:11
 * @Description:
 */

import { VueConstructor } from 'vue'
// basic
import Link from './link'
// layout
import Row from './row'
import Col from './col'

// skeleton
import Container from './container'
import Aside from './aside'
import Header from './header'
import Footer from './footer'
import Main from './main'
// notice
import Alert from './alert'

const components = [Container, Row, Col, Aside, Header, Footer, Main, Alert, Link]

const install = (Vue: VueConstructor, opts: any = {}) => {
  components.forEach((component: any) => {
    Vue.component(component.name, component)
  })
  Vue.prototype.$MUSELY = {
    size: opts.size || '',
    zIndex: opts.zIndex || 2000
  }
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default { version: '0.0.1', install, ...components }
