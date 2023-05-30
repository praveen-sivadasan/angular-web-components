import type { Observable } from 'rxjs';
import type { ChannelMessage } from './channel-message';
import type { MessageType } from './message-type';

export interface ICommunicationService {
  /**
   * Create/establish a message channel for communication
   */
  establishMessageChannel();

  /**
   * Function to be used to initiate a message request from web components through the
   * communication channel
   * @param message
   */
  publishRequestMessage(message: MessageType);

  /**
   * Function to be used by the orchestration layer to send a message back as a response to
   * the request message
   * @param message
   */
  publishResponseMessage(message: ChannelMessage);

  /**
   * Returns an observable to listen to messages in a specific channel with id
   * Function to be used in web components
   */
  getMessages$(): Observable<ChannelMessage>;

  /**
   * Returns an observable to listen to all messages in channel
   * Function for orchestration layer or any other special scenarios
   */
  getAllMessages$(): Observable<ChannelMessage>;

  /**
   * Disconnect/Close existing message channel if any
   * Important Note: After a channel is created it is mandatory to close the channel when its use is complete
   */
  disconnectMessageChannel();
}
