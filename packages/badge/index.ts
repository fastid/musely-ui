/*
 * @Author: Victor wang
 * @Date: 2020-04-03 01:45:15
 * @LastEditors: Victor.wang
 * @LastEditTime: 2020-05-11 11:33:54
 * @Description:
 */
import { VueConstructor } from 'vue'
import Badge from './src/index.vue'

Badge.install = (Vue: VueConstructor) => {
  Vue.component(Badge.name, Badge)
}

export default Badge
