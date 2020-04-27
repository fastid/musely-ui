<!--
 * @Author: Victor wang
 * @Date: 2020-04-20 01:33:16
 * @LastEditors: Victor.wang
 * @LastEditTime: 2020-04-27 19:12:34
 * @Description:
 -->

## Button 按钮

常用的操作按钮。

### 基础用法

基础的按钮用法。

:::demo 使用`plain`、`round`和`circle`属性来定义 `Button` 的样式。

```html
<mu-row>
  <mu-button>Defalut</mu-button>
  <mu-button plain>Get Started Now</mu-button>
  <mu-button round>Next</mu-button>
  <mu-button icon="mu-icon-search" circle></mu-button>
</mu-row>
```

:::

### 禁用状态

按钮不可用状态。

:::demo 你可以使用`disabled`属性来定义按钮是否可用，它接受一个`Boolean`值。

```html
<mu-row>
  <mu-button disabled>Button</mu-button>
</mu-row>
```

:::

### 文字按钮

没有边框和背景色的按钮。

:::demo

```html
<mu-button type="text">textButton</mu-button> <mu-button type="text" disabled>textDisabled</mu-button>
```

:::

### 图标按钮

带图标的按钮可增强辨识度（有文字）或节省空间（无文字）。

:::demo 设置`icon`属性即可，icon 的列表可以参考 Element 的 icon 组件，也可以设置在文字右边的 icon ，只要使用`i`标签即可，可以使用自定义图标。

```html
<mu-row>
  <mu-button type="primary" icon="mu-icon-search">Search</mu-button>
  <mu-button>upload<i class="mu-icon-upload mu-icon--right"></i></mu-button>
</mu-row>
```

:::

### 按钮组

以按钮组的方式出现，常用于多项类似操作。

:::demo 使用`<mu-button-group>`标签来嵌套你的按钮。

```html
<mu-button-group>
  <mu-button type="primary" icon="mu-icon-arrow-left">Prev</mu-button>
  <mu-button type="primary">Next<i class="mu-icon-arrow-right mu-icon--right"></i></mu-button>
</mu-button-group>
```

:::

### 加载中

点击按钮后进行数据加载操作，在按钮上显示加载状态。

:::demo 要设置为 loading 状态，只要设置`loading`属性为`true`即可。

```html
<mu-button type="primary" :loading="true">Loading</mu-button>
```

:::

### Attributes

| 参数        | 说明           | 类型    | 可选值                  | 默认值 |
| ----------- | -------------- | ------- | ----------------------- | ------ |
| type        | 类型           | string  | text                    | —      |
| plain       | 是否简洁按钮   | boolean | —                       | false  |
| round       | 是否圆角按钮   | boolean | —                       | false  |
| circle      | 是否圆形按钮   | boolean | —                       | false  |
| loading     | 是否加载中状态 | boolean | —                       | false  |
| disabled    | 是否禁用状态   | boolean | —                       | false  |
| icon        | 图标类名       | string  | —                       | —      |
| autofocus   | 是否默认聚焦   | boolean | —                       | false  |
| native-type | 原生属性       | string  | button / submit / reset | button |
