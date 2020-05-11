<!--
 * @Author: Victor wang
 * @Date: 2020-04-14 19:02:17
 * @LastEditors: Victor.wang
 * @LastEditTime: 2020-05-11 11:52:13
 * @Description:
 -->
<template>
  <div class="mu-badge">
    <slot></slot>
    <transition name="mu-zoom-in-center">
      <sup v-show="!hidden && (content || content === 0 || isDot)"
           v-text="content"
           class="mu-badge__content"
           :class="[
          'mu-badge__content--' + type,
          {
            'is-fixed': $slots.default,
            'is-dot': isDot
          }
        ]">
      </sup>
    </transition>
  </div>
</template>

<script lang='ts'>
import { MuBadge as Badge } from 'types/badge'
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({
  name: 'MuMain'
})
export default class MuBadge extends Vue implements Badge {
  @Prop({ type: [String, Number] }) value!: string | number
  @Prop({ type: Boolean }) isDot!: boolean
  @Prop({ type: Number }) max!: number
  @Prop({ type: Boolean }) hidden!: boolean
  @Prop({
    type: String,
    validator(val) {
      return (
        ['primary', 'success', 'warning', 'info', 'danger'].indexOf(val) > -1
      )
    }
  })
  plain!: boolean

  get content() {
    if (this.isDot) return

    const { value, max } = this

    if (typeof value === 'number' && typeof max === 'number') {
      return max < value ? `${max}+` : value
    }

    return value
  }
}
</script>
