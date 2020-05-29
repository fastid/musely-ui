/*
 * @Author: Victor wang
 * @Date: 2020-04-03 01:45:15
 * @LastEditors: Victor.wang
 * @LastEditTime: 2020-05-29 16:42:48
 * @Description:
 */
import { VueConstructor } from 'vue'
import Input from './src/index.vue'

Input.install = (Vue: VueConstructor) => {
  Vue.component(Input.options.name, Input)
}

export default Input
