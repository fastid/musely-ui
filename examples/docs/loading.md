<!--
 * @Author: Victor wang
 * @Date: 2020-06-21 15:14:21
 * @LastEditors: Victor.wang
 * @LastEditTime: 2020-06-21 15:39:12
 * @Description:
-->

## Loading 加载

加载数据时显示动效。

### 整页加载

页面数据加载时显示。

:::demo 当使用指令方式时，全屏遮罩需要添加`fullscreen`修饰符（遮罩会插入至 body 上），此时若需要锁定屏幕的滚动，可以使用`lock`修饰符；当使用服务方式时，遮罩默认即为全屏，无需额外设置。

```html
<template>
  <mu-button type="primary" @click="openFullScreen1" v-loading.fullscreen.lock="fullscreenLoading">
    As a directive
  </mu-button>
  <mu-button type="primary" @click="openFullScreen2">
    As a service
  </mu-button>
</template>

<script>
  export default {
    data() {
      return {
        fullscreenLoading: false
      }
    },
    methods: {
      openFullScreen1() {
        this.fullscreenLoading = true
        setTimeout(() => {
          this.fullscreenLoading = false
        }, 2000)
      },
      openFullScreen2() {
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'mu-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        setTimeout(() => {
          loading.close()
        }, 2000)
      }
    }
  }
</script>
```

:::

### 服务

Loading 还可以以服务的方式调用。引入 Loading 服务：

```javascript
import { Loading } from 'musely-ui'
```

在需要调用时：

```javascript
Loading.service(options)
```

其中 `options` 参数为 Loading 的配置项，具体见下表。`LoadingService` 会返回一个 Loading 实例，可通过调用该实例的 `close` 方法来关闭它：

```javascript
let loadingInstance = Loading.service(options)
this.$nextTick(() => {
  // 以服务的方式调用的 Loading 需要异步关闭
  loadingInstance.close()
})
```

需要注意的是，以服务的方式调用的全屏 Loading 是单例的：若在前一个全屏 Loading 关闭前再次调用全屏 Loading，并不会创建一个新的 Loading 实例，而是返回现有全屏 Loading 的实例：

```javascript
let loadingInstance1 = Loading.service({ fullscreen: true })
let loadingInstance2 = Loading.service({ fullscreen: true })
console.log(loadingInstance1 === loadingInstance2) // true
```

此时调用它们中任意一个的 `close` 方法都能关闭这个全屏 Loading。

如果完整引入了 Musely，那么 Vue.prototype 上会有一个全局方法 `$loading`，它的调用方式为：`this.$loading(options)`，同样会返回一个 Loading 实例。

### Options

| 参数        | 说明                                                                                                                                       | 类型          | 可选值 | 默认值        |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------ | ------------- | ------ | ------------- |
| target      | Loading 需要覆盖的 DOM 节点。可传入一个 DOM 对象或字符串；若传入字符串，则会将其作为参数传入 `document.querySelector`以获取到对应 DOM 节点 | object/string | —      | document.body |
| body        | 同 `v-loading` 指令中的 `body` 修饰符                                                                                                      | boolean       | —      | false         |
| fullscreen  | 同 `v-loading` 指令中的 `fullscreen` 修饰符                                                                                                | boolean       | —      | true          |
| lock        | 同 `v-loading` 指令中的 `lock` 修饰符                                                                                                      | boolean       | —      | false         |
| text        | 显示在加载图标下方的加载文案                                                                                                               | string        | —      | —             |
| spinner     | 自定义加载图标类名                                                                                                                         | string        | —      | —             |
| background  | 遮罩背景色                                                                                                                                 | string        | —      | —             |
| customClass | Loading 的自定义类名                                                                                                                       | string        | —      | —             |
