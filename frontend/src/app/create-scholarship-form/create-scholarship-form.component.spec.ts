import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateScholarshipFormComponent } from './create-scholarship-form.component';

describe('CreateScholarshipFormComponent', () => {
  let component: CreateScholarshipFormComponent;
  let fixture: ComponentFixture<CreateScholarshipFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateScholarshipFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateScholarshipFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
