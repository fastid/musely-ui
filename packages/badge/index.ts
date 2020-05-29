/*
 * @Author: Victor wang
 * @Date: 2020-04-03 01:45:15
 * @LastEditors: Victor.wang
 * @LastEditTime: 2020-05-29 16:40:49
 * @Description:
 */
import { VueConstructor } from 'vue'
import Badge from './src/index.vue'

Badge.install = (Vue: VueConstructor) => {
  Vue.component(Badge.options.name, Badge)
}

export default Badge
