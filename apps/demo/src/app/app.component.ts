import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import type { ChannelMessage } from '@core-lib/interface/channel-message';
import { ICommunicationService } from '@core-lib/interface/communication-service.interface';
import { CommunicationServiceToken, CommunicationServiceTokenProvider } from '@core-lib/config/communication-service.config';

@Component({
  selector: 'app-demo-root',
  templateUrl: './app.component.html',
  providers: [CommunicationServiceTokenProvider],
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @ViewChild('demoWC1', { static: true })
  demoWC1Ele: ElementRef;

  public hideWC2 = false;
  public channelMessage = 'N/A';

  constructor(@Inject(CommunicationServiceToken) public communicationService: ICommunicationService) {
    console.log('AppComponent constructor');
    this.communicationService.getAllMessages$().subscribe((data: ChannelMessage) => {
      console.log('DemoComp1Component');
      console.log(data);
      this.channelMessage = JSON.stringify(data) || 'N/A';
    });
  }

  public makeCall() {
    this.demoWC1Ele.nativeElement.makeCall.emit('Make a call');
  }

  public cancelCall() {
    this.demoWC1Ele.nativeElement.cancelCall('Cancel call data');
  }
}
