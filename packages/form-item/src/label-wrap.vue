<!--
 * @Author: Victor wang
 * @Date: 2020-06-12 10:26:02
 * @LastEditors: Victor.wang
 * @LastEditTime: 2020-06-14 11:44:04
 * @Description:
-->
<script>

export default {
  props: {
    isAutoWidth: Boolean,
    updateAll: Boolean
  },

  inject: ['muForm', 'muFormItem'],

  render () {
    const slots = this.$slots.default
    if (!slots) return null
    if (this.isAutoWidth) {
      const autoLabelWidth = this.muForm.autoLabelWidth
      const style = {}
      if (autoLabelWidth && autoLabelWidth !== 'auto') {
        const marginLeft = parseInt(autoLabelWidth, 10) - this.computedWidth
        if (marginLeft) {
          style.marginLeft = marginLeft + 'px'
        }
      }
      return (<div class="el-form-item__label-wrap" style={style}>
        {slots}
      </div>)
    } else {
      return slots[0]
    }
  },

  methods: {
    getLabelWidth () {
      if (this.$el && this.$el.firstElementChild) {
        const computedWidth = window.getComputedStyle(this.$el.firstElementChild).width
        return Math.ceil(parseFloat(computedWidth))
      } else {
        return 0
      }
    },
    updateLabelWidth (action = 'update') {
      if (this.$slots.default && this.isAutoWidth && this.$el.firstElementChild) {
        if (action === 'update') {
          this.computedWidth = this.getLabelWidth()
        } else if (action === 'remove') {
          this.muForm.deregisterLabelWidth(this.computedWidth)
        }
      }
    }
  },

  watch: {
    computedWidth (val, oldVal) {
      if (this.updateAll) {
        this.muForm.registerLabelWidth(val, oldVal)
        this.muFormItem.updateComputedLabelWidth(val)
      }
    }
  },

  data () {
    return {
      computedWidth: 0
    }
  },

  mounted () {
    this.updateLabelWidth('update')
  },

  updated () {
    this.updateLabelWidth('update')
  },

  beforeDestroy () {
    this.updateLabelWidth('remove')
  }
}
</script>
