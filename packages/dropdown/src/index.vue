<!--
 * @Author: Victor wang
 * @Date: 2020-04-14 19:02:17
 * @LastEditors: Victor.wang
 * @LastEditTime: 2020-06-20 22:58:20
 * @Description:
 -->
<script lang='tsx'>
import {
  MuDropdown as Dropdown,
  DropdownMenuTrigger,
  DropdownMenuAlignment
} from 'types/dropdown'
import { ButtonType } from 'types/button'
import { Component, Mixins, Prop, Watch } from 'vue-property-decorator'
import Clickoutside from 'musely-ui/src/utils/clickoutside'
import Emitter from 'musely-ui/src/mixins/emitter'
import MuButton from '~/button'
import MuButtonGroup from '~/button-group'
import { generateId } from 'musely-ui/src/utils/'

interface KeyEvent extends Event {
  keyCode: number
}

@Component({
  name: 'MuDropdown',
  directives: { Clickoutside },
  components: {
    MuButton,
    MuButtonGroup
  },
  provide() {
    return {
      dropdown: this
    }
  }
})
export default class MuDropdown extends Mixins(Emitter) implements Dropdown {
  @Prop({
    type: String,
    default: 'hover'
  })
  trigger!: DropdownMenuTrigger

  @Prop() type!: ButtonType
  @Prop({
    type: String,
    default: ''
  })
  size!: string

  @Prop({ type: Boolean }) splitButton!: boolean
  @Prop({
    type: Boolean,
    default: true
  })
  hideOnClick!: boolean

  @Prop({
    type: String,
    default: 'bottom-end'
  })
  placement!: DropdownMenuAlignment

  @Prop({ default: true }) visibleArrow!: boolean

  @Prop({
    type: Number,
    default: 250
  })
  showTimeout!: number

  @Prop({
    type: Number,
    default: 150
  })
  hideTimeout!: number

  @Prop({ type: Number }) tabindex!: number

  private timeout: any = null
  private visible = false
  popperMu: any = null
  triggerMu: any = null
  private menuItems: any = null
  private menuItemsArray: any = null
  private dropdownMu: any = null
  private focusing = false
  private listId = `dropdown-menu-${generateId()}`

  mounted() {
    this.$on('menu-item-click', this.handleMenuItemClick)
  }

  @Watch('visible')
  onWatchVisible(val: any) {
    this.broadcast('MuDropdownMenu', 'visible', val)
    this.$emit('visible-change', val)
  }

  @Watch('focusing')
  onWatchFocusing(val: any) {
    const selfDefine = this.$el.querySelector('.mu-dropdown-selfdefine')
    if (selfDefine) {
      // 自定义
      if (val) {
        selfDefine.className += ' focusing'
      } else {
        selfDefine.className = selfDefine.className.replace('focusing', '')
      }
    }
  }

  getMigratingConfig() {
    return {
      props: {
        'menu-align': 'menu-align is renamed to placement.'
      }
    }
  }

  show() {
    if (this.triggerMu.disabled) {
      return
    }
    clearTimeout(this.timeout)
    this.timeout = setTimeout(
      () => {
        this.visible = true
      },
      this.trigger === 'click' ? 0 : this.showTimeout
    )
  }

  hide() {
    if (this.triggerMu.disabled) {
      return
    }
    this.removeTabindex()
    if (this.tabindex >= 0) {
      this.resetTabindex(this.triggerMu)
    }
    clearTimeout(this.timeout)
    this.timeout = setTimeout(
      () => {
        this.visible = false
      },
      this.trigger === 'click' ? 0 : this.hideTimeout
    )
  }

  handleClick() {
    if (this.triggerMu.disabled) return
    if (this.visible) {
      this.hide()
    } else {
      this.show()
    }
  }

  handleTriggerKeyDown(ev: KeyEvent) {
    const keyCode = ev.keyCode
    if ([38, 40].indexOf(keyCode) > -1) {
      // up/down
      this.removeTabindex()
      this.resetTabindex(this.menuItems[0])
      this.menuItems[0].focus()
      ev.preventDefault()
      ev.stopPropagation()
    } else if (keyCode === 13) {
      // space enter选中
      this.handleClick()
    } else if ([9, 27].indexOf(keyCode) > -1) {
      // tab || esc
      this.hide()
    }
  }

  handleItemKeyDown(ev: KeyEvent) {
    const keyCode = ev.keyCode
    const target = ev.target
    const currentIndex = this.menuItemsArray.indexOf(target)
    const max = this.menuItemsArray.length - 1
    let nextIndex
    if ([38, 40].indexOf(keyCode) > -1) {
      // up/down
      if (keyCode === 38) {
        // up
        nextIndex = currentIndex !== 0 ? currentIndex - 1 : 0
      } else {
        // down
        nextIndex = currentIndex < max ? currentIndex + 1 : max
      }
      this.removeTabindex()
      this.resetTabindex(this.menuItems[nextIndex])
      this.menuItems[nextIndex].focus()
      ev.preventDefault()
      ev.stopPropagation()
    } else if (keyCode === 13) {
      // enter选中
      this.triggerMuFocus()
      ;(target as any).click()
      if (this.hideOnClick) {
        // click关闭
        this.visible = false
      }
    } else if ([9, 27].indexOf(keyCode) > -1) {
      // tab // esc
      this.hide()
      this.triggerMuFocus()
    }
  }

  resetTabindex(ele: HTMLElement) {
    // 下次tab时组件聚焦元素
    this.removeTabindex()
    // 下次期望的聚焦元素
    ele.setAttribute('tabindex', '0')
  }

  removeTabindex() {
    this.triggerMu.setAttribute('tabindex', '-1')
    this.menuItemsArray.forEach((item: HTMLElement) => {
      item.setAttribute('tabindex', '-1')
    })
  }

  initAria() {
    this.dropdownMu.setAttribute('id', this.listId)
    this.triggerMu.setAttribute('aria-haspopup', 'list')
    this.triggerMu.setAttribute('aria-controls', this.listId)

    if (!this.splitButton) {
      // 自定义
      this.triggerMu.setAttribute('role', 'button')
      this.triggerMu.setAttribute('tabindex', this.tabindex)
      this.triggerMu.setAttribute(
        'class',
        (this.triggerMu.getAttribute('class') || '') + ' mu-dropdown-selfdefine'
      ) // 控制
    }
  }

  initEvent() {
    const {
      trigger,
      show,
      hide,
      handleClick,
      splitButton,
      handleTriggerKeyDown,
      handleItemKeyDown
    } = this
    // TODO default[0].elm
    this.triggerMu = splitButton
      ? (this.$refs.trigger as any).$el
      : (this.$slots as any).default[0].elm

    const dropdownMu = this.dropdownMu
    console.log(this.$slots)
    this.triggerMu.addEventListener('keydown', handleTriggerKeyDown) // triggerMu keydown
    dropdownMu.addEventListener('keydown', handleItemKeyDown, true) // item keydown
    // 控制自定义元素的样式
    if (!splitButton) {
      this.triggerMu.addEventListener('focus', () => {
        this.focusing = true
      })
      this.triggerMu.addEventListener('blur', () => {
        this.focusing = false
      })
      this.triggerMu.addEventListener('click', () => {
        this.focusing = false
      })
    }
    if (trigger === 'hover') {
      this.triggerMu.addEventListener('mouseenter', show)
      this.triggerMu.addEventListener('mouseleave', hide)
      dropdownMu.addEventListener('mouseenter', show)
      dropdownMu.addEventListener('mouseleave', hide)
    } else if (trigger === 'click') {
      this.triggerMu.addEventListener('click', handleClick)
    }
  }

  handleMenuItemClick(command: any, instance: any) {
    if (this.hideOnClick) {
      this.visible = false
    }
    this.$emit('command', command, instance)
  }

  triggerMuFocus() {
    this.triggerMu.focus && this.triggerMu.focus()
  }

  initDomOperation() {
    this.dropdownMu = this.popperMu
    this.menuItems = this.dropdownMu.querySelectorAll("[tabindex='-1']")
    this.menuItemsArray = [].slice.call(this.menuItems)

    this.initEvent()
    this.initAria()
  }

  render() {
    const { hide, splitButton, type } = this

    const handleMainButtonClick = (event: Event) => {
      this.$emit('click', event)
      hide()
    }

    const triggerMu: any = !splitButton ? (
      this.$slots.default
    ) : (
      <mu-button-group>
        <mu-button type={type} nativeOn-click={handleMainButtonClick}>
          {this.$slots.default}
        </mu-button>
        <mu-button ref="trigger" type={type} class="mu-dropdown__caret-button">
          <i class="mu-dropdown__icon mu-icon-arrow-down"></i>
        </mu-button>
      </mu-button-group>
    )

    return (
      <div class="mu-dropdown" v-clickoutside={hide}>
        {triggerMu}
        {this.$slots.dropdown}
      </div>
    )
  }
}
</script>
