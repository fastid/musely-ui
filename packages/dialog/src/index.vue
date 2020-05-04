<template>
  <transition name="dialog-fade"
              @after-enter="afterEnter"
              @after-leave="afterLeave">
    <div v-show="visible"
         class="el-dialog__wrapper"
         @click.self="handleWrapperClick">
      <div role="dialog"
           :key="key"
           aria-modal="true"
           :aria-label="title || 'dialog'"
           :class="['el-dialog', { 'is-fullscreen': fullscreen, 'el-dialog--center': center }, customClass]"
           ref="dialog"
           :style="style">
        <div class="el-dialog__header">
          <slot name="title">
            <span class="el-dialog__title">{{ title }}</span>
          </slot>
          <button type="button"
                  class="el-dialog__headerbtn"
                  aria-label="Close"
                  v-if="showClose"
                  @click="handleClose">
            <i class="el-dialog__close el-icon el-icon-close"></i>
          </button>
        </div>
        <div class="el-dialog__body"
             v-if="rendered">
          <slot></slot>
        </div>
        <div class="el-dialog__footer"
             v-if="$slots.footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang='ts'>
// import { MuDialog as Dialog } from 'types/dialog'
// implements Dialog
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({
  name: 'MuDialog'
})
export default class MuDialog extends Vue {
  @Prop({ default: '', type: String }) title!: string
  @Prop({ type: Boolean }) modal!: boolean
  @Prop({ default: '', type: String }) width!: string
  @Prop({ default: '15vh', type: String }) top!: string
  @Prop({ default: false, type: Boolean }) center!: boolean

  private closed = false
  private key = 0
}
</script>
