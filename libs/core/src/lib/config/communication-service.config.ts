import { InjectionToken, NgZone } from '@angular/core';
import type { ICommunicationService } from '../interface/communication-service.interface';
import { BroadcastMessageService } from '../service/communication/broadcast-message.service';

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
  useFactory: (ngZone: NgZone) => new BroadcastMessageService(BroadcastChannelName, ngZone),
  deps: [NgZone],
};
