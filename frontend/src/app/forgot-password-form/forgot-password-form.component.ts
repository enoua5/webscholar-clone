import { Component, OnInit } from '@angular/core';
import {Form, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from "@angular/router";
import {ForgotPasswordService} from './forgot-password.service';
import {emailExistsValidator} from "./validators";

@Component({
  selector: 'app-forgot-password-form',
  templateUrl: './forgot-password-form.component.html',
  styleUrls: ['./forgot-password-form.component.less']
})
export class ForgotPasswordFormComponent implements OnInit {

  form: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private service: ForgotPasswordService
  ) {
    this.form = this.formBuilder.group({
      username: ['', {
        validators: [
          Validators.required,
          Validators.email
        ],
        asyncValidators: [
          emailExistsValidator(service)
        ],
      }],
    }, {
        updateOn: 'blur'
      });
  }

  ngOnInit(): void {
  }

  get username()
  {
    return this.form.get('username');
  }

  onSubmit(): void {
    // Set json object to username
    const jsonObj = JSON.stringify({accountEmail: this.username.value});

   // Check validity of form, before sending email
    if (this.form.valid)
    {
        this.service.forgotPassword(jsonObj);
        alert('Sending Forgot Password Email to:' + jsonObj);
    }
    // else log an error message
  }

}
