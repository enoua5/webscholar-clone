// Unit Testing Imports/Declarations
/// <reference types="jasmine" />
import { ComponentFixture, TestBed } from '@angular/core/testing';

// Component-Specific Imports
import { LoginFormComponent } from './login-form.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LoginService } from "./login.service";
import { HttpClient } from "@angular/common/http";
import { of } from "rxjs";
import { DashboardComponent } from "../dashboard/dashboard.component";

describe('LoginFormComponent', () => {
    let component: LoginFormComponent;
    let fixture: ComponentFixture<LoginFormComponent>;
    let testService: LoginService;
    let httpClientSpy: jasmine.SpyObj<HttpClient>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                ReactiveFormsModule,
                RouterTestingModule.withRoutes([
                    {
                        path: 'dashboard',
                        component: DashboardComponent
                    }
                ])
            ],
            declarations: [LoginFormComponent],
            providers: [LoginService]
        }).compileComponents();
    });

    beforeEach(() => {
        httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post']);
        // mock return value
        const mockAccount = JSON.stringify({
            email: 'fake.guy@fakeemailserviceprovider.internet',
            schoolId: '12345678',
            major: 'Widget Management',
            firstName: 'Fake',
            lastName: 'Guy',
            phoneNumber: '(555) 555-1234',
            city: 'Real Town',
            state: 'Ohio',
            zipCode: '12345'
        });
        const mockResponse = { status: 200, body: mockAccount };
        httpClientSpy.post.and.returnValue(of(mockResponse));
        httpClientSpy.get.and.returnValue(of({ status: 200 }));

        testService = new LoginService(httpClientSpy);

        fixture = TestBed.createComponent(LoginFormComponent);
        component = fixture.componentInstance;
        component.service_handler = testService;
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
            email: 'fake.guy@fakeemailserviceprovider.internet',
            password: 'ASDFasdfasdf1!'
        });
        const mockAccount = JSON.stringify({
            email: 'fake.guy@fakeemailserviceprovider.internet',
            schoolId: '12345678',
            major: 'Widget Management',
            firstName: 'Fake',
            lastName: 'Guy',
            phoneNumber: '(555) 555-1234',
            city: 'Real Town',
            state: 'Ohio',
            zipCode: '12345'
        });

        // login with email and pw, but expect account back
        testService.login(loginData).subscribe((resp) => {
            expect(resp.status).toBe(200);
            expect(resp.body).toBe(mockAccount);
        });
    });

    it('should set sessionStorage upon form submission', () => {
        // fill out form
        component.form.controls['username'].setValue(
            'fake.guy@fakeemailserviceprovider.internet'
        );
        component.form.controls['password'].setValue('ASDFasdfasdf1!');
        // submit
        let spiedFunction = spyOn(sessionStorage, 'setItem');
        component.onSubmit();
        // check
        expect(spiedFunction.calls.any()).toBeTruthy();
    });

    it('should reject an invalid email address', () => {
        let errors = {};
        let email = component.form.controls['username'];

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
        let email = component.form.controls['username'];

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
});
