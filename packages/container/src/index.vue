<!--
 * @Author: Victor wang
 * @Date: 2020-04-03 01:46:38
 * @LastEditors: Victor.wang
 * @LastEditTime: 2020-04-03 02:09:48
 * @Description: 
 -->
<template>
  <div
    class="mu__container"
    :style="{ background: bgColor, paddingBottom, width }"
  ></div>
</template>

<script>
export default {
  name: 'MuContainer',
  props: {
    proportion: {
      type: Number,
      default: 1
    }, // h : w
    bgColor: {
      type: String,
      default: '#b4bccc'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: [String, Boolean],
      default: false
    }
  },
  data() {
    return {
      paddingBottom: this.height || `${this.proportion * 100}%`
    }
  }
}
</script>
