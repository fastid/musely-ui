<!--
 * @Author: Victor wang
 * @Date: 2020-04-03 16:14:35
 * @LastEditors: Victor.wang
 * @LastEditTime: 2020-04-05 03:16:43
 * @Description:
 -->
<template>
  <div class="main-skeleton">
    <mu-container height="80px"></mu-container>
    <div>
      <div class="skeleton-container">
        <div class="skeleton">
          <mu-container height="300px"></mu-container>
        </div>
        <mu-container height="45px"></mu-container>
      </div>
      <div class="skeleton-bottom">
        <mu-container height="45px"></mu-container>
      </div>
    </div>
  </div>
</template>
<script lang='ts'>
export default {
  data () {
    return {
      msg: 'hello vue'
    }
  }
}
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
