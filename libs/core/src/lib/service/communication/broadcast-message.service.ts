import { Injectable, NgZone } from '@angular/core';
import type { Observable } from 'rxjs';
import { filter, Subject, tap } from 'rxjs';
import type { ChannelMessage } from '../../interface/channel-message';
import type { ICommunicationService } from '../../interface/communication-service.interface';
import { v4 as uuidv4 } from 'uuid';
import { BroadcastChannelName } from '../../config/communication-service.config';

/**
 * A communication channel between web components using Broadcast Channel API.
 */
@Injectable()
export class BroadcastMessageService implements ICommunicationService {
  private broadcaster: BroadcastChannel;
  private messageReceiver: BroadcastChannel;

  private readonly channelMessages$ = new Subject<ChannelMessage>();
  private channelId: string;

  constructor(private broadcastChannelName: string, private ngZone: NgZone) {
    console.log('%c >>>> BroadcastMessageService constructor', 'color: blue');
    this.establishMessageChannel();
    console.log('%c communicationChannelId - ' + this.channelId, 'color: orange');
    this.startBroadcastChannelListening();
  }

  establishMessageChannel() {
    this.channelId = uuidv4();
    this.broadcaster = new BroadcastChannel(this.broadcastChannelName);
    this.messageReceiver = new BroadcastChannel(this.broadcastChannelName);
  }

  publishRequest(message: ChannelMessage): void {
    console.log('vvvvv');
    console.log('%c in publishRequest() -> communicationChannelId - ' + this.channelId, 'color: orange');
    console.log(message);
    console.log('^^^^^');
    if (!message.channelId) {
      message.channelId = this.channelId;
    }
    this.broadcaster.postMessage(message);
  }

  publishResponse(message: ChannelMessage): void {
    if (!message.channelId) {
      throw new Error('Response message from orchestration layer is missing channel id');
    }
    this.broadcaster.postMessage(message);
  }

  getMessages$(): Observable<ChannelMessage> {
    console.log('%c in getMessages$() -> communicationChannelId - ' + this.channelId, 'color: orange');
    return this.channelMessages$.asObservable().pipe(
      tap((d) => {
        console.log('vvvvv');
        console.log('%c getMessages$() - tap -> communicationChannelId - ' + this.channelId, 'color: orange');
        console.log(d);
        console.log('^^^^^');
      }),
      filter((message: ChannelMessage) => message.channelId === this.channelId),
    );
  }

  getAllMessages$(): Observable<ChannelMessage> {
    console.log('%c in getAllMessages$() -> communicationChannelId - ' + this.channelId, 'color: orange');
    return this.channelMessages$.asObservable().pipe(
      tap((d) => {
        console.log('vvvvv');
        console.log('%c getAllMessages$() - tap -> communicationChannelId - ' + this.channelId, 'color: orange');
        console.log(d);
        console.log('^^^^^');
      }),
    );
  }

  disconnectMessageChannel() {
    console.log('%c disconnectMessageChannel() - tap -> communicationChannelId - ' + this.channelId, 'color: orange');
    this.broadcaster.close();
    this.messageReceiver.close();
  }

  /**
   * Private fns
   */

  private startBroadcastChannelListening() {
    console.log('%c in registerBroadcastChannelMessages -> communicationChannelId - ' + this.channelId, 'color: orange');
    this.messageReceiver.onmessage = (event: MessageEvent) => {
      console.log('vvvvv');
      console.log('%c onmessage registerBroadcastChannelMessages -> communicationChannelId - ' + this.channelId, 'color: orange');
      console.log(event);
      console.log('^^^^^');
      this.ngZone.run(() => {
        this.channelMessages$.next(event.data);
      });
      // this.channelMessages$.next(event.data);
    };

    this.messageReceiver.onmessageerror = (event: MessageEvent) => {
      console.log('>>>> error');
      console.log(event);
    };
  }
}
