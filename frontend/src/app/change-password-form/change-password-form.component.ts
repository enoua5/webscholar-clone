import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {passwordMatchValidator} from "./validators";

@Component({
  selector: 'app-change-password-form',
  templateUrl: './change-password-form.component.html',
  styleUrls: ['./change-password-form.component.less']
})
export class ChangePasswordFormComponent implements OnInit {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder
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
    // Do something here
  }
}
