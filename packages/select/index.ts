/*
 * @Author: Victor wang
 * @Date: 2020-04-03 01:45:15
 * @LastEditors: Victor.wang
 * @LastEditTime: 2020-06-23 21:40:26
 * @Description:
 */
import { VueConstructor } from 'vue'
import Select from './src/index.vue'

Select.install = (Vue: VueConstructor) => {
  Vue.component(Select.options.name, Select)
}

export default Select
