/*
 * @Author: Victor wang
 * @Date: 2020-06-20 03:08:07
 * @LastEditors: Victor.wang
 * @LastEditTime: 2020-06-20 22:56:45
 * @Description:
 */
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import { PopupManager } from 'musely-ui/src/utils/popup'
// eslint-disable-next-line
const PopperJS = Vue.prototype.$isServer ? () => {} : require('./libs/popper')
const stop = (e: Event) => e.stopPropagation()

/**
 * @param {HTMLElement} [reference=$refs.reference] - The reference element used to position the popper.
 * @param {HTMLElement} [popper=$refs.popper] - The HTML element used as popper, or a configuration used to generate the popper.
 * @param {String} [placement=button] - Placement of the popper accepted values: top(-start, -end), right(-start, -end), bottom(-start, -end), left(-start, -end)
 * @param {Number} [offset=0] - Amount of pixels the popper will be shifted (can be negative).
 * @param {Boolean} [visible=false] Visibility of the popup element.
 * @param {Boolean} [visible-arrow=false] Visibility of the arrow, no style.
 */

@Component({
  name: 'popper'
})
export default class extends Vue {
  @Prop({
    default: true,
    type: [String, Boolean]
  })
  transformOrigin!: boolean

  @Prop({
    default: 'bottom',
    type: String
  })
  placement!: string

  @Prop({
    default: 5,
    type: Number
  })
  boundariesPadding!: number

  @Prop() reference!: object
  @Prop() popper!: object
  @Prop({ default: 0 }) offset!: number
  @Prop() value!: boolean
  @Prop() visibleArrow!: boolean
  @Prop({
    type: Number,
    default: 35
  })
  arrowOffset!: number

  @Prop({ default: true, type: Boolean }) appendToBody!: boolean
  @Prop({
    type: Object,
    default: () => {
      return { gpuAcceleration: false }
    }
  })
  popperOptions!: object

  showPopper = false
  currentPlacement = ''
  popperMu: any = null
  referenceMu: any = null
  disabled: any = null
  popperJS: any = null
  appended: any = null

  @Watch('value', { immediate: true })
  onWatchValue(val: any) {
    this.showPopper = val
    this.$emit('input', val)
  }

  @Watch('showPopper')
  onWatchShowPopper(val: any) {
    if (this.disabled) return
    val ? this.updatePopper() : this.destroyPopper()
    this.$emit('input', val)
  }

  createPopper() {
    if (this.$isServer) return
    this.currentPlacement = this.currentPlacement || this.placement
    if (!/^(top|bottom|left|right)(-start|-end)?$/g.test(this.currentPlacement)) {
      return
    }

    const options: any = this.popperOptions
    const popper = (this.popperMu = this.popperMu || this.popper || this.$refs.popper)
    let reference = (this.referenceMu = this.referenceMu || this.reference || this.$refs.reference)

    if (!reference && this.$slots.reference && this.$slots.reference[0]) {
      reference = this.referenceMu = this.$slots.reference[0].elm
    }

    if (!popper || !reference) return
    if (this.visibleArrow) this.appendArrow(popper)
    if (this.appendToBody) document.body.appendChild(this.popperMu)
    if (this.popperJS && this.popperJS.destroy) {
      this.popperJS.destroy()
    }

    options.placement = this.currentPlacement
    options.offset = this.offset
    options.arrowOffset = this.arrowOffset
    this.popperJS = new PopperJS(reference, popper, options)
    this.popperJS.onCreate(() => {
      this.$emit('created', this)
      this.resetTransformOrigin()
      this.$nextTick(this.updatePopper)
    })
    if (typeof options.onUpdate === 'function') {
      this.popperJS.onUpdate(options.onUpdate)
    }
    this.popperJS._popper.style.zIndex = PopupManager.nextZIndex()
    this.popperMu.addEventListener('click', stop)
  }

  updatePopper() {
    const popperJS = this.popperJS
    if (popperJS) {
      popperJS.update()
      if (popperJS._popper) {
        popperJS._popper.style.zIndex = PopupManager.nextZIndex()
      }
    } else {
      this.createPopper()
    }
  }

  doDestroy(forceDestroy: any) {
    /* istanbul ignore if */
    if (!this.popperJS || (this.showPopper && !forceDestroy)) return
    this.popperJS.destroy()
    this.popperJS = null
  }

  destroyPopper() {
    if (this.popperJS) {
      this.resetTransformOrigin()
    }
  }

  resetTransformOrigin() {
    if (!this.transformOrigin) return
    const placementMap = {
      top: 'bottom',
      bottom: 'top',
      left: 'right',
      right: 'left'
    }

    const placement: 'top' | 'bottom' | 'left' | 'right' = this.popperJS._popper.getAttribute('x-placement').split('-')[0]
    const origin = placementMap[placement]
    this.popperJS._popper.style.transformOrigin = typeof this.transformOrigin === 'string' ? this.transformOrigin : ['top', 'bottom'].indexOf(placement) > -1 ? `center ${origin}` : `${origin} center`
  }

  appendArrow(element: any) {
    let hash
    if (this.appended) {
      return
    }

    this.appended = true

    for (const item in element.attributes) {
      if (/^_v-/.test(element.attributes[item].name)) {
        hash = element.attributes[item].name
        break
      }
    }

    const arrow = document.createElement('div')

    if (hash) {
      arrow.setAttribute(hash, '')
    }
    arrow.setAttribute('x-arrow', '')
    arrow.className = 'popper__arrow'
    element.appendChild(arrow)
  }

  beforeDestroy() {
    this.doDestroy(true)
    if (this.popperMu && this.popperMu.parentNode === document.body) {
      this.popperMu.removeEventListener('click', stop)
      document.body.removeChild(this.popperMu)
    }
  }

  // call destroy in keep-alive mode
  deactivated() {
    ;(this.$options as any).beforeDestroy[0].call(this)
  }
}
