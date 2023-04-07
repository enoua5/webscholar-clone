// Unit Testing Imports/Declarations
/// <reference types="jasmine" />

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RequestRoleFormComponent } from './request-role-form.component';
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { ReactiveFormsModule } from '@angular/forms';

describe('RequestRoleFormComponent', () => {
    let component: RequestRoleFormComponent;
    let fixture: ComponentFixture<RequestRoleFormComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, ReactiveFormsModule],
            declarations: [RequestRoleFormComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(RequestRoleFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
