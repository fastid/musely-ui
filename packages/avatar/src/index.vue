<!--
 * @Author: Victor wang
 * @Date: 2020-05-13 11:02:48
 * @LastEditors: Victor.wang
 * @LastEditTime: 2020-05-17 00:46:58
 * @Description:
 -->
<script lang='tsx'>
import { MuAvatar as Avatar } from 'types/avatar'
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({
  name: 'MuAvatar'
})
export default class MuAvatar extends Vue implements Avatar {
  @Prop({
    type: [String, Number],
    validator(val) {
      if (typeof val === 'string') {
        return ['large', 'medium', 'small'].includes(val)
      }
      return typeof val === 'number'
    }
  })
  size!: string | number

  @Prop({
    type: String,
    default: 'circle',
    validator(val) {
      return ['circle', 'square'].includes(val)
    }
  })
  shape!: string

  @Prop({ type: String }) icon!: string
  @Prop({ type: String }) src!: string
  @Prop({ type: String }) alt!: string
  @Prop({ type: String }) srcSet!: string
  @Prop({ type: Function }) error!: () => false
  @Prop({
    type: String,
    default: 'cover'
  })
  fit!: string

  private isImageExist = true

  get avatarClass() {
    const { size, icon, shape } = this
    const classList = ['mu-avatar']

    if (size && typeof size === 'string') {
      classList.push(`mu-avatar--${size}`)
    }

    if (icon) {
      classList.push('mu-avatar--icon')
    }

    if (shape) {
      classList.push(`mu-avatar--${shape}`)
    }

    return classList.join(' ')
  }

  handleError() {
    const { error } = this
    const errorFlag = error ? error() : undefined
    if (errorFlag !== false) {
      this.isImageExist = false
    }
  }

  renderAvatar() {
    const { icon, src, alt, isImageExist, srcSet, fit } = this
    if (isImageExist && src) {
      return (
        <img
          src={src}
          onError={this.handleError}
          alt={alt}
          srcSet={srcSet}
          style={{ 'object-fit': fit }}
        />
      )
    }

    if (icon) {
      return <i class={icon} />
    }

    return this.$slots.default
  }

  render() {
    const { avatarClass, size } = this
    const p = {
      height: `${size}px`,
      width: `${size}px`,
      lineHeight: `${size}px`
    }
    const sizeStyle = typeof size === 'number' ? p : {}

    return (
      <span class={avatarClass} style={sizeStyle}>
        {this.renderAvatar()}
      </span>
    )
  }
}
</script>
