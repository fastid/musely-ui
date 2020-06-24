<!--
 * @Author: Victor wang
 * @Date: 2020-04-14 19:02:17
 * @LastEditors: Victor.wang
 * @LastEditTime: 2020-06-25 01:35:06
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
  @Prop({ type: Boolean }) private isCreate!: boolean
  @Prop({ type: Boolean, default: false }) disabled!: any

  @Inject()
  select!: any

  @Watch('currentLabel')
  onWatchCurrentLabel() {
    console.log('111111111')
    if (!this.isCreate) {
      this.dispatch('MuSelect', 'setSelected', '')
    }
  }

  @Watch('value')
  onWatchValue(val: any, oldVal: any) {
    const { valueKey } = this.select
    console.log(val, oldVal)
    if (!this.isCreate) {
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

  index = -1
  groupDisabled = false
  visible = true
  hitState = false
  hover = false

  get isObject() {
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
    return this.isEqual(this.value, this.select.value)
  }

  get limitReached() {
    return false
  }

  isEqual(a: any, b: any) {
    if (!this.isObject) {
      return a === b
    } else {
      const valueKey = this.select.valueKey
      return getValueByPath(a, valueKey) === getValueByPath(b, valueKey)
    }
  }

  contains(arr: any = [], target: any) {
    if (!this.isObject) {
      /* eslint-disable-next-line */
      return arr && arr.indexOf(target) > -1
    } else {
      const valueKey = this.select.valueKey
      return (
        arr &&
        arr.some((item: any) => {
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
      this.dispatch('MuSelect', 'handleOptionClick', [this, true])
    }
  }

  queryChange(query: any) {
    this.visible =
      new RegExp(escapeRegexpString(query), 'i').test(this.currentLabel) ||
      this.isCreate
    if (!this.visible) {
      this.select.filteredOptionsCount--
    }
  }

  created() {
    this.select.options.push(this)
    this.select.cachedOptions.push(this)
    this.select.optionsCount++
    this.select.filteredOptionsCount++

    this.$on('queryChange', this.queryChange)
    this.$on('handleGroupDisabled', this.handleGroupDisabled)
  }

  beforeDestroy() {
    const { selected } = this.select
    const selectedOptions = [selected]
    const index = this.select.cachedOptions.indexOf(this)
    const selectedIndex = selectedOptions.indexOf(this)

    // if option is not selected, remove it from cache
    if (index > -1 && selectedIndex < 0) {
      this.select.cachedOptions.splice(index, 1)
    }
    this.select.onOptionDestroy(this.select.options.indexOf(this))
  }
}
</script>
