/**
 * @Author: Victor wang
 * @Date: 2020-06-23 23:09:16
 * @LastEditors: Victor.wang
 * @LastEditTime: 2020-06-23 23:09:17
 * @Description:
 */
<script lang='ts'>
import { Component, Vue, Watch } from 'vue-property-decorator'

@Component({
  name: 'NavigationMixin'
})
export default class NavigationMixin extends Vue {
  @Watch('hoverIndex')
  onWatchHoverIndex(val: any) {
    if (typeof val === 'number' && val > -1) {
      this.hoverOption = this.options[val] || {}
    }
    this.options.forEach((option: any) => {
      option.hover = this.hoverOption === option
    })
  }

  options: any = null
  visible: any = null
  filteredOptionsCount: any = null
  hoverIndex: any = null

  scrollToOption(args?: any) {
    //
  }

  hoverOption = -1

  get optionsAllDisabled() {
    return this.options
      .filter((option: any) => option.visible)
      .every((option: any) => option.disabled)
  }

  navigateOptions(direction: any) {
    if (!this.visible) {
      this.visible = true
      return
    }
    if (this.options.length === 0 || this.filteredOptionsCount === 0) return
    if (!this.optionsAllDisabled) {
      if (direction === 'next') {
        this.hoverIndex++
        if (this.hoverIndex === this.options.length) {
          this.hoverIndex = 0
        }
      } else if (direction === 'prev') {
        this.hoverIndex--
        if (this.hoverIndex < 0) {
          this.hoverIndex = this.options.length - 1
        }
      }
      const option = this.options[this.hoverIndex]
      if (
        option.disabled === true ||
        option.groupDisabled === true ||
        !option.visible
      ) {
        this.navigateOptions(direction)
      }
      this.$nextTick(() => this.scrollToOption(this.hoverOption))
    }
  }
}
</script>
