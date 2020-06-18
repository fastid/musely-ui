<template>
  <transition name="dialog-fade"
              @after-enter="afterEnter"
              @after-leave="afterLeave">
    <div v-show="visible"
         class="mu-dialog__wrapper"
         @click.self="handleWrapperClick">
      <div role="dialog"
           :key="key"
           aria-modal="true"
           :aria-label="title || 'dialog'"
           :class="['mu-dialog', { 'is-fullscreen': fullscreen, 'mu-dialog--center': center }, customClass]"
           ref="dialog"
           :style="style">
        <div class="mu-dialog__header"
             v-if="title || showClose"
             :class="[ (!title && showClose) && 'mu-dialog--onlyclose']">
          <slot name="title">
            <span class="mu-dialog__title">{{ title }}</span>
          </slot>
          <button type="button"
                  class="mu-dialog__headerbtn"
                  aria-label="Close"
                  v-if="showClose"
                  @click="handleClose">
            <i class="mu-dialog__close mu-icon mu-icon-close"></i>
          </button>
        </div>
        <div class="mu-dialog__body"
             v-if="rendered">
          <slot></slot>
        </div>
        <div class="mu-dialog__footer"
             v-if="$slots.footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang='ts'>
import { DialogSlots, MuDialog as Dialog } from 'types/dialog'
import { Component, Prop, Watch } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import Popup from 'musely-ui/src/utils/popup'
import emitter from 'musely-ui/src/mixins/emitter'

@Component({
  name: 'MuDialog'
})
export default class MuDialog extends mixins(Popup, emitter) implements Dialog {
  @Prop({ default: '', type: String }) title!: string
  @Prop({ type: Boolean, default: true }) modal!: boolean
  @Prop({ type: Boolean, default: true }) modalAppendToBody!: boolean
  @Prop({ type: Boolean, default: false }) appendToBody!: boolean
  @Prop({ type: Boolean, default: true }) lockScroll!: boolean
  @Prop({ type: Boolean, default: true }) closeOnClickModal!: boolean
  @Prop({ type: Boolean, default: true }) closeOnPressEscape!: boolean
  @Prop({ type: Boolean, default: true }) showClose!: boolean
  @Prop({ type: Boolean }) fullscreen!: boolean
  @Prop({ type: Function }) beforeClose!: any
  @Prop({ default: '', type: String }) customClass!: string
  @Prop({ default: '', type: String }) width!: string
  // @Prop({ default: '15vh', type: String }) top!: string
  @Prop({ default: false, type: Boolean }) center!: boolean
  @Prop({ type: Boolean }) destroyOnClose!: boolean

  $slots!: DialogSlots

  private closed = false
  private key = 0

  get style() {
    const style: any = {}
    if (!this.fullscreen) {
      // style.marginTop = this.top
      if (this.width) {
        style.width = this.width
      }
    }
    return style
  }

  private getMigratingConfig() {
    return {
      props: {
        size: 'size is removed.'
      }
    }
  }

  private handleWrapperClick() {
    if (!this.closeOnClickModal) return
    this.handleClose()
  }

  private handleClose() {
    if (typeof this.beforeClose === 'function') {
      this.beforeClose(this.hide)
    } else {
      this.hide()
    }
  }

  private hide(cancel?: boolean) {
    if (cancel !== false) {
      this.$emit('update:visible', false)
      this.$emit('close')
      this.closed = true
    }
  }

  // TODO updatePopper
  private updatePopper() {
    // this.broadcast('MuSelectDropdown', 'updatePopper')
    // this.broadcast('MuDropdownMenu', 'updatePopper')
  }

  private afterEnter() {
    this.$emit('opened')
  }

  private afterLeave() {
    this.$emit('closed')
  }

  mounted() {
    console.log(this.title, this.showClose)
    if (this.visible) {
      this.rendered = true
      this.open()
      if (this.appendToBody) {
        document.body.appendChild(this.$el)
      }
    }
  }

  destroyed() {
    // if appendToBody is true, remove DOM node after destroy
    if (this.appendToBody && this.$el && this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el)
    }
  }

  @Watch('visible')
  onvisible(val: boolean) {
    if (val) {
      this.closed = false
      this.$emit('open')
      this.$el.addEventListener('scroll', this.updatePopper)
      this.$nextTick(() => {
        // TODO ?
        ;(this.$refs.dialog as HTMLElement).scrollTop = 0
      })
      if (this.appendToBody) {
        document.body.appendChild(this.$el)
      }
    } else {
      this.$el.removeEventListener('scroll', this.updatePopper)
      if (!this.closed) this.$emit('close')
      if (this.destroyOnClose) {
        this.$nextTick(() => {
          this.key++
        })
      }
    }
  }
}
</script>
