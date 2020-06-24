<!--
 * @Author: Victor wang
 * @Date: 2020-04-14 19:02:17
 * @LastEditors: Victor.wang
 * @LastEditTime: 2020-06-25 02:43:24
 * @Description:
 -->
<template>
  <div class="mu-select"
       @click.stop="toggleMenu"
       v-clickoutside="handleClose">
    <mu-input ref="reference"
              v-model="selectedLabel"
              type="text"
              :placeholder="currentPlaceholder"
              :name="name"
              :id="id"
              :autocomplete="autocomplete"
              :disabled="selectDisabled"
              :readonly="readonly"
              :validate-event="false"
              :class="{ 'is-focus': visible }"
              :tabindex="filterable ? '-1' : null"
              @focus="handleFocus"
              @blur="handleBlur"
              @keyup.native="debouncedOnInputChange"
              @keydown.native.down.stop.prevent="navigateOptions('next')"
              @keydown.native.up.stop.prevent="navigateOptions('prev')"
              @keydown.native.enter.prevent="selectOption"
              @keydown.native.esc.stop.prevent="visible = false"
              @keydown.native.tab="visible = false"
              @paste.native="debouncedOnInputChange"
              @mouseenter.native="inputHovering = true"
              @mouseleave.native="inputHovering = false">
      <template slot="prefix"
                v-if="$slots.prefix">
        <slot name="prefix"></slot>
      </template>
      <template slot="suffix">
        <i v-show="!showClose"
           :class="['mu-select__caret', 'mu-input__icon', 'mu-icon-' + iconClass]"></i>
        <i v-if="showClose"
           class="mu-select__caret mu-input__icon mu-icon-round-close"
           @click="handleClearClick"></i>
      </template>
    </mu-input>
    <transition name="mu-zoom-in-top"
                @before-enter="handleMenuEnter"
                @after-leave="doDestroy">
      <mu-select-menu ref="popper"
                      :append-to-body="popperAppendToBody"
                      v-show="visible && emptyText !== false">
        <mu-scrollbar tag="ul"
                      wrap-class="mu-select-dropdown__wrap"
                      view-class="mu-select-dropdown__list"
                      ref="scrollbar"
                      :class="{ 'is-empty': !allowCreate && query && filteredOptionsCount === 0 }">
          <mu-option :value="query"
                     created
                     v-if="showNewOption">
          </mu-option>
          <slot></slot>
        </mu-scrollbar>
        <template v-if="emptyText && (!allowCreate || (allowCreate && options.length === 0 ))">
          <slot name="empty"
                v-if="$slots.empty"></slot>
          <p class="mu-select-dropdown__empty"
             v-else>
            {{ emptyText }}
          </p>
        </template>
      </mu-select-menu>
    </transition>
  </div>
</template>
<script lang='ts'>
import { IAnyData } from 'types/common'
import { MuSelect as Main, QueryChangeHandler } from 'types/select'
import { Component, Mixins, Prop, Inject, Watch } from 'vue-property-decorator'

import Emitter from 'musely-ui/src/mixins/emitter'
// TODO since class not work~s
// import Focus from 'musely-ui/src/mixins/focus'
import MuInput from '~/input'
import MuOption from '~/option'
import MuSelectMenu from './menu.vue'
import MuScrollbar from '~/scrollbar'
import { debounce } from 'throttle-debounce'
import Clickoutside from 'musely-ui/src/utils/clickoutside'
import {
  addResizeListener,
  removeResizeListener
} from 'musely-ui/src/utils/resize-event'
import scrollIntoView from 'musely-ui/src/utils/scroll-into-view'
import {
  getValueByPath,
  valueEquals,
  isIE,
  isEdge,
  isKorean
} from 'musely-ui/src/utils'
import NavigationMixin from './navigation-mixin.vue'

@Component({
  provide() {
    return {
      select: this
    }
  },
  components: {
    MuInput,
    MuSelectMenu,
    MuOption,
    MuScrollbar
    // ElTag,
  },
  // mixins: [Focus('reference')],
  directives: { Clickoutside },
  name: 'MuSelect'
})
// mixins Focus('reference'),
export default class MuSelect extends Mixins(Emitter, NavigationMixin)
  implements Main {
  @Prop({ type: String }) name!: string
  @Prop({ type: String }) id!: string
  @Prop({
    required: true
  })
  value!: string

  @Prop(
    {
      type: String,
      default: 'off'
    }
    /** @Deprecated in next major version */
  )
  autocomplete!: string

  @Prop({ type: Boolean }) automaticDropdown!: boolean
  @Prop({ type: String }) size!: string
  @Prop({ type: Boolean }) disabled!: boolean
  @Prop({ type: Boolean }) clearable!: boolean
  @Prop({ type: Boolean }) filterable!: boolean
  @Prop({ type: Boolean }) allowCreate!: boolean
  @Prop({ type: String }) popperClass!: string
  @Prop({ type: String }) noMatchText!: string
  @Prop({ type: String }) noDataText!: string
  @Prop({ type: Function }) filterMethod!: QueryChangeHandler

  @Prop({
    type: Number,
    default: 0
  })
  multipleLimit!: number

  @Prop({
    type: String,
    default() {
      return ''
    }
  })
  placeholder!: string

  @Prop({ type: Boolean }) defaultFirstOption!: boolean
  @Prop({ type: Boolean }) reserveKeyword!: string
  @Prop({
    type: String,
    default: 'value'
  })
  valueKey!: string

  @Prop({ type: Boolean }) collapseTags!: boolean
  @Prop({
    type: Boolean,
    default: true
  })
  popperAppendToBody!: boolean

  @Inject({
    default: ''
  })
  muForm!: any

  @Inject({
    default: ''
  })
  muFormItem!: any

  @Watch('selectDisabled')
  onWatchSelectDisabled() {
    this.$nextTick(() => {
      this.resetInputHeight()
    })
  }

  @Watch('placeholder')
  onWatchPlaceholder(val: any) {
    this.cachedPlaceHolder = this.currentPlaceholder = val
  }

  @Watch('value')
  onWatchValue(val: any, oldVal: any) {
    this.setSelected()
    if (this.filterable) {
      this.inputLength = 20
    }
    if (!valueEquals(val, oldVal)) {
      this.dispatch('MuFormItem', 'mu.form.change', val)
    }
  }

  @Watch('visible')
  onWatchVisible(val: any) {
    if (!val) {
      this.broadcast('MuSelectDropdown', 'destroyPopper')
      if (this.$refs.input) {
        ;(this.$refs.input as any).blur()
      }
      this.query = ''
      this.previousQuery = null
      this.selectedLabel = ''
      this.inputLength = 20
      this.menuVisibleOnFocus = false
      this.resetHoverIndex()
      this.$nextTick(() => {
        if (
          this.$refs.input &&
          (this.$refs.input as any).value === '' &&
          this.selected.length === 0
        ) {
          this.currentPlaceholder = this.cachedPlaceHolder
        }
      })

      if (this.selected) {
        if (
          this.filterable &&
          this.allowCreate &&
          this.createdSelected &&
          this.createdLabel
        ) {
          this.selectedLabel = this.createdLabel
        } else {
          this.selectedLabel = (this.selected as any).currentLabel
        }
        if (this.filterable) {
          this.query = this.selectedLabel
        }
      }

      if (this.filterable) {
        this.currentPlaceholder = this.cachedPlaceHolder
      }
    } else {
      this.broadcast('MuSelectDropdown', 'updatePopper')
      if (this.filterable) {
        this.query = this.selectedLabel
        this.handleQueryChange(this.query)

        if (this.selectedLabel) {
          this.currentPlaceholder = this.selectedLabel
          this.selectedLabel = ''
        }
      }
    }
    this.$emit('visible-change', val)
  }

  @Watch('options')
  onWatchOptions() {
    if (this.$isServer) return
    this.$nextTick(() => {
      this.broadcast('MuSelectDropdown', 'updatePopper')
    })
    const inputs = this.$el.querySelectorAll('input')
    // TODO
    const index = ([] as any).indexOf.call(inputs, document.activeElement)

    if (index === -1) {
      this.setSelected()
    }

    if (
      this.defaultFirstOption &&
      this.filterable &&
      this.filteredOptionsCount
    ) {
      this.checkDefaultFirstOption()
    }
  }

  get readonly() {
    return !this.filterable || (!isIE() && !isEdge() && !this.visible)
  }

  get showClose() {
    const hasValue =
      this.value !== undefined && this.value !== null && this.value !== ''
    const criteria =
      this.clearable && !this.selectDisabled && this.inputHovering && hasValue
    return criteria
  }

  get iconClass() {
    return this.visible ? 'arrow-up is-reverse' : 'arrow-up'
  }

  get debounce() {
    return 0
  }

  get emptyText() {
    if (
      this.filterable &&
      this.query &&
      this.options.length > 0 &&
      this.filteredOptionsCount === 0
    ) {
      return this.noMatchText || 'No matching data'
    }
    if (this.options.length === 0) {
      return this.noDataText || 'No data'
    }
    return null
  }

  get showNewOption() {
    const hasExistingOption = this.options
      .filter((option: any) => !option.created)
      .some((option: any) => option.currentLabel === this.query)
    return (
      this.filterable &&
      this.allowCreate &&
      this.query !== '' &&
      !hasExistingOption
    )
  }

  get selectDisabled() {
    return this.disabled || (this.muForm || {}).disabled
  }

  // private

  options: any = []
  cachedOptions = []
  createdLabel = null
  createdSelected = false
  selected: any[] | IAnyData = []
  inputLength = 20
  inputWidth = 0
  initialInputHeight = 0
  cachedPlaceHolder = ''
  optionsCount = 0
  filteredOptionsCount = 0
  visible = false
  softFocus = false
  selectedLabel: any = ''
  hoverIndex = -1
  query = ''
  previousQuery = null
  inputHovering = false
  currentPlaceholder = ''
  menuVisibleOnFocus = false
  isOnComposition = false
  isSilentBlur = false

  // base
  debouncedOnInputChange: any = null
  debouncedQueryChange: any = null
  focus() {
    ;(this.$refs.reference as any).focus()
  }

  blur() {
    this.visible = false
    ;(this.$refs.reference as any).blur()
  }

  handleComposition(event: Event) {
    const text = (event.target as HTMLInputElement).value
    if (event.type === 'compositionend') {
      this.isOnComposition = false
      this.$nextTick(() => this.handleQueryChange(text))
    } else {
      const lastCharacter = text[text.length - 1] || ''
      this.isOnComposition = !isKorean(lastCharacter)
    }
  }

  handleQueryChange(val: any) {
    if (this.previousQuery === val || this.isOnComposition) return
    if (
      this.previousQuery === null &&
      typeof this.filterMethod === 'function'
    ) {
      this.previousQuery = val
      return
    }
    this.previousQuery = val
    this.$nextTick(() => {
      if (this.visible) this.broadcast('MuSelectDropdown', 'updatePopper')
    })
    this.hoverIndex = -1
    if (typeof this.filterMethod === 'function') {
      this.filterMethod(val)
      this.broadcast('MuOptionGroup', 'queryChange')
    } else {
      this.filteredOptionsCount = this.optionsCount
      this.broadcast('MuOption', 'queryChange', val)
      this.broadcast('MuOptionGroup', 'queryChange')
    }
    if (
      this.defaultFirstOption &&
      this.filterable &&
      this.filteredOptionsCount
    ) {
      this.checkDefaultFirstOption()
    }
  }

  scrollToOption(option: any) {
    const target =
      Array.isArray(option) && option[0] ? option[0].$el : option.$el
    if (this.$refs.popper && target) {
      const menu = (this.$refs.popper as any).$el.querySelector(
        '.mu-select-dropdown__wrap'
      )
      scrollIntoView(menu, target)
    }
    this.$refs.scrollbar && (this.$refs.scrollbar as any).handleScroll()
  }

  handleMenuEnter() {
    this.$nextTick(() => this.scrollToOption(this.selected))
  }

  emitChange(val: any) {
    if (!valueEquals(this.value, val)) {
      this.$emit('change', val)
    }
  }

  getOption(value: any) {
    let option
    const isObject =
      Object.prototype.toString.call(value).toLowerCase() === '[object object]'
    const isNull =
      Object.prototype.toString.call(value).toLowerCase() === '[object null]'
    const isUndefined =
      Object.prototype.toString.call(value).toLowerCase() ===
      '[object undefined]'

    for (let i = this.cachedOptions.length - 1; i >= 0; i--) {
      const cachedOption: any = this.cachedOptions[i]
      const isEqual = isObject
        ? getValueByPath(cachedOption.value, this.valueKey) ===
          getValueByPath(value, this.valueKey)
        : cachedOption.value === value
      if (isEqual) {
        option = cachedOption
        break
      }
    }
    if (option) return option
    const label = !isObject && !isNull && !isUndefined ? value : ''
    const newOption: any = {
      value: value,
      currentLabel: label
    }
    return newOption
  }

  setSelected() {
    const option = this.getOption(this.value)
    if (option.isCreate) {
      this.createdLabel = option.currentLabel
      this.createdSelected = true
    } else {
      this.createdSelected = false
    }

    this.selectedLabel = option.currentLabel
    this.selected = option

    if (this.filterable) {
      this.query = this.selectedLabel
    }
  }

  handleFocus(event: any) {
    if (!this.softFocus) {
      if (this.automaticDropdown || this.filterable) {
        this.visible = true
        if (this.filterable) {
          this.menuVisibleOnFocus = true
        }
      }
      this.$emit('focus', event)
    } else {
      this.softFocus = false
    }
  }

  handleBlur(event: any) {
    setTimeout(() => {
      if (this.isSilentBlur) {
        this.isSilentBlur = false
      } else {
        this.$emit('blur', event)
      }
    }, 50)
    this.softFocus = false
  }

  handleClearClick(event: any) {
    this.deleteSelected(event)
  }

  doDestroy() {
    this.$refs.popper && (this.$refs.popper as any).doDestroy()
  }

  handleClose() {
    this.visible = false
  }

  toggleLastOptionHitState(hit?: any) {
    if (!Array.isArray(this.selected)) return
    const option = this.selected[this.selected.length - 1]
    if (!option) return

    if (hit === true || hit === false) {
      option.hitState = hit
      return hit
    }

    option.hitState = !option.hitState
    return option.hitState
  }

  deletePrevTag(e: any) {
    if (e.target.value.length <= 0 && !this.toggleLastOptionHitState()) {
      const value: any = this.value.slice()
      value.pop()
      this.$emit('input', value)
      this.emitChange(value)
    }
  }

  managePlaceholder() {
    if (this.currentPlaceholder !== '') {
      this.currentPlaceholder = (this.$refs.input as any).value
        ? ''
        : this.cachedPlaceHolder
    }
  }

  resetInputState(e: any) {
    if (e.keyCode !== 8) this.toggleLastOptionHitState(false)
    this.inputLength = (this.$refs.input as any).value.length * 15 + 20
    this.resetInputHeight()
  }

  resetInputHeight() {
    if (this.collapseTags && !this.filterable) return
    this.$nextTick(() => {
      if (!this.$refs.reference) return
      const inputChildNodes = (this.$refs.reference as any).$el.childNodes
      const input: any = [].filter.call(
        inputChildNodes,
        (item: any) => item.tagName === 'INPUT'
      )[0]
      const tags: any = this.$refs.tags
      const sizeInMap = this.initialInputHeight || 40
      input.style.height =
        this.selected.length === 0
          ? sizeInMap + 'px'
          : Math.max(
              tags
                ? tags.clientHeight + (tags.clientHeight > sizeInMap ? 6 : 0)
                : 0,
              sizeInMap
            ) + 'px'
      if (this.visible && this.emptyText !== null) {
        this.broadcast('MuSelectDropdown', 'updatePopper')
      }
    })
  }

  resetHoverIndex() {
    setTimeout(() => {
      this.hoverIndex = (this.options as any).indexOf(this.selected)
    }, 300)
  }

  handleOptionSelect(option: any, byClick?: any) {
    this.$emit('input', option.value)
    this.emitChange(option.value)
    this.visible = false

    this.isSilentBlur = byClick
    this.setSoftFocus()
    if (this.visible) {
      return
    }
    this.$nextTick(() => {
      this.scrollToOption(option)
    })
  }

  setSoftFocus() {
    this.softFocus = true
    const input: any = this.$refs.input || this.$refs.reference
    if (input) {
      input.focus()
    }
  }

  getValueIndex(arr: any = [], value: any) {
    const isObject =
      Object.prototype.toString.call(value).toLowerCase() === '[object object]'
    if (!isObject) {
      return arr.indexOf(value)
    } else {
      const valueKey = this.valueKey
      let index = -1
      arr.some((item: any, i: any) => {
        if (
          getValueByPath(item, valueKey) === getValueByPath(value, valueKey)
        ) {
          index = i
          return true
        }
        return false
      })
      return index
    }
  }

  toggleMenu() {
    if (!this.selectDisabled) {
      if (this.menuVisibleOnFocus) {
        this.menuVisibleOnFocus = false
      } else {
        this.visible = !this.visible
      }
      if (this.visible) {
        ;((this.$refs.input || this.$refs.reference) as any).focus()
      }
    }
  }

  selectOption() {
    if (!this.visible) {
      this.toggleMenu()
    } else {
      if (this.options[this.hoverIndex]) {
        this.handleOptionSelect(this.options[this.hoverIndex])
      }
    }
  }

  deleteSelected(event: any) {
    event.stopPropagation()
    const value = ''
    this.$emit('input', value)
    this.emitChange(value)
    this.visible = false
    this.$emit('clear')
  }

  onInputChange() {
    if (this.filterable && this.query !== this.selectedLabel) {
      this.query = this.selectedLabel
      this.handleQueryChange(this.query)
    }
  }

  onOptionDestroy(index: any) {
    if (index > -1) {
      this.optionsCount--
      this.filteredOptionsCount--
      this.options.splice(index, 1)
    }
  }

  resetInputWidth() {
    this.inputWidth = (this.$refs
      .reference as any).$el.getBoundingClientRect().width
  }

  handleResize() {
    this.resetInputWidth()
  }

  checkDefaultFirstOption() {
    this.hoverIndex = -1
    // highlight the created option
    let hasCreated = false
    for (let i = this.options.length - 1; i >= 0; i--) {
      if (this.options[i].created) {
        hasCreated = true
        this.hoverIndex = i
        break
      }
    }
    if (hasCreated) return
    for (let i = 0; i !== this.options.length; ++i) {
      const option = this.options[i]
      if (this.query) {
        // highlight first options that passes the filter
        if (!option.disabled && !option.groupDisabled && option.visible) {
          this.hoverIndex = i
          break
        }
      } else {
        // highlight currently selected option
        if (option.itemSelected) {
          this.hoverIndex = i
          break
        }
      }
    }
  }

  getValueKey(item: any) {
    if (
      Object.prototype.toString.call(item.value).toLowerCase() !==
      '[object object]'
    ) {
      return item.value
    } else {
      return getValueByPath(item.value, this.valueKey)
    }
  }

  created() {
    // TODO

    this.selected = {}

    this.cachedPlaceHolder = this.currentPlaceholder = this.placeholder

    if (Array.isArray(this.value)) {
      this.$emit('input', '')
    }

    this.debouncedOnInputChange = debounce(this.debounce, () => {
      this.onInputChange()
    })

    this.debouncedQueryChange = debounce(this.debounce, (e: any) => {
      this.handleQueryChange(e.target.value)
    })

    this.$on('handleOptionClick', this.handleOptionSelect)
    this.$on('setSelected', this.setSelected)
  }

  mounted() {
    addResizeListener(this.$el, this.handleResize)

    const reference: any = this.$refs.reference

    this.$nextTick(() => {
      if (reference && reference.$el) {
        this.inputWidth = reference.$el.getBoundingClientRect().width
      }
    })
    this.setSelected()
  }

  beforeDestroy() {
    if (this.$el && this.handleResize) {
      removeResizeListener(this.$el, this.handleResize)
    }
  }
}
</script>
