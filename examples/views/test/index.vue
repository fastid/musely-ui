<template>
  <section>
    <!--
 * @Author: Victor wang
 * @Date: 2020-05-15 23:04:01
 * @LastEditors: Victor.wang
 * @LastEditTime: 2020-05-16 02:51:47
 * @Description:
-->
    <h3 id="%E5%9B%BE%E7%89%87%E5%A6%82%E4%BD%95%E9%80%82%E5%BA%94%E5%AE%B9%E5%99%A8%E6%A1%86">图片如何适应容器框</h3>
    <p>当展示类型为图片的时候，使用 <code class="code_inline">fit</code> 属性定义图片如何适应容器框，同原生 <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit">object-fit</a>。</p>
    <code-view :jsfiddle="{&quot;html&quot;:&quot;&lt;template&gt;\n  &lt;div class=\&quot;demo-fit\&quot;&gt;\n    &lt;div class=\&quot;block\&quot; v-for=\&quot;item in items\&quot; :key=\&quot;item\&quot;&gt;\n      &lt;span class=\&quot;title\&quot;&gt;{{ item }}&lt;/span&gt;\n      &lt;mu-avatar shape=\&quot;square\&quot; :size=\&quot;100\&quot; :fit=\&quot;item\&quot; :src=\&quot;url\&quot;&gt;&lt;/mu-avatar&gt;\n    &lt;/div&gt;\n  &lt;/div&gt;\n&lt;/template&gt;\n&lt;script&gt;\n  export default {\n    data() {\n      return {\n        // TODO item\n        items: ['fill', 'contain', 'cover', 'none', 'scale-down'],\n        url: '/img/facerx.png'\n      }\n    }\n  }\n&lt;/script&gt;\n&quot;,&quot;script&quot;:&quot;\n  export default {\n    data() {\n      return {\n        // TODO item\n        items: ['fill', 'contain', 'cover', 'none', 'scale-down'],\n        url: '/img/facerx.png'\n      }\n    }\n  }\n&quot;,&quot;style&quot;:null}">
      <template slot="source">
        <compontent-doc0 /></template>
      <div slot="description"></div>
      <div slot="highlight">
        <pre v-pre><code class="hljs">&lt;template&gt;
  &lt;div class=&quot;demo-fit&quot;&gt;
    &lt;div class=&quot;block&quot; v-for=&quot;item in items&quot; :key=&quot;item&quot;&gt;
      &lt;span class=&quot;title&quot;&gt;{{ item }}&lt;/span&gt;
      &lt;mu-avatar shape=&quot;square&quot; :size=&quot;100&quot; :fit=&quot;item&quot; :src=&quot;url&quot;&gt;&lt;/mu-avatar&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/template&gt;
&lt;script&gt;
  export default {
    data() {
      return {
        // TODO item
        items: ['fill', 'contain', 'cover', 'none', 'scale-down'],
        url: '/img/facerx.png'
      }
    }
  }
&lt;/script&gt;
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
              _c(
                'div',
                { staticClass: 'demo-fit' },
                _vm._l(_vm.items, function (item) {
                  return _c(
                    'div',
                    { key: item, staticClass: 'block' },
                    [
                      _c('span', { staticClass: 'title' }, [_vm._v(_vm._s(item))]),
                      _vm._v(' '),
                      _c('mu-avatar', {
                        attrs: { shape: 'square', size: 100, fit: item, src: _vm.url }
                      })
                    ],
                    1
                  )
                }),
                0
              )
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
            items: ['fill', 'contain', 'cover', 'none', 'scale-down'],
            url: '/img/facerx.png'
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
