/*
 * @Author: Victor wang
 * @Date: 2020-04-03 01:45:15
 * @LastEditors: Victor.wang
 * @LastEditTime: 2020-06-19 16:13:28
 * @Description:
 */
import { VueConstructor } from 'vue'
import CheckboxGroup from './src/index.vue'

CheckboxGroup.install = (Vue: VueConstructor) => {
  Vue.component(CheckboxGroup.options.name, CheckboxGroup)
}

export default CheckboxGroup
