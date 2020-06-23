/*
 * @Author: Victor wang
 * @Date: 2020-06-23 23:34:43
 * @LastEditors: Victor.wang
 * @LastEditTime: 2020-06-24 02:51:43
 * @Description:
 */

import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'MuMixinsFocus'
})
export default class MuMixinsFocus<T extends (ref: string) => any> extends Vue {
  focus(ref: string) {
    // TODO
    ;(this.$refs[ref] as any).focus()
  }
}

// const f = function(ref: any) {
//   return {
//     methods: {
//       focus() {
//         ;(this as any).$refs[ref].focus()
//       }
//     }
//   }
// }
