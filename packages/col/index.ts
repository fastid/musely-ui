/*
 * @Author: Victor wang
 * @Date: 2020-04-03 01:45:15
 * @LastEditors: Victor.wang
 * @LastEditTime: 2020-05-29 16:41:11
 * @Description:
 */

import { VueConstructor } from 'vue'
import Col from './src'

Col.install = (Vue: VueConstructor) => {
  Vue.component(Col.options.name, Col)
}

export default Col
