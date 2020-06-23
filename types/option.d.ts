/*
 * @Author: Victor wang
 * @Date: 2020-06-23 21:42:23
 * @LastEditors: Victor.wang
 * @LastEditTime: 2020-06-23 21:42:47
 * @Description:
 */
import { MuselyUIComponent } from './common'

/** Dropdown Select Option Component */
export declare class MuOption extends MuselyUIComponent {
  /** Value of option */
  value: any

  /** Label of option, same as value if omitted */
  label: string

  /** Whether option is disabled */
  disabled: boolean
}
