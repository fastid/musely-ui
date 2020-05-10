/*
 * @Author: Victor wang
 * @Date: 2020-05-09 21:10:23
 * @LastEditors: Victor.wang
 * @LastEditTime: 2020-05-09 21:10:50
 * @Description:
 */
import { VueConstructor } from 'vue'
import Popup from './src/index.vue'

Popup.install = (Vue: VueConstructor) => {
  Vue.component(Popup.name, Popup)
}

export default Popup
