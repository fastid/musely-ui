import { VueConstructor } from 'vue'
import Row from './src'

Row.install = (Vue: VueConstructor) => {
  Vue.component(Row.name, Row)
}

export default Row
