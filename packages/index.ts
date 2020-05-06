/* eslint-disable */
// ********** index.ts file don't edit it!!! *********
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
import MuLink from './link'
import MuMain from './main'
import MuPageHeader from './page-header'
import MuRow from './row'
import MuMessage from './message'
const version = '0.1.6'
const components = [MuAlert, MuAside, MuButton, MuButtonGroup, MuCol, MuContainer, MuDialog, MuFooter, MuHeader, MuIcon, MuLink, MuMain, MuPageHeader, MuRow]
const install = (Vue: VueConstructor, opts: InstallationOptions = {}) => {
  components.forEach((component: any) => {
    Vue.use(component)
  })
  Vue.prototype.$MUSELY = {
    zIndex: opts.zIndex || 2000
  }
}
/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}
export { version, MuAlert, MuAside, MuButton, MuButtonGroup, MuCol, MuContainer, MuDialog, MuFooter, MuHeader, MuIcon, MuLink, MuMain, MuPageHeader, MuRow }
export default {
  install,
  version
}
