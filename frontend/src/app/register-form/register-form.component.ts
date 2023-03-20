import {Component, OnInit} from '@angular/core';
import {Form, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {RegisterService} from './register.service';
import {emailExistsValidator, passwordMatchValidator} from "./validators";

/**
 * Register form Component
 */
@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.less']
})

/**
 * Class handling data and functionality for the registration page
 */
export class RegisterFormComponent implements OnInit {
  /**
   * FormGroup object that contains email, password, password confirmation, user number, terms and conditions checkbox,
   * first name, and last name
   */
  form: FormGroup;

  /**
   * Boolean to record if the user is a student or not
   */
  userIsStudent = true

  /**
   * String to hold the user email if the user is not a student
   */
  nonStudentEmail: string

  /**
   * String to hold the user role
   */
  role: string

  /**
   * Builds the form and sets up the validators for each field
   * @param route ActivatedRoute dependency
   * @param router Router dependency
   * @param formBuilder FormBuilder dependency
   * @param service RegisterService dependency
   */
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private service: RegisterService) {

      this.form = this.formBuilder.group({
      email: ['', {
        validators: [
          Validators.required,
          Validators.email
        ],
        asyncValidators: [
          emailExistsValidator(service)
        ]
      }],
      passwordFields: this.formBuilder.group({
        password: ['', {
          validators: [
            Validators.required,
            Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%?&])[A-Za-z\\d$@$!%?&]{8,}$')
          ]
        }],
        confirm_password: ['', {
          validators: [
            Validators.required
          ]
        }]
      }, {
        validators: [
          passwordMatchValidator()
        ]
      }),
      user_id: ['', {
        validators: [
          Validators.required,
          Validators.pattern('^[0-9]{8}$')
        ]
      }],
      checkbox: ['', {
        validators: [
          Validators.requiredTrue
        ],
        updateOn: 'change'
      }],
      first_name: ['', {
        validators: [
          Validators.required
        ]
      }],
      last_name: ['', {
        validators: [
          Validators.required
        ]
      }],
    }, {
      updateOn: 'blur'
    });
  }

  // Getters for form controls
  /**
   * Returns the contents of the email form field
   */
  get email() {
    return this.form.get('email');
  }

  /**
   * Returns the contents of the passwordFields form field
   */
  get passwordFields() {
    return this.form.get('passwordFields');
  }

  /**
   * Returns the contents of the password form field
   */
  get password() {
    return this.passwordFields.get('password');
  }

  /**
   * Returns the contents of the confirm_password form field
   */
  get confirm_password() {
    return this.passwordFields.get('confirm_password');
  }

  /**
   * Returns the contents of the user_id form field
   */
  get user_id() {
    return this.form.get('user_id');
  }

  /**
   * Returns the contents of the terms and conditions checkbox form field
   */
  get checkbox() {
    return this.form.get('checkbox');
  }

  /**
   * Returns the contents of the first_name form field
   */
  get first_name() {
    return this.form.get('first_name');
  }

  /**
   * Returns the contents of the last_name form field
   */
  get last_name() {
    return this.form.get('last_name');
  }

  /**
   * Removes the validators from the email control and user_id control.
   * This function is called in the event that the user is not a student.
   */
  setRoleValidators() {
    const emailControl = this.form.get('email');
    const userIdControl = this.form.get('user_id');

    emailControl.setValidators(null);
    userIdControl.setValidators(null);

    emailControl.updateValueAndValidity();
    userIdControl.updateValueAndValidity();
  }

  /**
   * Checks if the user is a student, and updates form validation accordingly
   */
  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      if (params.has('email')) {
        this.userIsStudent = false;
        // params
        this.nonStudentEmail = params.get('email');
        this.role = params.get('role');
        this.setRoleValidators()
        console.log(params)
      }
    })
  }

  /**
   * Handles the creation of a new account.
   * Called when the form is submitted.
   *
   * Converts the user input from the form into a JSON object, then utilizes {@link RegisterService#createAccount} to
   * send the REST API request.
   * After the request, the first and last name, email, user type, and account key are all saved in session storage.
   *
   * @todo: Display possible errors returned from the backend in a better way, instead of through an alert
   */
  onSubmit(): void {
    let email = "";
    let role = "";

    if (this.form.valid) {
      console.log(this.form.value);

      // This might change depending on how the params are coming in
      if (this.userIsStudent == true) {
        email = this.email.value
      } else {
        email = this.nonStudentEmail
      }

      if (this.role == "chair") {
        role = "chair"
      } else if (this.role == "committeeMember") {
        role = "committeeMember"
      } else {
        role = "student"
      }

      const password = this.password.value;
      const schoolId = this.user_id.value;
      const active = "true";
      const firstName = this.first_name.value;
      const lastName = this.last_name.value;

      const jsonObj = JSON.stringify({
        email: email,
        password: password,
        schoolId: schoolId,
        active: active,
        role: role,
        firstName: firstName,
        lastName: lastName,
        school: "Weber State University"
      });

      //console.log(jsonObj);
      this.service.createAccount(jsonObj).subscribe(
        res => {
          console.log(res.body);
          // Put whatever needs to be executed *after* the routing is done in the .then()
          sessionStorage.setItem('name', `${ res.body.firstName } ${ res.body.lastName }`);
          sessionStorage.setItem('email', `${ res.body.email }`);
          sessionStorage.setItem('userType', res.body.userType);
          sessionStorage.setItem('accountKey', res.body.accountKey);

          this.router.navigate(['/dashboard']).then(() => {
            console.log(sessionStorage.getItem('name'));
            console.log(sessionStorage.getItem('email'));
            console.log(sessionStorage.getItem('userType'));
            console.log(sessionStorage.getItem('accountKey'));
          });
        },
        err => {
          console.log(err);
          // TODO: display error message in a better way (I.e., set an error variable & display with HTML)
          alert(err.error.message);
        }
      );
      // Test create account
      //this.service.testAccountCreation();
    }
  }
}
