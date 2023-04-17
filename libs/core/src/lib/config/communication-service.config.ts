import { InjectionToken, NgZone } from '@angular/core';
import type { ICommunicationService } from '../interface/communication-service.interface';
import { BroadcastMessageService } from '../service/communication/broadcast-message.service';

export const BroadcastChannelName = 'UniqueBroadcastChannel';

export const CommunicationServiceToken = new InjectionToken<ICommunicationService>('PersonalWebCompCommunicationServiceToken', {
  providedIn: 'any',
  factory: () => {
    console.log('EaasWebCompCommunicationServiceToken');
    return new BroadcastMessageService(BroadcastChannelName, new NgZone({ enableLongStackTrace: true }));
  },
});
