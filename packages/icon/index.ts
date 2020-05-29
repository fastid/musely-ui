/*
 * @Author: Victor wang
 * @Date: 2020-04-03 01:45:15
 * @LastEditors: Victor.wang
 * @LastEditTime: 2020-05-29 16:42:33
 * @Description:
 */
import { VueConstructor } from 'vue'
import Icon from './src/index.vue'

Icon.install = (Vue: VueConstructor) => {
  Vue.component(Icon.options.name, Icon)
}

export default Icon
