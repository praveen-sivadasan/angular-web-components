import { Injectable, NgZone, OnDestroy, Renderer2, RendererFactory2 } from '@angular/core';
import type { Observable } from 'rxjs';
import { filter, Subject, tap } from 'rxjs';
import type { ChannelMessage } from '../../interface/channel-message';
import type { ICommunicationService } from '../../interface/communication-service.interface';
import { v4 as uuidv4 } from 'uuid';
import { BroadcastChannelName } from '../../config/communication-service.config';
import { IClientStorageService } from '../../interface/client-storage-service.interface';

/**
 * A communication channel between web components using Broadcast Channel API.
 */
@Injectable()
export class BroadcastMessageService implements ICommunicationService, OnDestroy {
  private broadcaster: BroadcastChannel;
  private messageReceiver: BroadcastChannel;

  private readonly channelMessages$ = new Subject<ChannelMessage>();
  private channelId: string;
  private renderer: Renderer2;

  constructor(
    private broadcastChannelName: string,
    private rendererFactory: RendererFactory2,
    private ngZone: NgZone,
    private storageService: IClientStorageService,
  ) {
    console.log('%c >>>> BroadcastMessageService constructor', 'color: blue');
    this.establishMessageChannel();
    console.log('%c communicationChannelId - ' + this.channelId, 'color: orange');
    this.startBroadcastChannelListening();
    this.setupWindowCloseListener(rendererFactory);
  }

  establishMessageChannel() {
    this.channelId = uuidv4();
    this.storageService.set(BroadcastChannelName, (this.storageService.get(BroadcastChannelName) || 0) + 1);
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
    throw new Error('Not required to call this function from outside the service.');
    // console.log('BroadcastMessageService disconnectMessageChannel');
    // this.cleanupBroadcastChannelConnection();
  }

  /**
   * Open issue ngOnDestroy not called - https://github.com/angular/angular/issues/14818
   */
  public ngOnDestroy() {
    console.log('BroadcastMessageService destroyed');
    this.cleanupBroadcastChannelConnection();
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

  private setupWindowCloseListener(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
    this.renderer.listen('window', 'beforeunload', (event) => {
      alert('Closing browser');
      this.storageService.remove(BroadcastChannelName);
    });
  }

  private cleanupBroadcastChannelConnection() {
    this.storageService.set(BroadcastChannelName, (this.storageService.get(BroadcastChannelName) || 0) - 1);
    if (!this.storageService.get(BroadcastChannelName) || this.storageService.get(BroadcastChannelName) <= 0) {
      alert('Closing channel from onDestroy');
      this.broadcaster.close();
      this.messageReceiver.close();
    }
  }
}
