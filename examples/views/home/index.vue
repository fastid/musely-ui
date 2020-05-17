<!--
 * @Author: Victor wang
 * @Date: 2020-04-03 17:40:40
 * @LastEditors: Victor.wang
 * @LastEditTime: 2020-05-17 16:22:34
 * @Description:
 -->
<template>
  <div class="pg-index">
    <div class="index-container">
      <p>一款轻量级、模块化的前端 UI 组件库</p>
      <mu-button @click="go">start</mu-button>
    </div>
  </div>
</template>

<script lang='ts'>
export default {
  data() {
    return {
      url: ''
    }
  },
  methods: {
    go() {
      this.$router.push('/start')
    }
  }
}
</script>
<style lang="scss">
.pg-index {
  position: absolute;
  width: 600px;
  top: 50%;
  left: 50%;
  margin: 0 auto;
  transform: translate(-50%, -50%);
  .index-container {
    margin-top: -80px;
    width: 100%;
    margin: 0 auto;
    text-align: center;
    padding: 10px 0;
    p {
      margin-top: 56px;
      color: #8994c6;
      font-size: 32px;
    }
  }
}
</style>
