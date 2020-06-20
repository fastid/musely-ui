/*
 * @Author: Victor wang
 * @Date: 2020-04-03 01:45:15
 * @LastEditors: Victor.wang
 * @LastEditTime: 2020-06-20 16:28:58
 * @Description:
 */
import { VueConstructor } from 'vue'
import DropdownMenu from './src/index.vue'

DropdownMenu.install = (Vue: VueConstructor) => {
  Vue.component(DropdownMenu.options.name, DropdownMenu)
}

export default DropdownMenu
