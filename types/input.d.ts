/*
 * @Author: Victor wang
 * @Date: 2020-05-10 22:20:49
 * @LastEditors: Victor.wang
 * @LastEditTime: 2020-05-12 02:02:33
 * @Description:
 */
import { MuselyUIComponent } from './common'

/** The resizability of el-input component */
export type Resizability = 'none' | 'both' | 'horizontal' | 'vertical'
export type InputType = 'text' | 'textarea'

/** Controls how el-input component automatically sets size */
export interface AutoSize {
  /** Minimum rows to show */
  minRows: number

  /** Maximum rows to show */
  maxRows: number
}

/** Input Component */
export declare class MuInput extends MuselyUIComponent {
  /** Type of input */
  type: InputType

  /** Binding value */
  value: string | number

  /** Maximum Input text length */
  maxlength: string | number

  /** Minimum Input text length */
  minlength: string | number

  /** Placeholder of Input */
  placeholder: string

  /** Whether Input is disabled */
  disabled: boolean

  /** Prefix icon class */
  prefixIcon: string

  /** Suffix icon class */
  suffixIcon: string

  /** Number of rows of textarea, only works when type is 'textarea' */
  rows: number

  /** Whether textarea has an adaptive height, only works when type is 'textarea' */
  autosize: boolean | AutoSize

  /** Same as autocomplete in native input */
  autocomplete: string

  /** Same as name in native input */
  name: string

  /** Same as readonly in native input */
  readonly: boolean

  /** Same as max in native input */
  max: any

  /** Same as min in native input */
  min: any

  /** Same as step in native input */
  step: any

  /** Control the resizability */
  resize: Resizability

  /** Same as autofocus in native input */
  autofocus: boolean

  /** Same as form in native input */
  form: string

  /** Whether to trigger form validatio */
  validateEvent: boolean

  /** Whether the input is clearable */
  clearable: boolean

  /** Whether to show password */
  showPassword: boolean

  /** Whether to show wordCount when setting maxLength */
  showWordLimit: boolean

  /**
   * Focus the Input component
   */
  focus(): void

  /**
   * Blur the Input component
   */
  blur(): void

  /**
   * Select the text in input element
   */
  select(): void
}
