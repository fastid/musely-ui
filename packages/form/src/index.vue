<!--
 * @Author: Victor wang
 * @Date: 2020-06-06 15:36:54
 * @LastEditors: Victor.wang
 * @LastEditTime: 2020-06-17 16:53:58
 * @Description:
-->
<template>
  <form class="mu-form"
        :class="[
    labelPosition ? 'mu-form--labmu-' + labelPosition : '',
    { 'mu-form--inline': inline }
  ]">
    <slot></slot>
  </form>
</template>
<script lang='ts'>
import {
  MuForm as Form,
  FormItemLabelPosition,
  ValidateCallback,
  ValidateFieldCallback
} from 'types/form'
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import { merge } from 'musely-ui/src/utils/'

@Component({
  name: 'MuForm',
  provide() {
    return {
      muForm: this
    }
  }
})
export default class MuForm extends Vue implements Form {
  @Prop({ type: Object }) model!: object
  @Prop({ type: Object }) rules!: object
  @Prop({ type: String }) labelPosition!: FormItemLabelPosition
  @Prop({ type: String }) labelWidth!: string

  @Prop({
    type: String,
    default: ''
  })
  labelSuffix!: ''

  @Prop({
    type: Boolean
  })
  inline!: boolean

  @Prop({
    type: Boolean
  })
  inlineMessage!: boolean

  @Prop({
    type: Boolean
  })
  statusIcon!: boolean

  @Prop({
    type: Boolean,
    default: true
  })
  showMessage!: boolean

  @Prop({
    type: Boolean
  })
  disabled!: boolean

  @Prop({
    type: Boolean,
    default: true
  })
  validateOnRuleChange!: boolean

  @Prop({
    type: Boolean,
    default: true
  })
  hideRequiredAsterisk!: boolean

  // @Provide()
  // muForm = this

  private fields: any[] = []
  private potentialLabelWidthArr: any[] = []

  get autoLabelWidth() {
    if (!this.potentialLabelWidthArr.length) return 0
    const max = Math.max(...this.potentialLabelWidthArr)
    return max ? `${max}px` : ''
  }

  @Watch('rules')
  onWatchRules() {
    // remove then add event listeners on form-item after form rules change
    this.fields.forEach(field => {
      field.removeValidateEvents()
      field.addValidateEvents()
    })

    if (this.validateOnRuleChange) {
      this.validate(() => {
        // Empty
      })
    }
  }

  created() {
    this.$on('mu.form.addField', (field: any) => {
      if (field) {
        this.fields.push(field)
      }
    })
    /* istanbul ignore next */
    this.$on('mu.form.removeField', (field: any) => {
      if (field.prop) {
        this.fields.splice(this.fields.indexOf(field), 1)
      }
    })
  }

  resetFields() {
    if (!this.model) {
      console.warn(
        '[MuselyUI Warn][Form]model is required for resetFields to work.'
      )
      return
    }
    this.fields.forEach(field => {
      field.resetField()
    })
  }

  clearValidate(props: any[] = []) {
    const p1 = this.fields.filter((field: any) => props === field.prop)
    const p2 = this.fields.filter((field: any) => {
      return props.indexOf(field.prop) > -1
    })
    const fields = props.length
      ? typeof props === 'string'
        ? p1
        : p2
      : this.fields
    fields.forEach(field => {
      field.clearValidate()
    })
  }

  validate(callback: ValidateCallback) {
    console.log('======22222222=======')
    if (!this.model) {
      console.warn(
        '[MuselyUI Warn][Form]model is required for validate to work!'
      )
      return
    }

    let promise: any
    // if no callback, return promise
    if (typeof callback !== 'function' && window.Promise) {
      promise = new window.Promise((resolve, reject) => {
        callback = function(valid: any) {
          valid ? resolve(valid) : reject(valid)
        }
      })
    }

    let valid = true
    let count = 0
    // 如果需要验证的fields为空，调用验证时立刻返回callback
    if (this.fields.length === 0 && callback) {
      const cb = true
      callback(cb)
    }
    let invalidFields = {}
    this.fields.forEach(field => {
      console.log(field, '-------------')
      field.validate('', (message: string, field: any) => {
        if (message) {
          valid = false
        }
        invalidFields = merge({}, invalidFields, field)
        if (typeof callback === 'function' && ++count === this.fields.length) {
          callback(valid, invalidFields)
        }
      })
    })

    if (promise) {
      return promise
    }
  }

  validateField(props: any, cb?: ValidateFieldCallback) {
    // TODO array
    props = [].concat(props)

    const fields = this.fields.filter(field => props.indexOf(field.prop) !== -1)
    if (!fields.length) {
      console.warn('[MuselyUI Warn]please pass correct props!')
      return
    }

    fields.forEach(field => {
      field.validate('', cb)
    })
  }

  getLabelWidthIndex(width: any) {
    const index = this.potentialLabelWidthArr.indexOf(width)
    if (index === -1) {
      throw new Error(`[ElementForm]unpected width ${width}`)
    }
    return index
  }

  registerLabelWidth(val: any, oldVal: any) {
    if (val && oldVal) {
      const index = this.getLabelWidthIndex(oldVal)
      this.potentialLabelWidthArr.splice(index, 1, val)
    } else if (val) {
      this.potentialLabelWidthArr.push(val)
    }
  }

  deregisterLabelWidth(val: any) {
    const index = this.getLabelWidthIndex(val)
    this.potentialLabelWidthArr.splice(index, 1)
  }
}
</script>
