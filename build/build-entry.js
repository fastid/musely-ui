const fs = require('fs-extra')
const path = require('path')
const uppercamelize = require('uppercamelcase')
// 拿到packages目录下的所以含组件的文件名字
const Components = require('./get-components')()
const packageJson = require('../package.json')
const prefix = 'Mu'
const version = process.env.VERSION || packageJson.version
const tips = `/* eslint-disable */
// ***************************************************
// **********                                *********
// **********                                *********
// ********** index.ts file don't edit it!!! *********
// **********                                *********
// **********                                *********
// ***************************************************
// This file is auto gererated by build/build-entry.js`

const excludeComponents = ['MuMessage', 'MuMessageBox']
// const root = path.join(__dirname, '../')
// const join = dir => path.join(root, dir)

function buildPackagesEntry() {
  const uninstallComponents = []

  const importList = Components.map((name) => `import ${prefix + uppercamelize(name)} from './${name}'`)
  const exportList = Components.map((name) => `${prefix + uppercamelize(name)}`)
  const intallList = exportList.filter((name) => !~uninstallComponents.indexOf(uppercamelize(name)))
  const content = `${tips}
import { VueConstructor } from 'vue'
import { InstallationOptions } from 'types/musely-ui'
${importList.join('\n')}
const version = '${version}'
const components = [
  ${intallList.filter((p) => excludeComponents.indexOf(p) === -1).join(',\n  ')}
]

const install = (Vue: VueConstructor, opts: InstallationOptions = {}) => {
  components.forEach((component: any) => {
    Vue.use(component)
  })
  Vue.prototype.$MUSELY = {
    zIndex: opts.zIndex || 2000
  }
  Vue.prototype.$message = MuMessage
  Vue.prototype.$msgbox = MuMessageBox
  Vue.prototype.$alert = MuMessageBox.alert
  Vue.prototype.$confirm = MuMessageBox.confirm
  Vue.prototype.$prompt = MuMessageBox.prompt
  // Vue.prototype.$notify = Notification
}
/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}
export {
  version,
  ${exportList.join(',\n  ')}
}
export default {
  install,
  version
}
`

  fs.writeFileSync(path.join(__dirname, '../packages/index.ts'), content)
}

buildPackagesEntry()
