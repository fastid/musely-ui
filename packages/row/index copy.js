import Row from './src/index.ts'

Row.install = (Vue) => {
  Vue.component(Row.name, Row)
}

export default Row
