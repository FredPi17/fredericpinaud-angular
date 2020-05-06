import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {UnitSkillComponent} from './unit-skill.component';

describe('UnitSkillComponent', () => {
  let component: UnitSkillComponent;
  let fixture: ComponentFixture<UnitSkillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UnitSkillComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitSkillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
