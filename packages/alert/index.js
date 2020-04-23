/*
 * @Author: Victor wang
 * @Date: 2020-04-22 17:33:27
 * @LastEditors: Victor.wang
 * @LastEditTime: 2020-04-22 18:59:09
 * @Description:
 */
import Alert from './src'

Alert.install = (Vue) => {
  Vue.component(Alert.name, Alert)
}

export default Alert
