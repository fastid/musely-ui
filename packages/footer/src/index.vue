<template>
  <footer class="mu-footer"
          :style="{ height }">
    <slot></slot>
  </footer>
</template>

<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({
  name: 'MuFooter'
})
export default class MuFooter extends Vue {
  @Prop({ default: '60px', type: String }) private height!: string
}
</script>
