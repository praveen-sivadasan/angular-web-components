import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { CommunicationServiceToken } from '@core-lib/config/communication-service.config';
import type { ChannelMessage } from '@core-lib/interface/channel-message';
import { ICommunicationService } from '@core-lib/interface/communication-service.interface';

@Component({
  selector: 'app-demo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public channelMessage: string = '';

  @ViewChild('demoWC1', { static: true })
  titleElement: ElementRef;

  constructor(@Inject(CommunicationServiceToken) public communicationService: ICommunicationService) {
    console.log('AppComponent constructor');
    this.communicationService.allMessageListener$().subscribe((data: ChannelMessage) => {
      this.channelMessage = JSON.stringify(data);
      console.log('AppComponent');
      console.log(data);
    });
  }

  public makeCall() {
    this.titleElement.nativeElement.makeCall.emit('Make a call');
  }

  public cancelCall() {
    this.titleElement.nativeElement.cancelCall('Cancel call data');
  }
}
