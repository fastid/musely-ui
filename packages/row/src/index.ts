import { CreateElement } from 'vue'
import { Component, Vue, Prop } from 'vue-property-decorator'
import { HorizontalAlignment, VertialAlignment, MuRow as Row } from '../index'
@Component({
  name: 'MuRow'
})
export default class MuRow extends Vue implements Row {
  @Prop({ default: 24, type: Number }) span!: number
  @Prop({ default: 'div', type: String }) tag!: string

  @Prop({ type: Number }) gutter!: number
  @Prop({ type: String, default: 'start' }) justify!: HorizontalAlignment
  @Prop({ type: String, default: 'top' }) align!: VertialAlignment
  @Prop({ type: String }) type!: string

  get style() {
    const ret: { marginLeft?: string; marginRight?: string } = {}

    if (this.gutter) {
      ret.marginLeft = `-${this.gutter / 2}px`
      ret.marginRight = ret.marginLeft
    }

    return ret
  }
  render(h: CreateElement) {
    return h(
      this.tag,
      {
        class: ['mu-row', this.justify !== 'start' ? `is-justify-${this.justify}` : '', this.align !== 'top' ? `is-align-${this.align}` : '', { 'mu-row--flex': this.type === 'flex' }],
        style: this.style
      },
      this.$slots.default
    )
  }
}
