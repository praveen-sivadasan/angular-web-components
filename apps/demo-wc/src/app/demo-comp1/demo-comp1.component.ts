import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'angular-web-components-demo-comp1',
  templateUrl: './demo-comp1.component.html',
  styleUrls: ['./demo-comp1.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class DemoComp1Component extends HTMLElement {
  // Adding the hooks here doesnt seem to work
  connectedCallback() {
    console.log('Element connected to the DOM!');
  }
}
