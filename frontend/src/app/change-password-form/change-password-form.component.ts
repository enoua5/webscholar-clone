import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {passwordMatchValidator} from "./validators";
import { ChangePasswordService } from './change-password-form.service';

@Component({
  selector: 'app-change-password-form',
  templateUrl: './change-password-form.component.html',
  styleUrls: ['./change-password-form.component.less']
})
export class ChangePasswordFormComponent implements OnInit {
  form: FormGroup;

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

  ngOnInit(): void {
  }

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
