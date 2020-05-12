import { Component, Vue } from 'vue-property-decorator'

const broadcast = function(this: any, componentName: string, ...args: any): void {
  this.$children.forEach((child: any) => {
    const name = child.$options.componentName
    if (name === componentName) {
      child.$emit.apply(child, args)
    } else {
      broadcast.apply(child, [componentName, args])
    }
  })
}

@Component({
  name: 'MuEmitter'
})
export default class MuEmitter extends Vue {
  constructor(options: any) {
    console.log(options)
    super(options)
  }

  dispatch(componentName: string, ...args: any) {
    console.log('====dispatch=====', componentName, args)
    let parent = this.$parent || this.$root
    let name = (parent.$options as any).componentName

    while (parent && (!name || name !== componentName)) {
      parent = parent.$parent

      if (parent) {
        name = (parent.$options as any).componentName
      }
    }
    if (parent) {
      parent.$emit.apply(parent, args)
    }
  }
  broadcast(componentName: string, ...args: any) {
    console.log('=====broadcast====')
    broadcast.call(this, componentName, args)
  }
}
