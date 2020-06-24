<!--
 * @Author: Victor wang
 * @Date: 2020-06-24 14:17:17
 * @LastEditors: Victor.wang
 * @LastEditTime: 2020-06-24 15:03:30
 * @Description:
-->
<script lang='tsx'>
import { Component, Vue, Prop } from 'vue-property-decorator'
import { on, off } from 'musely-ui/src/utils/dom'
const BAR_MAP = {
  vertical: {
    offset: 'offsetHeight',
    scroll: 'scrollTop',
    scrollSize: 'scrollHeight',
    size: 'height',
    key: 'vertical',
    axis: 'Y',
    client: 'clientY',
    direction: 'top'
  },
  horizontal: {
    offset: 'offsetWidth',
    scroll: 'scrollLeft',
    scrollSize: 'scrollWidth',
    size: 'width',
    key: 'horizontal',
    axis: 'X',
    client: 'clientX',
    direction: 'left'
  }
}

function renderThumbStyle(args: any) {
  const style: any = {}
  const { move, size, bar } = args
  const translate = `translate${bar.axis}(${move}%)`

  style[bar.size] = size
  style.transform = translate
  style.msTransform = translate
  style.webkitTransform = translate

  return style
}

@Component({
  name: 'MuScrollBar'
})
export default class MuScrollBar extends Vue {
  @Prop({ type: Boolean }) vertical!: boolean
  @Prop({ type: String }) size!: string
  @Prop({ type: Number }) move!: number

  get bar() {
    return BAR_MAP[this.vertical ? 'vertical' : 'horizontal']
  }

  get wrap() {
    return (this.$parent as any).wrap
  }

  render() {
    const { size, move, bar } = this

    return (
      <div
        class={['mu-scrollbar__bar', 'is-' + bar.key]}
        onMousedown={this.clickTrackHandler}
      >
        <div
          ref="thumb"
          class="mu-scrollbar__thumb"
          onMousedown={this.clickThumbHandler}
          style={renderThumbStyle({ size, move, bar })}
        ></div>
      </div>
    )
  }

  clickThumbHandler(e: any) {
    // prevent click event of right button
    if (e.ctrlKey || e.button === 2) {
      return
    }
    this.startDrag(e)
    ;(this as any)[this.bar.axis] =
      e.currentTarget[this.bar.offset] -
      (e[this.bar.client] -
        e.currentTarget.getBoundingClientRect()[this.bar.direction])
  }

  clickTrackHandler(e: any) {
    const offset = Math.abs(
      e.target.getBoundingClientRect()[this.bar.direction] - e[this.bar.client]
    )
    const thumbHalf = (this as any).$refs.thumb[this.bar.offset] / 2
    const thumbPositionPercentage =
      ((offset - thumbHalf) * 100) / (this as any).$el[this.bar.offset]

    this.wrap[this.bar.scroll] =
      (thumbPositionPercentage * this.wrap[this.bar.scrollSize]) / 100
  }

  startDrag(e: any) {
    e.stopImmediatePropagation()(this as any).cursorDown = true

    on(document, 'mousemove', this.mouseMoveDocumentHandler)
    on(document, 'mouseup', this.mouseUpDocumentHandler)
    document.onselectstart = () => false
  }

  mouseMoveDocumentHandler(e: any) {
    if ((this as any).cursorDown === false) return
    const prevPage = (this as any)[this.bar.axis]

    if (!prevPage) return

    const offset =
      ((this as any).$el.getBoundingClientRect()[this.bar.direction] -
        e[this.bar.client]) *
      -1
    const thumbClickPosition =
      (this as any).$refs.thumb[this.bar.offset] - prevPage
    const thumbPositionPercentage =
      ((offset - thumbClickPosition) * 100) / (this as any).$el[this.bar.offset]

    this.wrap[this.bar.scroll] =
      (thumbPositionPercentage * this.wrap[this.bar.scrollSize]) / 100
  }

  mouseUpDocumentHandler() {
    ;(this as any).cursorDown = false
    ;(this as any)[this.bar.axis] = 0
    off(document, 'mousemove', this.mouseMoveDocumentHandler)
    document.onselectstart = null
  }

  destroyed() {
    off(document, 'mouseup', this.mouseUpDocumentHandler)
  }
}
</script>
