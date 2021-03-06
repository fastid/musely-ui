/*
 * @Author: Victor wang
 * @Date: 2020-03-31 16:38:01
 * @LastEditors: Victor.wang
 * @LastEditTime: 2020-06-24 02:05:06
 * @Description:
 */

import Vue from 'vue'

/** MuselyUI component common definition */
export declare class MuselyUIComponent extends Vue {
  /** Install component into Vue */
  static install(vue: typeof Vue): void
}

/** Horizontal alignment */
export type MuselyUIHorizontalAlignment = 'left' | 'center' | 'right'

export interface IAnyData {
  any?: any
  [any: string]: any
}
