<!--
 * @Author: Victor wang
 * @Date: 2020-03-31 16:22:44
 * @LastEditors: Victor.wang
 * @LastEditTime: 2020-05-29 16:30:46
 * @Description:
 -->
<template>
  <div class="docs-demo-wrapper">
    <div class="demo-block"
         :class="[blockClass]">
      <slot name="source"></slot>
    </div>
    <div :style="{ height: isExpand ? 'auto' : '0' }"
         class="demo-container">
      <div span="14">
        <div class="docs-demo docs-demo--expand">
          <slot name="description"></slot>
          <div class="highlight-wrapper">
            <slot name="highlight"></slot>
          </div>
        </div>
      </div>
    </div>
    <span class="docs-trans docs-demo__triangle"
          @click="toggle">{{
      isExpand ? '隐藏代码' : '显示代码'
    }}</span>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'CodeView',
  components: {}
})
export default class CodeView extends Vue {
  private isExpand = false

  private toggle() {
    this.isExpand = !this.isExpand
  }

  get blockClass() {
    return `demo-${this.$router.currentRoute.path.split('/').pop()}`
  }
}
</script>

<style lang="scss">
.demo-container {
  transition: max-height 0.3s ease;
  overflow: hidden;
}
.docs-demo {
  width: 100%;
  height: auto;
  box-sizing: border-box;
  font-size: 14px;
  background-color: #f7f7f7;
  border: 1px solid #e2ecf4;
  border-top: none;
  padding-top: 10px;
  pre code {
    font-family: Consolas, Menlo, Courier, monospace;
    line-height: 22px;
    border: none;
  }
}
.docs-trans {
  width: 100%;
  text-align: center;
  display: inline-block;
  color: #c5d9e8;
  font-size: 12px;
  padding: 10px 0;
  background-color: #fafbfc;
  cursor: pointer;
}

.docs-demo__code,
.highlight-wrapper,
.docs-demo__meta {
  padding: 0 20px;
  overflow-y: auto;
}

.docs-demo__code {
  border-bottom: 1px solid #eee;
}
.docs-demo.docs-demo--expand .docs-demo__meta {
  border-bottom: 1px dashed #e9e9e9;
}

.docs-demo.docs-demo--expand .docs-demo__triangle {
  transform: rotate(180deg);
}

.highlight-wrapper {
  display: none;

  p,
  pre {
    margin: 0;
  }

  .hljs {
    padding: 0;
  }
}

.docs-demo.docs-demo--expand .highlight-wrapper {
  display: block;
}

.docs-demo__code__mobi {
  height: 620px;
  margin: 20px 0;
}

.docs-demo__code__mobi__header {
  border-radius: 4px 4px 0 0;
  background: -webkit-linear-gradient(rgba(55, 55, 55, 0.98), #545456);
  background: linear-gradient(rgba(55, 55, 55, 0.98), #545456);
  text-align: center;
  padding: 8px;

  img {
    width: 100%;
  }

  .url-box {
    height: 28px;
    line-height: 28px;
    color: #fff;
    padding: 0 3px;
    background-color: #a2a2a2;
    margin: 10px auto 0;
    border-radius: 4px;
    white-space: nowrap;
    overflow-x: auto;
  }
}

.docs-demo__code__mobi__content {
  iframe {
    width: 100%;
    border: 0;
    height: 548px;
  }
}
</style>
