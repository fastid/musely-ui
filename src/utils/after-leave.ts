/*
 * @Author: Victor wang
 * @Date: 2020-06-21 14:46:57
 * @LastEditors: Victor.wang
 * @LastEditTime: 2020-06-21 14:48:45
 * @Description:
 */
/**
 * Bind after-leave event for vue instance. Make sure after-leave is called in any browsers.
 *
 * @param {Vue} instance Vue instance.
 * @param {Function} callback callback of after-leave event
 * @param {Number} speed the speed of transition, default value is 300ms
 * @param {Boolean} once weather bind after-leave once. default value is false.
 */
export default function(instance: any, callback: any, speed = 300, once = false) {
  if (!instance || !callback) throw new Error('instance & callback is required')
  let called = false
  const afterLeaveCallback = function() {
    if (called) return
    called = true
    if (callback) {
      // eslint-disable-next-line
      callback.apply(null, arguments)
    }
  }
  if (once) {
    instance.$once('after-leave', afterLeaveCallback)
  } else {
    instance.$on('after-leave', afterLeaveCallback)
  }
  setTimeout(() => {
    afterLeaveCallback()
  }, speed + 100)
}
