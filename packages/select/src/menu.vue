<!--
 * @Author: Victor wang
 * @Date: 2020-06-23 22:24:15
 * @LastEditors: Victor.wang
 * @LastEditTime: 2020-06-24 15:01:31
 * @Description:
-->
<template>
  <div class="mu-select-dropdown mu-popper"
       :style="{ minWidth: minWidth }">
    <slot></slot>
  </div>
</template>

<script lang='ts'>
import { Component, Mixins, Prop, Watch } from 'vue-property-decorator'
import Popper from 'musely-ui/src/utils/vue-popper'

@Component({
  name: 'MuSelectMenu'
})
export default class MuSelectMenu extends Mixins(Popper) {
  @Prop({ default: 'bottom-start' }) placement!: string
  @Prop({ default: 0 }) boundariesPadding!: number
  @Prop({
    default: () => {
      return {
        gpuAcceleration: false
      }
    }
  })
  popperOptions!: object

  @Prop({ default: true }) visibleArrow!: boolean
  @Prop({ type: Boolean, default: true }) appendToBody!: boolean

  @Watch('$parent.inputWidth')
  onWatchInputWidth() {
    this.minWidth = this.$parent.$el.getBoundingClientRect().width + 'px'
  }

  minWidth = ''

  get popperClass() {
    return (this.$parent as any).popperClass
  }

  mounted() {
    this.referenceMu = (this.$parent.$refs as any).reference.$el
    ;(this.$parent as any).popperMu = this.popperMu = this.$el
    this.$on('updatePopper', () => {
      if ((this.$parent as any).visible) this.updatePopper()
    })
    this.$on('destroyPopper', this.destroyPopper)
  }
}
</script>
