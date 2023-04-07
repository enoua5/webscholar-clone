import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from './login.service';
import { emailExistsValidator } from './validators';

/**
 * Login form Component
 */
@Component({
    selector: 'app-login-form',
    templateUrl: './login-form.component.html',
    styleUrls: ['./login-form.component.less']
})
/**
 * Class handling data and functionality for the login page
 */
export class LoginFormComponent implements OnInit {
    /**
     * FormGroup object that contains username (email) and password
     */
    form: FormGroup;

    /**
     * Builds the form and sets up the validators for each field
     * @param fb FormBuilder dependency
     * @param route ActivatedRoute dependency
     * @param router Router dependency
     * @param service LoginService dependency
     */
    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private service: LoginService
    ) {
        this.form = this.fb.group(
            {
                username: [
                    '',
                    {
                        validators: [Validators.required, Validators.email],
                        asyncValidators: [emailExistsValidator(service)]
                    }
                ],
                password: [
                    '',
                    {
                        validators: [Validators.required],
                        updateOn: 'change'
                    }
                ]
            },
            {
                updateOn: 'blur'
            }
        );
    }

    /**
     * ngOnInit stub
     */
    ngOnInit(): void {}

    /**
     * Returns the contents of the username form field
     */
    get username() {
        return this.form.get('username');
    }

    /**
     * Returns the contents of the password form field
     */
    get password() {
        return this.form.get('password');
    }

    /**
     * Handles login of the user.
     * Called when the form is submitted.
     *
     * Converts the user input from the form into a JSON object, and then utilizes {@link LoginService#login} to send the
     * REST API request.
     * After the request, the email, user type, and account key are all saved in session storage.
     *
     * @todo Display possible errors returned from the backend in a better way, instead of through an alert
     */
    onSubmit(): void {
        console.log(this.form.value);

        const jsonObj = JSON.stringify({
            email: this.username.value,
            password: this.password.value
        });

        this.service.login(jsonObj).subscribe(
            (res) => {
                console.log(res.body.email);

                // Put whatever needs to be executed *after* the routing is done in the .then()

                // TODO: provide for other account types besides student,
                //  currently the following code assumes the user is a student
                sessionStorage.setItem('firstName', `${res.body.firstName}`);
                sessionStorage.setItem('lastName', `${res.body.lastName}`);
                sessionStorage.setItem('email', `${res.body.email}`);
                sessionStorage.setItem(
                    'phoneNumber',
                    `${res.body.phoneNumber}`
                );
                sessionStorage.setItem('city', `${res.body.city}`);
                sessionStorage.setItem('state', `${res.body.state}`);
                sessionStorage.setItem('zipCode', `${res.body.zipCode}`);
                sessionStorage.setItem('schoolId', `${res.body.schoolId}`);
                sessionStorage.setItem('major', `${res.body.major}`);
                sessionStorage.setItem('userType', res.body.userType);
                sessionStorage.setItem('accountKey', res.body.accountKey);

                this.router.navigate(['/dashboard']).then(() => {
                    console.log(sessionStorage.getItem('name'));
                    console.log(sessionStorage.getItem('email'));
                    console.log(sessionStorage.getItem('userType'));
                    console.log(sessionStorage.getItem('accountKey'));
                });
            },
            (err) => {
                console.log(err);
                // TODO: display error message in a better way (I.e., set an error variable & display with HTML)
                alert(err.error.message);
            }
        );
    }
}
