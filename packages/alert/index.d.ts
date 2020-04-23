/*
 * @Author: Victor wang
 * @Date: 2020-04-22 17:33:20
 * @LastEditors: Victor.wang
 * @LastEditTime: 2020-04-22 19:00:08
 * @Description:
 */
import { MuselyUIComponent } from '../../types/common'

export type AlertType = 'success' | 'warning' | 'info' | 'error'
export type AlertEffect = 'dark' | 'light'

/** Alert Component */
export declare class MuAlert extends MuselyUIComponent {
  /** Title */
  title: string

  /** Component type */
  type: AlertType

  /** Descriptive text. Can also be passed with the default slot */
  description: string

  /** If closable or not */
  closable: boolean

  /** whether to center the text */
  center: boolean

  /** Customized close button text */
  closeText: string

  /** If a type icon is displayed */
  showIcon: boolean

  /** Choose effect */
  effect: AlertEffect
}
