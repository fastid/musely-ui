<!--
 * @Author: Victor wang
 * @Date: 2020-04-03 01:46:38
 * @LastEditors: Victor.wang
 * @LastEditTime: 2020-04-25 13:45:10
 * @Description: 1
 -->
<template>
  <section class="mu-container"
           :class="{ 'is-vertical': isVertical }">
    <slot></slot>
  </section>
</template>

<script lang="ts">
import { MuContainer as Container } from '^/container'
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({
  name: 'MuContainer'
})
export default class MuContainer extends Vue implements Container {
  @Prop({
    type: String
  })
  direction!: 'horizontal' | 'vertical'

  get isVertical() {
    if (this.direction === 'vertical') {
      return true
    } else if (this.direction === 'horizontal') {
      return false
    }
    if (this.$slots && this.$slots.default) {
      return this.$slots.default.some(vnode => {
        const tag = vnode.componentOptions && vnode.componentOptions.tag
        return tag === 'mu-header' || tag === 'mu-footer'
      })
    } else {
      return false
    }
  }
}
</script>
