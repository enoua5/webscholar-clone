// Unit Testing Imports/Declarations
/// <reference types="jasmine" />
import { ComponentFixture, TestBed } from '@angular/core/testing';

// Component-Specific Imports
import { ForgotPasswordFormComponent } from './forgot-password-form.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('ForgotPasswordFormComponent', () => {
    let component: ForgotPasswordFormComponent;
    let fixture: ComponentFixture<ForgotPasswordFormComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ReactiveFormsModule],
            declarations: [ForgotPasswordFormComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ForgotPasswordFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
