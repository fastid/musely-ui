<template>
  <header class="mu-header"
          :style="{ height }">
    <slot></slot>
  </header>
</template>

<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({
  name: 'MuHeader'
})
export default class MuHeader extends Vue {
  @Prop({ default: '60px', type: String }) private height!: string
}
</script>
