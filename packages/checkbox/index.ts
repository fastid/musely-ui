/*
 * @Author: Victor wang
 * @Date: 2020-06-19 15:14:41
 * @LastEditors: Victor.wang
 * @LastEditTime: 2020-06-19 15:15:16
 * @Description:
 */
import { VueConstructor } from 'vue'
import Checkbox from './src/index.vue'

Checkbox.install = (Vue: VueConstructor) => {
  Vue.component(Checkbox.options.name, Checkbox)
}

export default Checkbox
