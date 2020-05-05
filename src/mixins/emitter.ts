import { VNode } from 'vue'
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({
  name: 'MuEmitter'
})
export default class MuEmitter extends Vue {
  dispatch(componentName: string, eventName: string, params: any) {
    console.log('====dispatch=====')
  }
  broadcast(componentName: string, eventName: string, params: any) {
    console.log('=====broadcast====')
  }
}
