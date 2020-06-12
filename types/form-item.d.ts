/*
 * @Author: Victor wang
 * @Date: 2020-06-12 10:31:40
 * @LastEditors: Victor.wang
 * @LastEditTime: 2020-06-12 10:55:16
 * @Description:
 */
import { MuselyUIComponent } from './common'

/** FormItem Component */
export declare class MuFormItem extends MuselyUIComponent {
  /** A key of `model` of the enclosing `mu-form` component */
  prop: string

  /** Label */
  label: string

  /** Width of label, e.g. '50px' */
  labelWidth: string

  /** Whether the field is required or not, will be determined by validation rules if omitted */
  required: boolean

  /** Validation rules of form */
  rules: object

  /** Field error message, set its value and the field will validate error and show this message immediately */
  error: string

  /** Whether to show the error message */
  showMessage: boolean

  /** Whether to display the error message inline with the form item */
  inlineMessage: boolean

  /** Reset current field and remove validation result */
  resetField(): void

  /** Remove validation status of the field */
  clearValidate(): void
}
