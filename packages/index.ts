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
import { MuMessageBoxShortcutMethod } from 'types/message-box'
import Alert from './alert'
import Aside from './aside'
import Avatar from './avatar'
import Badge from './badge'
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
import Rate from './rate'
import Row from './row'
const version = '0.1.16'
const components = [
  Alert,
  Aside,
  Avatar,
  Badge,
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
  Rate,
  Row
]

const install = (Vue: VueConstructor, opts: InstallationOptions = {}) => {
  // https://github.com/vuejs/vue-cli/issues/4065#issuecomment-496267589
  components.forEach((component: any) => {
    Vue.component(component.options.name,component)
  })
  Vue.prototype.$MUSELY = {
    zIndex: opts.zIndex || 2000
  }
  Vue.prototype.$message = Message
  Vue.prototype.$msgbox = MessageBox
  Vue.prototype.$alert = MessageBox.alert
  Vue.prototype.$confirm = MessageBox.confirm
  Vue.prototype.$prompt = MessageBox.prompt
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
  Avatar,
  Badge,
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
  Rate,
  Row
}
export default {
  install,
  version
}
