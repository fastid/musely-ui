/*
 * @Author: Victor wang
 * @Date: 2020-03-31 16:35:33
 * @LastEditors: Victor.wang
 * @LastEditTime: 2020-04-07 11:22:03
 * @Description:
 */
import Vue from 'vue'
import { MuContainer } from '../packages/container'
import { MuCol } from '../packages/col'
import { MuRow } from '../packages/row'


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
