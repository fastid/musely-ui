/*
 * @Author: Victor wang
 * @Date: 2020-04-04 00:58:00
 * @LastEditors: Victor.wang
 * @LastEditTime: 2020-06-20 00:46:05
 * @Description:
 */
import { MuselyUIComponent } from './common'

/** MuRadio Component */
export declare class MuRadio extends MuselyUIComponent {
  /** The form input value */
  value: string

  /** The value of radio */
  label: string | number | boolean

  /** Whether radio is disabled */
  disabled: boolean

  /** Whether to add a border around Radio */
  border: boolean

  /** Native 'name' attribute */
  name: string
}
