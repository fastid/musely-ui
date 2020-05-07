/*
 * @Author: Victor wang
 * @Date: 2020-04-04 00:58:00
 * @LastEditors: Victor.wang
 * @LastEditTime: 2020-05-07 13:20:16
 * @Description:
 */
import Vue, { VNode } from 'vue'

export type MessageType = 'success' | 'warning' | 'info' | 'error'

/** Message Component */
export declare class MuMessageComponent extends Vue {
  /** Close the Loading instance */
  close(): void
}

export interface CloseEventHandler {
  /**
   * Triggers when a message is being closed
   *
   * @param instance The message component that is being closed
   */
  (instance: MuMessageComponent): void
}

/** Options used in Message */
export interface MuMessageOptions {
  /** Message text */
  message: string | VNode

  /** Message type */
  type?: MessageType

  /** Custom icon's class, overrides type */
  iconClass?: string

  /** Custom class name for Message */
  customClass?: string

  /** Display duration, millisecond. If set to 0, it will not turn off automatically */
  duration?: number

  /** Whether to show a close button */
  showClose?: boolean

  /** Whether to center the text */
  center?: boolean

  /** Whether message is treated as HTML string */
  dangerouslyUseHTMLString?: boolean

  /** Callback function when closed with the message instance as the parameter */
  onClose?: CloseEventHandler

  /** Set the distance to the top of viewport. Default is 20 px. */
  offset?: number
}

export interface MuMessage {
  /** Show an info message */
  (text: string): MuMessageComponent

  /** Show message */
  (options: MuMessageOptions): MuMessageComponent

  /** Show a success message */
  success(text: string): MuMessageComponent

  /** Show a success message with options */
  success(options: MuMessageOptions): MuMessageComponent

  /** Show a warning message */
  warning(text: string): MuMessageComponent

  /** Show a warning message with options */
  warning(options: MuMessageOptions): MuMessageComponent

  /** Show an info message */
  info(text: string): MuMessageComponent

  /** Show an info message with options */
  info(options: MuMessageOptions): MuMessageComponent

  /** Show an error message */
  error(text: string): MuMessageComponent

  /** Show an error message with options */
  error(options: MuMessageOptions): MuMessageComponent
}

declare module 'vue/types/vue' {
  interface Vue {
    /** Used to show feedback after an activity. The difference with Notification is that the latter is often used to show a system level passive notification. */
    $message: MuMessage
  }
}
