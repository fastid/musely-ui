/*
 * @Author: Victor wang
 * @Date: 2020-04-04 00:57:49
 * @LastEditors: Victor.wang
 * @LastEditTime: 2020-04-23 15:30:57
 * @Description:
 */
import { MuselyUIComponent } from '../../types/common'

/** Responsive column props */
export interface ResponsiveColumnProperties {
  /** Number of column the grid spans */
  span: number

  /** Number of spacing on the left side of the grid */
  offset: number
}

/** Responsive column property */
export type ResponsiveColumn = number | ResponsiveColumnProperties

/** Colunm Layout Component */
export declare class MuCol extends MuselyUIComponent {
  [any: string]: any
  /** Number of column the grid spans */
  span: number

  /** Number of spacing on the left side of the grid */
  offset: number

  /** Number of columns that grid moves to the right */
  push: number

  /** Number of columns that grid moves to the left */
  pull: number

  /** <768px Responsive columns or column props object */
  xs: ResponsiveColumn

  /** ≥768px Responsive columns or column props object */
  sm: ResponsiveColumn

  /** ≥992px Responsive columns or column props object */
  md: ResponsiveColumn

  /** ≥1200px Responsive columns or column props object */
  lg: ResponsiveColumn

  /** ≥1920px Responsive columns or column props object */
  xl: ResponsiveColumn

  /** custom element tag */
  tag: string
}
