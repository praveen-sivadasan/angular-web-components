import { DoBootstrap, Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DemoComp1Component } from './demo-comp1/demo-comp1.component';
import { createCustomElement } from '@angular/elements';

@NgModule({
  declarations: [DemoComp1Component],
  imports: [BrowserModule],
  providers: [],
  entryComponents: [DemoComp1Component],
  bootstrap: [],
})
export class AppModule implements DoBootstrap {
  constructor(private injector: Injector) {}

  ngDoBootstrap() {
    const customElement = createCustomElement(DemoComp1Component, { injector: this.injector });
    customElements.define('demo-wc-1', customElement);
  }
}
