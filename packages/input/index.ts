/*
 * @Author: Victor wang
 * @Date: 2020-04-03 01:45:15
 * @LastEditors: Victor.wang
 * @LastEditTime: 2020-05-09 22:49:27
 * @Description:
 */
import { VueConstructor } from 'vue'
import Input from './src/index.vue'

Input.install = (Vue: VueConstructor) => {
  Vue.component(Input.name, Input)
}

export default Input
