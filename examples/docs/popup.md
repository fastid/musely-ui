<!--
 * @Author: Victor wang
 * @Date: 2020-05-09 22:45:06
 * @LastEditors: Victor.wang
 * @LastEditTime: 2020-05-18 03:00:47
 * @Description:
 -->

# Popup

## 弹出框，可自定义内容。

`position` 属性指定了 `popup` 的位置。比如，`position` 为 'bottom' 时，`popup` 会从屏幕下方移入，并最终固定在屏幕下方。移入/移出的动效会根据 `position` 的不同而自动改变，无需手动配置。

将 `v-model` 绑定到一个本地变量，通过操作这个变量即可控制 `popup` 的显示与隐藏。

### 基础用法

:::demo

```html
<mu-button @click="setButtonBottom" ref="button">跟随弹出 popup</mu-button>
<mu-button @click="popupVisible2 = true">页头弹出 popup</mu-button>
<mu-button @click="popupVisible4 = true">页尾弹出 popup</mu-button>
<mu-button @click="popupVisible3 = true">右侧弹出 popup</mu-button>

<mu-popup v-model="popupVisible" popup-transition="popup-fade" class="popupDef" :style="{ top: buttonBottom + 80 + 'px', left: buttonLeft + 220 + 'px' }">
  <h1>popup</h1>
  <p>/ ˈpɑpˌʌp /</p>
  <p>A popup window displays, listing the available user management properties.</p>
</mu-popup>

<mu-popup v-model="popupVisible2" position="top" :modal="false" class="popupTop">
  <p>We would create a Border and a Popup element to display the Preview.</p>
</mu-popup>

<mu-popup v-model="popupVisible3" position="right" class="popupRight" :modal="false">
  <p>At the right upper corner of this window there is a popup list and two navigation buttons.</p>
  <span><mu-button @click="popupVisible3 = false" type="primary">close popup</mu-button></span>
</mu-popup>

<mu-popup v-model="popupVisible4" position="bottom" class="popupBottom">
  <p>This is a test of operator notification via network popup-please ignore it.</p>
</mu-popup>
<script>
  export default {
    data() {
      return {
        popupVisible: false,
        popupVisible2: false,
        popupVisible3: false,
        popupVisible4: false,
        buttonBottom: 0,
        buttonLeft: 0
      }
    },
    methods: {
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then((_) => {
            done()
          })
          .catch((_) => {})
      },
      setButtonBottom() {
        this.popupVisible = true
        this.buttonBottom = this.$refs.button.$el.getBoundingClientRect().bottom
        this.buttonLeft = this.$refs.button.$el.getBoundingClientRect().left
      }
    },
    watch: {
      popupVisible2(val) {
        if (val) {
          setTimeout(() => {
            this.popupVisible2 = false
          }, 2000)
        }
      }
    }
  }
</script>
<style>
  .popupTop {
    width: 100%;
    height: 50px;
    text-align: center;
    background-color: rgba(0, 0, 0, 0.7);
    backface-visibility: hidden;
  }
</style>
```

:::

### 基础用法

若省略 `position` 属性，则 `popup` 会相对于屏幕居中显示（若不想让其居中，可通过 CSS 对其重新定位）。此时建议将动效设置为 `popup-fade`，这样在显示/隐藏时会有淡入/淡出效果。

:::demo

```html
<mu-button type="text" @click="popupVisible = true">点击打开 Popup</mu-button>

<mu-popup v-model="popupVisible" popup-transition="popup-fade">
  <p>You can get real time values or inverted values, includes popup menu.</p>

  <p>你能获得实时的值，或者转换的值，包括弹出菜单。</p>

  <p>A popup dialog with the text "Do you want to install Controller Client" will appear.</p>

  <p>将显示一个弹出对话框，其中显示文本“Do you want to install Controller Client”。</p>
</mu-popup>

<script>
  export default {
    data() {
      return {
        popupVisible: false
      }
    },
    methods: {
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then((_) => {
            done()
          })
          .catch((_) => {})
      }
    }
  }
</script>
```

:::

## API

| 参数              | 说明                                            | 类型    | 可选值                                 | 默认值 |
| ----------------- | ----------------------------------------------- | ------- | -------------------------------------- | ------ |
| position          | `popup` 的位置。省略则居中显示                  | String  | 'top'<br>'right'<br>'bottom'<br>'left' |        |
| pop-transition    | 显示/隐藏时的动效，仅在省略 `position` 时可配置 | String  | 'popup-fade'                           |        |
| modal             | 是否创建一个 modal 层                           | Boolean |                                        | true   |
| closeOnClickModal | 是否可以通过点击 modal 层来关闭 `popup`         | Boolean |                                        | true   |

## Slot

| name | 描述         |
| ---- | ------------ |
| -    | 弹出框的内容 |

```

```
