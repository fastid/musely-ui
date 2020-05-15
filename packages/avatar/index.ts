/*
 * @Author: Victor wang
 * @Date: 2020-05-13 11:03:18
 * @LastEditors: Victor.wang
 * @LastEditTime: 2020-05-13 11:03:39
 * @Description:
 */
import { VueConstructor } from 'vue'
import Avater from './src/index.vue'

Avater.install = (Vue: VueConstructor) => {
  Vue.component(Avater.name, Avater)
}

export default Avater
