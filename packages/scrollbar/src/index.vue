<!--
 * @Author: Victor wang
 * @Date: 2020-04-14 19:02:17
 * @LastEditors: Victor.wang
 * @LastEditTime: 2020-06-24 15:12:26
 * @Description:
 -->
<script lang='tsx'>
import { Component, Prop, Vue } from 'vue-property-decorator'
import {
  addResizeListener,
  removeResizeListener
} from 'musely-ui/src/utils/resize-event'
import scrollbarWidth from 'musely-ui/src/utils/scrollbar-width'
import { toObject } from 'musely-ui/src/utils'
import Bar from './bar.vue'

@Component({
  name: 'MuScrollbar',
  components: { Bar }
})
export default class MuMain extends Vue {
  @Prop({ type: Boolean }) native!: boolean
  @Prop() wrapStyle!: {}
  @Prop() wrapClass!: {}
  @Prop() viewClass!: {}
  @Prop() viewStyle!: {}
  @Prop({ type: Boolean }) noresize!: boolean // 如果 container 尺寸不会发生变化，最好设置它可以优化性能
  @Prop({
    type: String,
    default: 'div'
  })
  tag!: string

  sizeWidth = '0'
  sizeHeight = '0'
  moveX = 0
  moveY = 0

  get wrap() {
    return this.$refs.wrap
  }

  render(h: any) {
    const gutter = scrollbarWidth()
    let style: any = this.wrapStyle

    if (gutter) {
      const gutterWith = `-${gutter}px`
      const gutterStyle = `margin-bottom: ${gutterWith}; margin-right: ${gutterWith};`

      if (Array.isArray(this.wrapStyle)) {
        style = toObject(this.wrapStyle)
        style.marginRight = style.marginBottom = gutterWith
      } else if (typeof this.wrapStyle === 'string') {
        style += gutterStyle
      } else {
        style = gutterStyle
      }
    }
    const view = h(
      this.tag,
      {
        class: ['mu-scrollbar__view', this.viewClass],
        style: this.viewStyle,
        ref: 'resize'
      },
      this.$slots.default
    )
    const wrap = (
      <div
        ref="wrap"
        style={style}
        onScroll={this.handleScroll}
        class={[
          this.wrapClass,
          'mu-scrollbar__wrap',
          gutter ? '' : 'mu-scrollbar__wrap--hidden-default'
        ]}
      >
        {[view]}
      </div>
    )
    let nodes

    if (!this.native) {
      nodes = [
        wrap,
        // eslint-disable-next-line
        <Bar move={this.moveX} size={this.sizeWidth}></Bar>,
        // eslint-disable-next-line
        <Bar vertical move={this.moveY} size={this.sizeHeight}></Bar>
      ]
    } else {
      nodes = [
        <div
          ref="wrap"
          class={[this.wrapClass, 'mu-scrollbar__wrap']}
          style={style}
        >
          {[view]}
        </div>
      ]
    }
    return h('div', { class: 'mu-scrollbar' }, nodes)
  }

  handleScroll() {
    const wrap: any = this.wrap

    this.moveY = (wrap.scrollTop * 100) / wrap.clientHeight
    this.moveX = (wrap.scrollLeft * 100) / wrap.clientWidth
  }

  update() {
    const wrap: any = this.wrap
    if (!wrap) return

    const heightPercentage: any = (wrap.clientHeight * 100) / wrap.scrollHeight
    const widthPercentage: any = (wrap.clientWidth * 100) / wrap.scrollWidth

    this.sizeHeight = heightPercentage < 100 ? heightPercentage + '%' : ''
    this.sizeWidth = widthPercentage < 100 ? widthPercentage + '%' : ''
  }

  mounted() {
    if (this.native) return
    this.$nextTick(this.update)
    !this.noresize && addResizeListener(this.$refs.resize, this.update)
  }

  beforeDestroy() {
    if (this.native) return
    !this.noresize && removeResizeListener(this.$refs.resize, this.update)
  }
}
</script>
