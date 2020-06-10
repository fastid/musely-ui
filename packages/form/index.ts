/*
 * @Author: Victor wang
 * @Date: 2020-06-06 15:37:19
 * @LastEditors: Victor.wang
 * @LastEditTime: 2020-06-06 15:37:36
 * @Description:
 */

import { VueConstructor } from 'vue'
import Form from './src/index.vue'

Form.install = (Vue: VueConstructor) => {
  Vue.component(Form.options.name, Form)
}

export default Form
