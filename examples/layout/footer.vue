<template>
  <div class="page-footer">
    <div class="footer-container">
      <mu-row type="flex"
              justify="space-between">
        <mu-col class="text">
          <p>&copy;2020 musely.com</p>
        </mu-col>
      </mu-row>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'LayoutFooter',
  components: {}
})
export default class LayoutFooter extends Vue {}
</script>
<style lang="scss" scoped>
.page-footer {
  padding: 30px 0 30px;
  color: #6190e8;
  text-align: center;
  background-color: #fff;
  box-shadow: 0 4px 30px 0 rgba(223, 225, 230, 0.8);
  .footer-container {
    width: 90%;
    margin: 0 auto;
  }
  .text {
    font-size: 12px;
    align-items: center;

    color: #5e6d82;
  }
}
</style>
