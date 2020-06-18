<template>
  <transition name="msgbox-fade">
    <div class="mu-message-box__wrapper"
         tabindex="-1"
         v-show="visible"
         @click.self="handleWrapperClick"
         role="dialog"
         aria-modal="true"
         :aria-label="title || 'dialog'">
      <div class="mu-message-box"
           :class="[customClass, center && 'mu-message-box--center']">
        <div class="mu-message-box__header"
             v-if="title !== null">
          <div class="mu-message-box__title">
            <div :class="['mu-message-box__status', icon]"
                 v-if="icon && center">
            </div>
            <span>{{ title }}</span>
          </div>
          <button type="button"
                  class="mu-message-box__headerbtn"
                  aria-label="Close"
                  v-if="showClose"
                  @click="handleAction(distinguishCancelAndClose ? 'close' : 'cancel')"
                  @keydown.enter="handleAction(distinguishCancelAndClose ? 'close' : 'cancel')">
            <i class="mu-message-box__close mu-icon-close"></i>
          </button>
        </div>
        <div class="mu-message-box__header"
             :class="['mu-message-box--onlyclose']"
             v-else-if="showClose">
          <button type="button"
                  class="mu-message-box__headerbtn"
                  aria-label="Close"
                  @click="handleAction(distinguishCancelAndClose ? 'close' : 'cancel')"
                  @keydown.enter="handleAction(distinguishCancelAndClose ? 'close' : 'cancel')">
            <i class="mu-message-box__close mu-icon-close"></i>
          </button>
        </div>
        <div class="mu-message-box__content">
          <div class="mu-message-box__container">
            <div :class="['mu-message-box__status', icon]"
                 v-if="icon && !center && message !== ''">
            </div>
            <div class="mu-message-box__message"
                 v-if="message !== ''">
              <slot>
                <p v-if="!dangerouslyUseHTMLString">{{ message }}</p>
                <p v-else
                   v-html="message"></p>
              </slot>
            </div>
          </div>
          <!-- TODO input -->
          <div class="mu-message-box__input"
               v-show="showInput">
            <mu-input v-model="inputValue"
                      :type="inputType"
                      @keydown.enter.native="handleInputEnter"
                      :placeholder="inputPlaceholder"
                      ref="input"></mu-input>
            <div class="mu-message-box__errormsg"
                 :style="{ visibility: !!editorErrorMessage ? 'visible' : 'hidden' }">{{ editorErrorMessage }}</div>
          </div>
        </div>
        <div class="mu-message-box__btns">
          <mu-button :loading="cancelButtonLoading"
                     :class="[ cancelButtonClasses ]"
                     v-if="showCancelButton"
                     @click.native="handleAction('cancel')"
                     @keydown.enter="handleAction('cancel')">
            {{ cancelButtonText }}
          </mu-button>
          <mu-button :loading="confirmButtonLoading"
                     ref="confirm"
                     :class="[ confirmButtonClasses ]"
                     v-show="showConfirmButton"
                     @click.native="handleAction('confirm')"
                     @keydown.enter="handleAction('confirm')">
            {{ confirmButtonText }}
          </mu-button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang='ts'>
import {
  MuMessageBoxComponent as MessageBox,
  MessageBoxCloseAction
} from 'types/message-box'
import { MessageType } from 'types/message'
import { Component, Prop, Watch } from 'vue-property-decorator'
import Popup from 'musely-ui/src/utils/popup'
import MuInput from 'musely-ui/packages/input'
import MuButton from 'musely-ui/packages/button'
import { addClass, removeClass } from 'musely-ui/src/utils/dom'
import Dialog from 'musely-ui/src/utils/aria-dialog'
import { mixins } from 'vue-class-component'

let messageBox: any
const typeMap = {
  success: 'success',
  info: 'info',
  warning: 'warning',
  error: 'error'
}

@Component({
  name: 'MuMain',
  components: {
    MuInput,
    MuButton
  }
})
export default class MuMessageBox extends mixins(Popup) implements MessageBox {
  @Prop({ type: String, default: '' }) title!: string
  @Prop({ type: Boolean, default: true }) modal!: boolean
  @Prop({ type: Boolean, default: false }) lockScroll!: boolean
  @Prop({ type: Boolean, default: false }) showClose!: boolean
  @Prop({ type: Boolean, default: true }) closeOnClickModal!: boolean
  @Prop({ type: Boolean, default: true }) closeOnPressEscape!: boolean
  @Prop({ type: Boolean, default: true }) closeOnHashChange!: boolean
  @Prop({ default: false, type: Boolean }) center!: boolean
  @Prop({ type: Boolean }) roundButton!: boolean
  @Prop({ type: Boolean }) type!: MessageType

  private uid = 1
  message = ''
  iconClass = ''
  customClass = ''
  showInput = false
  inputValue = ''
  inputPlaceholder = ''
  inputType = 'text'
  inputPattern: any = null
  inputValidator: any = null
  inputErrorMessage = 'Illegal input'
  showConfirmButton = true
  showCancelButton = false
  action: MessageBoxCloseAction = 'close'
  // TODO appento Props
  confirmButtonText = 'confirm'
  cancelButtonText = 'cancel'
  confirmButtonLoading = false
  cancelButtonLoading = false
  confirmButtonClass = ''
  confirmButtonDisabled = false
  cancelButtonClass = ''
  editorErrorMessage = ''
  callback: any = null
  dangerouslyUseHTMLString = false
  focusAfterClosed: any = null
  isOnComposition = false
  distinguishCancelAndClose = false

  beforeClose: any = null

  $type!: any

  get icon() {
    const { type, iconClass } = this
    return (
      iconClass ||
      (type && typeMap[type] ? `mu-icon-circle-${typeMap[type]}` : '')
    )
  }

  get confirmButtonClasses() {
    return `mu-button--primary ${this.confirmButtonClass}`
  }

  get cancelButtonClasses() {
    return `${this.cancelButtonClass}`
  }

  getSafeClose() {
    const currentId = this.uid
    return () => {
      this.$nextTick(() => {
        if (currentId === this.uid) {
          this.doClose()
        }
      })
    }
  }

  doClose() {
    if (!this.visible) return
    this.visible = false
    this._closing = true

    this.onClose && this.onClose()
    messageBox.closeDialog() // 解绑
    if (this.lockScroll) {
      setTimeout(this.restoreBodyStyle, 200)
    }
    this.opened = false
    this.doAfterClose()
    setTimeout(() => {
      if (this.action) {
        this.callback(this.action, this)
      }
    })
  }

  handleWrapperClick() {
    if (this.closeOnClickModal) {
      this.handleAction(this.distinguishCancelAndClose ? 'close' : 'cancel')
    }
  }

  handleInputEnter() {
    if (this.inputType !== 'textarea') {
      return this.handleAction('confirm')
    }
  }

  handleAction(action: any) {
    if (this.$type === 'prompt' && action === 'confirm' && !this.validate()) {
      return
    }
    this.action = action
    if (typeof this.beforeClose === 'function') {
      this.close = this.getSafeClose()
      this.beforeClose(action, this, this.close)
    } else {
      this.doClose()
    }
  }

  validate() {
    if (this.$type === 'prompt') {
      const inputPattern = this.inputPattern
      if (inputPattern && !inputPattern.test(this.inputValue || '')) {
        this.editorErrorMessage = this.inputErrorMessage
        addClass(this.getInputElement(), 'invalid')
        return false
      }
      const inputValidator = this.inputValidator
      if (typeof inputValidator === 'function') {
        const validateResult = inputValidator(this.inputValue)
        if (validateResult === false) {
          this.editorErrorMessage = this.inputErrorMessage
          addClass(this.getInputElement(), 'invalid')
          return false
        }
        if (typeof validateResult === 'string') {
          this.editorErrorMessage = validateResult
          addClass(this.getInputElement(), 'invalid')
          return false
        }
      }
    }
    this.editorErrorMessage = ''
    removeClass(this.getInputElement(), 'invalid')
    return true
  }

  getFirstFocus() {
    const btn = this.$el.querySelector('.mu-message-box__btns .mu-button')
    const title = this.$el.querySelector(
      '.mu-message-box__btns .mu-message-box__title'
    )
    return btn || title
  }

  getInputElement() {
    const inputRefs = (this.$refs.input as any).$refs
    return inputRefs.input || inputRefs.textarea
  }

  handleClose() {
    this.handleAction('close')
  }

  mounted() {
    console.log(this.showClose)
    this.$nextTick(() => {
      if (this.closeOnHashChange) {
        window.addEventListener('hashchange', this.close)
      }
    })
  }

  beforeDestroy() {
    if (this.closeOnHashChange) {
      window.removeEventListener('hashchange', this.close)
    }
    setTimeout(() => {
      messageBox.closeDialog()
    })
  }

  @Watch('inputValue', { immediate: true })
  onInputValueHandler(val: any) {
    this.$nextTick(() => {
      if (this.$type === 'prompt' && val !== null) {
        this.validate()
      }
    })
  }

  @Watch('visible', { immediate: true })
  onVisibleHandler(val: any) {
    if (val) {
      this.uid++
      if (this.$type === 'alert' || this.$type === 'confirm') {
        this.$nextTick(() => {
          ;(this.$refs.confirm as any).$el.focus()
        })
      }
      this.focusAfterClosed = document.activeElement

      messageBox = new Dialog(
        this.$el,
        this.focusAfterClosed,
        this.getFirstFocus()
      )
    }

    // prompt
    if (this.$type !== 'prompt') return
    if (val) {
      setTimeout(() => {
        if (this.$refs.input && (this.$refs.input as any).$el) {
          this.getInputElement().focus()
        }
      }, 500)
    } else {
      this.editorErrorMessage = ''
      removeClass(this.getInputElement(), 'invalid')
    }
  }
}
</script>
