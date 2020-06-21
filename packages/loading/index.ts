/*
 * @Author: Victor wang
 * @Date: 2020-04-03 01:45:15
 * @LastEditors: Victor.wang
 * @LastEditTime: 2020-06-21 15:11:21
 * @Description:
 */
import { VueConstructor } from 'vue'

import directive from './src/directive'
import service from './src/index'

export default {
  install(Vue: VueConstructor) {
    Vue.use(directive)
    Vue.prototype.$loading = service
  },
  directive,
  service
}
