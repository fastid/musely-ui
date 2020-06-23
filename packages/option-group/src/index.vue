<!--
 * @Author: Victor wang
 * @Date: 2020-04-14 19:02:17
 * @LastEditors: Victor.wang
 * @LastEditTime: 2020-06-23 22:14:30
 * @Description:
 -->
<template>
  <ul class="mu-select-group__wrap"
      v-show="visible">
    <li class="mu-select-group__title">{{ label }}</li>
    <li>
      <ul class="mu-select-group">
        <slot></slot>
      </ul>
    </li>
  </ul>
</template>
<script lang='ts'>
import { MuOptionGroup as Main } from 'types/option-group'
import { Component, Mixins, Prop, Watch } from 'vue-property-decorator'
import Emitter from 'musely-ui/src/mixins/emitter'
@Component({
  name: 'MuOptionGroup'
})
export default class MuOptionGroup extends Mixins(Emitter) implements Main {
  @Prop({ type: String }) label!: string
  @Prop({ type: Boolean, default: false }) disabled!: any

  @Watch('disabled')
  onWatchDisabled(val: any) {
    this.broadcast('MuOption', 'handleGroupDisabled', val)
  }

  visible = true

  queryChange() {
    this.visible =
      this.$children &&
      Array.isArray(this.$children) &&
      this.$children.some((option: any) => option.visible === true)
  }

  created() {
    this.$on('queryChange', this.queryChange)
  }

  mounted() {
    if (this.disabled) {
      this.broadcast('MuOption', 'handleGroupDisabled', this.disabled)
    }
  }
}
</script>
