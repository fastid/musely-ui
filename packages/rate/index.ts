/*
 * @Author: Victor wang
 * @Date: 2020-04-03 01:45:15
 * @LastEditors: Victor.wang
 * @LastEditTime: 2020-04-26 17:20:39
 * @Description:
 */
import { VueConstructor } from 'vue'
import Main from './src/index.vue'

Main.install = (Vue: VueConstructor) => {
  Vue.component(Main.name, Main)
}

export default Main
