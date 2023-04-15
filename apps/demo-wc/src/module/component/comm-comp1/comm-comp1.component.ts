import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { CommunicationServiceToken } from '@core-lib/config/communication-service.config';
import type { ChannelMessage } from '@core-lib/interface/channel-message';
import { ICommunicationService } from '@core-lib/interface/communication-service.interface';
@Component({
  selector: 'engage-comm-comp1',
  templateUrl: './comm-comp1.component.html',
  styleUrls: ['./comm-comp1.component.scss'],
})
export class CommComp1Component {
  public channelMessage: string;
  constructor(@Inject(CommunicationServiceToken) public communicationService: ICommunicationService) {
    console.log('CommComp1Component constructor');
    this.communicationService.getMessages$().subscribe((data: ChannelMessage) => {
      console.log('CommComp1Component');
      console.log(data);
      this.channelMessage = JSON.stringify(data);
    });
  }
}
