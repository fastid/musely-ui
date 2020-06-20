/*
 * @Author: Victor wang
 * @Date: 2020-04-03 01:45:15
 * @LastEditors: Victor.wang
 * @LastEditTime: 2020-06-20 15:36:11
 * @Description:
 */
import { VueConstructor } from 'vue'
import MuDropdownItem from './src/index.vue'

MuDropdownItem.install = (Vue: VueConstructor) => {
  Vue.component(MuDropdownItem.options.name, MuDropdownItem)
}

export default MuDropdownItem
