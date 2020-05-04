/*
 * @Author: Victor wang
 * @Date: 2020-04-03 01:45:15
 * @LastEditors: Victor.wang
 * @LastEditTime: 2020-04-29 22:10:58
 * @Description:
 */
import { VueConstructor } from 'vue'

import Dialog from './src/index.vue'

Dialog.install = (Vue: VueConstructor) => {
  Vue.component(Dialog.name, Dialog)
}

export default Dialog
