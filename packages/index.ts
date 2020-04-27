/*
 * @Author: Victor wang
 * @Date: 2020-03-31 16:27:01
 * @LastEditors: Victor.wang
 * @LastEditTime: 2020-04-28 00:34:11
 * @Description:
 */

import { VueConstructor } from 'vue'
import { InstallationOptions } from 'types/musely-ui'
// basic
import MuLink from './link'
import MuIcon from './icon'
import MuButton from './button'
import MuButtonGroup from './button-group'
// layout
import MuRow from './row'
import MuCol from './col'

// skeleton
import MuContainer from './container'
import MuAside from './aside'
import MuHeader from './header'
import MuFooter from './footer'
import MuMain from './main'
// notice
import MuAlert from './alert'

const version = '0.0.1'

export const components = [
  MuContainer,
  MuRow,
  MuCol,
  MuAside,
  MuHeader,
  MuFooter,
  MuMain,
  MuAlert,
  MuLink,
  MuIcon,
  MuButton,
  MuButtonGroup
]

const install = (Vue: VueConstructor, opts: InstallationOptions = {}) => {
  components.forEach((component: any) => {
    Vue.use(component)
  })
  Vue.prototype.$MUSELY = {
    zIndex: opts.zIndex || 2000
  }
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}
export {
  version,
  install,
  MuContainer,
  MuRow,
  MuCol,
  MuAside,
  MuHeader,
  MuFooter,
  MuMain,
  MuAlert,
  MuLink,
  MuIcon,
  MuButton,
  MuButtonGroup
}

export default { version, install }
