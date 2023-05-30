export interface MessageType {
  /**
   * Message data object
   */
  data: { [key: string]: any };

  /**
   * Type of message an enum
   */
  type: any;
}
