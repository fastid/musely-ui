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

const tipsTypes = `/* eslint-disable */
// ***************************************************
// **********                                *********
// **********                                *********
// ****** musely-ui.d.ts file don't edit it !!! ******
// **********                                *********
// **********                                *********
// ***************************************************
// This file is auto gererated by build/build-entry.js`

const excludeComponents = ['Message', 'MessageBox']

/**
 * build Entry
 */
function buildPackagesTypes() {
  const importList = Components.map((name) => `import ${uppercamelize(name)} from './${name}'`)
  const exportList = Components.map((name) => `${uppercamelize(name)}`)
  const intallList = exportList.filter((name) => !~excludeComponents.indexOf(uppercamelize(name)))
  const content = `${tips}
import { VueConstructor } from 'vue'
import { InstallationOptions } from 'types/musely-ui'
${importList.join('\n')}
const version = '${version}'
const components = [
  ${intallList.join(',\n  ')}
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
/* istanbul ignore if **/
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

/**
 * build Types
 */
function buildPackagesEntry() {
  const importList = Components.map((name) => `import {${prefix + uppercamelize(name)}} from './${name}'`)
  const classList = Components.map((name) => `${uppercamelize(name)}`).filter((name) => !~excludeComponents.indexOf(name))
  let content = `${tipsTypes}
import Vue from 'vue'
import { MuselyUIComponent } from './common'
${importList.join('\n')}

/**
 * musely-ui components into Vue types.
 * Please do not invoke this method directly.
 * Call \`Vue.use(MuselyUI)\` to install.
 */
export interface InstallationOptions {
  zIndex?: number
}
/** MuselyUI component common definition **/
export type Component = MuselyUIComponent

/** The version of musely-ui **/
export const version: string

export function install(vue: typeof Vue, options: InstallationOptions): void

/** defined Components. **/

/** defined Message Component. **/
export const Message: MuMessage

/** defined MessageBox Component. **/
export const MessageBox: MuMessageBox

`
  for (const name of classList) {
    content += `
/** ${name} Component **/
export class ${name} extends Mu${name} {}
`
  }

  fs.writeFileSync(path.join(__dirname, '../types/musely-ui.d.ts'), content)
}

buildPackagesTypes()
buildPackagesEntry()
