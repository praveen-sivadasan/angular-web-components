import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoComp2Component } from './demo-comp2.component';

describe('DemoComp2Component', () => {
  let component: DemoComp2Component;
  let fixture: ComponentFixture<DemoComp2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DemoComp2Component],
    }).compileComponents();

    fixture = TestBed.createComponent(DemoComp2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
