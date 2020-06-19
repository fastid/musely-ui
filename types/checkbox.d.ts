/*
 * @Author: Victor wang
 * @Date: 2020-04-04 00:58:00
 * @LastEditors: Victor.wang
 * @LastEditTime: 2020-06-20 00:46:15
 * @Description:
 */
import { MuselyUIComponent } from './common'

/** MuCheckbox Component */
export declare class MuCheckbox extends MuselyUIComponent {
  /** The form input value */
  value: string | string[]

  /** Value of the checkbox when used inside a checkbox-group */
  label: string | number | boolean

  /** Value of the checkbox if it's checked */
  trueLabel: string | number

  /** Value of the checkbox if it's not checked */
  falseLabel: string | number

  /** Native 'name' attribute */
  name: string

  /** Whether to add a border around Checkbox */
  border: boolean

  /** If the checkbox is disabled */
  disabled: boolean

  /** If the checkbox is checked */
  checked: boolean

  /** Same as indeterminate in native checkbox */
  indeterminate: boolean
}
