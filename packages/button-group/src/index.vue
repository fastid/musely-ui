<!--
 * @Author: Victor wang
 * @Date: 2020-04-26 22:55:08
 * @LastEditors: Victor.wang
 * @LastEditTime: 2020-06-29 15:48:18
 * @Description:
 -->
<template>
  <div class="mu-button-group"
       :class="{ 'is-horizontal': isHorizontal }">
    <slot></slot>
  </div>
</template>

<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator'
import { MuButtonGroup as ButtonGroup } from 'types/button-group'

@Component({
  name: 'MuButtonGroup'
})
export default class MuButtonGroup extends Vue implements ButtonGroup {
  @Prop({ type: String, default: 'vertical' }) direction!:
    | 'horizontal'
    | 'vertical'

  get isHorizontal() {
    if (this.direction === 'vertical') {
      return false
    } else if (this.direction === 'horizontal') {
      return true
    }
  }
}
</script>
