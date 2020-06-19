/*
 * @Author: Victor wang
 * @Date: 2020-06-19 15:14:41
 * @LastEditors: Victor.wang
 * @LastEditTime: 2020-06-20 00:47:05
 * @Description:
 */
import { VueConstructor } from 'vue'
import Radio from './src/index.vue'

Radio.install = (Vue: VueConstructor) => {
  Vue.component(Radio.options.name, Radio)
}

export default Radio
