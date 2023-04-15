import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-demo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @ViewChild('demoWC1', { static: true })
  demoWC1Ele: ElementRef;

  public hideWC2 = false;

  constructor() {
    console.log('AppComponent constructor');
  }

  public makeCall() {
    this.demoWC1Ele.nativeElement.makeCall.emit('Make a call');
  }

  public cancelCall() {
    this.demoWC1Ele.nativeElement.cancelCall('Cancel call data');
  }
}
