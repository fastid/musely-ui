/*
 * @Author: Victor wang
 * @Date: 2020-04-22 17:33:39
 * @LastEditors: Victor.wang
 * @LastEditTime: 2020-04-22 17:33:39
 * @Description:
 */
<template>
  <transition name="mu-alert-fade">
    <div class="mu-alert"
         :class="[typeClass, center ? 'is-center' : '', 'is-' + effect]"
         v-show="visible"
         role="alert">
      <i class="mu-alert__icon"
         :class="[ iconClass, isBigIcon ]"
         v-if="showIcon"></i>
      <div class="mu-alert__content">
        <span class="mu-alert__title"
              :class="[ isBoldTitle ]"
              v-if="title || $slots.title">
          <slot name="title">{{ title }}</slot>
        </span>
        <p class="mu-alert__description"
           v-if="$slots.default && !description">
          <slot></slot>
        </p>
        <p class="mu-alert__description"
           v-if="description && !$slots.default">{{ description }}</p>
        <i class="mu-alert__closebtn"
           :class="{ 'is-customed': closeText !== '', 'mu-icon-close': closeText === '' }"
           v-show="closable"
           @click="close()">{{closeText}}</i>
      </div>
    </div>
  </transition>
</template>

<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator'
import { AlertType, AlertEffect, MuAlert as Alert } from '../../../types/alert'
interface ITypeClassesMap {
  success: string
  warning: string
  error: string
}
const TYPE_CLASSES_MAP: ITypeClassesMap = {
  success: 'mu-icon-success',
  warning: 'mu-icon-warning',
  error: 'mu-icon-error'
}

@Component({
  name: 'MuAlert'
})
export default class MuAlert extends Vue implements Alert {
  @Prop({ default: '', type: String }) title!: string
  @Prop({ default: '', type: String }) description!: string
  @Prop({ default: 'info', type: String }) type!: AlertType
  @Prop({ default: true, type: Boolean }) closable!: boolean
  @Prop({ default: '', type: String }) closeText!: string
  @Prop({ default: true, type: Boolean }) showIcon!: boolean
  @Prop({ type: Boolean }) center!: boolean

  @Prop({
    default: 'light',
    type: String,
    validator: value => {
      return ['light', 'dark'].indexOf(value) !== -1
    }
  })
  effect!: AlertEffect

  private visible = true

  private close() {
    this.visible = false
    this.$emit('close')
  }

  get typeClass() {
    return `mu-alert--${this.type}`
  }

  get iconClass() {
    return (TYPE_CLASSES_MAP as any)[this.type] || 'mu-icon-info'
  }

  get isBigIcon() {
    return this.description || this.$slots.default ? 'is-big' : ''
  }

  get isBoldTitle() {
    return this.description || this.$slots.default ? 'is-bold' : ''
  }
}
</script>
