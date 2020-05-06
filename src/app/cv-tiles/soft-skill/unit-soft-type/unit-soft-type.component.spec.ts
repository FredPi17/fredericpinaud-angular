import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {UnitSoftTypeComponent} from './unit-soft-type.component';

describe('SoftTypeComponent', () => {
  let component: UnitSoftTypeComponent;
  let fixture: ComponentFixture<UnitSoftTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UnitSoftTypeComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitSoftTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
