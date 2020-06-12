/*
 * @Author: Victor wang
 * @Date: 2020-06-12 10:15:02
 * @LastEditors: Victor.wang
 * @LastEditTime: 2020-06-12 10:15:29
 * @Description:
 */
import { VueConstructor } from 'vue'
import FormItem from './src/index.vue'

FormItem.install = (Vue: VueConstructor) => {
  Vue.component(FormItem.options.name, FormItem)
}

export default FormItem
