/*
 * @Author: Victor wang
 * @Date: 2020-06-23 16:20:51
 * @LastEditors: Victor.wang
 * @LastEditTime: 2020-06-23 20:33:07
 * @Description:
 */
import Inputmask from 'inputmask'

export default {
  bind(el: any, binding: any) {
    if (binding.value) {
      console.log(el, binding)
      Inputmask(binding.value).mask(el)
    }
  }
}
