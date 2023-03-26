// Unit Testing Imports/Declarations
/// <reference types="jasmine" />
import { ComponentFixture, TestBed } from '@angular/core/testing';

// Component-Specific Imports
import { StudentViewScholarshipFormComponent } from './student-view-scholarship-form.component';

describe('StudentViewScholarshipFormComponent', () => {
  let component: StudentViewScholarshipFormComponent;
  let fixture: ComponentFixture<StudentViewScholarshipFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentViewScholarshipFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentViewScholarshipFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
