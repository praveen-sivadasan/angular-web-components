import { Injectable, NgZone } from '@angular/core';
import type { Observable } from 'rxjs';
import { filter, Subject, tap } from 'rxjs';
import type { ChannelMessage } from '../../interface/channel-message';
import type { ICommunicationService } from '../../interface/communication-service.interface';

/**
 * A communication channel between web components using Broadcast Channel API.
 */
@Injectable()
export class BroadcastMessageService implements ICommunicationService {
  private broadcastChannel: BroadcastChannel;
  private channelMessageListener$ = new Subject<ChannelMessage>();
  private readonly communicationChannelId: string;

  constructor(private broadcastChannelName: string, private ngZone: NgZone) {
    this.registerChannel(broadcastChannelName);
    // TODO to update logic
    this.communicationChannelId = Math.random().toString();
    this.registerBroadcastChannelMessages();
    console.log('>>>> BroadcastMessageService constructor');
    console.log('communicationChannelId - ' + this.communicationChannelId);
  }

  publishRequest(message: ChannelMessage): void {
    if (!message.channelId) {
      message.channelId = this.communicationChannelId;
    }
    this.broadcastChannel.postMessage(message);
  }

  publishResponse(message: ChannelMessage): void {
    if (!message.channelId) {
      throw new Error('Response message from orchestration layer is missing channel id');
    }
    this.broadcastChannel.postMessage(message);
  }

  messageListener$(): Observable<ChannelMessage> {
    return this.channelMessageListener$.asObservable().pipe(
      tap((d) => {
        console.log('messageListener$() - tap');
        console.log(d);
        console.log('communicationChannelId - ' + this.communicationChannelId);
      }),
      filter((message: ChannelMessage) => message?.channelId === this.communicationChannelId),
    );
  }

  allMessageListener$(): Observable<ChannelMessage> {
    return this.channelMessageListener$.asObservable();
  }

  establishMessageChannel() {
    throw new Error('Method not to be invoked for broadcast channel message service.');
  }

  disconnectMessageChannel() {
    throw new Error('Method not to be invoked for broadcast channel message service.');
  }

  /**
   * Private fns
   */

  private registerChannel(broadcastChannelName: string) {
    if (!this.broadcastChannel) {
      this.broadcastChannel = new BroadcastChannel(broadcastChannelName);
    }
  }

  private registerBroadcastChannelMessages() {
    this.broadcastChannel.onmessage = (event: MessageEvent) => {
      console.log(event);
      this.ngZone.run(() => {
        this.channelMessageListener$.next(event.data);
      });
    };
  }
}
