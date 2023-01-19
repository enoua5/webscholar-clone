import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationInvitationFormComponent } from './registration-invitation-form.component';

describe('RegistrationInvitationFormComponent', () => {
  let component: RegistrationInvitationFormComponent;
  let fixture: ComponentFixture<RegistrationInvitationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrationInvitationFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationInvitationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
