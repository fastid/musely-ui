<template>
  <section>
    <!--
 * @Author: Victor wang
 * @Date: 2020-05-15 23:04:01
 * @LastEditors: Victor.wang
 * @LastEditTime: 2020-05-23 09:15:52
 * @Description:
-->
    <h3 id="%E5%9B%BE%E7%89%87%E5%A6%82%E4%BD%95%E9%80%82%E5%BA%94%E5%AE%B9%E5%99%A8%E6%A1%86">图片如何适应容器框</h3>
    <p>当展示类型为图片的时候，使用 <code class="code_inline">fit</code> 属性定义图片如何适应容器框，同原生 <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit">object-fit</a>。</p>
    <code-view :jsfiddle="{&quot;html&quot;:&quot;&lt;template&gt;\n  &lt;div class=\&quot;demo-fit-1\&quot;&gt;\n      &lt;span class=\&quot;title\&quot;&gt;{{ item }}&lt;/span&gt;\n    &lt;/div&gt;\n  \n&lt;/template&gt;\n&lt;script&gt;\n  export default {\n    data() {\n      return {\n        // TODO item\n        item: 'ITEM-INFO'\n      }\n    }\n  }\n&lt;/script&gt;\n&quot;,&quot;script&quot;:&quot;\n  export default {\n    data() {\n      return {\n        // TODO item\n        item: 'ITEM-INFO'\n      }\n    }\n  }\n&quot;,&quot;style&quot;:null}">
      <template slot="source">
        <compontent-doc0 /></template>
      <div slot="description"></div>
      <div slot="highlight">
        <pre><code class="hljs language-html"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"demo-fit-1"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"title"</span>&gt;</span>{{ "\{\{ item \}\}" }}<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    data() {
      <span class="hljs-keyword">return</span> {
        <span class="hljs-comment">// TODO item</span>
        <span class="hljs-attr">item</span>: <span class="hljs-string">'ITEM-INFO'</span>
      }
    }
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code></pre>
      </div>
    </code-view>
  </section>
</template>
    <!-----component script----->
<script>
export default {
  name: 'component-doc',
  components: {
    'compontent-doc0': (function () {
      const render = function () {
        const _vm = this
        const _h = _vm.$createElement
        const _c = _vm._self._c || _h
        return _c(
          'div',
          { staticClass: 'template2source' },
          [
            [
              _c('div', { staticClass: 'demo-fit-1' }, [
                _c('span', { staticClass: 'title' }, [_vm._v(_vm._s(_vm.item))])
              ])
            ]
          ],
          2
        )
      }
      const staticRenderFns = []
      render._withStripped = true

      const democomponentExport = {
        data () {
          return {
            // TODO item
            item: 'ITEM-INFO'
          }
        }
      }
      return {
        render,
        staticRenderFns,
        ...democomponentExport
      }
    })()
  }
}
</script>
