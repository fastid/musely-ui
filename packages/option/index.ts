/*
 * @Author: Victor wang
 * @Date: 2020-04-03 01:45:15
 * @LastEditors: Victor.wang
 * @LastEditTime: 2020-06-23 21:45:01
 * @Description:
 */
import { VueConstructor } from 'vue'
import Option from './src/index.vue'

Option.install = (Vue: VueConstructor) => {
  Vue.component(Option.options.name, Option)
}

export default Option
