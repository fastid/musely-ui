<!--
 * @Author: Victor wang
 * @Date: 2020-04-14 19:02:17
 * @LastEditors: Victor.wang
 * @LastEditTime: 2020-06-24 03:04:03
 * @Description:
 -->
<template>
  <div class="mu-select"
       :class="[selectSize ? 'mu-select--' + selectSize : '']"
       @click.stop="toggleMenu"
       v-clickoutside="handleClose">
    <div class="mu-select__tags"
         v-if="multiple"
         ref="tags"
         :style="{ 'max-width': inputWidth - 32 + 'px', width: '100%' }">
      <span v-if="collapseTags && selected.length">
        <mu-tag :closable="!selectDisabled"
                :size="collapseTagSize"
                :hit="selected[0].hitState"
                type="info"
                @close="deleteTag($event, selected[0])"
                disable-transitions>
          <span class="mu-select__tags-text">{{ selected[0].currentLabel }}</span>
        </mu-tag>
        <mu-tag v-if="selected.length > 1"
                :closable="false"
                :size="collapseTagSize"
                type="info"
                disable-transitions>
          <span class="mu-select__tags-text">+ {{ selected.length - 1 }}</span>
        </mu-tag>
      </span>
      <transition-group @after-leave="resetInputHeight"
                        v-if="!collapseTags">
        <mu-tag v-for="item in selected"
                :key="getValueKey(item)"
                :closable="!selectDisabled"
                :size="collapseTagSize"
                :hit="item.hitState"
                type="info"
                @close="deleteTag($event, item)"
                disable-transitions>
          <span class="mu-select__tags-text">{{ item.currentLabel }}</span>
        </mu-tag>
      </transition-group>

      <input type="text"
             class="mu-select__input"
             :class="[selectSize ? `is-${ selectSize }` : '']"
             :disabled="selectDisabled"
             :autocomplete="autoComplete || autocomplete"
             @focus="handleFocus"
             @blur="softFocus = false"
             @keyup="managePlaceholder"
             @keydown="resetInputState"
             @keydown.down.prevent="navigateOptions('next')"
             @keydown.up.prevent="navigateOptions('prev')"
             @keydown.enter.prevent="selectOption"
             @keydown.esc.stop.prevent="visible = false"
             @keydown.delete="deletePrevTag"
             @keydown.tab="visible = false"
             @compositionstart="handleComposition"
             @compositionupdate="handleComposition"
             @compositionend="handleComposition"
             v-model="query"
             @input="debouncedQueryChange"
             v-if="filterable"
             :style="{ 'flex-grow': '1', width: inputLength / (inputWidth - 32) + '%', 'max-width': inputWidth - 42 + 'px' }"
             ref="input">
    </div>
    <mu-input ref="reference"
              v-model="selectedLabel"
              type="text"
              :placeholder="currentPlaceholder"
              :name="name"
              :id="id"
              :autocomplete="autoComplete || autocomplete"
              :size="selectSize"
              :disabled="selectDisabled"
              :readonly="readonly"
              :validate-event="false"
              :class="{ 'is-focus': visible }"
              :tabindex="(multiple && filterable) ? '-1' : null"
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
           class="mu-select__caret mu-input__icon mu-icon-circle-close"
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
                      :class="{ 'is-empty': !allowCreate && query && filteredOptionsCount === 0 }"
                      v-show="options.length > 0 && !loading">
          <mu-option :value="query"
                     created
                     v-if="showNewOption">
          </mu-option>
          <slot></slot>
        </mu-scrollbar>
        <template v-if="emptyText && (!allowCreate || loading || (allowCreate && options.length === 0 ))">
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
import Focus from 'musely-ui/src/mixins/focus'
import MuInput from '~/input'
import MuOption from '~/option.vue'
import MuSelectMenu from './menu.vue'

// import ElTag from 'element-ui/packages/tag';
// import ElScrollbar from 'element-ui/packages/scrollbar';

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
    MuOption
    // ElTag,
    // MuScrollbar
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
  @Prop({ type: Boolean }) loading!: boolean
  @Prop({ type: String }) popperClass!: string
  @Prop({ type: Boolean }) remote!: boolean
  @Prop({ type: String }) loadingText!: string
  @Prop({ type: String }) noMatchText!: string
  @Prop({ type: String }) noDataText!: string
  @Prop({ type: Function }) filterMethod!: QueryChangeHandler
  @Prop({ type: Function }) remoteMethod!: QueryChangeHandler
  @Prop({ type: Boolean }) multiple!: boolean
  @Prop({
    type: Number,
    default: 0
  })
  multipleLimit!: number

  @Prop({
    type: String,
    default() {
      return '=======ppp======'
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
    if (this.multiple) {
      this.resetInputHeight()
      if ((val && val.length > 0) || (this.$refs.input && this.query !== '')) {
        this.currentPlaceholder = ''
      } else {
        this.currentPlaceholder = this.cachedPlaceHolder
      }
      if (this.filterable && !this.reserveKeyword) {
        this.query = ''
        this.handleQueryChange(this.query)
      }
    }
    this.setSelected()
    if (this.filterable && !this.multiple) {
      this.inputLength = 20
    }
    if (!valueEquals(val, oldVal)) {
      this.dispatch('ElFormItem', 'el.form.change', val)
    }
  }

  @Watch('visible')
  onWatchVisible(val: any) {
    if (!val) {
      this.broadcast('ElSelectDropdown', 'destroyPopper')
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
      if (!this.multiple) {
        if (this.selected) {
          if (
            this.filterable &&
            this.allowCreate &&
            this.createdSelected &&
            this.createdLabel
          ) {
            this.selectedLabel = this.createdLabel
          } else {
            this.selectedLabel = (this.selected as IAnyData).currentLabel
          }
          if (this.filterable) this.query = this.selectedLabel
        }

        if (this.filterable) {
          this.currentPlaceholder = this.cachedPlaceHolder
        }
      }
    } else {
      this.broadcast('ElSelectDropdown', 'updatePopper')
      if (this.filterable) {
        this.query = this.remote ? '' : this.selectedLabel
        this.handleQueryChange(this.query)
        if (this.multiple) {
          ;(this.$refs.input as any).focus()
        } else {
          if (!this.remote) {
            this.broadcast('ElOption', 'queryChange', '')
            this.broadcast('ElOptionGroup', 'queryChange')
          }

          if (this.selectedLabel) {
            this.currentPlaceholder = this.selectedLabel
            this.selectedLabel = ''
          }
        }
      }
    }
    this.$emit('visible-change', val)
  }

  @Watch('options')
  onWatchOptions() {
    if (this.$isServer) return
    this.$nextTick(() => {
      this.broadcast('ElSelectDropdown', 'updatePopper')
    })
    if (this.multiple) {
      this.resetInputHeight()
    }
    const inputs = this.$el.querySelectorAll('input')
    // TODO
    const index = ([] as any).indexOf.call(inputs, document.activeElement)

    if (index === -1) {
      this.setSelected()
    }

    if (
      this.defaultFirstOption &&
      (this.filterable || this.remote) &&
      this.filteredOptionsCount
    ) {
      this.checkDefaultFirstOption()
    }
  }

  get _muFormItemSize() {
    return (this.muFormItem || {}).muFormItemSize
  }

  get readonly() {
    return (
      !this.filterable ||
      this.multiple ||
      (!isIE() && !isEdge() && !this.visible)
    )
  }

  get showClose() {
    const hasValue = this.multiple
      ? Array.isArray(this.value) && this.value.length > 0
      : this.value !== undefined && this.value !== null && this.value !== ''
    const criteria =
      this.clearable && !this.selectDisabled && this.inputHovering && hasValue
    return criteria
  }

  get iconClass() {
    return this.remote && this.filterable
      ? ''
      : this.visible
      ? 'arrow-up is-reverse'
      : 'arrow-up'
  }

  get debounce() {
    return this.remote ? 300 : 0
  }

  get emptyText() {
    if (this.loading) {
      return this.loadingText || 'Loading'
    } else {
      if (this.remote && this.query === '' && this.options.length === 0) {
        return false
      }
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
      (typeof this.filterMethod === 'function' ||
        typeof this.remoteMethod === 'function')
    ) {
      this.previousQuery = val
      return
    }
    this.previousQuery = val
    this.$nextTick(() => {
      if (this.visible) this.broadcast('ElSelectDropdown', 'updatePopper')
    })
    this.hoverIndex = -1
    if (this.multiple && this.filterable) {
      this.$nextTick(() => {
        const length = (this.$refs.input as any).value.length * 15 + 20
        this.inputLength = this.collapseTags ? Math.min(50, length) : length
        this.managePlaceholder()
        this.resetInputHeight()
      })
    }
    if (this.remote && typeof this.remoteMethod === 'function') {
      this.hoverIndex = -1
      this.remoteMethod(val)
    } else if (typeof this.filterMethod === 'function') {
      this.filterMethod(val)
      this.broadcast('ElOptionGroup', 'queryChange')
    } else {
      this.filteredOptionsCount = this.optionsCount
      this.broadcast('ElOption', 'queryChange', val)
      this.broadcast('ElOptionGroup', 'queryChange')
    }
    if (
      this.defaultFirstOption &&
      (this.filterable || this.remote) &&
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
    if (this.multiple) {
      newOption.hitState = false
    }
    return newOption
  }

  setSelected() {
    if (!this.multiple) {
      const option = this.getOption(this.value)
      if (option.created) {
        this.createdLabel = option.currentLabel
        this.createdSelected = true
      } else {
        this.createdSelected = false
      }
      this.selectedLabel = option.currentLabel
      this.selected = option
      if (this.filterable) this.query = this.selectedLabel
      return
    }
    const result: any = []
    if (Array.isArray(this.value)) {
      this.value.forEach(value => {
        result.push(this.getOption(value))
      })
    }
    this.selected = result
    this.$nextTick(() => {
      this.resetInputHeight()
    })
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
      if (this.visible && this.emptyText !== false) {
        this.broadcast('ElSelectDropdown', 'updatePopper')
      }
    })
  }

  resetHoverIndex() {
    setTimeout(() => {
      if (!this.multiple) {
        this.hoverIndex = (this.options as any).indexOf(this.selected)
      } else {
        if (this.selected.length > 0) {
          this.hoverIndex = Math.min.apply(
            null,
            this.selected.map((item: any) =>
              (this.options as any).indexOf(item)
            )
          )
        } else {
          this.hoverIndex = -1
        }
      }
    }, 300)
  }

  handleOptionSelect(option: any, byClick?: any) {
    if (this.multiple) {
      const value: any = (this.value || []).slice()
      const optionIndex = this.getValueIndex(value, option.value)
      if (optionIndex > -1) {
        value.splice(optionIndex, 1)
      } else if (this.multipleLimit <= 0 || value.length < this.multipleLimit) {
        value.push(option.value)
      }
      this.$emit('input', value)
      this.emitChange(value)
      if (option.created) {
        this.query = ''
        this.handleQueryChange('')
        this.inputLength = 20
      }
      if (this.filterable) (this.$refs.input as any).focus()
    } else {
      this.$emit('input', option.value)
      this.emitChange(option.value)
      this.visible = false
    }
    this.isSilentBlur = byClick
    this.setSoftFocus()
    if (this.visible) return
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
    const value = this.multiple ? [] : ''
    this.$emit('input', value)
    this.emitChange(value)
    this.visible = false
    this.$emit('clear')
  }

  deleteTag(event: any, tag: any) {
    const index = this.selected.indexOf(tag)
    if (index > -1 && !this.selectDisabled) {
      const value: any = this.value.slice()
      value.splice(index, 1)
      this.$emit('input', value)
      this.emitChange(value)
      this.$emit('remove-tag', tag.value)
    }
    event.stopPropagation()
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
    if (this.multiple) this.resetInputHeight()
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

    this.selected = this.multiple ? [] : {}

    this.cachedPlaceHolder = this.currentPlaceholder = this.placeholder
    if (this.multiple && !Array.isArray(this.value)) {
      this.$emit('input', [])
    }
    if (!this.multiple && Array.isArray(this.value)) {
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
    if (this.multiple && Array.isArray(this.value) && this.value.length > 0) {
      this.currentPlaceholder = ''
    }
    addResizeListener(this.$el, this.handleResize)

    const reference: any = this.$refs.reference

    if (this.remote && this.multiple) {
      this.resetInputHeight()
    }
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
