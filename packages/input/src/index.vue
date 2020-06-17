<template>
  <div :class="[
    type === 'textarea' ? 'mu-textarea' : 'mu-input',
    inputSize ? 'mu-input--' + inputSize : '',
    {
      'is-disabled': inputDisabled,
      'is-exceed': inputExceed,
      'mu-input-group': $slots.prepend || $slots.append,
      'mu-input-group--append': $slots.append,
      'mu-input-group--prepend': $slots.prepend,
      'mu-input--prefix': $slots.prefix || prefixIcon,
      'mu-input--suffix': $slots.suffix || suffixIcon || clearable || showPassword
    }
    ]"
       @mouseenter="hovering = true"
       @mouseleave="hovering = false">
    <template v-if="type !== 'textarea'">
      <!-- 前置元素 -->
      <div class="mu-input-group__prepend"
           v-if="$slots.prepend">
        <slot name="prepend"></slot>
      </div>
      <input :tabindex="tabindex"
             v-if="type !== 'textarea'"
             class="mu-input__inner"
             v-bind="$attrs"
             :type="showPassword ? (passwordVisible ? 'text': 'password') : type"
             :disabled="inputDisabled"
             :readonly="readonly"
             :autocomplete="autocomplete"
             ref="input"
             @compositionstart="handleCompositionStart"
             @compositionupdate="handleCompositionUpdate"
             @compositionend="handleCompositionEnd"
             @input="handleInput"
             @focus="handleFocus"
             @blur="handleBlur"
             @change="handleChange"
             :aria-label="label">
      <!-- 前置内容 -->
      <span class="mu-input__prefix"
            v-if="$slots.prefix || prefixIcon">
        <slot name="prefix"></slot>
        <i class="mu-input__icon"
           v-if="prefixIcon"
           :class="prefixIcon">
        </i>
      </span>
      <!-- 后置内容 -->
      <span class="mu-input__suffix"
            v-if="getSuffixVisible()">
        <span class="mu-input__suffix-inner">
          <template v-if="!showClear || !showPwdVisible || !isWordLimitVisible">
            <slot name="suffix"></slot>
            <i class="mu-input__icon"
               v-if="suffixIcon"
               :class="suffixIcon">
            </i>
          </template>
          <i v-if="showClear"
             class="mu-input__icon mu-icon-round-close mu-input__clear"
             @mousedown.prevent
             @click="clear"></i>
          <i v-if="showPwdVisible"
             class="mu-input__icon mu-icon-view mu-input__clear"
             @click="handlePasswordVisible"></i>
          <span v-if="isWordLimitVisible"
                class="mu-input__count">
            <span class="mu-input__count-inner">
              {{ textLength }}/{{ upperLimit }}
            </span>
          </span>
        </span>
        <i class="mu-input__icon"
           v-if="validateState"
           :class="['mu-input__validateIcon', validateIcon]">
        </i>
      </span>
      <!-- 后置元素 -->
      <div class="mu-input-group__append"
           v-if="$slots.append">
        <slot name="append"></slot>
      </div>
    </template>
    <textarea v-else
              :tabindex="tabindex"
              class="mu-textarea__inner"
              @compositionstart="handleCompositionStart"
              @compositionupdate="handleCompositionUpdate"
              @compositionend="handleCompositionEnd"
              @input="handleInput"
              ref="textarea"
              v-bind="$attrs"
              :disabled="inputDisabled"
              :readonly="readonly"
              :autocomplete="autocomplete"
              @focus="handleFocus"
              @blur="handleBlur"
              @change="handleChange"
              :aria-label="label">
    </textarea>
    <span v-if="isWordLimitVisible && type === 'textarea'"
          class="mu-input__count">{{ textLength }}/{{ upperLimit }}</span>
  </div>
</template>

<script lang='ts'>
import {
  Resizability,
  InputType,
  AutoSize,
  MuInput as Input
} from 'types/input'
import { Component, Prop, Inject, Mixins, Watch } from 'vue-property-decorator'
import emitter from 'musely-ui/src/mixins/emitter'
import { isKorean } from 'musely-ui/src/utils'

@Component({
  name: 'MuInput'
})
export default class MuInput extends Mixins(emitter) implements Input {
  @Prop({ type: [String, Number] }) value: any
  @Prop({ type: [String, Number] }) size!: string | number
  @Prop({ type: String }) resize!: Resizability
  @Prop({ type: String }) form!: string
  @Prop({ type: Boolean }) disabled!: boolean
  @Prop({ type: Boolean }) readonly!: boolean
  @Prop({ type: String, default: 'text' }) type!: InputType
  @Prop({ type: [Boolean, Object], default: false }) autosize!: AutoSize

  @Prop({ type: Boolean, default: true }) validateEvent!: boolean
  @Prop({ type: String }) suffixIcon!: string
  @Prop({ type: String }) prefixIcon!: string
  @Prop({ type: String }) label!: string
  @Prop({ type: Boolean, default: false }) clearable!: boolean
  @Prop({ type: String }) tabindex!: string
  @Prop({ type: [Boolean, Object], default: false }) showPassword!: false
  @Prop({ type: [Boolean, Object], default: false }) showWordLimit!: false
  @Prop({
    type: String,
    default: 'off'
  })
  autocomplete!: string

  // prop
  @Prop({ type: [String, Number] }) maxlength!: number | string
  @Prop({ type: [String, Number] }) minlength!: number | string
  @Prop({ type: String }) placeholder!: string
  @Prop({ type: Number }) rows!: number

  @Prop({ type: Number }) max!: number
  @Prop({ type: Number }) min!: number
  @Prop({ type: String }) name!: string
  @Prop({}) step!: any
  @Prop({ type: Boolean }) autofocus!: boolean

  // @inheritAttrs: false,
  @Inject({
    default: ''
  })
  muForm!: any

  @Inject({
    default: ''
  })
  muFormItem!: any

  $MUSELY!: any

  // data
  textareaCalcStyle = {}
  hovering = false
  focused = false
  isComposing = false
  passwordVisible = false

  get _muFormItemSize() {
    return (this.muFormItem || {}).muFormItemSize
  }

  get validateState() {
    return this.muFormItem ? this.muFormItem.validateState : ''
  }

  get needStatusIcon() {
    return this.muForm ? this.muForm.statusIcon : false
  }

  get validateIcon() {
    return ({
      validating: 'mu-icon-loading',
      success: 'mu-icon-round-success',
      error: 'mu-icon-round-close'
    } as any)[this.validateState]
  }

  get inputSize() {
    return this.size || this._muFormItemSize || (this.$MUSELY || {}).size
  }

  get inputDisabled() {
    return this.disabled || (this.muForm || {}).disabled
  }

  get nativeInputValue() {
    return this.value === null || this.value === undefined
      ? ''
      : String(this.value)
  }

  get showClear() {
    return (
      this.clearable &&
      !this.inputDisabled &&
      !this.readonly &&
      this.nativeInputValue &&
      (this.focused || this.hovering)
    )
  }

  get showPwdVisible() {
    return (
      this.showPassword &&
      !this.inputDisabled &&
      !this.readonly &&
      (!!this.nativeInputValue || this.focused)
    )
  }

  get isWordLimitVisible() {
    return (
      this.showWordLimit &&
      this.maxlength &&
      (this.type === 'text' || this.type === 'textarea') &&
      !this.inputDisabled &&
      !this.readonly &&
      !this.showPassword
    )
  }

  get upperLimit() {
    return this.maxlength
  }

  get textLength() {
    if (typeof this.value === 'number') {
      return String(this.value).length
    }

    return (this.value || '').length
  }

  get inputExceed() {
    // show exceed style if length of initial value greater then maxlength
    return this.isWordLimitVisible && this.textLength > this.upperLimit
  }

  focus() {
    ;(this.getInput() as HTMLInputElement).focus()
  }

  blur() {
    ;(this.getInput() as HTMLInputElement).blur()
  }

  private handleBlur(event: Event) {
    this.focused = false
    this.$emit('blur', event)
    // 触发form-层校验
    if (this.validateEvent) {
      this.dispatch('MuFormItem', 'mu.form.blur', [this.value])
    }
  }

  select() {
    ;(this.getInput() as HTMLInputElement).select()
  }

  setNativeInputValue() {
    const input = this.getInput() as HTMLInputElement
    if (!input) return
    if (input.value === this.nativeInputValue) return
    input.value = this.nativeInputValue
  }

  handleFocus(event: Event) {
    this.focused = true
    this.$emit('focus', event)
  }

  handleCompositionStart() {
    this.isComposing = true
  }

  handleCompositionUpdate(event: Event) {
    const text = (event.target as HTMLInputElement).value
    const lastCharacter = text[text.length - 1] || ''
    this.isComposing = !isKorean(lastCharacter)
  }

  handleCompositionEnd(event: Event) {
    if (this.isComposing) {
      this.isComposing = false
      this.handleInput(event)
    }
  }

  handleInput(event: Event) {
    // should not emit input during composition
    // see: https://github.com/MuemeFE/element/issues/10516
    if (this.isComposing) return

    // hack for https://github.com/MuemeFE/element/issues/8548
    // should remove the following line when we don't support IE
    if ((event.target as HTMLInputElement).value === this.nativeInputValue) {
      return
    }

    this.$emit('input', (event.target as HTMLInputElement).value)

    // ensure native input value is controlled
    // see: https://github.com/MuemeFE/element/issues/12850
    this.$nextTick(this.setNativeInputValue)
  }

  handleChange(event: Event) {
    this.$emit('change', (event.target as HTMLInputElement).value)
  }

  calcIconOffset(place: string) {
    const elList = [].slice.call(
      this.$el.querySelectorAll(`.mu-input__${place}`) || []
    )
    if (!elList.length) return
    let el = null
    for (let i = 0; i < elList.length; i++) {
      if ((elList[i] as HTMLElement).parentNode === this.$el) {
        el = elList[i]
        break
      }
    }
    if (!el) return
    const pendantMap: any = {
      suffix: 'append',
      prefix: 'prepend'
    }

    const pendant = pendantMap[place]
    if (this.$slots[pendant]) {
      ;(el as HTMLElement).style.transform = `translateX(${
        place === 'suffix' ? '-' : ''
      }${
        (this.$el as any).querySelector(`.mu-input-group__${pendant}`)
          .offsetWidth
      }px)`
    } else {
      ;(el as HTMLElement).removeAttribute('style')
    }
  }

  updateIconOffset() {
    this.calcIconOffset('prefix')
    this.calcIconOffset('suffix')
  }

  clear() {
    this.$emit('input', '')
    this.$emit('change', '')
    this.$emit('clear')
  }

  handlePasswordVisible() {
    this.passwordVisible = !this.passwordVisible
    this.focus()
  }

  getInput() {
    return this.$refs.input || this.$refs.textarea
  }

  getSuffixVisible() {
    return (
      this.$slots.suffix ||
      this.suffixIcon ||
      this.showClear ||
      this.showPassword ||
      this.isWordLimitVisible ||
      (this.validateState && this.needStatusIcon)
    )
  }

  created() {
    this.$on('inputSelect', this.select)
  }

  mounted() {
    this.setNativeInputValue()
    this.updateIconOffset()
  }

  updated() {
    this.$nextTick(this.updateIconOffset)
  }

  @Watch('value')
  watchValue(val: string) {
    if (this.validateEvent) {
      this.dispatch('MuFormItem', 'mu.form.change', [val])
    }
  }

  @Watch('nativeInputValue')
  watchNativeInputValue() {
    this.setNativeInputValue()
  }

  @Watch('type')
  // when change between <input> and <textarea>,
  // update DOM dependent value and styles
  // https://github.com/MuemeFE/element/issues/14857
  watchType() {
    this.$nextTick(() => {
      this.setNativeInputValue()
      this.updateIconOffset()
    })
  }
}
</script>
