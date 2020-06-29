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
import Checkbox from './checkbox'
import CheckboxGroup from './checkbox-group'
import Col from './col'
import Container from './container'
import Dialog from './dialog'
import Dropdown from './dropdown'
import DropdownItem from './dropdown-item'
import DropdownMenu from './dropdown-menu'
import Footer from './footer'
import Form from './form'
import FormItem from './form-item'
import Header from './header'
import Icon from './icon'
import Input from './input'
import Link from './link'
import Loading from './loading'
import Main from './main'
import Message from './message'
import MessageBox from './message-box'
import Option from './option'
import OptionGroup from './option-group'
import PageHeader from './page-header'
import Popup from './popup'
import Radio from './radio'
import RadioGroup from './radio-group'
import Rate from './rate'
import Row from './row'
import Scrollbar from './scrollbar'
import Select from './select'
const version = '0.1.27'
const components = [
  Alert,
  Aside,
  Avatar,
  Badge,
  Button,
  ButtonGroup,
  Checkbox,
  CheckboxGroup,
  Col,
  Container,
  Dialog,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  Footer,
  Form,
  FormItem,
  Header,
  Icon,
  Input,
  Link,
  Main,
  Option,
  OptionGroup,
  PageHeader,
  Popup,
  Radio,
  RadioGroup,
  Rate,
  Row,
  Scrollbar,
  Select
]

const install = (Vue: VueConstructor, opts: InstallationOptions = {}) => {
  // https://github.com/vuejs/vue-cli/issues/4065#issuecomment-496267589
  // 注意:因为vue class-name webpack 压缩后会消失,导致全局注册失败.故组件全局注册使用 vue.component(Comp.options.name,Comp)
  components.forEach((component: any) => {
    Vue.component(component.options.name,component)
  })

  Vue.use(Loading.directive);
  
  Vue.prototype.$MUSELY = {
    version,
    zIndex: opts.zIndex || 2000
  }
  Vue.prototype.$loading = Loading.service;
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
  Checkbox,
  CheckboxGroup,
  Col,
  Container,
  Dialog,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  Footer,
  Form,
  FormItem,
  Header,
  Icon,
  Input,
  Link,
  Loading,
  Main,
  Message,
  MessageBox,
  Option,
  OptionGroup,
  PageHeader,
  Popup,
  Radio,
  RadioGroup,
  Rate,
  Row,
  Scrollbar,
  Select
}
export default {
  install,
  version
}
