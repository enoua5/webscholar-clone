// Unit Testing Imports/Declarations
/// <reference types="jasmine" />
import { ComponentFixture, TestBed } from '@angular/core/testing';

// Component-Specific Imports
import { RegistrationInvitationFormComponent } from './registration-invitation-form.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { RegistrationInvitationService } from './registration-invitation.service';

describe('RegistrationInvitationFormComponent', () => {
  let component: RegistrationInvitationFormComponent;
  let fixture: ComponentFixture<RegistrationInvitationFormComponent>;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let testService: RegistrationInvitationService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ RouterTestingModule, HttpClientTestingModule, ReactiveFormsModule ],
      declarations: [ RegistrationInvitationFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationInvitationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    testService = new RegistrationInvitationService(httpClientSpy as any);
    sessionStorage.setItem('accountKey', '1')
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display' , () => {
    const element = fixture.debugElement.nativeElement;
    expect(element.textContent).toContain("Send");
  })

  it('correct number of input fields' , () => {
    const formElement = fixture.debugElement.nativeElement.querySelector('form')
    const inputElements = formElement.querySelectorAll('input')
    expect(inputElements.length).toEqual(1)
  })

  it('value by default is empty' , () => {
    const pageForm = component.form;
    const pageFormValue = {emails:''};
    expect(pageForm.value).toEqual(pageFormValue);
  })

  it('component does email validation bad' ,  () => {
    const pageForm = component.form;
    pageForm.setValue({emails: "bad_EmAiL"});

    component.onSubmit()

    expect(component.errors.get('emails')).toEqual('Invalid email');
    expect(component.emails).toEqual(["bad_EmAiL"]);
  })

  it('component does email validation good' ,  () => {
    const pageForm = component.form;
    pageForm.setValue({emails: "test@test.test"});

    component.onSubmit()

    expect(component.errors.get('emails')).toBeFalsy();
    expect(component.emails).toEqual(["test@test.test"]);
  })

  it('component does email validation multiple good' ,  () => {
    const pageForm = component.form;
    pageForm.setValue({emails: "test@test.test,anothertest@test.test"});

    component.onSubmit()

    expect(component.errors.get('emails')).toBeFalsy();
    expect(component.emails).toEqual(["test@test.test", "anothertest@test.test"]);
  })

  it('component does email validation multiple bad' ,  () => {
    const pageForm = component.form;
    pageForm.setValue({emails: "test@test.test anothertest@test.test"});

    component.onSubmit()

    expect(component.errors.get('emails')).toEqual('Invalid email');  
  })

  it('test service functions' ,  () => {
    const mockResponse = { status: 200 };
    const emailArray = ["test@test.test", "anothertest@test.test"];

    httpClientSpy.get.and.returnValue(of(mockResponse));
    testService.sendEmail(emailArray).subscribe(response => {
      expect(response.status).toBe(200);
    });      
  })
});
