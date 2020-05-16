<!--
 * @Author: Victor wang
 * @Date: 2020-05-13 16:11:52
 * @LastEditors: Victor.wang
 * @LastEditTime: 2020-05-17 00:08:57
 * @Description:
 -->

## Avatar 头像

用图标、图片或者字符的形式展示用户或事物信息。

### 基本用法

通过 `shape` 和 `size` 设置头像的形状和大小。

:::demo

```html
<template>
  <mu-row class="demo-avatar demo-basic">
    <mu-col :span="12">
      <div class="sub-title">circle</div>
      <div class="demo-basic--circle">
        <div class="block"><mu-avatar :size="50" :src="circleUrl"></mu-avatar></div>
        <div class="block" v-for="size in sizeList" :key="size">
          <mu-avatar :size="size" :src="circleUrl"></mu-avatar>
        </div>
      </div>
    </mu-col>
    <mu-col :span="12">
      <div class="sub-title">square</div>
      <div class="demo-basic--circle">
        <div class="block"><mu-avatar shape="square" :size="50" :src="squareUrl"></mu-avatar></div>
        <div class="block" v-for="size in sizeList" :key="size">
          <mu-avatar shape="square" :size="size" :src="squareUrl"></mu-avatar>
        </div>
      </div>
    </mu-col>
  </mu-row>
</template>
<script>
  export default {
    data() {
      return {
        circleUrl: '/img/slice.png',
        squareUrl: '/img/slice.png',
        sizeList: ['large', 'medium', 'small']
      }
    }
  }
</script>
```

:::

### 展示类型

支持三种类型：图标、图片和字符

:::demo

```html
<template>
  <div class="demo-type">
    <div>
      <mu-avatar icon="mu-icon-profile"></mu-avatar>
    </div>
    <div>
      <mu-avatar src="/img/slice.png"></mu-avatar>
    </div>
    <div>
      <mu-avatar> user </mu-avatar>
    </div>
  </div>
</template>
```

:::

### 图片加载失败的 fallback 行为

当展示类型为图片的时候，图片加载失败的 fallback 行为

:::demo

```html
<template>
  <div class="demo-type">
    <mu-avatar :size="60" src="https://empty" @error="errorHandler">
      <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" />
    </mu-avatar>
  </div>
</template>
<script>
  export default {
    methods: {
      errorHandler(e) {
        console.log(e.message)
        return true
      }
    }
  }
</script>
```

:::

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

### Attributes

| 参数   | 说明                                                               | 类型          | 可选值                                     | 默认值 |
| ------ | ------------------------------------------------------------------ | ------------- | ------------------------------------------ | ------ |
| icon   | 设置头像的图标类型，参考 Icon 组件                                 | string        |                                            |        |
| size   | 设置头像的大小                                                     | number/string | number / large / medium / small            | large  |
| shape  | 设置头像的形状                                                     | string        | circle / square                            | circle |
| src    | 图片头像的资源地址                                                 | string        |                                            |        |
| srcSet | 以逗号分隔的一个或多个字符串列表表明一系列用户代理使用的可能的图像 | string        |                                            |        |
| alt    | 描述图像的替换文本                                                 | string        |                                            |        |
| fit    | 当展示类型为图片的时候，设置图片如何适应容器框                     | string        | fill / contain / cover / none / scale-down | cover  |

### Events

| 事件名 | 说明                                                                 | 回调参数   |
| ------ | -------------------------------------------------------------------- | ---------- |
| error  | 图片类头像加载失败的回调， 返回 false 会关闭组件默认的 fallback 行为 | (e: Event) |

### Slot

| 名称    | 说明               |
| ------- | ------------------ |
| default | 自定义头像展示内容 |
