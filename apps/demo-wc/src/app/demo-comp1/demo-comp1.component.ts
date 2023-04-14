import type { OnInit } from '@angular/core';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Inject, Input, ViewEncapsulation } from '@angular/core';
import { CommunicationServiceToken } from '@core-lib/config/communication-service.config';
import type { ChannelMessage } from '@core-lib/interface/channel-message';
import { ICommunicationService } from '@core-lib/interface/communication-service.interface';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-web-components-demo-comp1',
  templateUrl: './demo-comp1.component.html',
  styleUrls: ['./demo-comp1.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class DemoComp1Component implements OnInit {
  @Input()
  data: any;

  @Input()
  makeCall = new EventEmitter<any>();

  @Input()
  get cancelCall(): (data) => void {
    return (data) => {
      this.cancelCall$.next(data);
    };
  }

  public testData: string = 'DemoComp1Component_Message_Test';
  public channelMessage = 'N/A';
  private cancelCall$: Subject<any> = new Subject<any>();

  constructor(@Inject(CommunicationServiceToken) public communicationService: ICommunicationService, private cdr: ChangeDetectorRef) {
    console.log('DemoComp1Component constructor');

    this.registerCancelCallListener();
    this.communicationService.messageListener$().subscribe((data: ChannelMessage) => {
      console.log('DemoComp1Component');
      console.log(data);
      this.channelMessage = JSON.stringify(data) || 'N/A';
      this.cdr.detectChanges();
    });
  }

  public ngOnInit() {
    this.makeCall.asObservable().subscribe((eve) => {
      this.data = JSON.stringify(eve) || 'Data modified by consumer';
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

  private registerCancelCallListener() {
    this.cancelCall$.subscribe((data) => {
      console.log('cancelCall fn invoked  in DemoComp1Component');
    });
  }
}
