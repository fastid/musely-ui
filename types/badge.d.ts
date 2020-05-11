/*
 * @Author: Victor wang
 * @Date: 2020-05-11 11:37:51
 * @LastEditors: Victor.wang
 * @LastEditTime: 2020-05-11 11:38:13
 * @Description:
 */
import { MuselyUIComponent } from './common'

/** Badge Component */
export declare class MuBadge extends MuselyUIComponent {
  /** Display value */
  value: string | number

  /** Maximum value, shows '{max}+' when exceeded. Only works if `value` is a number */
  max: number

  /** If a little dot is displayed */
  isDot: boolean

  /** Hidden badge */
  hidden: boolean
}
