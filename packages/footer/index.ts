/*
 * @Author: Victor wang
 * @Date: 2020-04-03 01:45:15
 * @LastEditors: Victor.wang
 * @LastEditTime: 2020-04-26 17:22:05
 * @Description:
 */
import { VueConstructor } from 'vue'

import Footer from './src/index.vue'

Footer.install = (Vue: VueConstructor) => {
  Vue.component(Footer.options.name, Footer)
}

export default Footer
