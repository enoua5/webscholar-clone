// Unit Testing Imports/Declarations
/// <reference types="jasmine" />
import { ComponentFixture, TestBed } from '@angular/core/testing';

// Component-Specific Imports
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TermsConditionsComponent } from './terms-conditions.component';

describe('TermsConditionsComponent', () => {
    let component: TermsConditionsComponent;
    let fixture: ComponentFixture<TermsConditionsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            declarations: [TermsConditionsComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TermsConditionsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
