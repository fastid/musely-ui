import Vue from 'vue'
import { MessageCurrent, MuMessageBoxOptions, MuMessageBoxComponent, MuMessageBoxShortcutMethod } from 'types/message-box'
import MessageBoxComponent from './main.vue'
import { hasOwn, isVNode, merge } from 'musely-ui/src/utils'

const defaults = {
  title: null,
  message: '',
  type: '',
  iconClass: '',
  showInput: false,
  showClose: false,
  modalFade: true,
  lockScroll: true,
  closeOnClickModal: true,
  closeOnPressEscape: true,
  closeOnHashChange: true,
  inputValue: null,
  inputPlaceholder: '',
  inputType: 'text',
  inputPattern: null,
  inputValidator: null,
  inputErrorMessage: '',
  showConfirmButton: true,
  showCancelButton: false,
  confirmButtonPosition: 'right',
  confirmButtonHighlight: false,
  cancelButtonHighlight: false,
  confirmButtonText: 'OK',
  cancelButtonText: 'Cancel',
  confirmButtonClass: '',
  cancelButtonClass: '',
  customClass: '',
  beforeClose: null,
  dangerouslyUseHTMLString: false,
  center: false,
  roundButton: false,
  distinguishCancelAndClose: false
}

class MessageBoxConstructor extends MessageBoxComponent {
  showInput!: boolean
  callback!: any
  inputValue!: string
  action!: any
  visible!: boolean
  message!: any
  closeTimer!: number
  doClose!: any

  defaults!: any

  $confirm!: MuMessageBoxShortcutMethod
  $alert!: MuMessageBoxShortcutMethod
  $prompt!: MuMessageBoxShortcutMethod

  $info!: MuMessageBoxComponent
  $el!: HTMLElement
}

let currentMsg: MessageCurrent | null
let instance: MessageBoxConstructor
let msgQueue: any[] = []

const defaultCallback = (action: MuMessageBoxOptions) => {
  if (currentMsg) {
    const callback = currentMsg.callback
    if (typeof callback === 'function') {
      if (instance.showInput) {
        callback(instance.inputValue, action)
      } else {
        callback(action)
      }
    }
    if (currentMsg.resolve) {
      if (action === 'confirm') {
        if (instance.showInput) {
          currentMsg.resolve({ value: instance.inputValue, action })
        } else {
          currentMsg.resolve(action)
        }
      } else if (currentMsg.reject && (action === 'cancel' || action === 'close')) {
        currentMsg.reject(action)
      }
    }
  }
}

const initInstance = () => {
  instance = new MessageBoxConstructor({
    el: document.createElement('div')
  })

  instance.callback = defaultCallback
}

const showNextMsg = () => {
  if (!instance) {
    initInstance()
  }
  instance.action = ''
  if (!instance.visible || instance.closeTimer) {
    if (msgQueue.length > 0) {
      currentMsg = msgQueue.shift()

      const options = currentMsg ? currentMsg.options : {}

      for (const prop in options) {
        if (hasOwn(options, prop)) {
          ;(instance as any)[prop] = (options as any)[prop]
        }
      }

      if (options && options.callback === undefined) {
        instance.callback = defaultCallback
      }

      const beforeCallBack = instance.callback
      instance.callback = (action: MuMessageBoxOptions, instance: MessageBoxConstructor) => {
        beforeCallBack(action, instance)
        showNextMsg()
      }
      if (isVNode(instance.message)) {
        instance.$slots.default = [instance.message]
        instance.message = null
      } else {
        delete instance.$slots.default
      }
      ;['modal', 'showClose', 'closeOnClickModal', 'closeOnPressEscape', 'closeOnHashChange'].forEach((prop) => {
        if ((instance as any)[prop] === undefined) {
          ;(instance as any)[prop] = true
        }
      })
      document.body.appendChild(instance.$el)

      Vue.nextTick(() => {
        instance.visible = true
      })
    }
  }
}

// TODO options is not use type MuMessageBoxOptions,options.message
const MessageBox = function(options: any, callback?: any) {
  if (Vue.prototype.$isServer) return
  if (typeof options === 'string' || isVNode(options)) {
    options = {
      message: options
    }
    if (callback && callback === 'string') {
      options.title = callback
    }
  } else if (options.callback && !callback) {
    callback = options.callback
  }

  options = merge({}, defaults, MessageBox.defaults, options)

  if (typeof Promise !== 'undefined') {
    return new Promise((resolve, reject) => {
      // eslint-disable-line
      msgQueue.push({
        options,
        callback,
        resolve,
        reject
      })

      showNextMsg()
    })
  } else {
    msgQueue.push({
      options,
      callback
    })

    showNextMsg()
  }
}
// install set defaults
MessageBox.defaults = {}
MessageBox.setDefaults = (defaults: any) => {
  MessageBox.defaults = defaults
}

MessageBox.alert = (message: any, title: any, options: any) => {
  if (typeof title === 'object') {
    options = title
    title = options.title ? options.title : null
  }
  return MessageBox(
    merge(
      {
        title,
        message,
        $type: 'alert',
        closeOnPressEscape: false,
        closeOnClickModal: false
      },
      options
    )
  )
}

MessageBox.confirm = (message: any, title: any, options: any) => {
  if (typeof title === 'object') {
    options = title
    title = options.title ? options.title : null
  }
  return MessageBox(
    merge(
      {
        title: title,
        message: message,
        $type: 'confirm',
        showCancelButton: true
      },
      options
    )
  )
}

MessageBox.prompt = (message: any, title: any, options: any) => {
  if (typeof title === 'object') {
    options = title
    title = options.title ? options.title : null
  }
  return MessageBox(
    merge(
      {
        title: title,
        message: message,
        showCancelButton: true,
        showInput: true,
        $type: 'prompt'
      },
      options
    )
  )
}

MessageBox.close = () => {
  instance.doClose()
  instance.visible = false
  msgQueue = []
  currentMsg = null
}

export default MessageBox
export { MessageBox }
