<!--
 * @Author: Victor wang
 * @Date: 2020-06-12 10:14:52
 * @LastEditors: Victor.wang
 * @LastEditTime: 2020-06-23 14:40:56
 * @Description:
-->
<template>
  <div class="mu-form-item"
       :class="[{
      'mu-form-item--feedback': muForm && muForm.statusIcon,
      'is-error': validateState === 'error',
      'is-validating': validateState === 'validating',
      'is-success': validateState === 'success',
      'is-required': isRequired || required,
      'is-no-asterisk': muForm && muForm.hideRequiredAsterisk
    },
  ]">
    <label-wrap :is-auto-width="labelStyle && labelStyle.width === 'auto'"
                :update-all="form.labelWidth === 'auto'">
      <label :for="labelFor"
             class="mu-form-item__label"
             :style="labelStyle"
             v-if="label || $slots.label">
        <slot name="label">{{label + form.labelSuffix}}</slot>
      </label>
    </label-wrap>
    <div class="mu-form-item__content"
         :style="contentStyle">
      <slot></slot>
      <transition name="mu-zoom-in-top">
        <slot v-if="validateState === 'error' && showMessage && form.showMessage"
              name="error"
              :error="validateMessage">
          <div class="mu-form-item__error"
               :class="{
              'mu-form-item__error--inline': typeof inlineMessage === 'boolean'
                ? inlineMessage
                : (muForm && muForm.inlineMessage || false)
            }">
            {{validateMessage}}
          </div>
        </slot>
      </transition>
    </div>
  </div>
</template>

<script lang='ts'>
import { MuFormItem as FormItem } from 'types/form-item'
import { Component, Watch, Prop, Inject } from 'vue-property-decorator'

import { mixins } from 'vue-class-component'
import AsyncValidator from 'async-validator'
import emitter from 'musely-ui/src/mixins/emitter'
import { merge, noop, getPropByPath } from 'musely-ui/src/utils'
import LabelWrap from './label-wrap.vue'
@Component({
  name: 'MuFormItem',
  components: { LabelWrap },
  // TODO vue-property-decorator Provide emit获取不到mothed
  provide() {
    return {
      muFormItem: this
    }
  }
})
export default class MuFormItem extends mixins(emitter) implements FormItem {
  @Prop({ type: String }) label!: string
  @Prop({ type: String }) labelWidth!: string
  @Prop({ type: String }) prop!: string
  @Prop({ type: Boolean, default: undefined }) required!: boolean
  @Prop({ type: [Object, Array] }) rules!: any
  @Prop({ type: String }) error!: string
  @Prop({ type: String }) validateStatus!: string
  @Prop({ type: String }) for!: string
  @Prop({ type: [String, Boolean], default: '' }) inlineMessage!: boolean
  @Prop({ type: Boolean, default: true }) showMessage!: boolean

  @Inject() muForm!: any

  private validateState = ''
  private validateMessage = ''
  private validateDisabled = false
  private validator = {}
  private isNested = false
  private computedLabelWidth = ''

  get labelFor() {
    return this.for || this.prop
  }

  get labelStyle(): any {
    const ret: any = {}
    if ((this as any).form.labelPosition === 'top') {
      return ret
    }
    const labelWidth = this.labelWidth || (this as any).form.labelWidth
    if (labelWidth) {
      ret.width = labelWidth
    }
    return ret
  }

  get contentStyle() {
    const ret: any = {}
    const label = this.label
    const t = this as any
    if (t.form.labelPosition === 'top' || t.form.inline) {
      return ret
    }
    if (!label && !this.labelWidth && this.isNested) return ret
    const labelWidth = this.labelWidth || t.form.labelWidth
    if (labelWidth === 'auto') {
      if (this.labelWidth === 'auto') {
        ret.marginLeft = this.computedLabelWidth
      } else if (t.form.labelWidth === 'auto') {
        ret.marginLeft = t.muForm.autoLabelWidth
      }
    } else {
      ret.marginLeft = labelWidth
    }
    return ret
  }

  get form() {
    let parent = this.$parent
    let parentName = parent.$options.name
    while (parentName !== 'MuForm') {
      if (parentName === 'MuFormItem') {
        this.isNested = true
      }
      parent = parent.$parent
      parentName = parent.$options.componentName
    }
    return parent
  }

  get fieldValue() {
    const model = (this as any).form.model
    if (!model || !this.prop) {
      return
    }

    let path = this.prop
    if (path.indexOf(':') !== -1) {
      path = path.replace(/:/, '.')
    }

    return getPropByPath(model, path, true).v
  }

  get isRequired() {
    const rules = this.getRules()
    let isRequired = false

    if (rules && rules.length) {
      rules.every((rule: any) => {
        if (rule.required) {
          isRequired = true
          return false
        }
        return true
      })
    }
    return isRequired
  }

  validate(trigger: any, callback: any = noop) {
    this.validateDisabled = false
    const rules = this.getFilteredRule(trigger)
    if ((!rules || rules.length === 0) && this.required === undefined) {
      callback()
      return true
    }

    this.validateState = 'validating'

    const descriptor = {}
    if (rules && rules.length > 0) {
      rules.forEach((rule: any) => {
        delete rule.trigger
      })
    }
    ;(descriptor as any)[this.prop] = rules

    const validator = new AsyncValidator(descriptor)
    const model = {}
    ;(model as any)[this.prop] = this.fieldValue

    validator.validate(
      model,
      { firstFields: true },
      (errors, invalidFields) => {
        this.validateState = !errors ? 'success' : 'error'
        this.validateMessage = errors ? errors[0].message : ''

        callback(this.validateMessage, invalidFields)
        this.muForm &&
          this.muForm.$emit(
            'validate',
            this.prop,
            !errors,
            this.validateMessage || null
          )
      }
    )
  }

  clearValidate() {
    this.validateState = ''
    this.validateMessage = ''
    this.validateDisabled = false
  }

  resetField() {
    this.validateState = ''
    this.validateMessage = ''

    const model = (this as any).form.model
    const value = this.fieldValue
    let path = this.prop
    if (path.indexOf(':') !== -1) {
      path = path.replace(/:/, '.')
    }

    const prop = getPropByPath(model, path, true)

    this.validateDisabled = true
    if (Array.isArray(value)) {
      prop.o[prop.k] = [].concat((this as any).initialValue)
    } else {
      prop.o[prop.k] = (this as any).initialValue
    }

    // reset validateDisabled after onFieldChange triggered
    this.$nextTick(() => {
      this.validateDisabled = false
    })

    this.broadcast('MuTimeSelect', 'fieldReset', (this as any).initialValue)
  }

  getRules() {
    let formRules = (this as any).form.rules
    const selfRules = this.rules
    const requiredRule: any =
      this.required !== undefined ? { required: !!this.required } : []

    const prop = getPropByPath(formRules, this.prop || '')
    formRules = formRules ? prop.o[this.prop || ''] || prop.v : []

    return [].concat(selfRules || formRules || []).concat(requiredRule)
  }

  getFilteredRule(trigger: any) {
    const rules = this.getRules()

    return rules
      .filter((rule: any) => {
        if (!rule.trigger || trigger === '') return true
        if (Array.isArray(rule.trigger)) {
          return rule.trigger.indexOf(trigger) > -1
        } else {
          return rule.trigger === trigger
        }
      })
      .map((rule: any) => merge({}, rule))
  }

  onFieldBlur() {
    this.validate('blur')
  }

  onFieldChange() {
    if (this.validateDisabled) {
      this.validateDisabled = false
      return
    }

    this.validate('change')
  }

  updateComputedLabelWidth(width: number) {
    this.computedLabelWidth = width ? `${width}px` : ''
  }

  addValidateEvents() {
    const rules = this.getRules()

    if (rules.length || this.required !== undefined) {
      this.$on('mu.form.blur', this.onFieldBlur)
      this.$on('mu.form.change', this.onFieldChange)
    }
  }

  removeValidateEvents() {
    this.$off()
  }

  mounted() {
    if (this.prop) {
      this.dispatch('MuForm', 'mu.form.addField', [this])

      let initialValue = this.fieldValue
      if (Array.isArray(initialValue)) {
        initialValue = [].concat(initialValue as any)
      }
      Object.defineProperty(this, 'initialValue', {
        value: initialValue
      })

      this.addValidateEvents()
    }
  }

  beforeDestroy() {
    this.dispatch('MuForm', 'mu.form.removeField', [this])
  }

  @Watch('error', { immediate: true })
  onWatchError(value: string) {
    this.validateMessage = value
    this.validateState = value ? 'error' : ''
  }

  @Watch('validateStatus')
  onWatchValidateStatus(value: string) {
    this.validateState = value
  }
}
</script>
