<!--
 * @Author: Victor wang
 * @Date: 2020-05-09 21:09:55
 * @LastEditors: Victor.wang
 * @LastEditTime: 2020-05-09 21:44:35
 * @Description:
 -->
<template>
  <transition :name="currentTransition">
    <div v-show="currentValue"
         class="mu-popup"
         :class="[position ? 'mu-popup-' + position : '']">
      <slot></slot>
    </div>
  </transition>
</template>

<script lang='ts'>
// import { MuMain as Main } from 'types/main'
import { Component, Prop, Watch } from 'vue-property-decorator'
import Popup from 'musely-ui/src/utils/popup'
import { mixins } from 'vue-class-component'

@Component({
  name: 'MuPopup'
})
export default class MuPopup extends mixins(Popup) {
  @Prop({
    default: true,
    type: Boolean
  })
  modal!: boolean

  @Prop({
    default: false,
    type: Boolean
  })
  modalFade!: boolean

  @Prop({
    default: false,
    type: Boolean
  })
  lockScroll!: boolean

  @Prop({
    default: true,
    type: Boolean
  })
  closeOnClickModal!: boolean

  @Prop({
    default: 'popup-slide',
    type: String
  })
  popupTransition!: string

  @Prop({
    default: '',
    type: String
  })
  position!: boolean

  private currentValue = false
  private value = null

  get currentTransition() {
    return this.popupTransition
  }

  set currentTransition(val: any) {
    this.$emit('popupTransition', val)
  }

  beforeMount() {
    if (this.popupTransition !== 'popup-fade') {
      this.currentTransition = `popup-slide-${this.position}`
    }
  }

  mounted() {
    if (this.value) {
      this.rendered = true
      this.currentValue = true
      this.open()
    }
  }

  @Watch('currentValue')
  watchCurrentValue(val: any) {
    this.$emit('input', val)
  }

  @Watch('val')
  watchVal(val: any) {
    this.currentValue = val
  }
}
</script>
