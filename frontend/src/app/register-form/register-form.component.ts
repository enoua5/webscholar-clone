import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {RegisterService} from './register.service';


@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.less']
})
export class RegisterFormComponent implements OnInit {
  form: FormGroup;
  error: string = null;
  errors: Map<string, string> = new Map();


  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private service: RegisterService) {
    this.form = this.fb.group({
      username: [''],
      password: [''],
      confirm_password: [''],
      school_email: [''],
      school_id: [''],
      checkbox: ['']
    });
  }

  ngOnInit(): void {
  }

  private checkErrors(): void {
    this.errors.clear();

    //if (this.form.get('username')) {
      //this.errors.set('username', 'Username taken');
   // }
    if (this.form.get('username').value.length == 0) {
      this.errors.set('username', 'Invalid username');
    }
    //todo check if username already taken in database

    //Password verification (meets requirements and passwords match)
    if(this.form.get('password').value != this.form.get('confirm_password').value){
      this.errors.set('confirm_password', 'Passwords do not match');
    }
    const validPassword = RegExp('^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]{8,30}$');
    if (!validPassword.test(this.form.get('password').value) || this.form.get('password').value.length == 0) {
      this.errors.set('confirm_password', 'Password must meet requirements');
    }

    //School Id verification
    const regex = RegExp('^W[0-9]{8}$');
    if (!regex.test(this.form.get('school_id').value) || this.form.get('school_id').value.length == 0) {
      this.errors.set('school_id', 'Invalid school id');
    }

    //Email verification
    const validEmail = RegExp('^[a-zA-Z0-9.!#$%&\'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$');
    if (!validEmail.test(this.form.get('school_email').value) || this.form.get('school_email').value.length == 0) {
      this.errors.set('school_email', 'Invalid email format');
    }

    //Terms and Conditions checkbox verification
    if(this.form.get('checkbox').value !== true){
      this.errors.set('checkbox', 'Please indicate that you have read and agree to the Terms and Conditions Policy');
    }
  }


  onSubmit(): void {
    console.log(this.form.value);
    this.checkErrors();
    if(this.errors.size == 0){
      this.service.insert(this.form.value)
        .subscribe((data) => this.processResponse(data));
    }
  }

  private processResponse(data) {
    console.log(data);
    if (data.success === true) {
      this.router.navigate(['/']);
    } else {
      this.error = data.error;
      this.errors = new Map(Object.entries(data.errors));
    }
  }
}
