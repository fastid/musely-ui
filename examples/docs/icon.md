<!--
 * @Author: Victor wang
 * @Date: 2020-04-20 01:33:16
 * @LastEditors: Victor.wang
 * @LastEditTime: 2020-04-26 22:47:28
 * @Description:
 -->

## Icon 图标

常用的图标集合。

### 使用方法

直接通过设置类名为 `mu-icon-iconName` 来使用即可。例如：

:::demo

```html
<i class="mu-icon-search"></i>
<i class="mu-icon-platform-facebook"></i>
<i class="mu-icon-delete"></i>
<mu-button type="primary" icon="mu-icon-search">搜索</mu-button>
```

:::

### 图标集合

<div class="demo-icon">
<ul class="icon-list">
  <li v-for="name in $icon" :key="name">
    <span>
      <i :class="'mu-icon-' + name"></i>
      <span class="icon-name">{{'mu-icon-' + name}}</span>
    </span>
  </li>
</ul>
</div>
