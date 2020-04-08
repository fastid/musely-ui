<template>
  <mainContainer v-if="!init"></mainContainer>
  <div v-else>
    <mainHeader></mainHeader>
    <div class="container" v-if="!isIndex">
      <sideNav class="nav"></sideNav>
      <router-view class="view"></router-view>
    </div>
    <router-view class="page" v-else></router-view>
    <mainFooter v-if="!isIndex"></mainFooter>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import mainHeader from './layout/header.vue'
import mainFooter from './layout/footer.vue'
import sideNav from './layout/side-nav.vue'
import mainContainer from './layout/main.vue'

@Component({
  name: 'App',
  components: {
    mainHeader,
    mainFooter,
    sideNav,
    mainContainer
  }
})
export default class extends Vue {
  private init = false
  private isIndex = true

  @Watch('$route')
  private onRouteChange () {
    this.isIndex = this.$route.name === 'index'
  }

  mounted () {
    //  这里模拟数据请求
    setTimeout(() => {
      this.init = true
    }, 250)
  }
}
</script>
<style lang="scss">
.container {
  margin: 12px auto;
  background-color: #fff;
  box-shadow: 0 4px 30px 0 rgba(223, 225, 230, 0.5);
  .nav {
    float: left;
    width: 210px;
  }
  .view {
    float: left;
    width: calc(100% - 215px);
    padding: 32px 48px 48px;
    box-sizing: border-box;
  }
}

.container:after {
  content: '';
  clear: both;
  display: block;
}
</style>
