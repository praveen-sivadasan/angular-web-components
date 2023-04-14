import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommComp1Component } from './comm-comp1.component';

describe('CommComp1Component', () => {
  let component: CommComp1Component;
  let fixture: ComponentFixture<CommComp1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommComp1Component],
    }).compileComponents();

    fixture = TestBed.createComponent(CommComp1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
