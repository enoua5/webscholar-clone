// Unit Testing Imports/Declarations
/// <reference types="jasmine" />
import { ComponentFixture, TestBed } from '@angular/core/testing';

// Component-Specific Imports
import { RegisterFormFacultyComponent } from './register-form-faculty.component';

describe('RegisterFormFacultyComponent', () => {
    let component: RegisterFormFacultyComponent;
    let fixture: ComponentFixture<RegisterFormFacultyComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [RegisterFormFacultyComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(RegisterFormFacultyComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
