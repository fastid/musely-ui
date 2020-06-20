<!--
 * @Author: Victor wang
 * @Date: 2020-04-14 19:02:17
 * @LastEditors: Victor.wang
 * @LastEditTime: 2020-06-20 22:41:33
 * @Description:
 -->
<template>
  <transition name="mu-zoom-in-top"
              @after-leave="doDestroy">
    <ul class="mu-dropdown-menu mu-popper"
        v-show="showPopper">
      <slot></slot>
    </ul>
  </transition>
</template>
<script lang='ts'>
import { MuDropdownMenu as Main } from 'types/dropdown-menu'
import { Component, Mixins, Prop, Inject, Watch } from 'vue-property-decorator'
import Popper from 'musely-ui/src/utils/vue-popper'

@Component({
  name: 'MuDropdownMenu'
})
export default class MuDropdownMenu extends Mixins(Popper) implements Main {
  @Prop({
    type: Boolean,
    default: true
  })
  visibleArrow!: boolean

  @Prop({
    type: Number,
    default: 0
  })
  arrowOffset!: number

  @Inject()
  dropdown!: any

  created() {
    this.$on('updatePopper', () => {
      if (this.showPopper) this.updatePopper()
    })
    this.$on('visible', (val: any) => {
      this.showPopper = val
    })
  }

  mounted() {
    this.dropdown.popperMu = this.popperMu = this.$el
    this.referenceMu = this.dropdown.$el
    // compatible with 2.6 new v-slot syntax
    // issue link https://github.com/ElemeFE/element/issues/14345
    this.dropdown.initDomOperation()
  }

  @Watch('dropdown.placement', { immediate: true })
  onWatchPlacement(val: any) {
    this.currentPlacement = val
  }
}
</script>
