### 嵌套的 Dialog

如果需要在一个 Dialog 内部嵌套另一个 Dialog，需要使用 `append-to-body` 属性。
:::demo 正常情况下，我们不建议使用嵌套的 Dialog，如果需要在页面上同时显示多个 Dialog，可以将它们平级放置。对于确实需要嵌套 Dialog 的场景，我们提供了`append-to-body`属性。将内层 Dialog 的该属性设置为 true，它就会插入至 body 元素上，从而保证内外层 Dialog 和遮罩层级关系的正确。

```html
<template>
  <mu-button type="text" @click="outerVisible = true">点击打开外层 Dialog</mu-button>

  <mu-dialog title="外层 Dialog" :visible.sync="outerVisible">
    <mu-dialog width="30%" title="内层 Dialog" :visible.sync="innerVisible" append-to-body> </mu-dialog>
    <div slot="footer" class="dialog-footer">
      <mu-button @click="outerVisible = false">取 消</mu-button>
      <mu-button type="primary" @click="innerVisible = true">打开内层 Dialog</mu-button>
    </div>
  </mu-dialog>
</template>

<script>
  export default {
    data() {
      return {
        test: false,
        outerVisible: false,
        innerVisible: false
      }
    }
  }
</script>
```
