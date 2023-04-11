import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'angular-web-components-demo-comp1',
  templateUrl: './demo-comp1.component.html',
  styleUrls: ['./demo-comp1.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class DemoComp1Component {}
