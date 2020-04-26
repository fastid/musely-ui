/*
 * @Author: Victor wang
 * @Date: 2020-04-03 01:45:15
 * @LastEditors: Victor.wang
 * @LastEditTime: 2020-04-26 22:53:53
 * @Description:
 */

import { VueConstructor } from 'vue'
import Button from './src/index.vue'

Button.install = (Vue: VueConstructor) => {
  Vue.component(Button.name, Button)
}

export default Button
