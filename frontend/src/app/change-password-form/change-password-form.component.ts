import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {passwordMatchValidator} from "./validators";
import { ChangePasswordService } from './change-password-form.service';


/**
 * Class handling data and functionality for the `/change_password` page
 */
@Component({
  selector: 'app-change-password-form',
  templateUrl: './change-password-form.component.html',
  styleUrls: ['./change-password-form.component.less']
})
export class ChangePasswordFormComponent implements OnInit {
  /**
   * Reference to the form the user is entering into.
   */
  form: FormGroup;

  /**
   * Constructor handles setting both properties, as well as defining the validators.
   * 
   * @param formBuilder Set to provide access to the data from the form
   * @param service Set to provide access to API functionality
   */
  constructor(
    private formBuilder: FormBuilder,
    private service: ChangePasswordService,
  ) {
    this.form = this.formBuilder.group({
        current_password: ['', {
          validators: [
            Validators.required,
            Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%?&])[A-Za-z\\d$@$!%?&]{8,}$')
          ]
        }],
        passwordFields: this.formBuilder.group({
          new_password: ['', {
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
        })
      }, {
        updateOn: 'blur'
      });
  }

  get current_password() {
    return this.form.get('current_password');
  }

  get passwordFields() {
    return this.form.get('passwordFields');
  }

  get new_password() {
    return this.passwordFields.get('new_password');
  }

  get confirm_password() {
    return this.passwordFields.get('confirm_password');
  }

  /**
   * Stub.
   * 
   * Called by Angular upon page load, but we don't need anything to happen on that trigger.
   */
  ngOnInit(): void {
  }

  /**
   * Called upon form submission.
   * 
   * Gathers the data from the form and submits it to the backend to be processed.
   * Alerts the user of the result.
   */
  onSubmit(): void {
    let body_data = JSON.stringify({
      newPassword: this.new_password.value,
      currentPassword: this.current_password.value
    });

    console.log(body_data);

    this.service.changePassword(body_data).subscribe({
      next: (res) => {
        alert("Your password has been updated.");
      },
      error: (err) => {
        alert(err.error.message || "An unknown error has occured.");
      }
    });
  }
}
