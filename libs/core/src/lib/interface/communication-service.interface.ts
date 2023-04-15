import type { Observable } from 'rxjs';
import type { ChannelMessage } from './channel-message';

export interface ICommunicationService {
  /**
   * Create/Establish a message channel for web components
   */
  establishMessageChannel();

  /**
   * Function to be used to initiate a message request from web components through the
   * communication channel
   * @param message
   */
  publishRequest(message: ChannelMessage);

  /**
   * Function to be used by the orchestration layer to send a message back as a response to
   * the request message.
   * @param message
   */
  publishResponse(message: ChannelMessage);

  /**
   * Returns an observable to listen to messages relevant to the component in context
   * This is the recommended function for this purpose in web components.
   */
  getMessages$(): Observable<ChannelMessage>;

  /**
   * Disconnect existing message channel
   */
  disconnectMessageChannel();
}
