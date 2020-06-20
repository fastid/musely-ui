/*
 * @Author: Victor wang
 * @Date: 2020-05-07 14:03:33
 * @LastEditors: Victor.wang
 * @LastEditTime: 2020-06-20 22:50:46
 * @Description:
 */
const aria: any = (window as any).aria || {}

aria.Utils = aria.Utils || {}

/**
 * @desc Set focus on descendant nodes until the first focusable element is
 *       found.
 * @param element
 *          DOM node for which to find the first focusable descendant.
 * @returns
 *  true if a focusable element is found and focus is set.
 */
aria.Utils.focusFirstDescendant = (element: HTMLElement) => {
  for (let i = 0; i < element.childNodes.length; i++) {
    const child = element.childNodes[i]
    if (aria.Utils.attemptFocus(child) || aria.Utils.focusFirstDescendant(child)) {
      return true
    }
  }
  return false
}

/**
 * @desc Find the last descendant node that is focusable.
 * @param element
 *          DOM node for which to find the last focusable descendant.
 * @returns
 *  true if a focusable element is found and focus is set.
 */

aria.Utils.focusLastDescendant = (element: HTMLElement) => {
  for (let i = element.childNodes.length - 1; i >= 0; i--) {
    const child = element.childNodes[i]
    if (aria.Utils.attemptFocus(child) || aria.Utils.focusLastDescendant(child)) {
      return true
    }
  }
  return false
}

/**
 * @desc Set Attempt to set focus on the current node.
 * @param element
 *          The node to attempt to focus on.
 * @returns
 *  true if element is focused.
 */
aria.Utils.attemptFocus = (element: HTMLElement) => {
  if (!aria.Utils.isFocusable(element)) {
    return false
  }
  aria.Utils.IgnoreUtilFocusChanges = true
  try {
    element.focus()
  } catch (e) {}
  aria.Utils.IgnoreUtilFocusChanges = false
  return document.activeElement === element
}

aria.Utils.isFocusable = (element: any) => {
  if (element.tabIndex > 0 || (element.tabIndex === 0 && element.getAttribute('tabIndex') !== null)) {
    return true
  }

  if (element.disabled) {
    return false
  }

  switch (element.nodeName) {
    case 'A':
      return !!element.href && element.rel !== 'ignore'
    case 'INPUT':
      return element.type !== 'hidden' && element.type !== 'file'
    case 'BUTTON':
    case 'SELECT':
    case 'TEXTAREA':
      return true
    default:
      return false
  }
}

/**
 * 触发一个事件
 * mouseenter, mouseleave, mouseover, keyup, change, click 等
 * @param  {Element} el
 * @param  {String} name
 * @param  {*} opts
 */
aria.Utils.triggerEvent = (el: HTMLElement, name: string, ...opts: any) => {
  let eventName

  if (/^mouse|click/.test(name)) {
    eventName = 'MouseEvents'
  } else if (/^key/.test(name)) {
    eventName = 'KeyboardEvent'
  } else {
    eventName = 'HTMLEvents'
  }
  const evt = document.createEvent(eventName)

  evt.initEvent(name, ...opts)
  // TODO fireEvent https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/dispatchEvent
  el.dispatchEvent ? el.dispatchEvent(evt) : (el as any).fireEvent('on' + name, evt)

  return el
}

aria.Utils.keys = {
  tab: 9,
  enter: 13,
  space: 32,
  left: 37,
  up: 38,
  right: 39,
  down: 40,
  esc: 27
}

export default aria.Utils
