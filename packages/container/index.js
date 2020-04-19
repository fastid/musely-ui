/*
 * @Author: Victor wang
 * @Date: 2020-04-03 01:45:15
 * @LastEditors: Victor.wang
 * @LastEditTime: 2020-04-15 01:44:37
 * @Description:
 */
import Container from './src/index.vue'

Container.install = (Vue) => {
  Vue.component(Container.name, Container)
}

export default Container
