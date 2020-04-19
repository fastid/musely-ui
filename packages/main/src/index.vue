<!--
 * @Author: Victor wang
 * @Date: 2020-04-14 19:02:17
 * @LastEditors: Victor.wang
 * @LastEditTime: 2020-04-14 19:05:55
 * @Description:
 -->
<template>
  <main class="mu-main">
    <slot></slot>
  </main>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'MuMain'
})
export default class MuMain extends Vue {}
</script>
