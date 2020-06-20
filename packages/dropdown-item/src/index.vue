<!--
 * @Author: Victor wang
 * @Date: 2020-04-14 19:02:17
 * @LastEditors: Victor.wang
 * @LastEditTime: 2020-06-20 23:16:29
 * @Description:
 -->
<template>
  <li class="mu-dropdown-menu__item"
      :class="{
      'is-disabled': disabled,
      'mu-dropdown-menu__item--divided': divided
    }"
      @click="handleClick"
      :aria-disabled="disabled"
      :tabindex="disabled ? null : -1">
    <i :class="icon"
       v-if="icon"></i>
    <slot></slot>
  </li>
</template>
<script lang='ts'>
import { MuDropdownItem as Main } from 'types/dropdown-item'
import { Component, Mixins, Prop } from 'vue-property-decorator'
import Emitter from 'musely-ui/src/mixins/emitter'

@Component({
  name: 'MuDropdownItem'
})
export default class MuDropdownItem extends Mixins(Emitter) implements Main {
  @Prop({
    default: () => {
      return {}
    }
  })
  command!: object

  @Prop({ type: Boolean }) disabled!: boolean
  @Prop({ type: Boolean }) divided!: boolean
  @Prop({ type: String }) icon!: string

  handleClick() {
    this.dispatch('MuDropdown', 'menu-item-click', [this.command, this])
  }
}
</script>
