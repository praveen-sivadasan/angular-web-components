import { Injectable, NgZone } from '@angular/core';
import type { Observable } from 'rxjs';
import { Subject, tap } from 'rxjs';
import type { ChannelMessage } from '../../interface/channel-message';
import type { ICommunicationService } from '../../interface/communication-service.interface';

/**
 * A communication channel between web components using Broadcast Channel API.
 */
@Injectable()
export class BroadcastMessageService implements ICommunicationService {
  private broadcaster: BroadcastChannel;
  private messageReceiver: BroadcastChannel;

  private readonly channelMessages$ = new Subject<ChannelMessage>();

  constructor(private ngZone: NgZone) {
    console.log('%c >>>> BroadcastMessageService constructor', 'color: blue');
    this.establishMessageChannel();
    console.log('%c communicationChannelId - ' + this.broadcaster.name, 'color: orange');
    this.startBroadcastChannelListening();
  }

  establishMessageChannel() {
    // TODO to update channel logic
    const channelName = Math.random().toString();
    this.broadcaster = new BroadcastChannel(channelName);
    this.messageReceiver = new BroadcastChannel(channelName);
  }

  publishRequest(message: ChannelMessage): void {
    console.log('vvvvv');
    console.log('%c in publishRequest() -> communicationChannelId - ' + this.broadcaster.name, 'color: orange');
    console.log(message);
    console.log('^^^^^');
    if (!message.channelName) {
      message.channelName = this.broadcaster.name;
    }
    this.broadcaster.postMessage(message);
  }

  publishResponse(message: ChannelMessage): void {
    if (!message.channelName) {
      throw new Error('Response message from orchestration layer is missing channel id');
    }
    this.broadcaster.postMessage(message);
  }

  getMessages$(): Observable<ChannelMessage> {
    console.log('%c in messageListener$() -> communicationChannelId - ' + this.broadcaster.name, 'color: orange');
    return this.channelMessages$.asObservable().pipe(
      tap((d) => {
        console.log('vvvvv');
        console.log('%c messageListener$() - tap -> communicationChannelId - ' + this.broadcaster.name, 'color: orange');
        console.log(d);
        console.log('^^^^^');
      }),
    );
  }

  disconnectMessageChannel() {
    console.log('%c disconnectMessageChannel() - tap -> communicationChannelId - ' + this.broadcaster.name, 'color: orange');
    this.broadcaster.close();
    this.messageReceiver.close();
  }

  /**
   * Private fns
   */

  private startBroadcastChannelListening() {
    console.log('%c in registerBroadcastChannelMessages -> communicationChannelId - ' + this.broadcaster.name, 'color: orange');
    this.messageReceiver.onmessage = (event: MessageEvent) => {
      console.log('vvvvv');
      console.log('%c onmessage registerBroadcastChannelMessages -> communicationChannelId - ' + this.broadcaster.name, 'color: orange');
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
