/*
 * @Author: Victor wang
 * @Date: 2020-06-20 02:32:04
 * @LastEditors: Victor.wang
 * @LastEditTime: 2020-06-20 14:31:47
 * @Description:
 */
import Vue from 'vue'
import { on } from 'musely-ui/src/utils/dom'
import { VNode } from 'vue/types/umd'

const nodeList: any[] = []
const ctx = '@@clickoutsideContext'

let startClick: any
let seed = 0

!Vue.prototype.$isServer && on(document, 'mousedown', (e: EventListener) => (startClick = e))

!Vue.prototype.$isServer &&
  on(document, 'mouseup', (e: EventListener) => {
    nodeList.forEach((node) => node[ctx].documentHandler(e, startClick))
  })

function createDocumentHandler(el: any, binding: any, vnode: VNode) {
  return function(mouseup: any = {}, mousedown: any = {}) {
    if (
      !vnode ||
      !vnode.context ||
      !mouseup.target ||
      !mousedown.target ||
      el.contains(mouseup.target) ||
      el.contains(mousedown.target) ||
      el === mouseup.target ||
      ((vnode.context as any).popperMu && ((vnode.context as any).popperMu.contains(mouseup.target) || (vnode.context as any).popperMu.contains(mousedown.target)))
    ) {
      return
    }

    if (binding.expression && el[ctx].methodName && (vnode.context as any)[el[ctx].methodName]) {
      ;(vnode.context as any)[el[ctx].methodName]()
    } else {
      el[ctx].bindingFn && el[ctx].bindingFn()
    }
  }
}

/**
 * v-clickoutside
 * @desc 点击元素外面才会触发的事件
 * @example
 * ```vue
 * <div v-element-clickoutside="handleClose">
 * ```
 */
export default {
  bind(el: any, binding: any, vnode: VNode) {
    nodeList.push(el)
    const id = seed++
    el[ctx] = {
      id,
      documentHandler: createDocumentHandler(el, binding, vnode),
      methodName: binding.expression,
      bindingFn: binding.value
    }
  },

  update(el: any, binding: any, vnode: VNode) {
    el[ctx].documentHandler = createDocumentHandler(el, binding, vnode)
    el[ctx].methodName = binding.expression
    el[ctx].bindingFn = binding.value
  },

  unbind(el: any) {
    const len = nodeList.length

    for (let i = 0; i < len; i++) {
      if (nodeList[i][ctx].id === el[ctx].id) {
        nodeList.splice(i, 1)
        break
      }
    }
    delete el[ctx]
  }
}
