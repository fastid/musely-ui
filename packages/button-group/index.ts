/*
 * @Author: Victor wang
 * @Date: 2020-04-03 01:45:15
 * @LastEditors: Victor.wang
 * @LastEditTime: 2020-04-27 00:39:55
 * @Description:
 */

import { VueConstructor } from 'vue'
import ButtonGroup from './src/index.vue'

ButtonGroup.install = (Vue: VueConstructor) => {
  Vue.component(ButtonGroup.name, ButtonGroup)
}

export default ButtonGroup
