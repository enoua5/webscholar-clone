import { Component, OnInit } from '@angular/core';
import {Form, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {EditProfileService} from './edit-profile.service';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
@Component({
  selector: 'app-edit-profile-form',
  templateUrl: './edit-profile-form.component.html',
  styleUrls: ['./edit-profile-form.component.less']
})

export class EditProfileFormComponent implements OnInit {
  form: FormGroup;
  error: string = null;
  errors: Map<string, string> = new Map();


  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private service: EditProfileService)
{ this.form = this.fb.group({
    first_name: [''],
    last_name: [''],
    email: [''],
    phone_number: [''],
    city: [''],
    state: [''],
    zip: [''],
    student_number: [''],
    major: ['']
  });
  }

  ngOnInit(): void {

  }

  private checkErrors(): void {
    this.errors.clear();

    //first and last name verification
    if (this.form.get('first_name').value.length == 0) {
      this.errors.set('first_name', 'Invalid First Name');
    }
    if (this.form.get('last_name').value.length == 0) {
      this.errors.set('last_name', 'Invalid Last Name');
    }
    //todo check if username already taken in database


    //Email verification
    const validEmail = RegExp('^[a-zA-Z0-9.!#$%&\'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$');
    if (!validEmail.test(this.form.get('email').value) || this.form.get('email').value.length == 0) {
      this.errors.set('email', 'Invalid email format');
    }

    //Phone Number verification
    const validPhone = RegExp('^(\\+\\d{1,2}\\s)?\\(?\\d{3}\\)?[\\s.-]\\d{3}[\\s.-]\\d{4}$');
    if(!validPhone.test(this.form.get('phone_number').value) || this.form.get('phone_number').value.length == 0){
      this.errors.set('phone_number', 'Invalid phone number format');
    }

    //city, state, and zip verification
    if (this.form.get('city').value.length == 0) {
      this.errors.set('city', 'Invalid city');
    }

    if (this.form.get('state').value.length == 0) {
      this.errors.set('state', 'Invalid state');
    }

    if (this.form.get('zip').value.length == 0) {
      this.errors.set('zip', 'Invalid zip');
    }

    //User Id verification
    const regex = RegExp('^[0-9]{8}$');
    if (!regex.test(this.form.get('student_number').value) || this.form.get('student_number').value.length == 0) {
      this.errors.set('student_number', 'Invalid student number');
    }

    //major verification
    if (this.form.get('major').value.length == 0) {
      this.errors.set('major', 'Invalid major');
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
    if (data.success == true) {
      this.router.navigate(['../dashboard']);
    }
    else {
      console.warn('Else Statement executed');
      this.error = data.error;
      this.errors = new Map(Object.entries(data.errors));
    }
  }

}
