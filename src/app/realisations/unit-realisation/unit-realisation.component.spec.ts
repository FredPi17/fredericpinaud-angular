import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitRealisationComponent } from './unit-realisation.component';

describe('UnitRealisationComponent', () => {
  let component: UnitRealisationComponent;
  let fixture: ComponentFixture<UnitRealisationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnitRealisationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitRealisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
