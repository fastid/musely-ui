/*
 * @Author: Victor wang
 * @Date: 2020-06-23 23:30:59
 * @LastEditors: Victor.wang
 * @LastEditTime: 2020-06-23 23:31:08
 * @Description:
 */
import Vue from 'vue'

export default function scrollIntoView(container: any, selected: any) {
  if (Vue.prototype.$isServer) return

  if (!selected) {
    container.scrollTop = 0
    return
  }

  const offsetParents = []
  let pointer = selected.offsetParent
  while (pointer && container !== pointer && container.contains(pointer)) {
    offsetParents.push(pointer)
    pointer = pointer.offsetParent
  }
  const top = selected.offsetTop + offsetParents.reduce((prev, curr) => prev + curr.offsetTop, 0)
  const bottom = top + selected.offsetHeight
  const viewRectTop = container.scrollTop
  const viewRectBottom = viewRectTop + container.clientHeight

  if (top < viewRectTop) {
    container.scrollTop = top
  } else if (bottom > viewRectBottom) {
    container.scrollTop = bottom - container.clientHeight
  }
}
