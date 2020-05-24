<!--
 * @Author: Victor wang
 * @Date: 2020-05-09 21:09:55
 * @LastEditors: Victor.wang
 * @LastEditTime: 2020-05-25 02:14:51
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
import { MuPopup as PopupClass } from 'types/popup'
import { mixins } from 'vue-class-component'
import { Component, Prop, Watch } from 'vue-property-decorator'
import Popup from 'musely-ui/src/utils/popup'

@Component({
  name: 'MuPopup'
})
export default class MuPopup extends mixins(Popup) implements PopupClass {
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

  beforeDestroy() {
    if (this.modal) {
      this.close()
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
    console.log(val)
    this.currentValue = val
    if (val && this.modal) {
      this.open()
    } else if (!val && this.modal) {
      this.close()
    }
  }
}
</script>
