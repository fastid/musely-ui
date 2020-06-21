<!--
 * @Author: Victor wang
 * @Date: 2020-06-21 14:39:51
 * @LastEditors: Victor.wang
 * @LastEditTime: 2020-06-21 15:36:30
 * @Description:
-->
<template>
  <transition name="mu-loading-fade"
              @after-leave="handleAfterLeave">
    <div v-show="visible"
         class="mu-loading-mask"
         :style="{ backgroundColor: background || '' }"
         :class="[customClass, { 'is-fullscreen': fullscreen }]">
      <div class="mu-loading-spinner">
        <svg v-if="!spinner"
             class="circular"
             viewBox="25 25 50 50">
          <circle class="path"
                  cx="50"
                  cy="50"
                  r="20"
                  fill="none" />
        </svg>
        <i v-else
           :class="spinner"></i>
        <p v-if="text"
           class="mu-loading-text">{{ text }}</p>
      </div>
    </div>
  </transition>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'MuLoading'
})
export default class MuLoading extends Vue {
  text: any = null
  spinner = null
  background = null
  fullscreen = true
  visible = false
  customClass = ''

  handleAfterLeave() {
    this.$emit('after-leave')
  }

  setText(text: string) {
    this.text = text
  }
}
</script>
