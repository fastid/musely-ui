<!--
 * @Author: Victor wang
 * @Date: 2020-04-03 16:14:35
 * @LastEditors: Victor.wang
 * @LastEditTime: 2020-04-20 00:28:47
 * @Description:
 -->
<template>
  <div class="main-skeleton">
    <mu-container height="80px"></mu-container>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'LayoutMain',
  components: {}
})
export default class LayoutMain extends Vue {}
</script>
<style lang="scss">
.skeleton-container {
  width: 960px;
  margin: 0 auto;
  text-align: center;
  padding: 100px 0;
}
.skeleton-bottom {
  width: 960px;
  margin: 0 auto;
  text-align: center;
}
.skeleton {
  margin: 0 auto;
  width: 300px;
  margin-bottom: 56px;
}
</style>
