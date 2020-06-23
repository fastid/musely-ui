/*
 * @Author: Victor wang
 * @Date: 2020-04-03 01:45:15
 * @LastEditors: Victor.wang
 * @LastEditTime: 2020-06-23 21:46:18
 * @Description:
 */
import { VueConstructor } from 'vue'
import OptionGroup from './src/index.vue'

OptionGroup.install = (Vue: VueConstructor) => {
  Vue.component(OptionGroup.options.name, OptionGroup)
}

export default OptionGroup
