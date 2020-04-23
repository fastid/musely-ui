import Col from './src/index.ts'

Col.install = (Vue) => {
  Vue.component(Col.name, Col)
}

export default Col
