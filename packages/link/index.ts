/*
 * @Author: Victor wang
 * @Date: 2020-04-23 19:14:46
 * @LastEditors: Victor.wang
 * @LastEditTime: 2020-04-26 02:24:13
 * @Description:
 */
import { VueConstructor } from 'vue'
import Link from './src/index.vue'

Link.install = (Vue: VueConstructor) => {
  Vue.component(Link.name, Link)
}

export default Link
