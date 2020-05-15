<!--
 * @Author: Victor wang
 * @Date: 2020-05-15 23:04:01
 * @LastEditors: Victor.wang
 * @LastEditTime: 2020-05-15 23:04:01
 * @Description:
-->

### 图片如何适应容器框

当展示类型为图片的时候，使用 `fit` 属性定义图片如何适应容器框，同原生 [object-fit](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit)。

:::demo

```html
<template>
  <div class="demo-fit">
    <div class="block" v-for="item in items" :key="item">
      <span class="title">{{ item }}</span>
      <mu-avatar shape="square" :size="100" :fit="item" :src="url"></mu-avatar>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        // TODO item
        items: ['fill', 'contain', 'cover', 'none', 'scale-down'],
        url: '/img/facerx.png'
      }
    }
  }
</script>
```

:::
