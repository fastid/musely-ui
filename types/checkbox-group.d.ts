/*
 * @Author: Victor wang
 * @Date: 2020-04-04 00:58:00
 * @LastEditors: Victor.wang
 * @LastEditTime: 2020-06-19 16:16:38
 * @Description:
 */
import { MuselyUIComponent } from './common'

/** MuCheckboxGroup Component */
export declare class MuCheckboxGroup extends MuselyUIComponent {
  /** Whether the nesting checkboxes are disabled */
  disabled: boolean

  /** Minimum number of checkbox checked */
  min: number

  /** Maximum number of checkbox checked */
  max: number

  /** Font color when button is active */
  textColor: string

  /** Border and background color when button is active */
  fill: string
}
