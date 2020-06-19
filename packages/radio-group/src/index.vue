<!--
 * @Author: Victor wang
 * @Date: 2020-06-19 15:13:27
 * @LastEditors: Victor.wang
 * @LastEditTime: 2020-06-20 02:17:21
 * @Description:
-->
<template>
  <component :is="_muTag"
             class="mu-radio-group"
             role="radiogroup">
    <slot></slot>
  </component>
</template>

<script lang='ts'>
import { MuRadioGroup as RadioGroup } from 'types/radio-group'
import { Component, Inject, Mixins, Prop, Watch } from 'vue-property-decorator'
import emitter from 'musely-ui/src/mixins/emitter'
@Component({
  name: 'MuRadioGroup'
})
export default class MuRadioGroup extends Mixins(emitter)
  implements RadioGroup {
  @Prop() value!: {}
  @Prop() label!: any
  @Prop({ type: Boolean }) disabled!: boolean
  @Prop({ type: String }) fill!: string
  @Prop({ type: String }) textColor!: string

  @Inject({ default: '' })
  muFormItem!: any

  private focus = false
  private _radioGroup: any = null
  get _muTag() {
    return (this.$vnode.data || {}).tag || 'div'
  }

  created() {
    this.$on('handleChange', (value: any) => {
      this.$emit('change', value)
    })
  }

  mounted() {
    // 当radioGroup没有默认选项时，第一个可以选中Tab导航
    const radios = this.$el.querySelectorAll('[type=radio]')
    const firstLabel = this.$el.querySelectorAll('[role=radio]')[0]
    if (
      ![].some.call(radios, (radio: HTMLFormElement) => radio.checked) &&
      firstLabel
    ) {
      ;(firstLabel as HTMLFormElement).tabIndex = 0
    }
  }

  @Watch('value')
  onWatchValue() {
    this.dispatch('MuFormItem', 'el.form.change', [this.value])
  }
}
</script>
