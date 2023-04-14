export interface ChannelMessage {
  /**
   * Channel id
   */
  channelId: string;

  /**
   * A unique identifier for the message. For ex: OnCallInitiate, OnCallCancel etc..
   */
  id: string;

  /**
   * Message data object
   */
  data: any;
}
