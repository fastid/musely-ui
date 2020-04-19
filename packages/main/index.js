/*
 * @Author: Victor wang
 * @Date: 2020-04-03 01:45:15
 * @LastEditors: Victor.wang
 * @LastEditTime: 2020-04-14 19:06:56
 * @Description:
 */
import Main from './src/index.vue'

Main.install = (Vue) => {
  Vue.component(Main.name, Main)
}

export default Main
