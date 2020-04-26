/*
 * @Author: Victor wang
 * @Date: 2020-04-26 22:54:07
 * @LastEditors: Victor.wang
 * @LastEditTime: 2020-04-27 03:22:47
 * @Description:
 */

import { MuselyUIComponent } from './common'
/** Button type  */
// TODO --Need it?--
export type ButtonType = 'text'

/** Same as native button's type */
export type ButtonNativeType = 'button' | 'submit' | 'reset' | 'menu'

/** Button Component */
export declare class MuButton extends MuselyUIComponent {
  /** Button type */
  type: ButtonType

  /** Determine whether it's a plain button */
  plain: boolean

  /** Determine whether it's a round button */
  round: boolean

  /** Determine whether it's loading */
  loading: boolean

  /** Disable the button */
  disabled: boolean

  /** The button focus*/
  autofocus: boolean

  /** Button icon, accepts an icon name of Musely icon component */
  icon: string

  /** Button icon, accepts an icon name of Musely icon component */

  circle: boolean

  /** Same as native button's type */
  nativeType: ButtonNativeType
}
