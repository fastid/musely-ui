/*
 * @Author: Victor wang
 * @Date: 2020-03-31 16:35:33
 * @LastEditors: Victor.wang
 * @LastEditTime: 2020-04-04 17:59:46
 * @Description:
 */
import { MuContainer } from './container'
import { MuCol } from './col'
import { MuRow } from './row'


export interface InstallationOptions {
}
/** The version of element-ui */
export const version: string

/**
 * Install all element-ui components into Vue.
 * Please do not invoke this method directly.
 * Call `Vue.use(ElementUI)` to install.
 */
export function install (vue: typeof Vue, options: InstallationOptions): void

/** Colunm Layout Component */
export class Col extends MuCol {}

/** Container Component */
export class Container extends MuContainer {}

/** Row Layout Component */
export class Row extends MuRow {}
