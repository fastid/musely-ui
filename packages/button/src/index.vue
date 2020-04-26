<template>
  <button class="mu-button"
          @click="handleClick"
          :disabled="buttonDisabled || loading"
          :autofocus="autofocus"
          :type="nativeType"
          :class="[
      {
        'is-disabled': buttonDisabled,
        'is-loading': loading,
        'is-plain': plain,
        'is-round': round,
        'is-circle': circle
      }
    ]">
    <i class="mu-icon-loading"
       v-if="loading"></i>
    <i :class="icon"
       v-if="icon && !loading"></i>
    <span v-if="$slots.default">
      <slot></slot>
    </span>

  </button>
</template>

<script lang='ts'>
import { EventEmitter } from 'events'
import { Component, Vue, Prop, Inject } from 'vue-property-decorator'
import { ButtonNativeType, MuButton as Button } from 'types/button'

@Component({
  name: 'MuButton'
})
export default class MuButton extends Vue implements Button {
  @Prop({ type: Boolean }) plain!: boolean
  @Prop({ type: Boolean }) round!: boolean
  @Prop({ type: Boolean }) loading!: boolean
  @Prop({ type: Boolean }) disabled!: boolean
  @Prop({ type: Boolean }) autofocus!: boolean
  @Prop({ type: String, default: '' }) icon!: string
  @Prop({ type: String, default: 'button' }) nativeType!: ButtonNativeType
  @Prop({ type: Boolean }) circle!: boolean

  @Inject({
    default: ''
  })
  muForm!: any

  @Inject({
    default: ''
  })
  muFormItem!: any

  get buttonDisabled() {
    // TODO disabled
    return this.disabled || (this.muForm || {}).disabled
  }

  handleClick(evt: EventEmitter) {
    this.$emit('click', evt)
  }
}
</script>
