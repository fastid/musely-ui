/*
 * @Author: Victor wang
 * @Date: 2020-03-31 16:27:01
 * @LastEditors: Victor.wang
 * @LastEditTime: 2020-04-25 02:08:14
 * @Description:
 */

import { VueConstructor } from 'vue'
import { InstallationOptions } from '../types/musely-ui'
// basic
import Link from '../types/link.js'
// layout
import Row from '../types/row'
import Col from '../types/col'

// skeleton
import Container from '../types/container'
import Aside from '../types/aside'
import Header from '../types/header'
import Footer from '../types/footer'
import Main from '../types/main'
// notice
import Alert from '../types/alert'

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
export default { version: '0.0.1', install, ...components }
