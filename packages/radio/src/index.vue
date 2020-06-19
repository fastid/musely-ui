<!--
 * @Author: Victor wang
 * @Date: 2020-06-19 15:13:27
 * @LastEditors: Victor.wang
 * @LastEditTime: 2020-06-20 02:16:04
 * @Description:
-->
<template>
  <label class="mu-radio"
         :class="[
      { 'is-disabled': isDisabled },
      { 'is-focus': focus },
      { 'is-bordered': border },
      { 'is-checked': model === label }
    ]"
         role="radio"
         :aria-checked="model === label"
         :aria-disabled="isDisabled"
         :tabindex="tabIndex"
         @keydown.space.stop.prevent="model = isDisabled ? model : label">
    <span class="mu-radio__input"
          :class="{
        'is-disabled': isDisabled,
        'is-checked': model === label
      }">
      <span class="mu-radio__inner"></span>
      <input ref="radio"
             class="mu-radio__original"
             :value="label"
             type="radio"
             aria-hidden="true"
             v-model="model"
             @focus="focus = true"
             @blur="focus = false"
             @change="handleChange"
             :name="name"
             :disabled="isDisabled"
             tabindex="-1">
    </span>
    <span class="mu-radio__label"
          @keydown.stop>
      <slot></slot>
      <template v-if="!$slots.default">{{label}}</template>
    </span>
  </label>
</template>

<script lang='ts'>
import { MuRadio as Radio } from 'types/radio'
import { Component, Inject, Mixins, Prop } from 'vue-property-decorator'
import emitter from 'musely-ui/src/mixins/emitter'
@Component({
  name: 'MuRadio'
})
export default class MuRadio extends Mixins(emitter) implements Radio {
  @Prop() value!: any
  @Prop() label!: any
  @Prop({ type: Boolean }) disabled!: boolean
  @Prop({ type: String }) name!: string
  @Prop({ type: Boolean }) border!: boolean

  @Inject({
    default: ''
  })
  muForm!: any

  @Inject({ default: '' })
  muFormItem!: any

  private focus = false
  private _radioGroup: any = null
  get isGroup() {
    let parent = this.$parent
    while (parent) {
      if (parent.$options.name !== 'MuRadioGroup') {
        parent = parent.$parent
      } else {
        this._radioGroup = parent
        return true
      }
    }
    return false
  }

  get model() {
    return this.isGroup ? this._radioGroup.value : this.value
  }

  set model(val: any) {
    if (this.isGroup) {
      this.dispatch('MuRadioGroup', 'input', [val])
    } else {
      this.$emit('input', val)
    }
    this.$refs.radio &&
      ((this.$refs.radio as HTMLFormElement).checked =
        this.model === this.label)
  }

  get isDisabled() {
    return this.isGroup
      ? this._radioGroup.disabled ||
          this.disabled ||
          (this.muForm || {}).disabled
      : this.disabled || (this.muForm || {}).disabled
  }

  get tabIndex() {
    return this.isDisabled || (this.isGroup && this.model !== this.label)
      ? -1
      : 0
  }

  handleChange() {
    this.$nextTick(() => {
      this.$emit('change', this.model)
      this.isGroup && this.dispatch('MuRadioGroup', 'handleChange', this.model)
    })
  }
}
</script>
