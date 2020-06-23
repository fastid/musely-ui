<!--
 * @Author: Victor wang
 * @Date: 2020-04-14 19:02:17
 * @LastEditors: Victor.wang
 * @LastEditTime: 2020-06-23 22:11:38
 * @Description:
 -->
<template>
  <li @mouseenter="hoverItem"
      @click.stop="selectOptionClick"
      class="mu-select-dropdown__item"
      v-show="visible"
      :class="{
      'selected': itemSelected,
      'is-disabled': disabled || groupDisabled || limitReached,
      'hover': hover
    }">
    <slot>
      <span>{{ currentLabel }}</span>
    </slot>
  </li>
</template>
<script lang='ts'>
import { MuOption as Main } from 'types/option'
import { Component, Mixins, Prop, Inject, Watch } from 'vue-property-decorator'
import Emitter from 'musely-ui/src/mixins/emitter'
import { getValueByPath, escapeRegexpString } from 'musely-ui/src/utils'

@Component({
  name: 'MuOption'
})
export default class MuOption extends Mixins(Emitter) implements Main {
  @Prop({ required: true }) value!: any
  @Prop({ type: [String, Number] }) label!: string
  @Prop({ type: Boolean }) created!: any
  @Prop({ type: Boolean, default: false }) disabled!: any

  @Inject()
  select!: any

  index = -1
  groupDisabled = false
  visible = true
  hitState = false
  hover = false
  isObject = null

  get sObject() {
    return (
      Object.prototype.toString.call(this.value).toLowerCase() ===
      '[object object]'
    )
  }

  get currentLabel() {
    return this.label || (this.isObject ? '' : this.value)
  }

  get currentValue() {
    return this.value || this.label || ''
  }

  get itemSelected() {
    if (!this.select.multiple) {
      return this.isEqual(this.value, this.select.value)
    } else {
      return this.contains(this.select.value, this.value)
    }
  }

  get limitReached() {
    if (this.select.multiple) {
      return (
        !this.itemSelected &&
        (this.select.value || []).length >= this.select.multipleLimit &&
        this.select.multipleLimit > 0
      )
    } else {
      return false
    }
  }

  isEqual(a: any, b: any) {
    if (!this.isObject) {
      return a === b
    } else {
      const valueKey = this.select.valueKey
      return getValueByPath(a, valueKey) === getValueByPath(b, valueKey)
    }
  }

  contains(arr = [], target: any) {
    if (!this.isObject) {
      /* eslint-disable-next-line */
      return arr && (arr as any).indexOf(target) > -1
    } else {
      const valueKey = this.select.valueKey
      return (
        arr &&
        arr.some(item => {
          return (
            getValueByPath(item, valueKey) === getValueByPath(target, valueKey)
          )
        })
      )
    }
  }

  handleGroupDisabled(val: any) {
    this.groupDisabled = val
  }

  hoverItem() {
    if (!this.disabled && !this.groupDisabled) {
      this.select.hoverIndex = this.select.options.indexOf(this)
    }
  }

  selectOptionClick() {
    if (this.disabled !== true && this.groupDisabled !== true) {
      this.dispatch('ElSelect', 'handleOptionClick', [this, true])
    }
  }

  queryChange(query: any) {
    this.visible =
      new RegExp(escapeRegexpString(query), 'i').test(this.currentLabel) ||
      this.created
    if (!this.visible) {
      this.select.filteredOptionsCount--
    }
  }

  @Watch('currentLabel')
  onWatchCurrentLabel() {
    if (!this.created && !this.select.remote) {
      this.dispatch('MuSelect', 'setSelected', '')
    }
  }

  @Watch('value')
  onWatchValue(val: any, oldVal: any) {
    const { remote, valueKey } = this.select
    if (!this.created && !remote) {
      if (
        valueKey &&
        typeof val === 'object' &&
        typeof oldVal === 'object' &&
        val[valueKey] === oldVal[valueKey]
      ) {
        return
      }
      this.dispatch('MuSelect', 'setSelected', '')
    }
  }
}
</script>
