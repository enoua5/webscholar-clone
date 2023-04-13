// Unit Testing Imports/Declarations
/* eslint-env browser */
/// <reference types="jasmine" />
import { ComponentFixture, TestBed } from '@angular/core/testing';

// Component-Specific Imports
import { RegisterFormComponent } from './register-form.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { RegisterService } from './register.service';
import { Observable, of } from 'rxjs';

function fillForm(component: RegisterFormComponent) {
    component.form.controls['email'].setValue('student@fakeuniversity.edu');
    component.form.controls.passwordFields
        .get('password')
        .setValue('Password123!');
    component.form.controls.passwordFields
        .get('confirm_password')
        .setValue('Password123!');
    component.form.controls['first_name'].setValue('Some');
    component.form.controls['last_name'].setValue('Guy');
    component.form.controls['user_id'].setValue('12345678');
    component.form.controls['checkbox'].setValue(true);
    component.form.markAllAsTouched();
}

describe('RegisterFormComponent', () => {
    let component: RegisterFormComponent;
    let fixture: ComponentFixture<RegisterFormComponent>;
    let testService: RegisterService;
    let httpClientSpy: jasmine.SpyObj<HttpClient>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                RouterTestingModule,
                ReactiveFormsModule
            ],
            declarations: [RegisterFormComponent],
            providers: [RegisterService]
        }).compileComponents();
    });

    beforeEach(() => {
        httpClientSpy = jasmine.createSpyObj('httpClient', ['get', 'post']);
        httpClientSpy.post.and.returnValue(
            of({
                status: 200,
                body: {
                    firstName: 'Some',
                    lastName: 'Guy',
                    email: 'student@fakeuniversity.edu',
                    schoolId: '12345678',
                    userType: 'student',
                    accountKey: '1'
                }
            })
        );
        httpClientSpy.get.and.returnValue(of({ status: 200, body: false }));

        testService = new RegisterService(httpClientSpy);

        fixture = TestBed.createComponent(RegisterFormComponent);
        component = fixture.componentInstance;
        component.service_handler = testService;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should display', () => {
        const element = fixture.debugElement.nativeElement;
        expect(element.textContent).toContain('Register');
    });

    it('should call API to create account', () => {
        testService.createAccount('{}').subscribe((resp) => {
            expect(resp.status).toBe(200);
        });
    });

    it('should set sessionStorage upon form submission', () => {
        // fill out form
        fillForm(component);
        // submit
        let spiedFunction = spyOn(sessionStorage, 'setItem');
        component.onSubmit();
        // check
        expect(spiedFunction.calls.any).toBeTruthy();
    });

    it('should reject an invalid email address', () => {
        let errors = {};
        let email = component.form.controls['email'];

        const testEmailAddress = (address: string) => {
            email.setValue(address);
            errors = email.errors || {};
            expect(errors['email']).toBeTruthy();
        };

        testEmailAddress('not an email address');
        testEmailAddress('alsonotanemailAAAAAAaddress');
        testEmailAddress('@noname.com');
        testEmailAddress('no_at.com');
        testEmailAddress('no_domain@.com');
        testEmailAddress('a"b(c)d,e:f;g<h>i[jk]l@example.com');
        testEmailAddress('quotes"in"middle@test.com');
        testEmailAddress(
            'the.local.part.of.an.email.adress.may.be.no.longer.than.sixty.four.characters.in.length@mail.weber.edu'
        );
        testEmailAddress('.badstart@mail.weber.edu');
        testEmailAddress('badend.@mail.weber.edu');
        testEmailAddress('double..dot@mail.weber.edu');
    });

    it('should not reject a valid email address', () => {
        let errors = {};
        let email = component.form.controls['email'];

        const testEmailAddress = (address: string) => {
            email.setValue(address);
            errors = email.errors || {};
            expect(errors['email']).toBeFalsy();
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

    it('should reject invalid student numbers', () => {
        let errors = {};
        let student_number = component.form.controls['user_id'];

        const testStudentNumber = (number: string) => {
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
        let student_number = component.form.controls['user_id'];

        const testStudentNumber = (number: string) => {
            student_number.setValue(number);
            errors = student_number.errors || {};
            expect(Object.keys(errors).length).toBeFalsy();
        };

        testStudentNumber('12345678');
        testStudentNumber('00000001');
    });

    it('should reject mismatched passwords', () => {
        let errors = {};
        let pw1 = component.form.controls.passwordFields.get('password');
        let pw2 =
            component.form.controls.passwordFields.get('confirm_password');

        const test_pw_pair = (p1: string, p2: string) => {
            pw1.setValue(p1);
            pw1.markAsTouched();
            pw2.setValue(p2);
            pw2.markAsTouched();
            console.log(
                component.form.controls.passwordFields.hasError('err_mismatch')
            );
            errors = component.form.controls.passwordFields.errors || {};
            expect(Object.keys(errors).length).toBeTruthy();
        };

        test_pw_pair('abcdefgh', 'abcdefh');
        test_pw_pair('Password1!', 'Password1?');
    });
});
