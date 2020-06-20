<!--
 * @Author: Victor wang
 * @Date: 2020-06-20 15:08:34
 * @LastEditors: Victor.wang
 * @LastEditTime: 2020-06-20 23:05:19
 * @Description:
-->

## Dropdown 下拉菜单

将动作或菜单折叠到下拉菜单中。

### 基础用法

移动到下拉菜单上，展开更多操作。

:::demo 通过组件`slot`来设置下拉触发的元素以及需要通过具名`slot`为`dropdown` 来设置下拉菜单。默认情况下，下拉按钮只要`hover`即可，无需点击也会显示下拉菜单。

```html
<mu-dropdown>
  <span class="mu-dropdown-link"> Dropdown List<i class="mu-icon-arrow-down mu-icon--right"></i> </span>
  <mu-dropdown-menu slot="dropdown">
    <mu-dropdown-item>Action 1</mu-dropdown-item>
    <mu-dropdown-item>Action 2</mu-dropdown-item>
    <mu-dropdown-item>Action 3</mu-dropdown-item>
    <mu-dropdown-item disabled>Action 4</mu-dropdown-item>
    <mu-dropdown-item divided>Action 5</mu-dropdown-item>
  </mu-dropdown-menu>
</mu-dropdown>

<style>
  .mu-dropdown-link {
    cursor: pointer;
    color: #409eff;
  }
  .mu-icon-arrow-down {
    font-size: 12px;
  }
</style>
```

:::

### 触发对象

可使用按钮触发下拉菜单。

:::demo 设置`split-button`属性来让触发下拉元素呈现为按钮组，左边是功能按钮，右边是触发下拉菜单的按钮，设置为`true`即可。

```html
<mu-dropdown>
  <mu-button type="primary"> Dropdown List<i class="mu-icon-arrow-down mu-icon--right"></i> </mu-button>
  <mu-dropdown-menu slot="dropdown">
    <mu-dropdown-item>Action 1</mu-dropdown-item>
    <mu-dropdown-item>Action 2</mu-dropdown-item>
    <mu-dropdown-item>Action 3</mu-dropdown-item>
    <mu-dropdown-item>Action 4</mu-dropdown-item>
    <mu-dropdown-item>Action 5</mu-dropdown-item>
  </mu-dropdown-menu>
</mu-dropdown>
<mu-dropdown split-button type="primary" @click="handleClick">
  Dropdown List
  <mu-dropdown-menu slot="dropdown">
    <mu-dropdown-item>Action 1</mu-dropdown-item>
    <mu-dropdown-item>Action 2</mu-dropdown-item>
    <mu-dropdown-item>Action 3</mu-dropdown-item>
    <mu-dropdown-item>Action 4</mu-dropdown-item>
    <mu-dropdown-item>Action 5</mu-dropdown-item>
  </mu-dropdown-menu>
</mu-dropdown>

<style>
  .mu-dropdown {
    vertical-align: top;
  }
  .mu-dropdown + .mu-dropdown {
    margin-left: 15px;
  }
  .mu-icon-arrow-down {
    font-size: 12px;
  }
</style>

<script>
  export default {
    methods: {
      handleClick() {
        alert('button click')
      }
    }
  }
</script>
```

:::

### 触发方式

可以配置 click 激活或者 hover 激活。

:::demo 在`trigger`属性设置为`click`即可。

```html
<mu-row class="block-col-2">
  <mu-col :span="12">
    <span class="demonstration">hover to trigger</span>
    <mu-dropdown>
      <span class="mu-dropdown-link"> Dropdown List<i class="mu-icon-arrow-down mu-icon--right"></i> </span>
      <mu-dropdown-menu slot="dropdown">
        <mu-dropdown-item icon="mu-icon-plus">Action 1</mu-dropdown-item>
        <mu-dropdown-item icon="mu-icon-circle-plus">Action 2</mu-dropdown-item>
        <mu-dropdown-item icon="mu-icon-circle-plus-outline">Action 3</mu-dropdown-item>
        <mu-dropdown-item icon="mu-icon-check">Action 4</mu-dropdown-item>
        <mu-dropdown-item icon="mu-icon-circle-check">Action 5</mu-dropdown-item>
      </mu-dropdown-menu>
    </mu-dropdown>
  </mu-col>
  <mu-col :span="12">
    <span class="demonstration">click to trigger</span>
    <mu-dropdown trigger="click">
      <span class="mu-dropdown-link"> Dropdown List<i class="mu-icon-arrow-down mu-icon--right"></i> </span>
      <mu-dropdown-menu slot="dropdown">
        <mu-dropdown-item icon="mu-icon-plus">Action 1</mu-dropdown-item>
        <mu-dropdown-item icon="mu-icon-circle-plus">Action 2</mu-dropdown-item>
        <mu-dropdown-item icon="mu-icon-circle-plus-outline">Action 3</mu-dropdown-item>
        <mu-dropdown-item icon="mu-icon-check">Action 4</mu-dropdown-item>
        <mu-dropdown-item icon="mu-icon-circle-check">Action 5</mu-dropdown-item>
      </mu-dropdown-menu>
    </mu-dropdown>
  </mu-col>
</mu-row>

<style>
  .mu-dropdown-link {
    cursor: pointer;
    color: #409eff;
  }
  .mu-icon-arrow-down {
    font-size: 12px;
  }
  .demonstration {
    display: block;
    color: #8492a6;
    font-size: 14px;
    margin-bottom: 20px;
  }
</style>
```

:::

### 菜单隐藏方式

可以`hide-on-click`属性来配置。

:::demo 下拉菜单默认在点击菜单项后会被隐藏，将`hide-on-click`属性默认为`false`可以关闭此功能。

```html
<mu-dropdown :hide-on-click="false">
  <span class="mu-dropdown-link"> Dropdown List<i class="mu-icon-arrow-down mu-icon--right"></i> </span>
  <mu-dropdown-menu slot="dropdown">
    <mu-dropdown-item>Action 1</mu-dropdown-item>
    <mu-dropdown-item>Action 2</mu-dropdown-item>
    <mu-dropdown-item>Action 3</mu-dropdown-item>
    <mu-dropdown-item disabled>Action 4</mu-dropdown-item>
    <mu-dropdown-item divided>Action 5</mu-dropdown-item>
  </mu-dropdown-menu>
</mu-dropdown>

<style>
  .mu-dropdown-link {
    cursor: pointer;
    color: #409eff;
  }
  .mu-icon-arrow-down {
    font-size: 12px;
  }
</style>
```

:::

### 指令事件

点击菜单项后会触发事件，用户可以通过相应的菜单项 key 进行不同的操作

:::demo

```html
<mu-dropdown @command="handleCommand">
  <span class="mu-dropdown-link"> Dropdown List<i class="mu-icon-arrow-down mu-icon--right"></i> </span>
  <mu-dropdown-menu slot="dropdown">
    <mu-dropdown-item command="a">Action 1</mu-dropdown-item>
    <mu-dropdown-item command="b">Action 2</mu-dropdown-item>
    <mu-dropdown-item command="c">Action 3</mu-dropdown-item>
    <mu-dropdown-item command="d" disabled>Action 4</mu-dropdown-item>
    <mu-dropdown-item command="e" divided>Action 5</mu-dropdown-item>
  </mu-dropdown-menu>
</mu-dropdown>

<style>
  .mu-dropdown-link {
    cursor: pointer;
    color: #409eff;
  }
  .mu-icon-arrow-down {
    font-size: 12px;
  }
</style>

<script>
  export default {
    methods: {
      handleCommand(command) {
        this.$message('click on item ' + command)
      }
    }
  }
</script>
```

:::

### Dropdown Attributes

| 参数          | 说明                                                                                                     | 类型    | 可选值                                               | 默认值     |
| ------------- | -------------------------------------------------------------------------------------------------------- | ------- | ---------------------------------------------------- | ---------- |
| type          | 菜单按钮类型，同 Button 组件(只在`split-button`为 true 的情况下有效)                                     | string  | —                                                    | —          |
| size          | 菜单尺寸，在`split-button`为 true 的情况下也对触发按钮生效                                               | string  | medium / small / mini                                | —          |
| split-button  | 下拉触发元素呈现为按钮组                                                                                 | boolean | —                                                    | false      |
| placement     | 菜单弹出位置                                                                                             | string  | top/top-start/top-end/bottom/bottom-start/bottom-end | bottom-end |
| trigger       | 触发下拉的行为                                                                                           | string  | hover, click                                         | hover      |
| hide-on-click | 是否在点击菜单项后隐藏菜单                                                                               | boolean | —                                                    | true       |
| show-timeout  | 展开下拉菜单的延时（仅在 trigger 为 hover 时有效）                                                       | number  | —                                                    | 250        |
| hide-timeout  | 收起下拉菜单的延时（仅在 trigger 为 hover 时有效）                                                       | number  | —                                                    | 150        |
| tabindex      | Dropdown 组件的 [tabindex](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex) | number  | —                                                    | 0          |

### Dropdown Slots

| Name     | 说明                                                       |
| -------- | ---------------------------------------------------------- |
| —        | 触发下拉列表显示的元素。 注意： 必须是一个元素或者或者组件 |
| dropdown | 下拉列表，通常是 `<mu-dropdown-menu>` 组件                 |

### Dropdown Events

| 事件名称       | 说明                                          | 回调参数                      |
| -------------- | --------------------------------------------- | ----------------------------- |
| click          | `split-button` 为 true 时，点击左侧按钮的回调 | —                             |
| command        | 点击菜单项触发的事件回调                      | dropdown-item 的指令          |
| visible-change | 下拉框出现/隐藏时触发                         | 出现则为 true，隐藏则为 false |

### Dropdown Menu Item Attributes

| 参数     | 说明       | 类型                 | 可选值 | 默认值 |
| -------- | ---------- | -------------------- | ------ | ------ |
| command  | 指令       | string/number/object | —      | —      |
| disabled | 禁用       | boolean              | —      | false  |
| divided  | 显示分割线 | boolean              | —      | false  |
| icon     | 图标类名   | string               | —      | —      |
