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
  {
    this.form = this.fb.group({
      first_name: [''],
      last_name: [''],
      email: [''],

      // currently, there is no provision to store the user's phone number in the database
      // the form contained it, however, so I'll leave it in
      phone_number: [''],
      city: [''],
      state: [''],
      zip: [''],
      student_number: [''],

      // currently, there is no provision to store the user's major in the database
      // the form contained it, however, so I'll leave it in
      major: ['']
    });
  }

  ngOnInit(): void {

  }

  private checkErrors(): void {
    this.errors.clear();

    //TODO: check if username (email?) already taken in database

    // all these fields are ok to be null, they just won't get set in the db by the backend
    //Email verification
    const validEmail = RegExp('^[a-zA-Z0-9.!#$%&\'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$');
    if (!validEmail.test(this.email.value) && this.email.value.length != 0) {
      this.errors.set('email', 'Invalid email format');
    }

    //Phone Number verification
    const validPhone = RegExp('^(\\+\\d{1,2}\\s)?\\(?\\d{3}\\)?[\\s.-]\\d{3}[\\s.-]\\d{4}$');
    if(!validPhone.test(this.phone_number.value) && this.phone_number.value.length != 0){
      this.errors.set('phone_number', 'Invalid phone number format');
    }

    //User Id verification
    const regex = RegExp('^[0-9]{8}$');
    if (!regex.test(this.student_number.value) && this.student_number.value.length != 0) {
      this.errors.set('student_number', 'Invalid student ID');
    }
  }

  // getters for form controls
  get first_name(){
    return this.form.get('first_name');
  }

  get last_name(){
    return this.form.get('last_name');
  }

  get email(){
    return this.form.get('email');
  }

  // currently, there is no provision to store the user's phone number in the database
  // the form contained it, however, so I'll leave it in
  get phone_number(){
    return this.form.get('phone_number');
  }

  get city(){
    return this.form.get('city');
  }

  get state(){
    return this.form.get('state');
  }

  get zip(){
    return this.form.get('zip');
  }

  get student_number(){
    return this.form.get('student_number');
  }

  // currently, there is no provision to store the user's major in the database
  // the form contained it, however, so I'll leave it in
  get major(){
    return this.form.get('major');
  }

  onSubmit(): void {
    console.log(this.form.value);
    this.checkErrors();

    if(this.errors.size == 0){
      const email = this.email.value;
      const schoolId = this.student_number.value;
      const firstName = this.first_name.value;
      const lastName = this.last_name.value;
      const city = this.city.value;
      const state = this.state.value;
      const zipCode = this.zip.value;

      const jsonObj = JSON.stringify({
        email: email,
        schoolId: schoolId,
        firstName: firstName,
        lastName: lastName,
        city: city,
        state: state,
        zipCode: zipCode
      });

      this.service.updateAccount(jsonObj).subscribe(
        res => {},
        err => {
          console.log(err);
          // TODO: display error message in a better way (I.e., set an error variable & display with HTML)
          alert(err.error.message);
        }
      );
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
