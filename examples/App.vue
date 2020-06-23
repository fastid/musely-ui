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
        <div class="nav mobile">
          <mu-dropdown class="mobile">
            <span><i class="mu-icon-menu"></i></span>
            <mu-dropdown-menu slot="dropdown">
              <sideNav class="mobile-menu"
                       :mobile="true"></sideNav>
            </mu-dropdown-menu>
          </mu-dropdown>
        </div>

        <mu-aside class="nav"
                  width="200px">
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
    margin-left: 0;
  }
  .nav {
    width: 0 !important;
    .side-nav {
      display: none;
    }
    &.mobile {
      position: fixed;
      top: 30px;
      right: 60px;
      z-index: 101;
      .mu-dropdown-selfdefine {
        font-size: 22px;
      }
    }
  }
  @include respond-to(desktop) {
    .main {
      margin-top: 80px;
      margin-left: 210px;
    }
    .nav {
      width: auto !important;
      .side-nav {
        display: block;
      }
      height: calc(100% - 80px);
      position: fixed;
      top: 80px;
      overflow: auto;
      &.mobile {
        display: none;
      }
    }
  }
  .footer {
    padding: 0 !important;
  }
}
</style>
