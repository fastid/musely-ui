/*
 * @Author: Victor wang
 * @Date: 2020-04-03 01:45:15
 * @LastEditors: Victor.wang
 * @LastEditTime: 2020-05-29 16:41:02
 * @Description:
 */

import { VueConstructor } from 'vue'
import ButtonGroup from './src/index.vue'

ButtonGroup.install = (Vue: VueConstructor) => {
  Vue.component(ButtonGroup.options.name, ButtonGroup)
}

export default ButtonGroup
