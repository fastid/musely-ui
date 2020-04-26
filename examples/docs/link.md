<!--
 * @Author: Victor wang
 * @Date: 2020-04-24 00:57:48
 * @LastEditors: Victor.wang
 * @LastEditTime: 2020-04-27 02:45:32
 * @Description:
 -->

## Link 文字链接

文字超链接

### 基础用法

基础的文字链接用法。
:::demo

```html
<div>
  <mu-link href="https://m.musely.com" target="_blank">默认链接</mu-link>
</div>
```

:::

### 禁用状态

文字链接不可用状态。
:::demo

```html
<div>
  <mu-link disabled>默认链接</mu-link>
</div>
```

:::

### 下划线

文字链接下划线。
:::demo

```html
<div>
  <mu-link :underline="false">无下划线</mu-link>
  <mu-link>有下划线</mu-link>
</div>
```

:::

### 图标

带图标的文字链接可增强辨识度。
:::demo

```html
<div>
  <mu-link icon="mu-icon-search">搜索</mu-link>
  <mu-link>详细<i class="mu-icon-view mu-icon-arrow-right"></i> </mu-link>
</div>
```

:::

### Attributes

| 参数      | 说明           | 类型    | 可选值 | 默认值 |
| --------- | -------------- | ------- | ------ | ------ |
| underline | 是否下划线     | boolean | —      | true   |
| disabled  | 是否禁用状态   | boolean | —      | false  |
| href      | 原生 href 属性 | string  | —      | -      |
| icon      | 图标类名       | string  | —      | -      |
