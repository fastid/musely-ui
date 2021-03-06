/*
 * @Author: Victor wang
 * @Date: 2020-04-03 01:45:15
 * @LastEditors: Victor.wang
 * @LastEditTime: 2020-05-29 16:41:47
 * @Description:
 */

import { VueConstructor } from 'vue'

import Header from './src/index.vue'

Header.install = (Vue: VueConstructor) => {
  Vue.component(Header.options.name, Header)
}

export default Header
