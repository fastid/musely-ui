<!--
 * @Author: Victor wang
 * @Date: 2020-06-19 15:13:27
 * @LastEditors: Victor.wang
 * @LastEditTime: 2020-06-20 00:11:03
 * @Description:
-->
<template>
  <label class="mu-checkbox"
         :class="[
      { 'is-disabled': isDisabled },
      { 'is-bordered': border },
      { 'is-checked': isChecked }
    ]"
         :id="id">
    <span class="mu-checkbox__input"
          :class="{
        'is-disabled': isDisabled,
        'is-checked': isChecked,
        'is-indeterminate': indeterminate,
        'is-focus': focus
      }"
          :tabindex="indeterminate ? 0 : false"
          :role="indeterminate ? 'checkbox' : false"
          :aria-checked="indeterminate ? 'mixed' : false">
      <span class="mu-checkbox__inner"></span>
      <input v-if="trueLabel || falseLabel"
             class="mu-checkbox__original"
             type="checkbox"
             :aria-hidden="indeterminate ? 'true' : 'false'"
             :name="name"
             :disabled="isDisabled"
             :true-value="trueLabel"
             :false-value="falseLabel"
             v-model="model"
             @change="handleChange"
             @focus="focus = true"
             @blur="focus = false">
      <input v-else
             class="mu-checkbox__original"
             type="checkbox"
             :aria-hidden="indeterminate ? 'true' : 'false'"
             :disabled="isDisabled"
             :value="label"
             :name="name"
             v-model="model"
             @change="handleChange"
             @focus="focus = true"
             @blur="focus = false">
    </span>
    <span class="mu-checkbox__label"
          v-if="$slots.default || label">
      <slot></slot>
      <template v-if="!$slots.default">{{label}}</template>
    </span>
  </label>
</template>

<script lang='ts'>
import { MuCheckbox as Checkbox } from 'types/checkbox'
import { Component, Inject, Mixins, Prop, Watch } from 'vue-property-decorator'
import emitter from 'musely-ui/src/mixins/emitter'
@Component({
  name: 'MuCheckbox'
})
export default class MuCheckbox extends Mixins(emitter) implements Checkbox {
  @Prop() value!: any
  @Prop() label!: any
  @Prop({ type: Boolean }) indeterminate!: boolean
  @Prop({ type: Boolean }) disabled!: boolean
  @Prop({ type: Boolean }) checked!: boolean
  @Prop({ type: String }) name!: string
  @Prop({ type: [String, Number] }) trueLabel!: string
  @Prop({ type: [String, Number] }) falseLabel!: string
  /* 当indeterminate为真时，为controls提供相关连的checkbox的id，表明元素间的控制关系 */
  @Prop({ type: String }) id!: boolean
  /* 当indeterminate为真时，为controls提供相关连的checkbox的id，表明元素间的控制关系 */
  @Prop({ type: String }) controls!: string
  @Prop({ type: Boolean }) border!: boolean

  @Inject({
    default: ''
  })
  muForm!: any

  @Inject({ default: '' })
  muFormItem!: any

  private selfModel = false
  private focus = false
  private isLimitExceeded = false
  private _checkboxGroup: any = null

  get isChecked() {
    if ({}.toString.call(this.model) === '[object Boolean]') {
      return this.model
    } else if (Array.isArray(this.model)) {
      return this.model.indexOf(this.label) > -1
    } else if (this.model !== null && this.model !== undefined) {
      return this.model === this.trueLabel
    }
  }

  get isGroup() {
    let parent = this.$parent
    while (parent) {
      if (parent.$options.componentName !== 'MuCheckboxGroup') {
        parent = parent.$parent
      } else {
        this._checkboxGroup = parent
        return true
      }
    }
    return false
  }

  get store() {
    return this._checkboxGroup ? this._checkboxGroup.value : this.value
  }

  /* used to make the isDisabled judgment under max/min props */
  get isLimitDisabled() {
    const { max, min } = this._checkboxGroup
    return (
      (!!(max || min) && this.model.length >= max && !this.isChecked) ||
      (this.model.length <= min && this.isChecked)
    )
  }

  get isDisabled() {
    return this.isGroup
      ? this._checkboxGroup.disabled ||
          this.disabled ||
          (this.muForm || {}).disabled ||
          this.isLimitDisabled
      : this.disabled || (this.muForm || {}).disabled
  }

  get model() {
    return this.isGroup
      ? this.store
      : this.value !== undefined
      ? this.value
      : this.selfModel
  }

  set model(val: any) {
    if (this.isGroup) {
      this.isLimitExceeded = false
      this._checkboxGroup.min !== undefined &&
        val.length < this._checkboxGroup.min &&
        (this.isLimitExceeded = true)

      this._checkboxGroup.max !== undefined &&
        val.length > this._checkboxGroup.max &&
        (this.isLimitExceeded = true)

      this.isLimitExceeded === false &&
        this.dispatch('MuCheckboxGroup', 'input', [val])
    } else {
      this.$emit('input', val)
      this.selfModel = val
    }
  }

  addToStore() {
    if (Array.isArray(this.model) && this.model.indexOf(this.label) === -1) {
      this.model.push(this.label)
    } else {
      this.model = this.trueLabel || true
    }
  }

  handleChange(ev: any) {
    if (this.isLimitExceeded) return
    let value
    if (ev.target.checked) {
      value = this.trueLabel === undefined ? true : this.trueLabel
    } else {
      value = this.falseLabel === undefined ? false : this.falseLabel
    }
    this.$emit('change', value, ev)
    this.$nextTick(() => {
      if (this.isGroup) {
        this.dispatch('MuCheckboxGroup', 'change', [this._checkboxGroup.value])
      }
    })
  }

  created() {
    this.checked && this.addToStore()
  }

  mounted() {
    // 为indeterminate元素 添加aria-controls 属性
    if (this.indeterminate) {
      this.$el.setAttribute('aria-controls', this.controls)
    }
  }

  @Watch('value')
  onWatchValue(value: any) {
    this.dispatch('MuFormItem', 'mu.form.change', value)
  }
}
</script>
