<!--
 * @Author: Victor wang
 * @Date: 2020-04-14 19:02:17
 * @LastEditors: Victor.wang
 * @LastEditTime: 2020-04-26 19:31:09
 * @Description:
 -->
<template>
  <i :class="'mu-icon-' + name"></i>
</template>

<script lang='ts'>
import { MuIcon as Icon } from 'types/icon'
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({
  name: 'MuIcon'
})
export default class MuIcon extends Vue implements Icon {
  @Prop({ type: String }) name!: string
}
</script>
