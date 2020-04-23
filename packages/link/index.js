/*
 * @Author: Victor wang
 * @Date: 2020-04-23 19:14:46
 * @LastEditors: Victor.wang
 * @LastEditTime: 2020-04-23 19:14:55
 * @Description:
 */
import Link from './src'

/* istanbul ignore next */
Link.install = function(Vue) {
  Vue.component(Link.name, Link)
}

export default Link
