<!--
 * @Author: Victor wang
 * @Date: 2020-04-13 10:00:08
 * @LastEditors: Victor.wang
 * @LastEditTime: 2020-05-04 20:45:22
 * @Description:
 -->

# Container 容器

---

### 概述

用于布局的容器组件，方便快速搭建页面的基本结构：
`<mu-container>`：外层容器。当子元素中包含 `<mu-header>` 或 `<mu-footer>` 时，全部子元素会垂直上下排列，否则会水平左右排列。
`<mu-header>`：顶栏容器。
`<mu-aside>`：侧边栏容器。
`<mu-main>`：主要区域容器。
`<mu-footer>`：底栏容器。

### 常用布局

:::demo

```html
<mu-container>
  <mu-header>Header</mu-header>
  <mu-main>Main</mu-main>
</mu-container>

<mu-container>
  <mu-header>Header</mu-header>
  <mu-main>Main</mu-main>
  <mu-footer>Footer</mu-footer>
</mu-container>

<mu-container>
  <mu-header>Header</mu-header>
  <mu-container>
    <mu-aside width="200px">Aside</mu-aside>
    <mu-main>Main</mu-main>
  </mu-container>
</mu-container>
```

:::

### direction 使用

:::demo

```html
<mu-container :direction="vertical">
  <mu-main>Main1</mu-main>
  <mu-main>Main2</mu-main>
</mu-container>
<mu-container>
  <mu-main>Main3</mu-main>
  <mu-main>Main4</mu-main>
</mu-container>
```

```js
<script>
export default {
  data() {
    return {
      vertical: 'vertical'
    }
  }
}
</script>
```

:::

### Container Attributes

| 参数      | 说明             | 类型   | 可选值                | 默认值                                                                 |
| --------- | ---------------- | ------ | --------------------- | ---------------------------------------------------------------------- |
| direction | 子元素的排列方向 | string | horizontal / vertical | 子元素中有 `mu-header` 或 `mu-footer` 时为 vertical，否则为 horizontal |

### Header Attributes

| 参数   | 说明     | 类型   | 可选值 | 默认值 |
| ------ | -------- | ------ | ------ | ------ |
| height | 顶栏高度 | string | —      | 60px   |

### Aside Attributes

| 参数  | 说明       | 类型   | 可选值 | 默认值 |
| ----- | ---------- | ------ | ------ | ------ |
| width | 侧边栏宽度 | string | —      | 300px  |

### Footer Attributes

| 参数   | 说明     | 类型   | 可选值 | 默认值 |
| ------ | -------- | ------ | ------ | ------ |
| height | 底栏高度 | string | —      | 60px   |
