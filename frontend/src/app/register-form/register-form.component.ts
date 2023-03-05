import {Component, OnInit} from '@angular/core';
import {Form, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {RegisterService} from './register.service';
import {emailExistsValidator, passwordMatchValidator} from "./validators";

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.less']
})

export class RegisterFormComponent implements OnInit {
  // Reactive form
  form: FormGroup;
  userIsStudent = true
  nonStudentEmail: string
  role: string

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
  get email() {
    return this.form.get('email');
  }

  get passwordFields() {
    return this.form.get('passwordFields');
  }

  get password() {
    return this.passwordFields.get('password');
  }

  get confirm_password() {
    return this.passwordFields.get('confirm_password');
  }

  get user_id() {
    return this.form.get('user_id');
  }

  get checkbox() {
    return this.form.get('checkbox');
  }

  get first_name() {
    return this.form.get('first_name');
  }

  get last_name() {
    return this.form.get('last_name');
  }

  setRoleValidators() {
    const emailControl = this.form.get('email');
    const userIdControl = this.form.get('user_id');

    emailControl.setValidators(null);
    userIdControl.setValidators(null);

    emailControl.updateValueAndValidity();
    userIdControl.updateValueAndValidity();
  }

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
           // The only purpose of this function is to retreive AccountID in order to 
           // place it into the sessionStorage. Would not be necessary if the auth services 
           // ran, or if the create account API call returned the object of a newly created user.
          this.loginLogic();
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

  // Only purpose is to be able to retreive accountKey
  loginLogic(): void
  {
    const jsonObjToLogin = JSON.stringify({
      email: this.email.value,
      password: this.password.value
    });
    
    this.service.login(jsonObjToLogin).subscribe(
      res => {
        // Put whatever needs to be executed *after* the routing is done in the .then()
        sessionStorage.setItem('name', `${ res.body.firstName } ${ res.body.lastName }`);
        sessionStorage.setItem('email', `${ res.body.email }`);
        sessionStorage.setItem('userType', res.body.userType);
        sessionStorage.setItem('accountKey', res.body.accountKey);

         // Print the storage
         console.log(sessionStorage.getItem('name'));
         console.log(sessionStorage.getItem('email'));
         console.log(sessionStorage.getItem('userType'));
         console.log(sessionStorage.getItem('accountKey'));
      }
    );
  }
}
