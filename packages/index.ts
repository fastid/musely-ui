/*
 * @Author: Victor wang
 * @Date: 2020-03-31 16:27:01
 * @LastEditors: Victor.wang
 * @LastEditTime: 2020-04-27 00:41:11
 * @Description:
 */

import { VueConstructor } from 'vue'
import { InstallationOptions } from 'types/musely-ui'
// basic
import Link from './link'
import Icon from './icon'
import Button from './button'
import ButtonGroup from './button-group'
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

export const components = [Container, Row, Col, Aside, Header, Footer, Main, Alert, Link, Icon, Button, ButtonGroup]

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
export { Container, Row, Col, Aside, Header, Footer, Main, Alert, Link, Icon, Button, ButtonGroup }

export default { version: '0.0.1', install, Container, Row, Col, Aside, Header, Footer, Main, Alert, Link, Icon, Button, ButtonGroup }
