import { CreateElement } from 'vue'
import { Component, Vue, Prop } from 'vue-property-decorator'
import { MuCol as Col } from '../index'
@Component({
  name: 'MuCol'
})
export default class MuCol extends Vue implements Col {
  @Prop({ default: 24, type: Number }) span!: number
  @Prop({ default: 'div', type: String }) tag!: string

  @Prop({ type: Number }) offset!: number
  @Prop({ type: Number }) pull!: number
  @Prop({ type: Number }) push!: number
  @Prop({ type: [Number, Object] }) xs!: number
  @Prop({ type: [Number, Object] }) sm!: number
  @Prop({ type: [Number, Object] }) md!: number
  @Prop({ type: [Number, Object] }) lg!: number
  @Prop({ type: [Number, Object] }) xl!: number

  get gutter() {
    let parent = this.$parent
    while (parent && parent.$options.name !== 'MuRow') {
      parent = parent.$parent
    }
    return parent ? (parent as any).gutter : 0
  }

  render(h: CreateElement) {
    const classList: any[] = []
    const style: any = {}
    if (this.gutter) {
      style.paddingLeft = this.gutter / 2 + 'px'
      style.paddingRight = style.paddingLeft
    }
    const arr = ['span', 'offset', 'pull', 'push']
    arr.forEach((prop) => {
      if ((this as Col)[prop] || (this as Col)[prop] === 0) {
        const props = (this as Col)[prop]
        classList.push(prop !== 'span' ? `mu-col-${prop}-${props}` : `mu-col-${props}`)
      }
    })
    const tmp = ['xs', 'sm', 'md', 'lg', 'xl']
    tmp.forEach((size) => {
      if (typeof (this as Col)[size] === 'number') {
        classList.push(`mu-col-${size}-${(this as Col)[size]}`)
      } else if (typeof (this as Col)[size] === 'object') {
        const props = (this as Col)[size]
        Object.keys(props).forEach((prop) => {
          classList.push(prop !== 'span' ? `mu-col-${size}-${prop}-${props[prop]}` : `mu-col-${size}-${props[prop]}`)
        })
      }
    })

    return h(
      this.tag,
      {
        class: ['mu-col', classList],
        style
      },
      this.$slots.default
    )
  }
}
