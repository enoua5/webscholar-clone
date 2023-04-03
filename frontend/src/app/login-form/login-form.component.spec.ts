// Unit Testing Imports/Declarations
/// <reference types="jasmine" />
import { ComponentFixture, TestBed } from '@angular/core/testing';

// Component-Specific Imports
import { LoginFormComponent } from './login-form.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import {LoginService} from "./login.service";
import {HttpClient} from "@angular/common/http";
import {of} from "rxjs";

fdescribe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;
  let testService: LoginService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, RouterTestingModule, ReactiveFormsModule ],
      declarations: [ LoginFormComponent ],
      providers: [ LoginService ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post']);
    // mock return value
    const mockAccount = JSON.stringify({
      email: "fake.guy@fakeemailserviceprovider.internet",
      schoolId: "12345678",
      major: "Widget Management",
      firstName: "Fake",
      lastName: "Guy",
      phoneNumber: "(555) 555-1234",
      city: "Real Town",
      state: "Ohio",
      zipCode: "12345",
    });
    const mockResponse = { status: 200, body: mockAccount };
    httpClientSpy.post.and.returnValue(of(mockResponse));
    httpClientSpy.get.and.returnValue(of({ status: 200 }));

    testService = new LoginService(httpClientSpy);

    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display', () => {
    const element = fixture.debugElement.nativeElement;
    expect(element.textContent).toContain('Log In');
  });

  it('should call API to login', () => {
    const loginData = JSON.stringify({
      email: "fake.guy@fakeemailserviceprovider.internet",
      password: "ASDFasdfasdf1!"
    });
    const mockAccount = JSON.stringify({
      email: "fake.guy@fakeemailserviceprovider.internet",
      schoolId: "12345678",
      major: "Widget Management",
      firstName: "Fake",
      lastName: "Guy",
      phoneNumber: "(555) 555-1234",
      city: "Real Town",
      state: "Ohio",
      zipCode: "12345",
    });

    // login with email and pw, but expect account back
    testService.login(loginData).subscribe(resp => {
      expect(resp.status).toBe(200);
      expect(resp.body).toBe(mockAccount);
    });
  });

});
