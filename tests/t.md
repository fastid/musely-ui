<!--
 * @Author: Victor wang
 * @Date: 2020-05-15 23:04:01
 * @LastEditors: Victor.wang
 * @LastEditTime: 2020-05-17 00:45:45
 * @Description:
-->

### 图片如何适应容器框

当展示类型为图片的时候，使用 `fit` 属性定义图片如何适应容器框，同原生 [object-fit](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit)。

:::demo

```html
<template>
  <div class="demo-fit-1">
      <span class="title">{{ item }}</span>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        // TODO item
        item: 'ITEM-INFO'
      }
    }
  }
</script>
```

:::
