<template>
  <div class="container">
    <mu-container>
      <mu-header class="header"
                 height='80px'
                 :style="
      $route.name === 'home'
        ? 'box-shadow:none'
        : 'box-shadow:0 10px 60px 0 rgba(29,29,31,0.07)'
    ">
        <mainHeader></mainHeader>
      </mu-header>
      <mu-container v-if="!isIndex">
        <mu-aside class="nav">
          <sideNav></sideNav>
        </mu-aside>
        <mu-main class="main">
          <router-view class="view"></router-view>
        </mu-main>
      </mu-container>
      <router-view v-else
                   class="page"></router-view>
      <mu-footer v-if="isIndex"
                 class="footer">
        <mainFooter></mainFooter>
      </mu-footer>
    </mu-container>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import mainHeader from './layout/header.vue'
import mainFooter from './layout/footer.vue'
import sideNav from './layout/side-nav.vue'

@Component({
  name: 'App',
  components: {
    mainHeader,
    mainFooter,
    sideNav
  }
})
export default class extends Vue {
  private isIndex = true

  @Watch('$route')
  private onRouteChange() {
    this.isIndex = this.$route.name === 'home'
  }
}
</script>
<style lang="scss">
@import './layout/base';
.container {
  position: relative;
  height: 100vh;
  .header {
    background-color: #fff;
    box-shadow: 0 10px 60px 0 rgba(29, 29, 31, 0.07);
    opacity: 0.98;
    position: fixed !important;
    top: 0;
    left: 0;
    width: 100%;
    transition: all 0.3s;
    z-index: 100;
  }
  .main {
    margin-top: 80px;
    margin-left: 210px;
  }
  .nav {
    height: calc(100% - 80px);
    position: fixed;
    top: 80px;
    overflow: auto;
  }
  .footer {
    padding: 0 !important;
  }
}
</style>
