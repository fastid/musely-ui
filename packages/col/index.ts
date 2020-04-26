/*
 * @Author: Victor wang
 * @Date: 2020-04-03 01:45:15
 * @LastEditors: Victor.wang
 * @LastEditTime: 2020-04-26 17:18:24
 * @Description:
 */

import { VueConstructor } from 'vue'
import Col from './src'

Col.install = (Vue: VueConstructor) => {
  Vue.component(Col.name, Col)
}

export default Col
