import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {UnitEducationComponent} from './unit-education.component';

describe('UnitEducationComponent', () => {
    let component: UnitEducationComponent;
    let fixture: ComponentFixture<UnitEducationComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [UnitEducationComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UnitEducationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
