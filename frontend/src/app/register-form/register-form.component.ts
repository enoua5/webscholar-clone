import {Component, OnInit} from '@angular/core';
import {Form, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {RegisterService} from './register.service';
import {emailTakenValidator, passwordMatchValidator} from "./validators";

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
  userType: string
  institution: string

  // Select element dropdown options
  institutionList: string[] = [
    'Brigham Young University',
    'Dixie State University',
    'Southern Utah University',
    'University of Utah',
    'Utah State University',
    'Utah Valley University',
    'Weber State University'
  ];

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
          emailTakenValidator(service)
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
        ]
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
      institutions: ['', {
        validators: [
          Validators.required
        ]
      }]
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

  get institutions() {
    return this.form.get('institutions');
  }

  // Actually set value for select input when user changes the selected item
  changeInstitution(e) {
    this.institutions.setValue(e.target.value, {onlySelf: true});
  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      if (params.has('email')) {
          this.userIsStudent = false
      }
      // params
      this.nonStudentEmail = params.get('email')
      this.userType = params.get('type')
      this.institution = params.get('institution')
      console.log(params)
    })
  }

  onSubmit(): void {
    let email
    let userType
    let school

    if (this.form.valid) {
      console.log(this.form.value);

      // This might change depending on how the params are coming in
      if (!this.userIsStudent == false) {
        email = this.nonStudentEmail
      } else {
        email = this.email.value
      }

      if (this.userType == "chair") {
        userType = "chair"
      }
      else if (this.userType == "committee") {
        userType = "committee"
      }
      else {
        userType = "student"
      }

      if (this.institution != null) {
        school = this.institution
      }
      else {
        school = this.institutions.value
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
        userType: userType,
        firstName: firstName,
        lastName: lastName,
        school: school
      });

      console.log(jsonObj);
      this.service.createAccount(jsonObj).subscribe(res => {
        // HTTP status code 200 = OK
        if (res.status == 200) {
          // Put whatever needs to be executed *after* the routing is done in the .then()
          this.router.navigate(['/dashboard']).then(res => true);
        }
      });
      // Test create account
      //this.service.testAccountCreation();
    }
  }
}
