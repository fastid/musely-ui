<template>
  <div class="header-container">
    <router-link :to="{ name: 'home' }">
      <svgicon name="musely_logo"
               class="logo" />
    </router-link>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'LayoutHeader',
  components: {}
})
export default class LayoutHeader extends Vue {}
</script>

<style lang="scss">
.header-container {
  width: 90%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  height: 80px;
  justify-content: space-between;
  .logo {
    width: 120px;
    height: 25px;
    fill: #161616;
  }
}
</style>
