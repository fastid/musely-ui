/*
 * @Author: Victor wang
 * @Date: 2020-04-03 01:45:15
 * @LastEditors: Victor.wang
 * @LastEditTime: 2020-04-26 17:16:08
 * @Description:
 */
import { VueConstructor } from 'vue'
import Container from './src/index.vue'

Container.install = (Vue: VueConstructor) => {
  Vue.component(Container.name, Container)
}

export default Container
