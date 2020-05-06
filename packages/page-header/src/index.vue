<!--
 * @Author: Victor wang
 * @Date: 2020-05-06 23:11:00
 * @LastEditors: Victor.wang
 * @LastEditTime: 2020-05-06 23:16:46
 * @Description:
 -->
<template>
  <div class="mu-page-header">
    <div class="mu-page-header__left"
         @click="$emit('back')">
      <i class="mu-icon-back"></i>
      <div class="mu-page-header__title">
        <slot name="title">{{ title }}</slot>
      </div>
    </div>
    <div class="mu-page-header__content">
      <slot name="content">{{ content }}</slot>
    </div>
  </div>
</template>

<script lang='ts'>
import { MuPageHeader as PageHeader } from 'types/page-header'
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
  name: 'MuPageHeader'
})
export default class MuPageHeader extends Vue implements PageHeader {
  @Prop({ default: 'Back', type: String }) title!: string
  @Prop({ type: String }) content!: string
}
</script>
