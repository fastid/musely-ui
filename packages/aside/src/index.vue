<template>
  <aside class="mu-aside"
         :style="{ width }">
    <slot></slot>
  </aside>
</template>

<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({
  name: 'MuAside'
})
export default class MuAside extends Vue {
  @Prop({ default: '200px', type: String }) private width!: string
}
</script>
