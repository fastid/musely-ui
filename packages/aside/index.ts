/*
 * @Author: Victor wang
 * @Date: 2020-04-03 01:45:15
 * @LastEditors: Victor.wang
 * @LastEditTime: 2020-05-29 16:38:14
 * @Description:
 */

import { VueConstructor } from 'vue'
import Aside from './src/index.vue'

Aside.install = (Vue: VueConstructor) => {
  Vue.component(Aside.options.name, Aside)
}

export default Aside
