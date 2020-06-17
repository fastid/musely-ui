import { Component, Vue } from 'vue-property-decorator'

// 定义 broadcast 方法，接受三个参数，分别是：组件名称、将要触发的事件名称、回调函数传递的参数
function broadcast(this: any, componentName: string, eventName: string, params: any) {
  // 依次循环当前组件的子组件
  this.$children.forEach((child: any) => {
    // 获取每个子组件的名字,注意:options.name 而不是componentsName
    const name = child.$options.name
    // 判断子组件的名字是否等于传入的组件名称
    if (name === componentName) {
      // 如果子组件的名字等于传入的组件名称就调用 $emit 触发事件
      // eslint-disable-next-line
      child.$emit.apply(child, [eventName].concat(params))
    } else {
      const args = [componentName, eventName].concat([params])
      // 如果子组件的名字不等于传入的组件名称就递归遍历调用 broadcast 孙子组件
      broadcast.apply(child, args as any)
    }
  })
}

@Component({
  name: 'MuEmitter'
})
export default class MuEmitter extends Vue {
  // constructor(options: any) {
  //   super(options)
  // }
  // TODO 定义 dispatch 方法，接受三个参数，分别是：组件名称、将要触发的事件名称、回调函数传递的参数
  dispatch(componentName: string, eventName: string, params: any) {
    console.log('====dispatch=====', componentName, params)
    // 获取基于当前组件的父组件实例，这里对父组件实例和根组件实例做了兼容处理
    let parent = this.$parent || this.$root
    // 通过父组件的 $option 属性获取组件的名称
    let name = (parent.$options as any).name
    // 当相对当前组件的父组件实例存在，而且当父组件的名称不存在或者父组件的名称不等于传入的组件名称时，执行循环
    while (parent && (!name || name !== componentName)) {
      // 记录父组件的父组件
      parent = parent.$parent
      // 当父组件的父组件存在时，获取祖父组件的名称
      if (parent) {
        name = (parent.$options as any).name
      }
    }
    // 当循环结束，parent 的值就是最终匹配的组件实例
    if (parent) {
      // 当 parent 值存在时调用 $emit 方法
      // 传入 parent 实例、事件名称与 params 参数组成的数组
      // 触发传入事件名称 eventName 同名的事件
      // eslint-disable-next-line
      parent.$emit.apply(parent, [eventName].concat(params) as any)
    }
  }

  // TODO Rewrite~
  broadcast(componentName: string, eventName: string, params: any) {
    console.log('====broadcast=====', componentName, eventName, params)
    broadcast.call(this, componentName, eventName, params)
  }
}
