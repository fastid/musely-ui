<!--
 * @Author: Victor wang
 * @Date: 2020-04-14 19:02:17
 * @LastEditors: Victor.wang
 * @LastEditTime: 2020-06-19 23:45:53
 * @Description:
 -->
<template>
  <div class="el-checkbox-group"
       role="group"
       aria-label="checkbox-group">
    <slot></slot>
  </div>
</template>

<script lang='ts'>
import { MuCheckboxGroup as CheckboxGroup } from 'types/checkbox-group'
import { Component, Inject, Mixins, Prop, Watch } from 'vue-property-decorator'
import emitter from 'musely-ui/src/mixins/emitter'
@Component({
  name: 'MuCheckboxGroup'
})
export default class MuCheckboxGroup extends Mixins(emitter)
  implements CheckboxGroup {
  @Inject({ default: '' })
  muFormItem!: any

  @Prop() value!: any
  @Prop({ type: Boolean }) disabled!: boolean
  @Prop({ type: Number }) min!: number
  @Prop({ type: Number }) max!: number
  @Prop({ type: String }) fill!: string
  @Prop({ type: String }) textColor!: string

  @Watch('value')
  onWatchValue(value: any) {
    this.dispatch('MuFormItem', 'mu.form.change', value)
  }
}
</script>
