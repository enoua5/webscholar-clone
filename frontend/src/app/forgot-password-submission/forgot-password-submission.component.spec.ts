import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPasswordSubmissionComponent } from './forgot-password-submission.component';

describe('ForgotPasswordSubmissionComponent', () => {
  let component: ForgotPasswordSubmissionComponent;
  let fixture: ComponentFixture<ForgotPasswordSubmissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForgotPasswordSubmissionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotPasswordSubmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
