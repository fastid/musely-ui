/*
 * @Author: Victor wang
 * @Date: 2020-04-23 19:16:26
 * @LastEditors: Victor.wang
 * @LastEditTime: 2020-06-20 02:27:24
 * @Description:
 */
import { MuselyUIComponent } from './common'

/** Button type */
export type LinkType = 'primary' | 'success' | 'warning' | 'danger' | 'info'

/** Link Component */
export declare class MuLink extends MuselyUIComponent {
  /** Link type */
  type: LinkType

  /** Disable the link */
  disabled: boolean

  /** Link underline */
  underline: boolean

  /** Link icon, accepts an icon name of Musely icon component */
  icon: string

  /** Link href */
  href: string

  /** Link target */
  target: string
}
