<!--
 * @Author: Victor wang
 * @Date: 2020-05-06 23:36:33
 * @LastEditors: Victor.wang
 * @LastEditTime: 2020-05-12 23:05:28
 * @Description:
 -->
<template>
  <transition name="mu-message-fade"
              @after-leave="handleAfterLeave">
    <div :class="[
        'mu-message',
        type && !iconClass ? `mu-message--${ type }` : '',
        center ? 'is-center' : '',
        showClose ? 'is-closable' : '',
        customClass
      ]"
         :style="positionStyle"
         v-show="visible"
         @mouseenter="clearTimer"
         @mouseleave="startTimer"
         role="alert">
      <i :class="iconClass"
         v-if="iconClass"></i>
      <i :class="typeClass"
         v-else></i>
      <slot>
        <p v-if="!dangerouslyUseHTMLString"
           class="mu-message__content">{{ message }}</p>
        <p v-else
           v-html="message"
           class="mu-message__content"></p>
      </slot>
      <i v-if="showClose"
         class="mu-message__closeBtn mu-icon-close"
         @click="close"></i>
    </div>
  </transition>
</template>
<script lang="ts">
import { MuMessageComponent, MessageType } from 'types/message'
import { Component, Vue, Watch } from 'vue-property-decorator'

const typeMap = {
  success: 'success',
  info: 'info',
  warning: 'warning',
  error: 'error'
}

@Component({
  name: 'MessageComponent'
})
export default class MessageComponent extends Vue
  implements MuMessageComponent {
  visible = false
  message = ''
  duration = 3000
  type: MessageType = 'info'
  iconClass = ''
  customClass = ''
  showClose = false
  closed = false
  verticalOffset = 20
  timer: number | undefined = undefined
  dangerouslyUseHTMLString = false
  center = false

  // public method
  $destroy!: any
  onClose!: (...args: any) => void

  get typeClass() {
    return this.type && !this.iconClass
      ? `mu-message__icon mu-icon-circle-${typeMap[this.type]}`
      : ''
  }

  get positionStyle() {
    return {
      top: `${this.verticalOffset}px`
    }
  }

  mounted() {
    this.startTimer()
    document.addEventListener('keydown', this.keydown)
  }

  beforeDestroy() {
    document.removeEventListener('keydown', this.keydown)
  }

  handleAfterLeave() {
    this.$destroy(true)
    if (this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el)
    }
  }

  close() {
    this.closed = true
    if (typeof this.onClose === 'function') {
      this.onClose(this)
    }
  }

  clearTimer() {
    clearTimeout(this.timer)
  }

  startTimer() {
    if (this.duration > 0) {
      this.timer = setTimeout(() => {
        if (!this.closed) {
          this.close()
        }
      }, this.duration)
    }
  }

  // TODO EVENT type?
  keydown(e: any) {
    if (e.keyCode === 27) {
      // esc关闭消息
      if (!this.closed) {
        this.close()
      }
    }
  }

  @Watch('closed')
  watchClosed(newVal: string) {
    if (newVal) {
      this.visible = false
    }
  }
}
</script>
