import { Vue } from 'vue-property-decorator'
import MessageComponent from './main.vue'
import { MuMessageComponent, MuMessageOptions, CloseEventHandler, MessageType } from 'types/message'
import { PopupManager } from 'musely-ui/src/utils/popup'
import { isVNode } from 'musely-ui/src/utils/'
import { VNode } from 'vue/types/umd'

// const MessageConstructor = Vue.extend(Main)

class MessageConstructor extends MessageComponent {
  constructor(options: any) {
    super(options)
  }
  id!: string
  $success!: MuMessageComponent
  $warning!: MuMessageComponent
  $info!: MuMessageComponent
  $error!: MuMessageComponent
  message!: VNode | string | null
  verticalOffset!: number
  visible!: boolean
  $el!: HTMLElement
}

let instance: MessageConstructor

const instances: any[] = []
let seed = 1

const MuMessage = (options: MuMessageOptions) => {
    if (Vue.prototype.$isServer) return

    options = options || {}
    if (typeof options === 'string') {
      options = {
        message: options
      }
    }
    const id = 'message_' + seed++
    const userOnClose: CloseEventHandler | undefined = options.onClose

    options.onClose = function() {
      if (userOnClose) {
        MuMessage.close(id, userOnClose)
      } else {
        MuMessage.close(id)
      }
    }
    instance = new MessageConstructor({
      data: options
    })
    instance.id = id
    if (isVNode(instance.message)) {
      if (instance.message !== null && typeof instance.message !== 'string') {
        instance.$slots.default = [instance.message]
      }

      instance.message = null
    }
    instance.$mount()
    document.body.appendChild(instance.$el)
    let verticalOffset = options.offset || 20
    instances.forEach((item) => {
      verticalOffset += item.$el.offsetHeight + 16
    })
    instance.verticalOffset = verticalOffset
    instance.visible = true
    instance.$el.style.zIndex = PopupManager.nextZIndex()
    instances.push(instance)
    return instance
  }
  // 生成4个快捷方式
;(['success', 'warning', 'info', 'error'] as MessageType[]).forEach((type) => {
  ;(MuMessage as any)[type] = (options: MuMessageOptions) => {
    if (typeof options === 'string') {
      options = {
        message: options
      }
    }
    options.type = type
    return MuMessage(options)
  }
})

MuMessage.close = (id: string, userOnClose?: CloseEventHandler) => {
  const len = instances.length
  let index = -1
  let removedHeight
  for (let i = 0; i < len; i++) {
    if (id === instances[i].id) {
      removedHeight = instances[i].$el.offsetHeight
      index = i
      if (typeof userOnClose === 'function') {
        userOnClose(instances[i])
      }
      instances.splice(i, 1)
      break
    }
  }
  if (len <= 1 || index === -1 || index > instances.length - 1) return
  for (let i = index; i < len - 1; i++) {
    const dom = instances[i].$el
    dom.style.top = parseInt(dom.style.top, 10) - removedHeight - 16 + 'px'
  }
}

MuMessage.closeAll = () => {
  for (let i = instances.length - 1; i >= 0; i--) {
    instances[i].close()
  }
}

export default MuMessage
