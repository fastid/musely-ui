<template>
  <aside class="mu-aside"
         :style="{ width }">
    <slot></slot>
  </aside>
</template>

<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator'
import { MuAside as Aside } from 'types/aside'

@Component({
  name: 'MuAside'
})
export default class MuAside extends Vue implements Aside {
  @Prop({ default: '200px', type: String }) width!: string
}
</script>
