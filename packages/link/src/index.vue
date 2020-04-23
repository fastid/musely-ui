/*
 * @Author: Victor wang
 * @Date: 2020-04-23 19:14:23
 * @LastEditors: Victor.wang
 * @LastEditTime: 2020-04-23 19:14:24
 * @Description:
 */
<template>
  <a :class="[
      'mu-link',
      type ? `mu-link--${type}` : '',
      disabled && 'is-disabled',
      underline && !disabled && 'is-underline'
    ]"
     :href="disabled ? null : href"
     v-bind="$attrs"
     @click="handleClick">

    <i :class="icon"
       v-if="icon"></i>

    <span v-if="$slots.default"
          class="mu-link--inner">
      <slot></slot>
    </span>

    <template v-if="$slots.icon">
      <slot v-if="$slots.icon"
            name="icon"></slot>
    </template>
  </a>
</template>

<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator'
import { LinkType, MuLink as Link } from '../index'

@Component({
  name: 'MuLink'
})
export default class MuLink extends Vue implements Link {
  @Prop({ type: String }) type!: LinkType
  @Prop({ default: true, type: Boolean }) underline: boolean
  @Prop({ type: Boolean }) disabled: boolean
  @Prop({ type: String }) href!: LinkType
  @Prop({ type: String }) icon!: LinkType

  handleClick (event) {
    if (!this.disabled) {
      if (!this.href) {
        this.$emit('click', event)
      }
    }
  }
}
</script>

<script>
