/*
 * @Author: Victor wang
 * @Date: 2020-04-22 17:33:27
 * @LastEditors: Victor.wang
 * @LastEditTime: 2020-04-26 17:21:18
 * @Description:
 */
import { VueConstructor } from 'vue'
import Alert from './src/index.vue'

Alert.install = (Vue: VueConstructor) => {
  Vue.component(Alert.name, Alert)
}

export default Alert
