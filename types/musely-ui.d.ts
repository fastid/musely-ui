/*
 * @Author: Victor wang
 * @Date: 2020-03-31 16:35:33
 * @LastEditors: Victor.wang
 * @LastEditTime: 2020-04-25 13:51:21
 * @Description:
 */
import Vue from 'vue'
import { MuselyUIComponent } from './common'

import { MuAlert } from './alert'
import { MuAside } from './aside'
import { MuCol } from './col'
import { MuContainer } from './container'
import { MuFooter } from './footer'
import { MuHeader } from './header'
import { MuMain } from './main'
import { MuRow } from './row'

/**
 * Install all musely-ui components into Vue.
 * Please do not invoke this method directly.
 * Call `Vue.use(MuselyUI)` to install.
 */
export interface InstallationOptions {
  zIndex?: number
}
/** MuselyUI component common definition */
export type Component = MuselyUIComponent

/** The version of musely-ui */
export const version: string

export function install(vue: typeof Vue, options: InstallationOptions): void

/** Alert Component */
export class Alert extends MuAlert {}
/** Aside Component */
export class Aside extends MuAside {}
/** Colunm Layout Component */
export class Col extends MuCol {}
/** Container Component */
export class Container extends MuContainer {}
/** Footer Component */
export class Footer extends MuFooter {}
/** Header Component */
export class Header extends MuHeader {}
/** Main Component */
export class Main extends MuMain {}
/** Row Layout Component */
export class Row extends MuRow {}
