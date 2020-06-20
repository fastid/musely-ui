/*
 * @Author: Victor wang
 * @Date: 2020-06-20 02:25:44
 * @LastEditors: Victor.wang
 * @LastEditTime: 2020-06-20 16:04:40
 * @Description:
 */
import { MuselyUIComponent } from './common'

/** Toggleable menu for displaying lists of links and actions. */
export declare class MuDropdownItem extends MuselyUIComponent {
  /** A command to be dispatched to Dropdown's command callback */
  command: string | number | object

  /** Whether the item is disabled */
  disabled: boolean

  /** Whether a divider is displayed */
  divided: boolean

  /** Icon to show on left side of text */
  icon: string
}
