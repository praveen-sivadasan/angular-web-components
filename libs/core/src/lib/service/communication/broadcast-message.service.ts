import { NgZone } from '@angular/core';
import type { Observable } from 'rxjs';
import { filter, Subject } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import type { ChannelMessage } from '../../interface/channel-message';
import type { ICommunicationService } from '../../interface/communication-service.interface';
import type { MessageType } from '../../interface/message-type';

/* eslint-disable no-console */

/**
 * A communication channel between web components using Broadcast Channel API.
 */
export class BroadcastMessageService implements ICommunicationService {
  private broadcaster: BroadcastChannel;
  private messageReceiver: BroadcastChannel;

  private readonly channelMessages$ = new Subject<ChannelMessage>();
  private channelId: string;

  constructor(private readonly broadcastChannelName: string, private readonly ngZone: NgZone) {
    this.connectToChannel();
    this.startMessageChannelListening();
    console.log('>>>>>>>. channel id', this.channelId);
  }

  establishMessageChannel(): void {
    throw new Error('Not implemented for this service, already handled by constructor.');
  }

  publishRequestMessage(message: MessageType): void {
    const channelMessage = {
      ...message,
      channelId: this.channelId,
    };
    this.broadcaster.postMessage(channelMessage);
  }

  publishResponseMessage(message: ChannelMessage): void {
    if (!message.channelId) {
      throw new Error(`Response message from orchestration layer is missing 
      channel id. Please fill the channel id from the request object.`);
    }
    this.broadcaster.postMessage(message);
  }

  /**
   * All users of this fn should explicitly unsubscribe
   */
  getMessages$(): Observable<ChannelMessage> {
    return this.channelMessages$.asObservable().pipe(filter((message: ChannelMessage) => message.channelId === this.channelId));
  }

  /**
   * All users of this fn should explicitly unsubscribe
   */
  getAllMessages$(): Observable<ChannelMessage> {
    return this.channelMessages$.asObservable();
  }

  /**
   * Current architecture uses only 1 channel API throughout browser.
   * Hence cleanup not required.
   */
  disconnectMessageChannel() {
    throw new Error('Not required to call this function from outside the service.');
  }

  /**
   * Private fns
   */

  private startMessageChannelListening() {
    this.messageReceiver.onmessage = (event: MessageEvent) => {
      this.ngZone.run(() => {
        this.channelMessages$.next(event.data);
      });
    };

    this.messageReceiver.onmessageerror = (event: MessageEvent) => {
      console.error('Error in message channel', event);
    };
  }

  private connectToChannel(): void {
    this.channelId = uuidv4();
    this.broadcaster = new BroadcastChannel(this.broadcastChannelName);
    this.messageReceiver = new BroadcastChannel(this.broadcastChannelName);
  }
}
