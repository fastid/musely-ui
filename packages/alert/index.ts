/*
 * @Author: Victor wang
 * @Date: 2020-04-22 17:33:27
 * @LastEditors: Victor.wang
 * @LastEditTime: 2020-05-29 16:39:45
 * @Description:
 */
import { VueConstructor } from 'vue'
import Alert from './src/index.vue'
Alert.install = (Vue: VueConstructor) => {
  Vue.component(Alert.options.name, Alert)
}

export default Alert
