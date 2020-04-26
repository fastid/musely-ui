<!--
 * @Author: Victor wang
 * @Date: 2020-04-26 22:55:08
 * @LastEditors: Victor.wang
 * @LastEditTime: 2020-04-27 00:42:08
 * @Description:
 -->
<template>
  <div class="mu-button-group">
    <slot></slot>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator'
import { MuButtonGroup as ButtonGroup } from 'types/button-group'

@Component({
  name: 'MuButtonGroup'
})
export default class MuButtonGroup extends Vue implements ButtonGroup {}
</script>
