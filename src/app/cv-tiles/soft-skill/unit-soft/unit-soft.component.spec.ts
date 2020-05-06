import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {UnitSoftComponent} from './unit-soft.component';

describe('UnitSoftComponent', () => {
  let component: UnitSoftComponent;
  let fixture: ComponentFixture<UnitSoftComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UnitSoftComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitSoftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
