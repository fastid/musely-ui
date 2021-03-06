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
import {MuDropdown} from './dropdown'
import {MuDropdownItem} from './dropdown-item'
import {MuDropdownMenu} from './dropdown-menu'
import {MuFooter} from './footer'
import {MuForm} from './form'
import {MuFormItem} from './form-item'
import {MuHeader} from './header'
import {MuIcon} from './icon'
import {MuInput} from './input'
import {MuLink} from './link'
import {MuLoading} from './loading'
import {MuMain} from './main'
import {MuMessage} from './message'
import {MuMessageBox} from './message-box'
import {MuOption} from './option'
import {MuOptionGroup} from './option-group'
import {MuPageHeader} from './page-header'
import {MuPopup} from './popup'
import {MuRadio} from './radio'
import {MuRadioGroup} from './radio-group'
import {MuRate} from './rate'
import {MuRow} from './row'
import {MuScrollbar} from './scrollbar'
import {MuSelect} from './select'

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

/** Dropdown Component **/
export class Dropdown extends MuDropdown {}

/** DropdownItem Component **/
export class DropdownItem extends MuDropdownItem {}

/** DropdownMenu Component **/
export class DropdownMenu extends MuDropdownMenu {}

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

/** Option Component **/
export class Option extends MuOption {}

/** OptionGroup Component **/
export class OptionGroup extends MuOptionGroup {}

/** PageHeader Component **/
export class PageHeader extends MuPageHeader {}

/** Popup Component **/
export class Popup extends MuPopup {}

/** Radio Component **/
export class Radio extends MuRadio {}

/** RadioGroup Component **/
export class RadioGroup extends MuRadioGroup {}

/** Rate Component **/
export class Rate extends MuRate {}

/** Row Component **/
export class Row extends MuRow {}

/** Scrollbar Component **/
export class Scrollbar extends MuScrollbar {}

/** Select Component **/
export class Select extends MuSelect {}
