/*
 * @Author: Victor wang
 * @Date: 2020-05-05 11:01:51
 * @LastEditors: Victor.wang
 * @LastEditTime: 2020-05-06 23:28:20
 * @Description:
 */
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import merge from 'deepmerge'
import PopupManager from 'musely-ui/src/utils/popup/popup-manager'
import getScrollBarWidth from '../scrollbar-width'
import { getStyle, addClass, removeClass, hasClass } from '../dom'

let idSeed = 1
// Element meage.js
const merge2 = function(target: any) {
  for (let i = 1, j = arguments.length; i < j; i++) {
    let source = arguments[i] || {}
    for (let prop in source) {
      if (source.hasOwnProperty(prop)) {
        let value = source[prop]
        if (value !== undefined) {
          target[prop] = value
        }
      }
    }
  }

  return target
}

let scrollBarWidth
@Component({
  name: 'MuPopup'
})
export default class extends Vue {
  @Prop({ default: false, type: Boolean }) visible!: string
  @Prop({ type: Object }) openDelay!: object
  @Prop({ type: Object }) closeDelay!: object
  @Prop({ type: Object }) zIndex!: object
  @Prop({ default: false, type: Boolean }) modal!: boolean
  @Prop({ default: true, type: Boolean }) modalFade!: boolean
  @Prop({ type: Object }) modalClass!: object
  @Prop({ default: false, type: Boolean }) modalAppendToBody!: boolean
  @Prop({ default: false, type: Boolean }) closeOnPressEscape!: boolean
  @Prop({ default: false, type: Boolean }) closeOnClickModal!: boolean
  @Prop({ default: true, type: Boolean }) lockScroll!: boolean
  @Prop({ type: Function }) willOpen!: any
  @Prop({ type: Function }) willClose!: any

  @Prop({ type: Function }) onOpen!: any
  @Prop({ type: Function }) onClose!: any

  private opened = false
  private bodyPaddingRight: any = null
  private computedBodyPaddingRight = 0
  private withoutHiddenClass = true
  public rendered = false

  private _popupId = ''
  private _opening = false
  private _closing = false
  private _openTimer: any = null
  private _closeTimer: any = null

  beforeMount() {
    this._popupId = 'popup-' + idSeed++
    PopupManager.register(this._popupId, this)
  }
  beforeDestroy() {
    PopupManager.deregister(this._popupId)
    PopupManager.closeModal(this._popupId)

    this.restoreBodyStyle()
  }

  open(options: any = {}) {
    if (!this.rendered) {
      this.rendered = true
    }
    const props = merge({}, this.$props || this, options)
    console.log(props, this.$props, options)
    if (this._closeTimer) {
      clearTimeout(this._closeTimer)
      this._closeTimer = null
    }
    clearTimeout(this._openTimer)

    const openDelay = Number(props.openDelay)
    if (openDelay > 0) {
      this._openTimer = setTimeout(() => {
        this._openTimer = null
        this.doOpen(props)
      }, openDelay)
    } else {
      this.doOpen(props)
    }
  }

  doOpen(props: any) {
    if (this.$isServer) return
    if (this.willOpen && !this.willOpen()) return
    if (this.opened) return

    this._opening = true

    const dom = this.$el

    const modal = props.modal

    const zIndex = props.zIndex
    if (zIndex) {
      PopupManager.zIndex = zIndex
    }

    if (modal) {
      if (this._closing) {
        PopupManager.closeModal(this._popupId)
        this._closing = false
      }
      PopupManager.openModal(this._popupId, PopupManager.nextZIndex(), this.modalAppendToBody ? undefined : dom, props.modalClass, props.modalFade)
      if (props.lockScroll) {
        this.withoutHiddenClass = !hasClass(document.body, 'mu-popup-parent--hidden')
        if (this.withoutHiddenClass) {
          this.bodyPaddingRight = document.body.style.paddingRight
          this.computedBodyPaddingRight = parseInt(getStyle(document.body, 'paddingRight'), 10)
        }
        scrollBarWidth = getScrollBarWidth()
        const bodyHasOverflow = document.documentElement.clientHeight < document.body.scrollHeight
        const bodyOverflowY = getStyle(document.body, 'overflowY')
        if (scrollBarWidth > 0 && (bodyHasOverflow || bodyOverflowY === 'scroll') && this.withoutHiddenClass) {
          document.body.style.paddingRight = this.computedBodyPaddingRight + scrollBarWidth + 'px'
        }
        addClass(document.body, 'mu-popup-parent--hidden')
      }
    }

    if (getComputedStyle(dom).position === 'static') {
      ;(dom as HTMLElement).style.position = 'absolute'
    }

    ;(dom as HTMLElement).style.zIndex = PopupManager.nextZIndex()
    this.opened = true

    this.onOpen && this.onOpen()

    this.doAfterOpen()
  }

  doAfterOpen() {
    this._opening = false
  }

  close() {
    if (this.willClose && !this.willClose()) return

    if (this._openTimer !== null) {
      clearTimeout(this._openTimer)
      this._openTimer = null
    }
    clearTimeout(this._closeTimer)

    const closeDelay = Number(this.closeDelay)

    if (closeDelay > 0) {
      this._closeTimer = setTimeout(() => {
        this._closeTimer = null
        this.doClose()
      }, closeDelay)
    } else {
      this.doClose()
    }
  }

  doClose() {
    this._closing = true

    this.onClose && this.onClose()

    if (this.lockScroll) {
      setTimeout(this.restoreBodyStyle, 200)
    }

    this.opened = false

    this.doAfterClose()
  }
  doAfterClose() {
    PopupManager.closeModal(this._popupId)
    this._closing = false
  }

  restoreBodyStyle() {
    if (this.modal && this.withoutHiddenClass) {
      document.body.style.paddingRight = this.bodyPaddingRight
      removeClass(document.body, 'mu-popup-parent--hidden')
    }
    this.withoutHiddenClass = true
  }

  @Watch('visible')
  private onVisible(val: any) {
    if (val) {
      if (this._opening) return
      if (!this.rendered) {
        this.rendered = true
        Vue.nextTick(() => {
          this.open()
        })
      } else {
        this.open()
      }
    } else {
      this.close()
    }
  }
}

export { PopupManager }
