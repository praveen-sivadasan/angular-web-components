import { InjectionToken, NgZone, RendererFactory2 } from '@angular/core';
import type { ICommunicationService } from '../interface/communication-service.interface';
import { BroadcastMessageService } from '../service/communication/broadcast-message.service';
import { LocalStorageService } from '../service/client-storage/local-storage.service';

export const BroadcastChannelName = 'UniqueBroadcastChannel';

// export const CommunicationServiceToken = new InjectionToken<BroadcastMessageService>('PersonalWebCompCommunicationServiceToken', {
//   providedIn: 'any',
//   factory: (renderer: RendererFactory2) => {
//     console.log('EaasWebCompCommunicationServiceToken');
//     return new BroadcastMessageService(BroadcastChannelName, renderer, new NgZone({ enableLongStackTrace: true }));
//   },
// });

export const CommunicationServiceToken = new InjectionToken<ICommunicationService>('PersonalWebCompCommunicationServiceToken');

export const CommunicationServiceTokenProvider = {
  provide: CommunicationServiceToken,
  useFactory: (rendererFactory: RendererFactory2, ngZone: NgZone, storageService: LocalStorageService) =>
    new BroadcastMessageService(BroadcastChannelName, rendererFactory, ngZone, storageService),
  deps: [RendererFactory2, NgZone, LocalStorageService],
};
