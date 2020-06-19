/* eslint-disable */
// ***************************************************
// **********                                *********
// **********                                *********
// ****** musely-ui.d.ts file don't edit it !!! ******
// **********                                *********
// **********                                *********
// ***************************************************
// This file is auto gererated by build/build-entry.js
import Vue from 'vue'
import { MuselyUIComponent } from './common'
import {MuAlert} from './alert'
import {MuAside} from './aside'
import {MuAvatar} from './avatar'
import {MuBadge} from './badge'
import {MuButton} from './button'
import {MuButtonGroup} from './button-group'
import {MuCheckbox} from './checkbox'
import {MuCheckboxGroup} from './checkbox-group'
import {MuCol} from './col'
import {MuContainer} from './container'
import {MuDialog} from './dialog'
import {MuFooter} from './footer'
import {MuForm} from './form'
import {MuFormItem} from './form-item'
import {MuHeader} from './header'
import {MuIcon} from './icon'
import {MuInput} from './input'
import {MuLink} from './link'
import {MuMain} from './main'
import {MuMessage} from './message'
import {MuMessageBox} from './message-box'
import {MuPageHeader} from './page-header'
import {MuPopup} from './popup'
import {MuRate} from './rate'
import {MuRow} from './row'

/**
 * musely-ui components into Vue types.
 * Please do not invoke this method directly.
 * Call `Vue.use(MuselyUI)` to install.
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


/** Alert Component **/
export class Alert extends MuAlert {}

/** Aside Component **/
export class Aside extends MuAside {}

/** Avatar Component **/
export class Avatar extends MuAvatar {}

/** Badge Component **/
export class Badge extends MuBadge {}

/** Button Component **/
export class Button extends MuButton {}

/** ButtonGroup Component **/
export class ButtonGroup extends MuButtonGroup {}

/** Checkbox Component **/
export class Checkbox extends MuCheckbox {}

/** CheckboxGroup Component **/
export class CheckboxGroup extends MuCheckboxGroup {}

/** Col Component **/
export class Col extends MuCol {}

/** Container Component **/
export class Container extends MuContainer {}

/** Dialog Component **/
export class Dialog extends MuDialog {}

/** Footer Component **/
export class Footer extends MuFooter {}

/** Form Component **/
export class Form extends MuForm {}

/** FormItem Component **/
export class FormItem extends MuFormItem {}

/** Header Component **/
export class Header extends MuHeader {}

/** Icon Component **/
export class Icon extends MuIcon {}

/** Input Component **/
export class Input extends MuInput {}

/** Link Component **/
export class Link extends MuLink {}

/** Main Component **/
export class Main extends MuMain {}

/** PageHeader Component **/
export class PageHeader extends MuPageHeader {}

/** Popup Component **/
export class Popup extends MuPopup {}

/** Rate Component **/
export class Rate extends MuRate {}

/** Row Component **/
export class Row extends MuRow {}
