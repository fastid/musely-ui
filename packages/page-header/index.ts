/*
 * @Author: Victor wang
 * @Date: 2020-05-06 23:11:28
 * @LastEditors: Victor.wang
 * @LastEditTime: 2020-05-29 18:43:48
 * @Description:
 */
import { VueConstructor } from 'vue'
import PageHeader from './src/index.vue'

PageHeader.install = (Vue: VueConstructor) => {
  Vue.component(PageHeader.options.name, PageHeader)
}

export default PageHeader
