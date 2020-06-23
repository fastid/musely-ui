<template>
  <header class="mu-header"
          :style="{ height }">
    <slot></slot>
  </header>
</template>

<script lang='ts'>
import { MuHeader as Header } from 'types/header'
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({
  name: 'MuHeader'
})
export default class MuHeader extends Vue implements Header {
  @Prop({ default: '', type: String }) height!: string
}
</script>
