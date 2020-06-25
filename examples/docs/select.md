<!--
 * @Author: Victor wang
 * @Date: 2020-06-24 14:01:25
 * @LastEditors: Victor.wang
 * @LastEditTime: 2020-06-26 01:11:36
 * @Description:
-->

## Select 选择器

当选项过多时，使用下拉菜单展示并选择内容。

### 基础用法

适用广泛的基础单选
:::demo `v-model`的值为当前被选中的`mu-option`的 value 属性值

```html
<template>
  <mu-select v-model="value" placeholder="Select">
    <mu-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </mu-option>
  </mu-select>
</template>

<script>
  export default {
    data() {
      return {
        options: [
          {
            value: 'Option1',
            label: 'Option1'
          },
          {
            value: 'Option2',
            label: 'Option2'
          },
          {
            value: 'Option3',
            label: 'Option3'
          },
          {
            value: 'Option4',
            label: 'Option4'
          },
          {
            value: 'Option5',
            label: 'Option5'
          }
        ],
        value: ''
      }
    }
  }
</script>
```

:::

### 有禁用选项

:::demo 在`mu-option`中，设定`disabled`值为 true，即可禁用该选项

```html
<template>
  <mu-select v-model="value" placeholder="Select">
    <mu-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" :disabled="item.disabled"> </mu-option>
  </mu-select>
</template>

<script>
  export default {
    data() {
      return {
        options: [
          {
            value: 'Option1',
            label: 'Option1'
          },
          {
            value: 'Option2',
            label: 'Option2',
            disabled: true
          },
          {
            value: 'Option3',
            label: 'Option3'
          },
          {
            value: 'Option4',
            label: 'Option4'
          },
          {
            value: 'Option5',
            label: 'Option5'
          }
        ],
        value: ''
      }
    }
  }
</script>
```

:::

### 禁用状态

选择器不可用状态

:::demo 为`mu-select`设置`disabled`属性，则整个选择器不可用

```html
<template>
  <mu-select v-model="value" disabled placeholder="Select">
    <mu-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </mu-option>
  </mu-select>
</template>

<script>
  export default {
    data() {
      return {
        options: [
          {
            value: 'Option1',
            label: 'Option1'
          },
          {
            value: 'Option2',
            label: 'Option2'
          },
          {
            value: 'Option3',
            label: 'Option3'
          },
          {
            value: 'Option4',
            label: 'Option4'
          },
          {
            value: 'Option5',
            label: 'Option5'
          }
        ],
        value: ''
      }
    }
  }
</script>
```

:::

### 可清空单选

包含清空按钮，可将选择器清空为初始状态

:::demo 为`mu-select`设置`clearable`属性，则可将选择器清空。需要注意的是，`clearable`属性仅适用于单选。

```html
<template>
  <mu-select v-model="value" clearable placeholder="Select">
    <mu-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </mu-option>
  </mu-select>
</template>

<script>
  export default {
    data() {
      return {
        options: [
          {
            value: 'Option1',
            label: 'Option1'
          },
          {
            value: 'Option2',
            label: 'Option2'
          },
          {
            value: 'Option3',
            label: 'Option3'
          },
          {
            value: 'Option4',
            label: 'Option4'
          },
          {
            value: 'Option5',
            label: 'Option5'
          },
          {
            value: 'Option11',
            label: 'Option1'
          },
          {
            value: 'Option21',
            label: 'Option2'
          },
          {
            value: 'Option31',
            label: 'Option3'
          },
          {
            value: 'Option41',
            label: 'Option4'
          },
          {
            value: 'Option51',
            label: 'Option5'
          },
          {
            value: 'Option12',
            label: 'Option1'
          },
          {
            value: 'Option22',
            label: 'Option2'
          },
          {
            value: 'Option32',
            label: 'Option3'
          },
          {
            value: 'Option42',
            label: 'Option4'
          },
          {
            value: 'Option52',
            label: 'Option5'
          },
          {
            value: 'Option13',
            label: 'Option1'
          },
          {
            value: 'Option23',
            label: 'Option2'
          },
          {
            value: 'Option33',
            label: 'Option3'
          },
          {
            value: 'Option43',
            label: 'Option4'
          },
          {
            value: 'Option53',
            label: 'Option5'
          }
        ],
        value: ''
      }
    }
  }
</script>
```

:::

### 自定义模板

可以自定义备选项

:::demo 将自定义的 HTML 模板插入`mu-option`的 slot 中即可。

```html
<template>
  <mu-select v-model="value" placeholder="Select">
    <mu-option v-for="item in cities" :key="item.value" :label="item.label" :value="item.value">
      <span style="float: left">{{ item.label }}</span>
      <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
    </mu-option>
  </mu-select>
</template>

<script>
  export default {
    data() {
      return {
        cities: [
          {
            value: 'Beijing',
            label: 'Beijing'
          },
          {
            value: 'Shanghai',
            label: 'Shanghai'
          },
          {
            value: 'Nanjing',
            label: 'Nanjing'
          },
          {
            value: 'Chengdu',
            label: 'Chengdu'
          },
          {
            value: 'Shenzhen',
            label: 'Shenzhen'
          },
          {
            value: 'Guangzhou',
            label: 'Guangzhou'
          }
        ],
        value: ''
      }
    }
  }
</script>
```

### 可搜索

可以利用搜索功能快速查找选项

:::demo 为`mu-select`添加`filterable`属性即可启用搜索功能。默认情况下，Select 会找出所有`label`属性包含输入值的选项。如果希望使用其他的搜索逻辑，可以通过传入一个`filter-method`来实现。`filter-method`为一个`Function`，它会在输入值发生变化时调用，参数为当前输入值。

```html
<template>
  <mu-select v-model="value" filterable placeholder="Select">
    <mu-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </mu-option>
  </mu-select>
</template>

<script>
  export default {
    data() {
      return {
        options: [
          {
            value: 'Option1',
            label: 'Option1'
          },
          {
            value: 'Option2',
            label: 'Option2'
          },
          {
            value: 'Option3',
            label: 'Option3'
          },
          {
            value: 'Option4',
            label: 'Option4'
          },
          {
            value: 'Option5',
            label: 'Option5'
          }
        ],
        value: ''
      }
    }
  }
</script>
```

:::

### 创建条目

可以创建并选中选项中不存在的条目
:::demo 使用`allow-create`属性即可通过在输入框中输入文字来创建新的条目。注意此时`filterable`必须为真。本例还使用了`default-first-option`属性，在该属性打开的情况下，按下回车就可以选中当前选项列表中的第一个选项，无需使用鼠标或键盘方向键进行定位。

```html
<template>
  <mu-select v-model="value" multiple filterable allow-create default-first-option placeholder="Choose tags for your article">
    <mu-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </mu-option>
  </mu-select>
</template>

<script>
  export default {
    data() {
      return {
        options: [
          {
            value: 'HTML',
            label: 'HTML'
          },
          {
            value: 'CSS',
            label: 'CSS'
          },
          {
            value: 'JavaScript',
            label: 'JavaScript'
          }
        ],
        value: []
      }
    }
  }
</script>
```

:::

:::tip
如果 Select 的绑定值为对象类型，请务必指定 `value-key` 作为它的唯一性标识。
:::

### Select Attributes

| 参数                  | 说明                                                                           | 类型                      | 可选值 | 默认值     |
| --------------------- | ------------------------------------------------------------------------------ | ------------------------- | ------ | ---------- |
| value / v-model       | 绑定值                                                                         | boolean / string / number | —      | —          |
| disabled              | 是否禁用                                                                       | boolean                   | —      | false      |
| value-key             | 作为 value 唯一标识的键名，绑定值为对象类型时必填                              | string                    | —      | value      |
| clearable             | 是否可以清空选项                                                               | boolean                   | —      | false      |
| name                  | select input 的 name 属性                                                      | string                    | —      | —          |
| autocomplete          | select input 的 autocomplete 属性                                              | string                    | —      | off        |
| placeholder           | 占位符                                                                         | string                    | —      | 请选择     |
| filterable            | 是否可搜索                                                                     | boolean                   | —      | false      |
| allow-create          | 是否允许用户创建新条目，需配合 `filterable` 使用                               | boolean                   | —      | false      |
| no-match-text         | 搜索条件无匹配时显示的文字，也可以使用`slot="empty"`设置                       | string                    | —      | 无匹配数据 |
| no-data-text          | 选项为空时显示的文字，也可以使用`slot="empty"`设置                             | string                    | —      | 无数据     |
| popper-class          | Select 下拉框的类名                                                            | string                    | —      | —          |
| default-first-option  | 在输入框按下回车，选择第一个匹配项。需配合 `filterable` 或 `remote` 使用       | boolean                   | -      | false      |
| popper-append-to-body | 是否将弹出框插入至 body 元素。在弹出框的定位出现问题时，可将该属性设置为 false | boolean                   | -      | true       |
| automatic-dropdown    | 对于不可搜索的 Select，是否在输入框获得焦点后自动弹出选项菜单                  | boolean                   | -      | false      |

### Select Events

| 事件名称       | 说明                                     | 回调参数                      |
| -------------- | ---------------------------------------- | ----------------------------- |
| change         | 选中值发生变化时触发                     | 目前的选中值                  |
| visible-change | 下拉框出现/隐藏时触发                    | 出现则为 true，隐藏则为 false |
| clear          | 可清空的单选模式下用户点击清空按钮时触发 | —                             |
| blur           | 当 input 失去焦点时触发                  | (event: Event)                |
| focus          | 当 input 获得焦点时触发                  | (event: Event)                |

### Select Slots

|   name  | 说明                |
| ------- | ------------------- |
| —       | Option 组件列表     |
| prefix  | Select 组件头部内容 |
| empty   | 无选项时的列表      |

### Option Group Attributes

| 参数     | 说明                           | 类型    | 可选值 | 默认值 |
| -------- | ------------------------------ | ------- | ------ | ------ |
| label    | 分组的组名                     | string  | —      | —      |
| disabled | 是否将该分组下所有选项置为禁用 | boolean | —      | false  |

### Option Attributes

| 参数     | 说明                                      | 类型                 | 可选值 | 默认值 |
| -------- | ----------------------------------------- | -------------------- | ------ | ------ |
| value    | 选项的值                                  | string/number/object | —      | —      |
| label    | 选项的标签，若不设置则默认与 `value` 相同 | string/number        | —      | —      |
| disabled | 是否禁用该选项                            | boolean              | —      | false  |

### Methods

| 方法名 | 说明                            | 参数 |
| ------ | ------------------------------- | ---- |
| focus  | 使 input 获取焦点               | -    |
| blur   | 使 input 失去焦点，并隐藏下拉框 | -    |
