/*
 * @Author: Victor wang
 * @Date: 2020-04-03 01:45:15
 * @LastEditors: Victor.wang
 * @LastEditTime: 2020-06-24 14:16:00
 * @Description:
 */
import { VueConstructor } from 'vue'
import Scrollbar from './src/index.vue'

Scrollbar.install = (Vue: VueConstructor) => {
  Vue.component(Scrollbar.options.name, Scrollbar)
}

export default Scrollbar
