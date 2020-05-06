import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CvTilesComponent} from './cv-tiles.component';

describe('CvTilesComponent', () => {
  let component: CvTilesComponent;
  let fixture: ComponentFixture<CvTilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CvTilesComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CvTilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
