<template>
  <footer class="mu-footer"
          :style="{ height }">
    <slot></slot>
  </footer>
</template>

<script lang='ts'>
import { MuFooter as Footer } from 'types/footer'
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({
  name: 'MuFooter'
})
export default class MuFooter extends Vue implements Footer {
  @Prop({ default: '60px', type: String }) height!: string
}
</script>
