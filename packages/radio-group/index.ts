/*
 * @Author: Victor wang
 * @Date: 2020-06-19 15:14:41
 * @LastEditors: Victor.wang
 * @LastEditTime: 2020-06-20 00:47:17
 * @Description:
 */
import { VueConstructor } from 'vue'
import RadioGroup from './src/index.vue'

RadioGroup.install = (Vue: VueConstructor) => {
  Vue.component(RadioGroup.options.name, RadioGroup)
}

export default RadioGroup
