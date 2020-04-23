/*
 * @Author: Victor wang
 * @Date: 2020-03-31 16:35:33
 * @LastEditors: Victor.wang
 * @LastEditTime: 2020-04-23 19:11:04
 * @Description:
 */
import Vue from 'vue'

import { MuAlert } from '../packages/alert'
import { MuAside } from '../packages/aside'
import { MuCol } from '../packages/col'
import { MuContainer } from '../packages/container'
import { MuFooter } from '../packages/footer'
import { MuHeader } from '../packages/header'
import { MuMain } from '../packages/main'
import { MuRow } from '../packages/row'

/**
 * Install all musely-ui components into Vue.
 * Please do not invoke this method directly.
 * Call `Vue.use(MuselyUI)` to install.
 */
export interface InstallationOptions {}
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
