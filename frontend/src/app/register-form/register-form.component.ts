import {Component, OnInit} from '@angular/core';
import {Form, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {RegisterService} from './register.service';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';


@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.less']
})
export class RegisterFormComponent implements OnInit {
  form: FormGroup;
  email: FormControl = new FormControl('', {
    validators: [
      Validators.required,
      Validators.email
    ],
    updateOn: 'blur'
  });
  password: FormControl = new FormControl('', {
    validators: [
      Validators.required,
      Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%?&])[A-Za-z\\d$@$!%?&]{8,}$')
    ],
    updateOn: 'blur'
  });
  confirm_password: FormControl = new FormControl('', {
    validators: [
      Validators.required
    ],
    updateOn: 'blur'
  });
  user_id: FormControl = new FormControl('', {
    validators: [
      Validators.required,
      Validators.pattern('^[0-9]{8}$')
    ],
    updateOn: 'blur'
  });
  checkbox: FormControl = new FormControl('', {
    validators: [
      Validators.requiredTrue
    ],
    updateOn: 'change'
  });
  first_name: FormControl = new FormControl('', {
    validators: [
      Validators.required
    ],
    updateOn: 'blur'
  });
  last_name: FormControl = new FormControl('', {
    validators: [
      Validators.required
    ],
    updateOn: 'blur'
  });
  institutions: FormControl = new FormControl('', {
    validators: [
      Validators.required
    ],
    updateOn: 'blur'
  });

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
      email: this.email,
      password: this.password,
      confirm_password: this.confirm_password,
      user_id: this.user_id,
      checkbox: this.checkbox,
      first_name: this.first_name,
      last_name: this.last_name,
      institutions: this.institutions
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(fg: FormGroup) {
    return fg.get('password').value === fg.get('confirm_password').value ? null : {'err_mismatch': true};
  }

  changeInstitution(e) {
    this.institutions.setValue(e.target.value, {onlySelf: true});
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.form.valid) {
      console.log(this.form.value);

      const email = this.email.value
      const password = this.password.value;
      const schoolId = this.user_id.value;
      const school = this.institutions.value;
      // Instructor can only register by invitation
      const userType = "student";
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
      //this.service.createAccount(jsonObj);

      // Test create account
      //this.service.testAccountCreation();

      //this.router.navigate(['/dashboard']).then(r => true );
    }
    else {

    }
  }
}
