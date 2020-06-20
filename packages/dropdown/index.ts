/*
 * @Author: Victor wang
 * @Date: 2020-04-03 01:45:15
 * @LastEditors: Victor.wang
 * @LastEditTime: 2020-06-20 02:28:14
 * @Description:
 */
import { VueConstructor } from 'vue'
import MuDropdown from './src/index.vue'

MuDropdown.install = (Vue: VueConstructor) => {
  Vue.component(MuDropdown.options.name, MuDropdown)
}

export default MuDropdown
