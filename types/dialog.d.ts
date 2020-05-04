import { VNode } from 'vue'
import { MuselyUIComponent } from './common'

/** Container Component */
export interface DialogSlots {
  /** Content of the Dialog */
  default: VNode[]

  /** Content of the Dialog title */
  title: VNode[]

  /** Content of the Dialog footer */
  footer: VNode[]

  [key: string]: VNode[]
}

/** Informs users while preserving the current page state */
export declare class MuDialog extends MuselyUIComponent {
  /** Title of Dialog */
  title: string

  /** Width of Dialog */
  top: string

  /** Whether a mask is displayed */
  modal: object

  // TODO ...
  // $slots: DialogSlots
}
