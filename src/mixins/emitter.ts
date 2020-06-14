import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'MuEmitter'
})
export default class MuEmitter extends Vue {
  constructor(options: any) {
    super(options)
  }
  // TODO Rewrite~
  dispatch(componentName: string, ...args: any) {
    console.log('====dispatch=====', this.$parent, componentName, args)
    let parent = this.$parent || this.$root
    let name = (parent.$options as any).name
    console.log((parent.$options as any).name, name)
    while (parent && (!name || name !== componentName)) {
      parent = parent.$parent

      if (parent) {
        name = (parent.$options as any).name
      }
    }

    if (parent) {
      parent.$emit.apply(parent, args)
    }
  }
  // TODO Rewrite~
  broadcast(componentName: string, ...args: any) {
    console.log('====broadcast=====', componentName, args)
    this.$children.forEach((child: any) => {
      const name = child.$options.name
      if (name === componentName) {
        child.$emit.apply(child, args)
      } else {
        this.broadcast(child, [componentName, args])
      }
    })
  }
}
