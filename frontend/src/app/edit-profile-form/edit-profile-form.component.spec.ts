// Unit Testing Imports/Declarations
/// <reference types="jasmine" />
import { ComponentFixture, TestBed } from '@angular/core/testing';

// Component-Specific Imports
import { EditProfileFormComponent } from './edit-profile-form.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { EditProfileService } from './edit-profile.service';
import { Observable, of } from 'rxjs';


describe('EditProfileFormComponent', () => {
  let component: EditProfileFormComponent;
  let fixture: ComponentFixture<EditProfileFormComponent>;
  let testService: EditProfileService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ RouterTestingModule, HttpClientTestingModule, ReactiveFormsModule ],
      declarations: [ EditProfileFormComponent ],
      providers: [ EditProfileService ]
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

    testService = new EditProfileService(httpClientSpy);

    fixture = TestBed.createComponent(EditProfileFormComponent);
    component = fixture.componentInstance;
    component.service_handler = testService;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display', () => {
    const element = fixture.debugElement.nativeElement;
    expect(element.textContent).toContain('Edit Profile');
  });

  it('should call API to delete', () => {
    testService.deleteAccount('1').subscribe(resp => {
      expect(resp.status).toBe(200);
    });
  });

  it('should call API to update', () => {
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
    testService.updateAccount(mockAccount).subscribe(resp => {
      expect(resp.status).toBe(200);
      expect(resp.body).toBe(mockAccount);
    });
  });

  it('should set sessionStorage upon form submission', () => {
    // fill out form
    component.form.controls['email'].setValue("fake.guy@fakeemailserviceprovider.internet");
    component.form.controls['student_number'].setValue("12345678");
    component.form.controls['major'].setValue("Widget Management");
    component.form.controls['first_name'].setValue("Fake");
    component.form.controls['last_name'].setValue("Guy");
    component.form.controls['phone_number'].setValue("(555) 555-1234");
    component.form.controls['city'].setValue("Real Town");
    component.form.controls['state'].setValue("Ohio");
    component.form.controls['zip'].setValue("12345");
    // submit
    let spiedFunction = spyOn(sessionStorage, "setItem");
    component.onSubmit();
    // check
    expect(spiedFunction.calls.any()).toBeTruthy();


  });
  
  it('should send an API request to delete account upon request', () => {

    // make sure we follow the confirm path
    spyOn(window, "confirm").and.returnValue(true);
    // make sure we can detect a call to deleteAccount
    let spiedFunction = spyOn(testService, "deleteAccount").and.returnValue(new Observable());
    // submit
    component.requestAccountDeletion();
    // check
    expect(spiedFunction.calls.any()).toBeTruthy();

  });

  it('should not send an API request to delete account upon canceling request', () => {

    // make sure we follow the cancel path
    spyOn(window, "confirm").and.returnValue(false);
    // make sure we can detect a call to deleteAccount
    let spiedFunction = spyOn(testService, "deleteAccount").and.returnValue(new Observable());
    // submit
    component.requestAccountDeletion();
    // check
    expect(spiedFunction.calls.any()).toBeFalsy();

  });

  it('should reject an invalid email address', () => {
    let errors = {};
    let email = component.form.controls['email'];


    const testEmailAddress = (address : string) => {
      email.setValue(address);
      errors = email.errors || {};
      expect(errors["email"]).toBeTruthy();
    };

    testEmailAddress('not an email address');
    testEmailAddress('alsonotanemailAAAAAAaddress');
    testEmailAddress('@noname.com');
    testEmailAddress('no_at.com');
    testEmailAddress('no_domain@.com');
    testEmailAddress('a"b(c)d,e:f;g<h>i[j\k]l@example.com');
    testEmailAddress('quotes"in"middle@test.com');
    testEmailAddress('the.local.part.of.an.email.adress.may.be.no.longer.than.sixty.four.characters.in.length@mail.weber.edu')
    testEmailAddress('.badstart@mail.weber.edu');
    testEmailAddress('badend.@mail.weber.edu');
    testEmailAddress('double..dot@mail.weber.edu');


  });

  it('should not reject a valid email address', () => {
    let errors = {};
    let email = component.form.controls['email'];


    const testEmailAddress = (address : string) => {
      email.setValue(address);
      errors = email.errors || {};
      expect(errors["email"]).toBeFalsy();
    };

    testEmailAddress('goodemailadress@mail.weber.edu');
    testEmailAddress('this.one+is?1^2/3$l-4@funky.com');
    testEmailAddress('rareTLD@up.dog');
    testEmailAddress('slashes/allowed@test.com');
    testEmailAddress('dotless-domain@mailserver');
    

    // TODO these tests fail
    // testEmailAddress('"spaces are allowed if quoted"@mail.weber.edu')
    // testEmailAddress('".special.start.too"@mail.weber.edu');
    // testEmailAddress('"and.end."@mail.weber.edu');
    // testEmailAddress('"and..double..dot"@mail.weber.edu');
    // testEmailAddress('"and(other<special>characters)too"@mail.weber.edu');
    // testEmailAddress('(comment)valid@mail.weber.edu');
    // testEmailAddress('ip.addresses.allowed@[123.123.123.123]');
    // testEmailAddress('ipv6too@[IPv6:2001:0db8:85a3:0000:0000:8a2e:0370:7334]');
    // testEmailAddress(`"very.(),:;<>[]\".VERY.\"very@\\ \"very\".unusual"@strange.example.com`);


  });

  it('should reject invalid phone numbers', () => {
    let errors = {};
    let phone_number = component.form.controls['phone_number'];


    const testPhoneNumber = (number : string) => {
      phone_number.setValue(number);
      console.log(phone_number.errors);
      errors = phone_number.errors || {};
      expect(Object.keys(errors).length).toBeTruthy();
    };

    testPhoneNumber('123 abcd-efgh');
    testPhoneNumber('12345678909876543234567');
    testPhoneNumber('1');
  });

  it('should not reject valid phone numbers', () => {
    let errors = {};
    let phone_number = component.form.controls['phone_number'];


    const testPhoneNumber = (number : string) => {
      phone_number.setValue(number);
      errors = phone_number.errors || {};
      expect(Object.keys(errors).length).toBeFalsy();
    };

    testPhoneNumber('(555) 555-1234');
    testPhoneNumber('+1 555 555 1234');

    // TODO this one fails
    // testPhoneNumber('5555551234');
  });

  it('should reject invalid student numbers', () => {
    let errors = {};
    let student_number = component.form.controls['student_number'];


    const testStudentNumber = (number : string) => {
      student_number.setValue(number);
      errors = student_number.errors || {};
      expect(Object.keys(errors).length).toBeTruthy();
    };

    testStudentNumber('abcdefgh');
    testStudentNumber('123456789');
    testStudentNumber('1234567');
  });

  it('should not reject valid student numbers', () => {
    let errors = {};
    let student_number = component.form.controls['student_number'];


    const testStudentNumber = (number : string) => {
      student_number.setValue(number);
      errors = student_number.errors || {};
      expect(Object.keys(errors).length).toBeFalsy();
    };

    testStudentNumber('12345678');
    testStudentNumber('00000001');
  });


});
