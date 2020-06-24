/*
 * @Author: Victor wang
 * @Date: 2020-06-23 21:38:33
 * @LastEditors: Victor.wang
 * @LastEditTime: 2020-06-25 01:03:24
 * @Description:
 */
import { MuselyUIComponent } from './common'

export interface QueryChangeHandler {
  /**
   * @param queryString Current value of the text input
   */
  (queryString: string): void
}

/** Dropdown Select Component */
export declare class MuSelect extends MuselyUIComponent {
  /** The form input value */
  value: any

  /** Whether Select is disabled */
  disabled: boolean

  /** Unique identity key name for value, required when value is an object */
  valueKey: string

  /** Whether single select can be cleared */
  clearable: boolean

  /** Same as autocomplete in native input */
  autocomplete: string

  /** The name attribute of select input */
  name: string

  /** Placeholder */
  placeholder: string

  /** Whether Select is filterable */
  filterable: boolean

  /** Whether creating new items is allowed. To use this, filterable must be true */
  allowCreate: boolean

  // /** Custom filter method */
  filterMethod: QueryChangeHandler

  /** Displayed text when no data matches the filtering query */
  noMatchText: string

  /** Displayed text when there is no options */
  noDataText: string

  /** Custom class name for Select's dropdown */
  popperClass: string

  /** Select first matching option on enter key. Use with filterable or remote */
  defaultFirstOption: boolean

  /** Whether to append the popper menu to body */
  popperAppendToBody: boolean

  /**
   * Focus the Input component
   */
  focus(): void

  /**
   * Blur the Input component, and hide the dropdown
   */
  blur(): void
}
