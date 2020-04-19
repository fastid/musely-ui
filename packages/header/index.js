/*
 * @Author: Victor wang
 * @Date: 2020-04-03 01:45:15
 * @LastEditors: Victor.wang
 * @LastEditTime: 2020-04-20 02:22:03
 * @Description:
 */
import Header from './src/index.vue'

Header.install = (Vue) => {
  Vue.component(Header.name, Header)
}

export default Header
