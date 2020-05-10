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
import MuAlert from './alert'
import MuAside from './aside'
import MuButton from './button'
import MuButtonGroup from './button-group'
import MuCol from './col'
import MuContainer from './container'
import MuDialog from './dialog'
import MuFooter from './footer'
import MuHeader from './header'
import MuIcon from './icon'
import MuInput from './input'
import MuLink from './link'
import MuMain from './main'
import MuMessage from './message'
import MuMessageBox from './message-box'
import MuPageHeader from './page-header'
import MuPopup from './popup'
import MuRow from './row'
const version = '0.1.6'
const components = [
  MuAlert,
  MuAside,
  MuButton,
  MuButtonGroup,
  MuCol,
  MuContainer,
  MuDialog,
  MuFooter,
  MuHeader,
  MuIcon,
  MuInput,
  MuLink,
  MuMain,
  MuPageHeader,
  MuPopup,
  MuRow
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
/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}
export {
  version,
  MuAlert,
  MuAside,
  MuButton,
  MuButtonGroup,
  MuCol,
  MuContainer,
  MuDialog,
  MuFooter,
  MuHeader,
  MuIcon,
  MuInput,
  MuLink,
  MuMain,
  MuMessage,
  MuMessageBox,
  MuPageHeader,
  MuPopup,
  MuRow
}
export default {
  install,
  version
}
