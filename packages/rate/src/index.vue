<!--
 * @Author: Victor wang
 * @Date: 2020-04-14 19:02:17
 * @LastEditors: Victor.wang
 * @LastEditTime: 2020-05-13 16:20:10
 * @Description:
 -->
<template>
  <div class="mu-rate"
       @keydown="handleKey"
       role="slider"
       :aria-valuenow="currentValue"
       :aria-valuetext="text"
       aria-valuemin="0"
       :aria-valuemax="max"
       tabindex="0">
    <span v-for="(item, key) in max"
          class="mu-rate__item"
          @mousemove="setCurrentValue(item, $event)"
          @mousmueave="resetCurrentValue"
          @click="selectValue(item)"
          :style="{ cursor: rateDisabled ? 'auto' : 'pointer' }"
          :key="key">
      <i :class="[classes[item - 1], { 'hover': hoverIndex === item }]"
         class="mu-rate__icon"
         :style="getIconStyle(item)">
        <i v-if="showDecimalIcon(item)"
           :class="decimalIconClass"
           :style="decimalStyle"
           class="mu-rate__decimal">
        </i>
      </i>
    </span>
    <span v-if="showText || showScore"
          class="mu-rate__text"
          :style="{ color: textColor }">{{ text }}</span>
  </div>
</template>

<script lang='ts'>
import { RateColors, RateIconClasses, MuRate as Rate } from 'types/rate'
import { Component, Vue, Prop, Inject } from 'vue-property-decorator'

import { hasClass } from 'musely-ui/src/utils/dom'
import { isObject } from 'musely-ui/src/utils'

@Component({
  name: 'MuRate'
})
export default class MuRate extends Vue implements Rate {
  @Prop({
    type: Number,
    default: 0
  })
  value!: number

  @Prop({
    type: Number,
    default: 2
  })
  lowThreshold!: number

  @Prop({
    type: Number,
    default: 4
  })
  highThreshold!: number

  @Prop({
    type: Number,
    default: 5
  })
  max!: number

  @Prop({
    type: [Array, Object],
    default() {
      return ['#F7BA2A', '#F7BA2A', '#F7BA2A']
    }
  })
  colors!: RateColors

  @Prop({
    type: String,
    default: '#C6D1DE'
  })
  voidColor!: string

  @Prop({
    type: String,
    default: '#EFF2F7'
  })
  disabledVoidColor!: string

  @Prop({
    type: [Array, Object],
    default() {
      return ['mu-icon-star-on', 'mu-icon-star-on', 'mu-icon-star-on']
    }
  })
  iconClasses!: string[] | RateIconClasses

  @Prop({
    type: String,
    default: 'mu-icon-star-off'
  })
  voidIconClass!: string

  @Prop({
    type: String,
    default: 'mu-icon-star-on'
  })
  disabledVoidIconClass!: string

  @Prop({
    type: Boolean,
    default: false
  })
  disabled!: boolean

  @Prop({
    type: Boolean,
    default: false
  })
  allowHalf!: boolean

  @Prop({
    type: Boolean,
    default: false
  })
  showText!: boolean

  @Prop({
    type: Boolean,
    default: false
  })
  showScore!: boolean

  @Prop({
    type: String,
    default: '#1f2d3d'
  })
  textColor!: string

  // change English
  @Prop({
    type: Array,
    default() {
      return ['Bad', 'Disappointed', 'Average', 'Good', 'Very Good']
    }
  })
  texts!: any[]

  @Prop({
    type: String,
    default: '{value}'
  })
  scoreTemplate!: string

  private pointerAtLeftHalf = true
  private hoverIndex = -1

  @Inject({
    default: ''
  })
  muForm!: any

  get currentValue() {
    return this.value
  }

  set currentValue(val: number) {
    // TODO emit
    this.$emit('setValue', val)
  }

  get text() {
    let result = ''
    if (this.showScore) {
      const ret = this.rateDisabled ? this.value : this.currentValue
      result = this.scoreTemplate.replace(/\{\s*value\s*\}/, ret.toString())
    } else if (this.showText) {
      result = this.texts[Math.ceil(this.currentValue) - 1]
    }
    return result
  }

  get decimalStyle() {
    let width = ''
    if (this.rateDisabled) {
      width = `${this.valueDecimal}%`
    } else if (this.allowHalf) {
      width = '50%'
    }
    return {
      color: this.activeColor,
      width
    }
  }

  get valueDecimal() {
    return this.value * 100 - Math.floor(this.value) * 100
  }

  get classMap() {
    const p = {
      [this.lowThreshold]: this.iconClasses[0],
      [this.highThreshold]: { value: this.iconClasses[1], excluded: true },
      [this.max]: this.iconClasses[2]
    }
    return Array.isArray(this.iconClasses) ? p : this.iconClasses
  }

  get decimalIconClass() {
    return this.getValueFromMap(this.value, this.classMap)
  }

  get voidClass() {
    return this.rateDisabled ? this.disabledVoidIconClass : this.voidIconClass
  }

  get activeClass() {
    return this.getValueFromMap(this.currentValue, this.classMap)
  }

  get colorMap() {
    const p = {
      [this.lowThreshold]: this.colors[0],
      [this.highThreshold]: { value: this.colors[1], excluded: true },
      [this.max]: this.colors[2]
    }
    return Array.isArray(this.colors) ? p : this.colors
  }

  get activeColor() {
    return this.getValueFromMap(this.currentValue, this.colorMap)
  }

  get classes() {
    const result = []
    let i = 0
    let threshold = this.currentValue
    if (this.allowHalf && this.currentValue !== Math.floor(this.currentValue)) {
      threshold--
    }
    for (; i < threshold; i++) {
      result.push(this.activeClass)
    }
    for (; i < this.max; i++) {
      result.push(this.voidClass)
    }
    return result
  }

  get rateDisabled() {
    return this.disabled || (this.muForm || {}).disabled
  }

  getValueFromMap(value: number, map: any) {
    // 用数字的key?
    const matchedKeys: any[] = Object.keys(map)
      .filter(key => {
        const val = map[key]
        const excluded = isObject(val) ? val.excluded : false
        return excluded ? value < parseInt(key, 10) : value <= parseInt(key, 10)
      })
      .sort((a, b) => {
        if (a > b) {
          return 1
        }

        if (a < b) {
          return -1
        }

        return 0
      })
    const matchedValue = map[matchedKeys[0]]
    return isObject(matchedValue) ? matchedValue.value : matchedValue || ''
  }

  showDecimalIcon(item: number) {
    const showWhenDisabled =
      this.rateDisabled &&
      this.valueDecimal > 0 &&
      item - 1 < this.value &&
      item > this.value

    const showWhenAllowHalf =
      this.allowHalf &&
      this.pointerAtLeftHalf &&
      item - 0.5 <= this.currentValue &&
      item > this.currentValue
    return showWhenDisabled || showWhenAllowHalf
  }

  getIconStyle(item: number) {
    const voidColor = this.rateDisabled
      ? this.disabledVoidColor
      : this.voidColor
    return {
      color: item <= this.currentValue ? this.activeColor : voidColor
    }
  }

  selectValue(value: number) {
    if (this.rateDisabled) {
      return
    }
    if (this.allowHalf && this.pointerAtLeftHalf) {
      this.$emit('input', this.currentValue)
      this.$emit('change', this.currentValue)
    } else {
      this.$emit('input', value)
      this.$emit('change', value)
    }
  }

  handleKey(e: KeyboardEvent) {
    if (this.rateDisabled) {
      return
    }
    let currentValue = this.currentValue
    const keyCode = e.keyCode
    if (keyCode === 38 || keyCode === 39) {
      // left / down
      if (this.allowHalf) {
        currentValue += 0.5
      } else {
        currentValue += 1
      }
      e.stopPropagation()
      e.preventDefault()
    } else if (keyCode === 37 || keyCode === 40) {
      if (this.allowHalf) {
        currentValue -= 0.5
      } else {
        currentValue -= 1
      }
      e.stopPropagation()
      e.preventDefault()
    }
    currentValue = currentValue < 0 ? 0 : currentValue
    currentValue = currentValue > this.max ? this.max : currentValue

    this.$emit('input', currentValue)
    this.$emit('change', currentValue)
  }

  setCurrentValue(value: number, event: any) {
    if (this.rateDisabled) {
      return
    }
    /* istanbul ignore if */
    if (this.allowHalf) {
      let target = event.target
      if (hasClass(target, 'mu-rate__item')) {
        target = target.querySelector('.mu-rate__icon')
      }
      if (hasClass(target, 'mu-rate__decimal')) {
        target = target.parentNode
      }
      this.pointerAtLeftHalf = event.offsetX * 2 <= target.clientWidth
      this.currentValue = this.pointerAtLeftHalf ? value - 0.5 : value
    } else {
      this.currentValue = value
    }
    this.hoverIndex = value
  }

  resetCurrentValue() {
    if (this.rateDisabled) {
      return
    }
    if (this.allowHalf) {
      this.pointerAtLeftHalf = this.value !== Math.floor(this.value)
    }
    this.currentValue = this.value
    this.hoverIndex = -1
  }

  created() {
    if (!this.value) {
      this.$emit('input', 0)
    }
  }
}
</script>
