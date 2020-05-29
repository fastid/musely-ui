/*
 * @Author: Victor wang
 * @Date: 2020-04-03 01:45:15
 * @LastEditors: Victor.wang
 * @LastEditTime: 2020-05-29 18:43:58
 * @Description:
 */
import { VueConstructor } from 'vue'
import Main from './src/index.vue'

Main.install = (Vue: VueConstructor) => {
  Vue.component(Main.options.name, Main)
}

export default Main
