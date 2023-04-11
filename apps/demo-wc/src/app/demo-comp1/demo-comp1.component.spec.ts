import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoComp1Component } from './demo-comp1.component';

describe('DemoComp1Component', () => {
  let component: DemoComp1Component;
  let fixture: ComponentFixture<DemoComp1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DemoComp1Component],
    }).compileComponents();

    fixture = TestBed.createComponent(DemoComp1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
