<!--
 * @Author: Victor wang
 * @Date: 2020-06-12 10:26:02
 * @LastEditors: Victor.wang
 * @LastEditTime: 2020-06-17 21:38:09
 * @Description:
-->
<script lang='tsx'>
import { Vue, Component, Prop, Inject, Watch } from 'vue-property-decorator'
@Component({
  name: 'LabelWrap'
})
export default class LabelWrap extends Vue {
  @Prop({ type: Boolean }) private isAutoWidth!: boolean
  @Prop({ type: Boolean }) private updateAll!: boolean

  @Inject() muForm!: any
  @Inject() muFormItem!: any

  private computedWidth = 0

  render() {
    const slots = this.$slots.default
    if (!slots) return null
    if (this.isAutoWidth) {
      const autoLabelWidth = this.muForm.autoLabelWidth
      const style: any = {}
      if (autoLabelWidth && autoLabelWidth !== 'auto') {
        const marginLeft = parseInt(autoLabelWidth, 10) - this.computedWidth
        if (marginLeft) {
          style.marginLeft = marginLeft + 'px'
        }
      }
      return (
        <div class="mu-form-item__label-wrap" style={style}>
          {slots}
        </div>
      )
    } else {
      return slots[0]
    }
  }

  getLabelWidth() {
    if (this.$el && this.$el.firstElementChild) {
      const computedWidth = window.getComputedStyle(this.$el.firstElementChild)
        .width
      return Math.ceil(parseFloat(computedWidth))
    } else {
      return 0
    }
  }

  updateLabelWidth(action = 'update') {
    if (this.$slots.default && this.isAutoWidth && this.$el.firstElementChild) {
      if (action === 'update') {
        this.computedWidth = this.getLabelWidth()
      } else if (action === 'remove') {
        this.muForm.deregisterLabelWidth(this.computedWidth)
      }
    }
  }

  updated() {
    this.updateLabelWidth('update')
  }

  beforeDestroy() {
    this.updateLabelWidth('remove')
  }

  mounted() {
    this.updateLabelWidth('update')
  }

  @Watch('computedWidth')
  onWatchComputedWidth(val: any, oldVal: any) {
    if (this.updateAll) {
      this.muForm.registerLabelWidth(val, oldVal)
      this.muFormItem.updateComputedLabelWidth(val)
    }
  }
}
</script>
