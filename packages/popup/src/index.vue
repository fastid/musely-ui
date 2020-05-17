<!--
 * @Author: Victor wang
 * @Date: 2020-05-09 21:09:55
 * @LastEditors: Victor.wang
 * @LastEditTime: 2020-05-18 02:25:15
 * @Description:
 -->
<template>
  <transition :name="currentTransition">
    <div v-show="currentValue"
         class="mu-popup"
         :class="[position ? 'mu-popup--' + position : '']">
      <slot></slot>
    </div>
  </transition>
</template>

<script lang='ts'>
// import { MuMain as Main } from 'types/main'
import { mixins } from 'vue-class-component'
import { Component, Prop, Watch } from 'vue-property-decorator'
import Popup from 'musely-ui/src/utils/popup'

@Component({
  name: 'MuPopup'
})
export default class MuPopup extends mixins(Popup) {
  @Prop({
    default: false,
    type: Boolean
  })
  visible!: boolean

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

  private currentTransition = this.popupTransition

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

  @Watch('opened')
  watchModalOpened(val: any) {
    this.currentValue = val
  }

  @Watch('value')
  watchVisible(val: any) {
    this.currentValue = val
    if (val && this.modal) {
      this.open()
    }
  }
}
</script>
