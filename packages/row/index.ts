import { VueConstructor } from 'vue'
import Row from './src'

Row.install = (Vue: VueConstructor) => {
  Vue.component(Row.options.name, Row)
}

export default Row
