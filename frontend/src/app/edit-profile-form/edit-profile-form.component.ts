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

/**
 * Class handling data and functionality of the edit_profile page
 */
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
      first_name: [sessionStorage.getItem("firstName")],
      last_name: [sessionStorage.getItem("lastName")],
      email: [sessionStorage.getItem("email")],
      phone_number: [''],
      city: [''],
      state: [''],
      zip: [''],
      student_number: [sessionStorage.getItem("schoolId")],
      major: ['']
    });
    if(sessionStorage.getItem("phoneNumber") != null){
      this.form.patchValue({phone_number: sessionStorage.getItem("phoneNumber")});
    }
    if(sessionStorage.getItem("city") != null){
      this.form.patchValue({city: sessionStorage.getItem("city")});
    }
    if(sessionStorage.getItem("state") != null){
      this.form.patchValue({state: sessionStorage.getItem("state")});
    }
    if(sessionStorage.getItem("zipCode") != null){
      this.form.patchValue({zip: sessionStorage.getItem("zipCode")});
    }
    if(sessionStorage.getItem("major") != null){
      this.form.patchValue({major: sessionStorage.getItem("major")});
    }
  }

  ngOnInit(): void {

  }

  private checkErrors(): void {
    this.errors.clear();

    //TODO: check if username (email?) already taken in database

    //Email verification
    const validEmail = RegExp('^[a-zA-Z0-9.!#$%&\'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$');
    if (!validEmail.test(this.email.value) && this.email.value != '') {
      this.errors.set('email', 'Invalid email format');
    }

    //Phone Number verification
    const validPhone = RegExp('^(\\+\\d{1,2}\\s)?\\(?\\d{3}\\)?[\\s.-]\\d{3}[\\s.-]\\d{4}$');
    if(!validPhone.test(this.phone_number.value) && this.phone_number.value != ''){
      this.errors.set('phone_number', 'Invalid phone number format');
    }

    //User Id verification
    const regex = RegExp('^[0-9]{8}$');
    if(!regex.test(this.student_number.value) && this.student_number.value != ''){
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

  get major(){
    return this.form.get('major');
  }

  /**
   * Handles submitting the profile update
   */
  onSubmit(): void {
    console.log(this.form.value);
    this.checkErrors();

    if(this.errors.size == 0){
      // create JSON object
      const email = this.email.value;
      const schoolId = this.student_number.value;
      const major = this.major.value;
      const firstName = this.first_name.value;
      const lastName = this.last_name.value;
      const phoneNumber = this.phone_number.value;
      const city = this.city.value;
      const state = this.state.value;
      const zipCode = this.zip.value;

      const jsonObj = JSON.stringify({
        email: email,
        schoolId: schoolId,
        major: major,
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phoneNumber,
        city: city,
        state: state,
        zipCode: zipCode
      });

      this.service.updateAccount(jsonObj).subscribe(
        res => {
          // store values in session storage
          sessionStorage.setItem('firstName', `${ res.body.firstName }`);
          sessionStorage.setItem('lastName', `${ res.body.lastName }`);
          sessionStorage.setItem('email', `${ res.body.email }`);
          sessionStorage.setItem('phoneNumber', `${ res.body.phoneNumber }`);
          sessionStorage.setItem('city', `${ res.body.city }`);
          sessionStorage.setItem('state', `${ res.body.state }`);
          sessionStorage.setItem('zipCode', `${ res.body.zipCode }`);
          sessionStorage.setItem('schoolId', `${ res.body.schoolId }`);
          sessionStorage.setItem('major', `${ res.body.major }`);
          sessionStorage.setItem('userType', res.body.userType);
          sessionStorage.setItem('accountKey', res.body.accountKey);

          alert("Your information has been updated!");
        },
        err => {
          console.log(err);
          // TODO: display error message in a better way (I.e., set an error variable & display with HTML)
          alert(err.error.message);
        }
      );
    }
  }

  /**
   * Requests the deletion of the account of the logged in user, after confirmation
   */
  requestAccountDeletion(): void {
    if(confirm("Are you sure you want to request deletion of your account?"))
    {
      let id = sessionStorage.getItem("accountKey");
      console.log("Requesting deletion of account with id "+id);
      this.service.deleteAccount(id).subscribe(
        res => {
          console.log(res);
          alert("Account deletion has been requested. Please check your email to complete the process.");
        },
        err => {
          console.error(err);
          alert("Something went wrong trying to delete your account");
        }
      );
    }


  }

  // private processResponse(data) {
  //   console.log(data);
  //   if (data.success == true) {
  //     this.router.navigate(['../dashboard']);
  //   }
  //   else {
  //     console.warn('Else Statement executed');
  //     this.error = data.error;
  //     this.errors = new Map(Object.entries(data.errors));
  //   }
  // }

}
