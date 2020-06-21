/*
 * @Author: Victor wang
 * @Date: 2020-06-21 14:45:55
 * @LastEditors: Victor.wang
 * @LastEditTime: 2020-06-21 15:08:48
 * @Description:
 */
import Vue, { VueConstructor } from 'vue'
import Loading from './main.vue'
import { addClass, removeClass, getStyle } from 'musely-ui/src/utils/dom'
import { PopupManager } from 'musely-ui/src/utils/popup'
import afterLeave from 'musely-ui/src/utils/after-leave'
const Mask = Vue.extend(Loading)

const loadingDirective: any = {}
loadingDirective.install = (Vue: VueConstructor) => {
  if (Vue.prototype.$isServer) {
    return
  }
  const toggleLoading = (el: any, binding: any) => {
    if (binding.value) {
      Vue.nextTick(() => {
        if (binding.modifiers.fullscreen) {
          el.originalPosition = getStyle(document.body, 'position')
          el.originalOverflow = getStyle(document.body, 'overflow')
          el.maskStyle.zIndex = PopupManager.nextZIndex()

          addClass(el.mask, 'is-fullscreen')
          insertDom(document.body, el, binding)
        } else {
          removeClass(el.mask, 'is-fullscreen')

          if (binding.modifiers.body) {
            el.originalPosition = getStyle(document.body, 'position')
            ;['top', 'left'].forEach((property) => {
              const scroll = property === 'top' ? 'scrollTop' : 'scrollLeft'
              el.maskStyle[property] =
                el.getBoundingClientRect()[property] + document.body[scroll] + document.documentElement[scroll] - parseInt(getStyle(document.body, `margin-${property}`), 10) + 'px'
            })
            ;['height', 'width'].forEach((property) => {
              el.maskStyle[property] = el.getBoundingClientRect()[property] + 'px'
            })

            insertDom(document.body, el, binding)
          } else {
            el.originalPosition = getStyle(el, 'position')
            insertDom(el, el, binding)
          }
        }
      })
    } else {
      afterLeave(
        el.instance,
        () => {
          if (!el.instance.hiding) return
          el.domVisible = false
          const target = binding.modifiers.fullscreen || binding.modifiers.body ? document.body : el
          removeClass(target, 'el-loading-parent--relative')
          removeClass(target, 'el-loading-parent--hidden')
          el.instance.hiding = false
        },
        300,
        true
      )
      el.instance.visible = false
      el.instance.hiding = true
    }
  }
  const insertDom = (parent: any, el: any, binding: any) => {
    if (!el.domVisible && getStyle(el, 'display') !== 'none' && getStyle(el, 'visibility') !== 'hidden') {
      Object.keys(el.maskStyle).forEach((property) => {
        el.mask.style[property] = el.maskStyle[property]
      })

      if (el.originalPosition !== 'absolute' && el.originalPosition !== 'fixed') {
        addClass(parent, 'el-loading-parent--relative')
      }
      if (binding.modifiers.fullscreen && binding.modifiers.lock) {
        addClass(parent, 'el-loading-parent--hidden')
      }
      el.domVisible = true

      parent.appendChild(el.mask)
      Vue.nextTick(() => {
        if (el.instance.hiding) {
          el.instance.$emit('after-leave')
        } else {
          el.instance.visible = true
        }
      })
      el.domInserted = true
    } else if (el.domVisible && el.instance.hiding === true) {
      el.instance.visible = true
      el.instance.hiding = false
    }
  }

  Vue.directive('loading', {
    bind: function(el: any, binding, vnode) {
      const textExr = el.getAttribute('musely-loading-text')
      const spinnerExr = el.getAttribute('musely-loading-spinner')
      const backgroundExr = el.getAttribute('musely-loading-background')
      const customClassExr = el.getAttribute('musely-loading-custom-class')
      const vm = vnode.context
      const mask = new Mask({
        el: document.createElement('div'),
        data: {
          text: (vm && (vm as any)[textExr]) || textExr,
          spinner: (vm && (vm as any)[spinnerExr]) || spinnerExr,
          background: (vm && (vm as any)[backgroundExr]) || backgroundExr,
          customClass: (vm && (vm as any)[customClassExr]) || customClassExr,
          fullscreen: !!binding.modifiers.fullscreen
        }
      })
      el.instance = mask
      el.mask = mask.$el
      el.maskStyle = {}

      binding.value && toggleLoading(el, binding)
    },

    update: function(el: any, binding) {
      el.instance.setText(el.getAttribute('musely-loading-text'))
      if (binding.oldValue !== binding.value) {
        toggleLoading(el, binding)
      }
    },

    unbind: function(el: any, binding) {
      if (el.domInserted) {
        el.mask && el.mask.parentNode && el.mask.parentNode.removeChild(el.mask)
        toggleLoading(el, { value: false, modifiers: binding.modifiers })
      }
      el.instance && el.instance.$destroy()
    }
  })
}

export default loadingDirective
