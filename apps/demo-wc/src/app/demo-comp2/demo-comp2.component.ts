import { ChangeDetectorRef, Component, Inject, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { CommunicationServiceToken } from '@core-lib/config/communication-service.config';
import type { ChannelMessage } from '@core-lib/interface/channel-message';
import { ICommunicationService } from '@core-lib/interface/communication-service.interface';

@Component({
  selector: 'app-web-components-demo-comp2',
  templateUrl: './demo-comp2.component.html',
  styleUrls: ['./demo-comp2.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class DemoComp2Component {
  @Input()
  data: any;

  public testData: string;
  public channelMessage = 'N/A';

  constructor(@Inject(CommunicationServiceToken) public communicationService: ICommunicationService, private cdr: ChangeDetectorRef) {
    console.log('DemoComp2Component constructor');
    this.testData = 'DemoComp2Component_Message_Test';

    this.communicationService.messageListener$().subscribe((data: ChannelMessage) => {
      console.log('DemoComp2Component');
      console.log(data);
      this.channelMessage = JSON.stringify(data) || 'N/A';
      this.cdr.detectChanges();
    });
  }

  public publishMessage() {
    this.communicationService.publishRequest({
      data: {
        message: this.testData,
      },
    } as ChannelMessage);
  }
}
