/* eslint-disable */
// ***************************************************
// **********                                *********
// **********                                *********
// ********** index.ts file don't edit it!!! *********
// **********                                *********
// **********                                *********
// ***************************************************
// This file is auto gererated by build/build-entry.js
import { VueConstructor } from 'vue'
import { InstallationOptions } from 'types/musely-ui'
import Alert from './alert'
import Aside from './aside'
import Button from './button'
import ButtonGroup from './button-group'
import Col from './col'
import Container from './container'
import Dialog from './dialog'
import Footer from './footer'
import Header from './header'
import Icon from './icon'
import Input from './input'
import Link from './link'
import Main from './main'
import Message from './message'
import MessageBox from './message-box'
import PageHeader from './page-header'
import Popup from './popup'
import Row from './row'
const version = '0.1.6'
const components = [
  Alert,
  Aside,
  Button,
  ButtonGroup,
  Col,
  Container,
  Dialog,
  Footer,
  Header,
  Icon,
  Input,
  Link,
  Main,
  PageHeader,
  Popup,
  Row
]

const install = (Vue: VueConstructor, opts: InstallationOptions = {}) => {
  components.forEach((component: any) => {
    Vue.use(component)
  })
  Vue.prototype.$MUSELY = {
    zIndex: opts.zIndex || 2000
  }
  Vue.prototype.$message = MuMessage
  Vue.prototype.$msgbox = MuMessageBox
  Vue.prototype.$alert = MuMessageBox.alert
  Vue.prototype.$confirm = MuMessageBox.confirm
  Vue.prototype.$prompt = MuMessageBox.prompt
  // Vue.prototype.$notify = Notification
}
/* istanbul ignore if **/
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}
export {
  version,
  Alert,
  Aside,
  Button,
  ButtonGroup,
  Col,
  Container,
  Dialog,
  Footer,
  Header,
  Icon,
  Input,
  Link,
  Main,
  Message,
  MessageBox,
  PageHeader,
  Popup,
  Row
}
export default {
  install,
  version
}
