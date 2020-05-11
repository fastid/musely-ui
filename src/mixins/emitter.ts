import { VNode } from 'vue'
import { Component, Vue, Prop } from 'vue-property-decorator'

const broadcast = function(this: any, componentName: string, eventName: string, params: any) {
  this.$children.forEach((child: any) => {
    var name = child.$options.componentName

    if (name === componentName) {
      child.$emit.apply(child, [eventName].concat(params))
    } else {
      broadcast.apply(child, [componentName, eventName].concat([params]))
    }
  })
}

@Component({
  name: 'MuEmitter'
})
export default class MuEmitter extends Vue {
  dispatch(componentName: string, eventName: string, params: any) {
    console.log('====dispatch=====')
    var parent = this.$parent || this.$root
    var name = (parent.$options as any).componentName

    while (parent && (!name || name !== componentName)) {
      parent = parent.$parent

      if (parent) {
        name = (parent.$options as any).componentName
      }
    }
    if (parent) {
      parent.$emit.apply(parent, [eventName].concat(params))
    }
  }
  broadcast(componentName: string, eventName: string, params: any) {
    console.log('=====broadcast====')
    broadcast.call(this, componentName, eventName, params)
  }
}
