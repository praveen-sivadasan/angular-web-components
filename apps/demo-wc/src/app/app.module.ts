import type { DoBootstrap } from '@angular/core';
import { Injector, NgModule } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { BrowserModule } from '@angular/platform-browser';
import { DemoComp1Component } from './demo-comp1/demo-comp1.component';
import { DemoComp2Component } from './demo-comp2/demo-comp2.component';
import { CommComp1Component } from '../module/component/comm-comp1/comm-comp1.component';

@NgModule({
  declarations: [DemoComp1Component, DemoComp2Component, CommComp1Component],
  imports: [BrowserModule],
  providers: [],
  entryComponents: [DemoComp1Component, DemoComp2Component],
  bootstrap: [],
})
export class AppModule implements DoBootstrap {
  constructor(private injector: Injector) {}

  ngDoBootstrap() {
    const customElementConstClass = createCustomElement(DemoComp1Component, { injector: this.injector });
    customElements.define('demo-wc-1', customElementConstClass);

    const customElementConstClass2 = createCustomElement(DemoComp2Component, { injector: this.injector });
    customElements.define('demo-wc-2', customElementConstClass2);
  }
}
